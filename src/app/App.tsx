import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import "../App.css";
import { useInitialize } from "./useInitialize";
import { Home, Login, Organizations, Registration } from "pages";
import { MainLayout } from "layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  useInitialize();

  return (
    <>
      <div className="App">
        <Box>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizations"
                element={
                  <ProtectedRoute>
                    <Organizations />
                  </ProtectedRoute>
                }
              />
              <Route path="/organization">
                <Route
                  path=":orgId"
                  element={<ProtectedRoute>Organization</ProtectedRoute>}
                />
                <Route
                  path=":orgId/settings"
                  element={
                    <ProtectedRoute>Organization Settings</ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Box>
      </div>
    </>
  );
}

export default App;
