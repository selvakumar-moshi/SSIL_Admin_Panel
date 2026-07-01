// useReports.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToastMessages } from '../../components/ToastMessages/useToastMessages';
import type { RootState } from '../../services/Store';
import { 
    getTabNames, 
    getFinancialYears,
    getReports,
    createReportWithFile,
    updateReport,
    deleteReport
} from '../../services/SuperSalesAction';
import type { Report, FormValues, ReportsGroupedData } from './constants';
import { parseReportsGroupedData, getGroupedReportSections } from './constants';

export const useReports = () => {
    const dispatch = useDispatch();
    const { messages: toastMessages, showSuccess, showError, showWarning, hideToast } = useToastMessages();
    
    // Table states
    const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
    const [selectedTabName, setSelectedTabName] = useState<string>('');
    
    // Modal states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<Report | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [existingFile, setExistingFile] = useState<string | null>(null);
    
    // Form states
    const [formValues, setFormValues] = useState<FormValues>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // API data states
    const [filterTabNameOptions, setFilterTabNameOptions] = useState<Array<{ value: string; label: string }>>([]);
    const [tabNameOptions, setTabNameOptions] = useState<Array<{ value: string; label: string }>>([]);
    const [financialYearOptions, setFinancialYearOptions] = useState<Array<{ value: string; label: string }>>([]);
    const [loadingFilterTabNames, setLoadingFilterTabNames] = useState(false);
    const [loadingTabNames, setLoadingTabNames] = useState(false);
    const [loadingFinancialYears, setLoadingFinancialYears] = useState(false);
    
    // Track delete operation
    const [isDeleting, setIsDeleting] = useState(false);

    // Redux state
    const { 
        TabNamesData, 
        FinancialYearsData, 
        ReportsData,
        loading,
        apiStatus 
    } = useSelector((state: RootState) => state.superSales);

    // Parse nested reports data: { tabName: { financialYear: Report[] } }
    const reportsGroupedData: ReportsGroupedData = parseReportsGroupedData(ReportsData);
    const groupedReports = selectedTabName
        ? getGroupedReportSections(reportsGroupedData, selectedTabName)
        : [];

    // Fetch Reports and Tab Names on component mount
    useEffect(() => {
        dispatch(getReports() as any);
        setLoadingFilterTabNames(true);
        dispatch(getTabNames() as any);
    }, [dispatch]);

    // Fetch Tab Names and Financial Years when modal opens
    useEffect(() => {
        if (isModalVisible) {
            setLoadingTabNames(true);
            setLoadingFinancialYears(true);
            dispatch(getTabNames() as any);
            dispatch(getFinancialYears() as any);
        }
    }, [isModalVisible, dispatch]);

    // Process Tab Names data for filter dropdown and modal
    useEffect(() => {
        if (TabNamesData && Array.isArray(TabNamesData)) {
            const options = TabNamesData.map((item: any) => ({
                value: item.tabNameValue,
                label: item.tabNameValue,
            }));
            setFilterTabNameOptions(options);
            setTabNameOptions(options);
            setLoadingFilterTabNames(false);
            setLoadingTabNames(false);

            setSelectedTabName(prev => prev || (options[4]?.value ?? ''));
        }
    }, [TabNamesData]);

    // Process Financial Years data
    useEffect(() => {
        if (FinancialYearsData && Array.isArray(FinancialYearsData)) {
            const options = FinancialYearsData.map((item: any) => ({
                value: item.financialYearCode,
                label: item.financialYearCode
            }));
            setFinancialYearOptions(options);
            setLoadingFinancialYears(false);
        }
    }, [FinancialYearsData]);

    // Handle API status for CRUD operations
    useEffect(() => {
        if (apiStatus.ReportsData?.success && submitting && !isDeleting) {
            showSuccess(isEditMode ? 'Report updated successfully!' : 'Report created successfully!');
            setIsModalVisible(false);
            setFormValues({});
            setFileList([]);
            setSelectedRecord(null);
            setIsEditMode(false);
            setFormErrors({});
            setExistingFile(null);
            setSubmitting(false);
            dispatch(getReports() as any);
        }

        if (apiStatus.ReportsData?.success && isDeleting) {
            showSuccess(`Report "${selectedRecord?.title}" deleted successfully!`);
            setIsDeleteModalVisible(false);
            setSelectedRecord(null);
            setIsDeleting(false);
            setSubmitting(false);
            dispatch(getReports() as any);
        }

        if (apiStatus.ReportsData?.error) {
            showError(apiStatus.ReportsData.error);
            setSubmitting(false);
            setIsDeleting(false);
        }
    }, [apiStatus.ReportsData, dispatch, isDeleting, isEditMode, selectedRecord?.title, showError, showSuccess, submitting]);

    const handleFilterTabChange = (tabName: string | undefined) => {
        setSelectedTabName(tabName || '');
    };

    const handleActionClick = (action: string, record: Report) => {
        setLoadingActions(prev => ({
            ...prev,
            [record.id]: {
                ...prev[record.id],
                [action]: true
            }
        }));

        try {
            switch (action.toLowerCase()) {
                case 'view':
                    if (record.s3Url) {
                        window.open(record.s3Url, '_blank');
                    } else {
                        showWarning('No URL available for this report');
                    }
                    break;
                case 'edit':
                    setSelectedRecord(record);
                    setIsEditMode(true);
                    setFormValues({
                        tabName: record.tabNameValue || '',
                        financialYear: record.financialYearCode || '',
                        title: record.title || '',
                    });
                    setExistingFile(record.s3Url || null);
                    setFileList([]);
                    setFormErrors({});
                    setIsModalVisible(true);
                    break;
                case 'delete':
                    setSelectedRecord(record);
                    setIsDeleteModalVisible(true);
                    break;
                default:
                    break;
            }
        } catch (error) {
            showError(`Failed to ${action} report`);
        } finally {
            setLoadingActions(prev => ({
                ...prev,
                [record.id]: {
                    ...prev[record.id],
                    [action]: false
                }
            }));
        }
    };

    const handleDeleteConfirm = () => {
        if (!selectedRecord) return;

        setIsDeleting(true);
        setSubmitting(true);
        dispatch(deleteReport({ id: selectedRecord.id }) as any);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
        setSelectedRecord(null);
        setIsDeleting(false);
        setSubmitting(false);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formValues.tabName || formValues.tabName.trim() === '') {
            newErrors.tabName = 'Tab Name is required';
        }

        if (!formValues.financialYear || formValues.financialYear.trim() === '') {
            newErrors.financialYear = 'Financial Year is required';
        }

        if (!isEditMode && fileList.length === 0) {
            newErrors.fileUpload = 'Please upload a file';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (name: string, value: string) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleDropdownChange = (name: string, value: string | string[]) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleFileChange = (newFileList: any[]) => {
        setFileList(newFileList);
        if (formErrors.fileUpload) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.fileUpload;
                return newErrors;
            });
        }
    };

    const handleDeleteFile = (fileName: string) => {
        setFileList(prev => prev.filter(file => file.name !== fileName));
    };

    const handleDeleteExistingFile = () => {
        setExistingFile(null);
        setFileList([]);
    };

    const handleGenerateReport = () => {
        setFormValues({});
        setFileList([]);
        setSelectedRecord(null);
        setIsEditMode(false);
        setFormErrors({});
        setExistingFile(null);
        setIsModalVisible(true);

        if (tabNameOptions.length === 0) {
            setLoadingTabNames(true);
            setLoadingFinancialYears(true);
            dispatch(getTabNames() as any);
            dispatch(getFinancialYears() as any);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setFormValues({});
        setFileList([]);
        setSelectedRecord(null);
        setIsEditMode(false);
        setFormErrors({});
        setExistingFile(null);
        setSubmitting(false);
    };

    const handleModalSubmit = async () => {
        if (!validateForm()) {
            showError('Please fix the errors in the form');
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData();
            
            formData.append('financialYearCode', formValues.financialYear as string);
            formData.append('tabNameValue', formValues.tabName as string);
            formData.append('title', formValues.title as string || '');

            if (isEditMode && selectedRecord) {
                if (fileList.length > 0 && fileList[0].originFileObj) {
                    formData.append('mainDocument', fileList[0].originFileObj);
                } else if (existingFile) {
                    formData.append('mainDocument', selectedRecord.mainDocument || '');
                } else {
                    formData.append('mainDocument', '');
                }
                
                dispatch(updateReport({ 
                    id: selectedRecord.id, 
                    formData 
                }) as any);
            } else {
                if (fileList.length > 0 && fileList[0].originFileObj) {
                    formData.append('file', fileList[0].originFileObj);
                } else {
                    showError('Please upload a file');
                    setSubmitting(false);
                    return;
                }
                dispatch(createReportWithFile(formData) as any);
            }
        } catch (error) {
            showError('Failed to submit report. Please try again.');
            setSubmitting(false);
        }
    };

    const isLoadingDropdownData = loadingTabNames || loadingFinancialYears;

    return {
        // States
        loading,
        loadingActions,
        isModalVisible,
        isDeleteModalVisible,
        isEditMode,
        selectedRecord,
        submitting,
        fileList,
        formValues,
        formErrors,
        tabNameOptions,
        financialYearOptions,
        filterTabNameOptions,
        selectedTabName,
        groupedReports,
        loadingFilterTabNames,
        isLoadingDropdownData,
        existingFile,
        isDeleting,
        
        // Handlers
        handleFilterTabChange,
        handleActionClick,
        handleInputChange,
        handleDropdownChange,
        handleFileChange,
        handleDeleteFile,
        handleDeleteExistingFile,
        handleGenerateReport,
        handleModalClose,
        handleDeleteModalClose,
        handleDeleteConfirm,
        handleModalSubmit,
        validateForm,
        
        // Toast
        toastMessages,
        hideToast,
    };
};