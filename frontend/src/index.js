import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import store from './redux/store';
import {Provider} from 'react-redux'
// import 'antd/dist/antd.css'; // Import Ant Design CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={store}
  >
    <ConfigProvider theme={{
      components:{
        Button:{
          colorPrimary:'#405138',
          colorPrimaryHover:'#405138',
          borderRadius:'2px'
        }
      },
      token:{
        borderRadius:'2px',
        colorPrimary:'#405138'
      }
    }}>
    <App />
    </ConfigProvider>
  </Provider>
);

