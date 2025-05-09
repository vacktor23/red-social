import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'

import App from './App.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)