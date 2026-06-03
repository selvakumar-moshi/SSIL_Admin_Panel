import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

interface BreadcrumbItem {
  title: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPath: string;
}

const Breadcrumbs = ({ items, currentPath }: BreadcrumbsProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 64,
        right: 0,
        left: 0,
        zIndex: 98,
        background: '#fff',
        padding: '12px 24px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Breadcrumb
        items={[
          {
            title: (
              <Link to="/dashboard">
                <HomeOutlined /> Home
              </Link>
            ),
          },
          ...items.map((item, index) => {
            const isLast = index === items.length - 1;
            return {
              title: isLast ? (
                <span style={{ color: '#1890ff' }}>{item.title}</span>
              ) : (
                <Link to={item.path}>{item.title}</Link>
              ),
            };
          }),
        ]}
      />
    </div>
  );
};

export default Breadcrumbs;