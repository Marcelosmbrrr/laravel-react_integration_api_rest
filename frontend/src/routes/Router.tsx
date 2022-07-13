import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { SystemLayout } from "../pages/Dashboard/SystemLayout";
import { AuthProvider } from "../context/AuthContext";

export function Router() {

    return (
        <>
            <Routes>
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="/" element={<Login />} />
                <Route path="/lvreact/*"
                    element={
                        <AuthProvider>
                            <SystemLayout />
                        </AuthProvider>
                    } />
            </Routes>
        </>

    );

}