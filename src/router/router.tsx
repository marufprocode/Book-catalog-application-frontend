import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import AllBooks from './../pages/allBooks/AllBooks';
import AddBook from './../pages/addBook/AddBook';
import WishList from "../pages/wishlist/WishList";
import ReadingList from "../pages/readingList/ReadingList";
import BookDetails from './../pages/bookDetails/BookDetails';
import EditBook from "../pages/editBook/EditBook";

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
            },
            {
                path: "/wish-list",
                element: <WishList/>,
            },
            {
                path: "/read-list",
                element: <ReadingList/>,
            },
            {
                path: "/book/:id",
                element: <BookDetails/>,
            },
            {
                path: "/edit-book/:id",
                element: <EditBook/>,
            }
        ]
    }
])

export default routes;