import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Dashboard from "../components/dashboard/Dashboard";
import ProtectedRoute from "../privateRouting/ProtectedRoute";
import Root from "../components/layout/Root";
import VerifyEmail from "../components/signup/VerifyEmail";
import CheckEmail from "../components/signup/CheckEmail";
import SolutionsPage from "../components/pages/landingpage/SolutionsPage";
import PricingPage from "../components/pages/landingpage/PricingPage";
import AboutPage from "../components/pages/landingpage/AboutPage";
import ContactPage from "../components/pages/landingpage/ContactPage";
import SetupWorkspace from "../components/workspace/SetupWorkspace";
import AcceptInvite from "../components/workspace/AcceptInvite";





export const paths = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/signup",
                element: <Signup/>,
            },
            {
                path: "/solutions",
                element: <SolutionsPage/>,
            },
            {
                path: "/pricing",
                element: <PricingPage/>,
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
            {
                path: "/contact",
                element: <ContactPage/>,
            },

            {
                path: "/verify-email/:verificationToken",
                element: <VerifyEmail/>

            },
            {
                path:"/check-email/:email",
                element: <CheckEmail/>
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/setup-workspace",
                element: (
                     <ProtectedRoute>
                         <SetupWorkspace/>
                     </ProtectedRoute>
                ),
            },
            {
                path: "/workspace/invite/accept/:token",
                element: <AcceptInvite />,
            },
        ]
    }
])


const routing = ()=>{
    return <div></div>
}

export default routing;