import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import AllBooks from './../pages/allBooks/AllBooks';
import AddBook from './../pages/addBook/AddBook';

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children:[
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
                element: <SignUp/>,
            },
            {
                path: "/all-books",
                element: <AllBooks/>,
            },
            {
                path: "/add-book",
                element: <AddBook/>,
            }
        ]
    }
])

export default routes;