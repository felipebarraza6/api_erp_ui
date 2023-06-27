import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import './css/App.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import {ConfigProvider} from 'antd'

import locale from 'antd/es/locale/es_ES'

ReactDOM.render(<>
    <ConfigProvider locale={locale}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ConfigProvider></>, document.getElementById('root')
    
);


