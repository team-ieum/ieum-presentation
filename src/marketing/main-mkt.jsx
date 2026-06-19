import React from 'react'
import ReactDOM from 'react-dom/client'
import MarketingApp from './MarketingApp.jsx'
import '../index.css'
import './marketing.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MarketingApp />
  </React.StrictMode>,
)
