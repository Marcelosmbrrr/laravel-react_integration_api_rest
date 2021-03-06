import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { SystemLayout } from "../pages/Dashboard/SystemLayout";
import { NotFound } from "../pages/NotFound/NotFound404";
import { AuthProvider } from "../context/AuthContext";

export const Router = () => {

    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/lvreact/*" element={<SystemLayout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );

}