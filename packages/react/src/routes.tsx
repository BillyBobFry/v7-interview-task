import { Outlet, PathPattern, Route, Routes } from "react-router-dom"

import { BrowserRouter } from "react-router-dom"
import { ProjectProvider } from "./contexts/Project/ProjectProvider"
import ProjectTable from "./components/ProjectTable"
import { FallbackPage } from "./components/FallbackPage"
import { EntityView } from "./components/EntityView"

export type AppRoutesProps = {
    CommandCenter: React.ComponentType;
}

export const AppRoutes = ({
    CommandCenter
}: AppRoutesProps) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<>
                    <ProjectProvider>
                        <CommandCenter />
                        <Outlet />
                    </ProjectProvider>
                </>}>
                    <Route path="/:workspaceId/projects/:projectId">
                        <Route
                            index
                            element={
                                <ProjectTable />
                            }
                        />
                        <Route
                            path="entities/:entityId"
                            element={
                                <EntityView />
                            }
                        />
                    </Route>
                    {/* Fallback route */}
                    <Route path="*" element={<FallbackPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}