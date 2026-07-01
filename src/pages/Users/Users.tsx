import { useMemo } from 'react';
import { Typography } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import ActionIcons from '../../components/Table/ActionIcons';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import Loader from '../../components/Loader/Loader';
import ToastMessages from '../../components/ToastMessages';
import { useUserManagement } from './useUserHooks';
import { USER_INPUT_FIELDS, getUserTableColumns } from './Constants';

const { Title } = Typography;

const Users = () => {
    const {
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
        handlePageChange,
        handleActionClick,
        handleInputChange,
        handleModalClose,
        handleDeleteModalClose,
        handleModalSubmit,
        handleDeleteConfirm,
        toastMessages,
        hideToast,
    } = useUserManagement();

    // Prepare columns with action handlers
    const columns = useMemo(() => {
        const baseColumns = getUserTableColumns();
        return [
            ...baseColumns,
            {
                title: 'Actions',
                key: 'actions',
                render: (_: any, record: any) => (
                    <ActionIcons
                        actions={['edit', 'delete']}
                        disabledActions={[]}
                        loadingActions={loadingActions[record.id] || {}}
                        onActionClick={(action, record) => handleActionClick(action, record)}
                        record={record}
                    />
                ),
            },
        ];
    }, [loadingActions, handleActionClick]);

    if (loading && usersArray.length === 0) {
        return <Loader size="large" />;
    }

    return (
        <div className="users-container">
            <ToastMessages messages={toastMessages} onMessageClose={hideToast} />
            <div className="report_main">
                <Title level={3} style={{ margin: 0 }}>Users</Title>
                {/* Removed Create User button */}
            </div>

            <TableComponent
                columns={columns}
                dataSource={getPaginatedData()}
                loading={loading}
                bordered={false}
                currentPage={currentPage}
                pageSize={pageSize}
                total={usersArray.length}
                onPageChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper={false}
                showPaginationInfo={false}
                size="middle"
                showHeader={true}
                locale={{
                    emptyText: 'No users available'
                }}
            />

            {/* Edit Modal */}
            <PopupModal
                open={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                title="Edit User"
                subtitle=""
                primaryButtonText="Update"
                secondaryButtonText="Cancel"
                showFooter={true}
                primaryButtonLoading={loading}
                secondaryButtonDisabled={loading}
                primaryButtonDisabled={loading}
                contentHeight="auto"
                minHeight={200}
            >
                <div style={{ padding: '0 8px' }}>
                    <InputFields
                        fields={USER_INPUT_FIELDS}
                        values={formValues}
                        errors={formErrors}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                </div>
            </PopupModal>

            {/* Delete Confirmation Modal */}
            <PopupModal
                open={isDeleteModalVisible}
                onClose={handleDeleteModalClose}
                onSubmit={handleDeleteConfirm}
                title="Confirm Deletion"
                subtitle=""
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
                showFooter={true}
                primaryButtonLoading={loading}
                secondaryButtonDisabled={loading}
                primaryButtonDisabled={loading}
                contentHeight="auto"
                minHeight={100}
            >
                <div className="popup-modal__content-content-text">
                    Are you sure you want to delete the user <b>"{selectedRecord?.firstName} {selectedRecord?.lastName}"</b>?
                </div>
            </PopupModal>
        </div>
    );
};

export default Users;