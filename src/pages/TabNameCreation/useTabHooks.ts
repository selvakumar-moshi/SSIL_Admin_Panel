import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToastMessages } from '../../components/ToastMessages/useToastMessages';
import type { RootState } from '../../services/Store';
import { getTabNames, createTabName, updateTabName, deleteTabName } from '../../services/SuperSalesAction';
import type { TabNameRecord } from './Constants';

export const useTabManagement = () => {
    const dispatch = useDispatch();
    const { messages: toastMessages, showSuccess, showError, hideToast } = useToastMessages();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
    
    // Modal states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<TabNameRecord | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    // Form values
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Track which operation is in progress
    const [operationType, setOperationType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    // Redux state
    const { TabNamesData, loading, apiStatus } = useSelector(
        (state: RootState) => state.superSales
    );

    // Ensure TabNamesData is always an array
    const tabNamesArray = useMemo(() => 
        Array.isArray(TabNamesData) ? TabNamesData : [],
        [TabNamesData]
    );

    // Fetch tab names on component mount
    useEffect(() => {
        dispatch(getTabNames() as any);
    }, [dispatch]);

    // Handle API status changes
    useEffect(() => {
        const status = apiStatus.TabNamesData;
        if (!status) return;

        if (status.success) {
            if (operationType === 'create') {
                showSuccess('Tab name created successfully!');
                handleModalClose();
                setOperationType(null);
                setNeedsRefresh(true);
            } else if (operationType === 'update') {
                showSuccess('Tab name updated successfully!');
                handleModalClose();
                setOperationType(null);
                setNeedsRefresh(true);
            } else if (operationType === 'delete') {
                showSuccess('Tab name deleted successfully!');
                handleDeleteModalClose();
                setOperationType(null);
                setNeedsRefresh(true);
            }
        }

        if (status.error) {
            showError(status.error);
            setOperationType(null);
        }
    }, [apiStatus.TabNamesData, operationType, showSuccess, showError]);

    // Refresh data when needed
    useEffect(() => {
        if (needsRefresh) {
            dispatch(getTabNames() as any);
            setNeedsRefresh(false);
        }
    }, [needsRefresh, dispatch]);

    // Get paginated data
    const getPaginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return tabNamesArray.slice(start, end);
    }, [tabNamesArray, currentPage, pageSize]);

    const handlePageChange = (page: number, newPageSize: number) => {
        setCurrentPage(page);
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            setCurrentPage(1);
        }
    };

    const handleActionClick = (action: string, record: TabNameRecord) => {
        setLoadingActions(prev => ({
            ...prev,
            [record.id]: {
                ...prev[record.id],
                [action]: true
            }
        }));

        try {
            switch (action.toLowerCase()) {
                case 'edit':
                    setSelectedRecord(record);
                    setIsEditMode(true);
                    setFormValues({ tabNameValue: record.tabNameValue });
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
            showError(`Failed to ${action} tab name`);
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

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!formValues.tabNameValue || formValues.tabNameValue.trim() === '') {
            newErrors.tabNameValue = 'Tab Name is required';
        } else if (formValues.tabNameValue.length < 3) {
            newErrors.tabNameValue = 'Tab Name must be at least 3 characters';
        } else if (formValues.tabNameValue.length > 50) {
            newErrors.tabNameValue = 'Tab Name must be less than 50 characters';
        } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(formValues.tabNameValue)) {
            newErrors.tabNameValue = 'Tab Name can only contain letters, numbers, spaces, hyphens, and underscores';
        } else {
            const isDuplicate = tabNamesArray.some((item: TabNameRecord) => 
                item.tabNameValue.toLowerCase() === formValues.tabNameValue.trim().toLowerCase() &&
                (!isEditMode || item.id !== selectedRecord?.id)
            );
            if (isDuplicate) {
                newErrors.tabNameValue = 'Tab Name already exists. Please use a unique name';
            }
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

    const handleCreateTabName = () => {
        setSelectedRecord(null);
        setIsEditMode(false);
        setFormValues({});
        setFormErrors({});
        setIsModalVisible(true);
    };

    // Close create/edit modal
    const handleModalClose = () => {
        setIsModalVisible(false);
        setFormValues({});
        setFormErrors({});
        setSelectedRecord(null);
        setIsEditMode(false);
    };

    // Close delete modal
    const handleDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
        setSelectedRecord(null);
    };

    const handleModalSubmit = () => {
        if (!validateForm()) {
            showError('Please fix the errors in the form');
            return;
        }
        
        if (isEditMode && selectedRecord) {
            setOperationType('update');
            dispatch(updateTabName({
                id: selectedRecord.id,
                tabName: formValues.tabNameValue.trim() as string
            }) as any);
        } else {
            setOperationType('create');
            dispatch(createTabName({
                tabName: formValues.tabNameValue.trim() as string
            }) as any);
        }
    };

    const handleDeleteConfirm = () => {
        if (!selectedRecord) return;
        setOperationType('delete');
        dispatch(deleteTabName({ id: selectedRecord.id }) as any);
    };

    return {
        // State
        currentPage,
        pageSize,
        loadingActions,
        isModalVisible,
        isDeleteModalVisible,
        selectedRecord,
        isEditMode,
        formValues,
        formErrors,
        tabNamesArray,
        loading,
        getPaginatedData,
        
        // Handlers
        handlePageChange,
        handleActionClick,
        handleInputChange,
        handleCreateTabName,
        handleModalClose,
        handleDeleteModalClose,
        handleModalSubmit,
        handleDeleteConfirm,
        validateForm,

        // Toast
        toastMessages,
        hideToast,
    };
};