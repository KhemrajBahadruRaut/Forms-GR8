import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnboardingForm from '../Onboarding_Form/OnboardingForm';
import AdminPanel from "../AdminPanel/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../AdminPanel/adminLogin/AdminLoigin";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingForm />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/*" element={<AdminLogin />} />
        {/* <Route path="/dash/*" element={<AdminPanel />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
