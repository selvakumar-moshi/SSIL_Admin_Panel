import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToastMessages } from '../../components/ToastMessages/useToastMessages';
import type { RootState } from '../../services/Store';
import { getUsers, updateUser, deleteUser } from '../../services/SuperSalesAction';
import type { UserRecord } from './Constants';

export const useUserManagement = () => {
    const dispatch = useDispatch();
    const { messages: toastMessages, showSuccess, showError, hideToast } = useToastMessages();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loadingActions, setLoadingActions] = useState<Record<string, Record<string, boolean>>>({});
    
    // Modal states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<UserRecord | null>(null);
    
    // Form values
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Track which operation is in progress
    const [operationType, setOperationType] = useState<'update' | 'delete' | null>(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    // Redux state
    const { UsersData, loading, apiStatus } = useSelector(
        (state: RootState) => state.superSales
    );

    // Ensure UsersData is always an array
    const usersArray = Array.isArray(UsersData) ? UsersData : [];

    // Fetch users on component mount
    useEffect(() => {
        dispatch(getUsers() as any);
    }, [dispatch]);

    // Handle API status changes
    useEffect(() => {
        if (apiStatus.UsersData?.success && operationType === 'update') {
            showSuccess('User updated successfully!');
            handleModalClose();
            setOperationType(null);
            setNeedsRefresh(true);
        }

        if (apiStatus.UsersData?.success && operationType === 'delete') {
            showSuccess('User deleted successfully!');
            handleDeleteModalClose();
            setOperationType(null);
            setNeedsRefresh(true);
        }

        if (apiStatus.UsersData?.error) {
            showError(apiStatus.UsersData.error);
            setOperationType(null);
        }
    }, [apiStatus.UsersData, operationType, showSuccess, showError]);

    // Refresh data when needed
    useEffect(() => {
        if (needsRefresh) {
            dispatch(getUsers() as any);
            setNeedsRefresh(false);
        }
    }, [needsRefresh, dispatch]);

    // Get paginated data
    const getPaginatedData = () => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return usersArray.slice(start, end);
    };

    const handlePageChange = (page: number, newPageSize: number) => {
        setCurrentPage(page);
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            setCurrentPage(1);
        }
    };

    const handleActionClick = (action: string, record: UserRecord) => {
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
                    setFormValues({
                        firstName: record.firstName || '',
                        lastName: record.lastName || '',
                        jobTitle: record.jobTitle || '',
                        email: record.email || '',
                        password: '', // Don't populate password for security
                    });
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
            showError(`Failed to ${action} user`);
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
        
        if (!formValues.firstName || formValues.firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
        }
        
        if (!formValues.lastName || formValues.lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
        }
        
        if (!formValues.jobTitle || formValues.jobTitle.trim() === '') {
            newErrors.jobTitle = 'Job title is required';
        }
        
        if (!formValues.email || formValues.email.trim() === '') {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
            newErrors.email = 'Invalid email address';
        }
        
        // Password is optional for edit, but if provided must be at least 6 characters
        if (formValues.password && formValues.password.length > 0 && formValues.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
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

    // Close edit modal
    const handleModalClose = () => {
        setIsModalVisible(false);
        setFormValues({});
        setFormErrors({});
        setSelectedRecord(null);
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
        
        if (selectedRecord) {
            setOperationType('update');
            const updateData: any = {
                id: selectedRecord.id,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                jobTitle: formValues.jobTitle,
                email: formValues.email,
            };
            
            // Only include password if it's provided
            if (formValues.password && formValues.password.trim() !== '') {
                updateData.password = formValues.password;
            }
            
            dispatch(updateUser(updateData) as any);
        }
    };

    const handleDeleteConfirm = () => {
        if (!selectedRecord) return;
        setOperationType('delete');
        dispatch(deleteUser({ id: selectedRecord.id }) as any);
    };

    return {
        // State
        currentPage,
        pageSize,
        loadingActions,
        isModalVisible,
        isDeleteModalVisible,
        selectedRecord,
        formValues,
        formErrors,
        usersArray,
        loading,
        getPaginatedData,
        
        // Handlers
        handlePageChange,
        handleActionClick,
        handleInputChange,
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