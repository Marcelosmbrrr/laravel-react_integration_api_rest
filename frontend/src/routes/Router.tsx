import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { Layout } from "../pages/Dashboard/Layout";

export function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="dashboard" element={<Layout />} />
            </Routes>
        </>

    );
}