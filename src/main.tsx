import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import App from "./app/App";
import { Store } from './services/Store';
import 'antd/dist/reset.css';
import './index.css';
import './styles/Login.css';
import './styles/Reports.css';
import './styles/Sidebar.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/Button.scss';
import './styles/Table.scss';
import './styles/ActionIcons.scss';
import './styles/PopupModal.scss';
import './styles/InputFields.scss';
import './styles/DropdownField.scss';
import './styles/FileUploadDisplay.scss';
import './styles/FileUploadSection.scss';
import './styles/PageTitle.scss';
import './styles/Loader.scss';
import './styles/ToastMessages.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={Store}>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </Provider>
);