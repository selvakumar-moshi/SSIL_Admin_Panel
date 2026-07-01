import { useMemo } from 'react';
import { Typography } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import ActionIcons from '../../components/Table/ActionIcons';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import ToastMessages from '../../components/ToastMessages';
import { useTabManagement } from './useTabHooks';
import { TAB_INPUT_FIELDS, getTabTableColumns } from './Constants';

const { Title } = Typography;

export default function TabNameCreation() {
    const {
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
        handlePageChange,
        handleActionClick,
        handleInputChange,
        handleCreateTabName,
        handleModalClose,
        handleDeleteModalClose,
        handleModalSubmit,
        handleDeleteConfirm,
        toastMessages,
        hideToast,
    } = useTabManagement();

    // Prepare columns with action handlers
    const columns = useMemo(() => {
        const baseColumns = getTabTableColumns();
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

    if (loading && tabNamesArray.length === 0) {
        return <Loader size="small" />;
    }

    return (
        <div className="tab-name-creation-container">
            <ToastMessages messages={toastMessages} onMessageClose={hideToast} />
            <div className="report_main">
                <Title level={3} style={{ margin: 0 }}>Tab Name</Title>
                <Button variant="primary" className="page-title__button" onClick={handleCreateTabName}>
                    Create Tab Name
                </Button>
            </div>

            <TableComponent
                columns={columns}
                dataSource={getPaginatedData}
                loading={loading}
                bordered={false}
                currentPage={currentPage}
                pageSize={pageSize}
                total={tabNamesArray.length}
                onPageChange={handlePageChange}
                showSizeChanger={true}
                showQuickJumper={true}
                showPaginationInfo={true}
                pageSizeOptions={['10', '20', '50', '100']}
                paginationInfoText={(start, end, total) => (
                    <span style={{ color: '#666' }}>
                        Showing {start} to {end} of {total} tab names
                    </span>
                )}
                size="middle"
                showHeader={true}
                locale={{
                    emptyText: 'No tab names available'
                }}
            />

            {/* Create/Edit Modal */}
            <PopupModal
                open={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                title={isEditMode ? "Edit Tab Name" : "Create New Tab Name"}
                subtitle=""
                primaryButtonText={isEditMode ? "Update" : "Create"}
                secondaryButtonText="Cancel"
                showFooter={true}
                primaryButtonLoading={loading}
                secondaryButtonDisabled={loading}
                primaryButtonDisabled={loading}
                contentHeight="auto"
                minHeight={150}
            >
                <div style={{ padding: '0 8px' }}>
                    <InputFields
                        fields={TAB_INPUT_FIELDS}
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
                    Are you sure you want to delete the tab name <b>"{selectedRecord?.tabNameValue}"</b>?
                </div>
            </PopupModal>
        </div>
    );
}