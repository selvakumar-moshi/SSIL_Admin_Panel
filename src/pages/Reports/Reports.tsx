import { Typography } from 'antd';
import TableComponent from '../../components/Table/TableWithPagination';
import PopupModal from '../../components/PopupModal/PopupModal';
import InputFields from '../../components/InputFields/InputFields';
import DropdownField from '../../components/DropdownField/DropdownField';
import FileUploadSection from '../../components/FileUploadSection/FileUploadSection';
import Button from '../../components/Button/Button';
import { useReports } from './useReports';
import { inputFields, getDropdownFields, getColumns } from './constants';

const { Title } = Typography;

const Reports = () => {
  const {
    // States
    currentPage,
    pageSize,
    loading,
    data,
    total,
    loadingActions,
    isModalVisible,
    submitting,
    fileList,
    formValues,
    parentFolderOptions,
    subFolderOptions,
    subSubFolderOptions,
    isSubFolderDisabled,
    isSubSubFolderDisabled,
    
    // Handlers
    handlePageChange,
    handleActionClick,
    handleInputChange,
    handleDropdownChange,
    handleFileChange,
    handleDeleteFile,
    handleGenerateReport,
    handleModalClose,
    handleModalSubmit,
  } = useReports();

  const columns = getColumns(loadingActions, handleActionClick);
  
  const dropdownFields = getDropdownFields(
    false,
    isSubFolderDisabled,
    isSubSubFolderDisabled,
    parentFolderOptions,
    subFolderOptions,
    subSubFolderOptions
  );

  return (
    <div>
      {/* Header Section */}
      <div className="report_main">
        <Title level={3} style={{ margin: 0 }}>Reports</Title>
        <Button variant="primary" className="page-title__button" onClick={handleGenerateReport}>
          Create Report
        </Button>
      </div>

      {/* Table Section */}
      <TableComponent
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered={false}
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
        showSizeChanger={true}
        showQuickJumper={true}
        showPaginationInfo={true}
        pageSizeOptions={['10', '20', '50', '100']}
        paginationInfoText={(start, end, total) => (
          <span style={{ color: '#666' }}>
            Showing {start} to {end} of {total} reports
          </span>
        )}
        size="middle"
        showHeader={true}
        locale={{
          emptyText: 'No reports available'
        }}
      />

      {/* Create Report Popup Modal */}
      <PopupModal
        open={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        title="Create New Report"
        subtitle=""
        primaryButtonText="Create Report"
        secondaryButtonText="Cancel"
        primaryButtonLoading={submitting}
        primaryButtonDisabled={submitting}
        minHeight={550}
      >
        <div className='popup-modal__content-content-text2'>
          {/* All Dropdown Fields */}
          <DropdownField
            fields={dropdownFields}
            values={formValues as Record<string, string | string[]>}
            onChange={handleDropdownChange}
          />
          
          {/* Input Field (Title only) */}
          <InputFields
            fields={inputFields}
            values={formValues as Record<string, string>}
            onChange={handleInputChange}
            disabled={submitting}
          />
          
          {/* File Upload Section */}
          <div className="form-fields-section__field">
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-control">
                <FileUploadSection
                  label="Upload File"
                  maxSize={5}
                  acceptedFormats="PDF, XLSX, CSV, DOC, DOCX"
                  required={true}
                  fileList={fileList}
                  onFileChange={handleFileChange}
                  onDeleteFile={handleDeleteFile}
                />
              </div>
            </div>
          </div>
        </div>
      </PopupModal>
    </div>
  );
};

export default Reports;