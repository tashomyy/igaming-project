import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Homepage from "./views/Home";

import ProtectedRoute from "./components/UI/ProtectedRoute";
import Welcome from "./views/Welcome";

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* unprotected routes without layout */}
      <Route path="/login" element={<Welcome />} />

      {/* protected routes with layout */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </Router>
);

export default AppRoutes;
