import success_icon from "../../assets/success_icon.svg";
import { Empty } from "antd";

interface NoDataFoundProps {
  type?: 'pending' | 'nodata' | 'custom';
  description?: React.ReactNode | string;
  style?: React.CSSProperties;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ 
  type = 'pending',
  description,
  style,
}) => {

  return (
    <div className="no-data-found__container" style={style}>
      {type === 'pending' && (
        <>
        <img src={success_icon} alt="success_Icon" />
        <div className="no-data-found__pending-text">You are caught up! <br />
          There are no pending requests to be reviewed.<br />
        {description}
        </div>
        </>
      )}
      {type === 'nodata' && (
        <Empty className="no-data-found__text" image={false} description={description} />
      )}
    </div>
  );
};


export default NoDataFound