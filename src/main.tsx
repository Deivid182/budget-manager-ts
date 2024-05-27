import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BudgetProvider } from './context/budget.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>,
)
