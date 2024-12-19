import { useEffect } from 'react'
import './assets/main.css'
import {getEntities, getProject} from '@v7-product-interview-task/api'
import { BrowserRouter, Route, Routes } from "react-router";
import { ProjectTable } from './components/ProjectTable'
import { EntityView } from './components/EntityView'
import { FallbackPage } from './components/FallbackPage'

function App() {
  console.log(import.meta.env)


  return (
    <BrowserRouter>
      <Routes>
      <Route path="/:workspaceId/projects/:projectId">        
        {/* Table view (index route) */}
        <Route index element={<ProjectTable />} />
        
        {/* Entity view */}
        <Route path="entities/:entityId" element={<EntityView />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<FallbackPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
