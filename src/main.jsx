import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailView from './routes/DetailView'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
    <Routes>
      <Route index={true} path="/" element={<App />}/>
      <Route index={false} path="/recipeInfo/:id" element={<DetailView />}/>
    </Routes>
  </BrowserRouter>
)
