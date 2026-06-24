import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import type { RootState } from '../../services/Store';
import { getFinancialYears, createFinancialYear, updateFinancialYear, deleteFinancialYear } from '../../services/SuperSalesAction';
import type { FinancialYearRecord } from './Constants';

export const useFinancialYearManagement = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
    
    // Modal states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<FinancialYearRecord | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    // Form values
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Track which operation is in progress
    const [operationType, setOperationType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    // Redux state
    const { FinancialYearsData, loading, apiStatus } = useSelector(
        (state: RootState) => state.superSales
    );

    // Ensure FinancialYearsData is always an array
    const financialYearsArray = Array.isArray(FinancialYearsData) ? FinancialYearsData : [];

    // Fetch financial years on component mount
    useEffect(() => {
        dispatch(getFinancialYears() as any);
    }, [dispatch]);

    // Handle API status changes
    useEffect(() => {
        if (apiStatus.FinancialYearsData?.success && operationType === 'create') {
            message.success('Financial year created successfully!');
            handleModalClose();
            setOperationType(null);
            setNeedsRefresh(true);
        }

        if (apiStatus.FinancialYearsData?.success && operationType === 'update') {
            message.success('Financial year updated successfully!');
            handleModalClose();
            setOperationType(null);
            setNeedsRefresh(true);
        }

        if (apiStatus.FinancialYearsData?.success && operationType === 'delete') {
            message.success('Financial year deleted successfully!');
            handleDeleteModalClose();
            setOperationType(null);
            setNeedsRefresh(true);
        }

        if (apiStatus.FinancialYearsData?.error) {
            message.error(apiStatus.FinancialYearsData.error);
            setOperationType(null);
        }
    }, [apiStatus.FinancialYearsData, operationType]);

    // Refresh data when needed
    useEffect(() => {
        if (needsRefresh) {
            dispatch(getFinancialYears() as any);
            setNeedsRefresh(false);
        }
    }, [needsRefresh, dispatch]);

    // Get paginated data
    const getPaginatedData = () => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return financialYearsArray.slice(start, end);
    };

    const handlePageChange = (page: number, newPageSize: number) => {
        setCurrentPage(page);
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            setCurrentPage(1);
        }
    };

    const handleActionClick = (action: string, record: FinancialYearRecord) => {
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
                    setFormValues({ financialYearCode: record.financialYearCode });
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
            message.error(`Failed to ${action} financial year`);
            console.error(`Error ${action} financial year:`, error);
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
        
        const yearPattern = /^\d{4}-\d{4}$/;
        if (!formValues.financialYearCode || formValues.financialYearCode.trim() === '') {
            newErrors.financialYearCode = 'Financial Year is required';
        } else if (!yearPattern.test(formValues.financialYearCode)) {
            newErrors.financialYearCode = 'Please use the format YYYY-YYYY (e.g., 2024-2025)';
        } else {
            const [startYear, endYear] = formValues.financialYearCode.split('-');
            if (parseInt(endYear) !== parseInt(startYear) + 1) {
                newErrors.financialYearCode = 'End year must be exactly one year after start year';
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

    const handleCreateFinancialYear = () => {
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
            message.error('Please fix the errors in the form');
            return;
        }
        
        if (isEditMode && selectedRecord) {
            setOperationType('update');
            dispatch(updateFinancialYear({
                id: selectedRecord.id,
                financialYearCode: formValues.financialYearCode
            }) as any);
        } else {
            setOperationType('create');
            dispatch(createFinancialYear({
                financialYearCode: formValues.financialYearCode
            }) as any);
        }
    };

    const handleDeleteConfirm = () => {
        if (!selectedRecord) return;
        setOperationType('delete');
        dispatch(deleteFinancialYear({ id: selectedRecord.id }) as any);
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
        financialYearsArray,
        loading,
        getPaginatedData,
        
        // Handlers
        handlePageChange,
        handleActionClick,
        handleInputChange,
        handleCreateFinancialYear,
        handleModalClose,
        handleDeleteModalClose,
        handleModalSubmit,
        handleDeleteConfirm,
        validateForm,
    };
};