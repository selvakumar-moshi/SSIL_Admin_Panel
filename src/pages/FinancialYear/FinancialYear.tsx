import { useMemo } from 'react';
import { Typography } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import ActionIcons from '../../components/Table/ActionIcons';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { useFinancialYearManagement } from './useFinancialHooks';
import { FINANCIAL_INPUT_FIELDS, getFinancialTableColumns } from './Constants';

const { Title } = Typography;

const FinancialYear = () => {
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
        financialYearsArray,
        loading,
        getPaginatedData,
        handlePageChange,
        handleActionClick,
        handleInputChange,
        handleCreateFinancialYear,
        handleModalClose,
        handleDeleteModalClose,
        handleModalSubmit,
        handleDeleteConfirm,
    } = useFinancialYearManagement();

    // Prepare columns with action handlers
    const columns = useMemo(() => {
        const baseColumns = getFinancialTableColumns();
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

    if (loading && financialYearsArray.length === 0) {
        return <Loader size="large" />;
    }

    return (
        <div className="financial-year-container">
            <div className="report_main">
                <Title level={3} style={{ margin: 0 }}>Financial Years</Title>
                <Button variant="primary" className="page-title__button" onClick={handleCreateFinancialYear}>
                    Create Financial Year
                </Button>
            </div>

            <TableComponent
                columns={columns}
                dataSource={getPaginatedData()}
                loading={loading}
                bordered={false}
                currentPage={currentPage}
                pageSize={pageSize}
                total={financialYearsArray.length}
                onPageChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper={false}
                showPaginationInfo={false}
                size="middle"
                showHeader={true}
                locale={{
                    emptyText: 'No financial years available'
                }}
            />

            {/* Create/Edit Modal */}
            <PopupModal
                open={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                title={isEditMode ? "Edit Financial Year" : "Create New Financial Year"}
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
                        fields={FINANCIAL_INPUT_FIELDS}
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
                    Are you sure you want to delete the Financial Year <b>"{selectedRecord?.financialYearCode}"</b>?
                </div>
            </PopupModal>
        </div>
    );
};

export default FinancialYear;