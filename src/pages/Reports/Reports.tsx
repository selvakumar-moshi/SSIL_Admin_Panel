// Reports.tsx
import { Typography, Empty } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import DropdownField from '../../components/DropdownField/DropdownField';
import FileUploadSection from '../../components/FileUploadSection/FileUploadSection';
import FileUploadDisplay from '../../components/FileUploadDisplay/FileUploadDisplay';
import Button from '../../components/Button/Button';
import ToastMessages from '../../components/ToastMessages';
import { useReports } from './useReports';
import { inputFields, getDropdownFields, getGroupedColumns } from './constants';

const { Title } = Typography;

const Reports = () => {
    const {
        loading,
        loadingActions,
        isModalVisible,
        isDeleteModalVisible,
        isEditMode,
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
        selectedRecord,
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
        toastMessages,
        hideToast,
    } = useReports();

    const columns = getGroupedColumns(loadingActions, handleActionClick);
    const dropdownFields = getDropdownFields(tabNameOptions, financialYearOptions);

    const filterDropdownFields = [
        {
            name: 'filterTabName',
            label: '',
            placeholder: 'Select Tab Name',
            required: false,
            options: filterTabNameOptions,
            showSearch: true,
            loading: loadingFilterTabNames,
            inputTestId: 'reports-filter-tab-name',
        },
    ];

    const renderReportsContent = () => {
        if (!selectedTabName) {
            return <Empty description="Select a tab name to view reports" />;
        }

        if (groupedReports.length === 0) {
            return <Empty description="No reports available for the selected tab" />;
        }

        return groupedReports.map(({ financialYear, reports }) => (
            <div key={financialYear} className="reports-year-section">
                <div className="reports-year-section__header">
                    <span className="reports-year-section__label">Financial Year</span>
                    <span className="reports-year-section__value">{financialYear}</span>
                </div>
                <TableComponent
                    className="reports-year-table"
                    columns={columns}
                    dataSource={reports.map(item => ({
                        ...item,
                        key: item.id,
                    }))}
                    loading={loading}
                    bordered={false}
                    size="middle"
                    showHeader={true}
                    locale={{
                        emptyText: 'No reports available',
                    }}
                />
            </div>
        ));
    };

    return (
        <div className="reports-container">
            <ToastMessages messages={toastMessages} onMessageClose={hideToast} />
            
            <div className="report_main">
                <Title level={3} style={{ margin: 0 }}>Reports</Title>
                <div className="reports-header-actions">
                    <DropdownField
                        fields={filterDropdownFields}
                        values={{ filterTabName: selectedTabName }}
                        onChange={(_name, value) => handleFilterTabChange(value as string | undefined)}
                        className="dropdown-field--inline"
                    />
                    <Button 
                        variant="primary" 
                        className="page-title__button" 
                        onClick={handleGenerateReport}
                    >
                        Create Report
                    </Button>
                </div>
            </div>

            <div className="reports-grouped-content">
                {renderReportsContent()}
            </div>

            <PopupModal
                open={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                title={isEditMode ? "Edit Report" : "Create New Report"}
                subtitle=""
                primaryButtonText={isEditMode ? "Update Report" : "Create Report"}
                secondaryButtonText="Cancel"
                primaryButtonLoading={submitting}
                primaryButtonDisabled={submitting || isLoadingDropdownData}
                secondaryButtonDisabled={submitting || isLoadingDropdownData}
                minHeight={450}
                maxHeight={600}
            >
                <div className="popup-modal__content-content-text2">
                    <DropdownField
                        fields={dropdownFields}
                        values={formValues as Record<string, string | string[]>}
                        onChange={handleDropdownChange}
                        errors={formErrors}
                    />
                    
                    <InputFields
                        fields={inputFields}
                        values={formValues as Record<string, string>}
                        errors={formErrors}
                        onChange={handleInputChange}
                        disabled={submitting || isLoadingDropdownData}
                    />
                    
                    <div className="form-fields-section__field">
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-control">
                                {isEditMode && existingFile && selectedRecord ? (
                                    <FileUploadDisplay
                                        label="Uploaded File"
                                        fileName={selectedRecord.mainDocument}
                                        onDelete={handleDeleteExistingFile}
                                    />
                                ) : (
                                    <FileUploadSection
                                        label="Upload File"
                                        maxSize={10}
                                        acceptedFormats="PDF, XLSX, CSV, DOC, DOCX, PNG, JPG, JPEG"
                                        required={!isEditMode}
                                        fileList={fileList}
                                        onFileChange={handleFileChange}
                                        onDeleteFile={handleDeleteFile}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </PopupModal>

            <PopupModal
                open={isDeleteModalVisible}
                onClose={handleDeleteModalClose}
                onSubmit={handleDeleteConfirm}
                title="Confirm Deletion"
                subtitle=""
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
                showFooter={true}
                primaryButtonLoading={submitting}
                primaryButtonDisabled={submitting}
                secondaryButtonDisabled={submitting}
                contentHeight="auto"
                minHeight={150}
            >
                <div className="popup-modal__content-content-text">
                    Are you sure you want to delete the report <b>"{selectedRecord?.title}"</b>?
                </div>
            </PopupModal>
        </div>
    );
};

export default Reports;
