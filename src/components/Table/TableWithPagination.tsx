import React from "react";
import { Table as AntTable, Pagination } from "antd";
import { type ITableProps } from "./ITable";

interface TableComponentProps extends ITableProps {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, newPageSize: number) => void;
  pageSizeOptions?: string[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showPaginationInfo?: boolean;
  paginationInfoText?: (start: number, end: number, total: number) => React.ReactNode;
  locale?: {
    emptyText?: React.ReactNode | string;
  };
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  dataSource,
  loading = false,
  pagination = false,
  size = "middle",
  bordered = false,
  showHeader = true,
  className,
  style,
  rowSelection,
  scroll,
  // maxHeight = 400,
  
  currentPage = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  pageSizeOptions = ['10', '20', '50', '100'],
  showSizeChanger = true,
  showQuickJumper = true,
  showPaginationInfo = true,
  paginationInfoText,
  locale,
}) => {
  const hasCustomPagination = currentPage && pageSize && total && onPageChange;
  
  const getPaginationConfig = () => {
    if (hasCustomPagination) {
      return false;
    }
    
    if (pagination === false) {
      return false;
    } else if (pagination === true) {
      return { pageSize: 10 };
    } else {
      return pagination;
    }
  };
  
  const paginationConfig = getPaginationConfig();
  
  const start = Math.min((currentPage - 1) * pageSize + 1, total);
  const end = Math.min(currentPage * pageSize, total);
  
  const defaultPaginationInfo = (
    <>
      <span>Showing</span> {start} <span>out to</span> {end} <span>of</span> {total}
    </>
  );

  return (
    <>
      <div className={`custom-table ${className || ""}`} style={style}>
        <AntTable
          columns={columns}
          dataSource={dataSource}
          pagination={paginationConfig}
          loading={loading}
          size={size}
          bordered={bordered}
          showHeader={showHeader}
          rowSelection={rowSelection}
          scroll={scroll}
          className="custom-table__ant-table"
          locale={locale}
        />
      </div>
      {hasCustomPagination ? (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            onShowSizeChange={onPageChange}
            showSizeChanger={showSizeChanger}
            showQuickJumper={showQuickJumper}
            pageSizeOptions={pageSizeOptions}
          />
          
          {showPaginationInfo && (
            <div className="pagination-info">
              {paginationInfoText ? paginationInfoText(start, end, total) : defaultPaginationInfo}
            </div>
          )}
        </div>
      ) : ""}
    </>
  );
};

export default TableComponent;