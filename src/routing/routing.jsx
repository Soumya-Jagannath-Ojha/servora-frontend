import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Dashboard from "../components/dashboard/Dashboard";
import ProtectedRoute from "../privateRouting/ProtectedRoute";
import Root from "../components/layout/Root";



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
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                ),
            },
        ]
    }
])


const routing = ()=>{
    return <div></div>
}

export default routing;