import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout, selectAuth } from "../redux/slices/authSlice";
import { Input } from "antd";

const { Search } = Input;

export default function Header() {
  const { accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onSearch = (value: string) => navigate(`all-books?search=${value}`)
  return (
    <header className="py-3 px-5 w-full dark:bg-slate-700 dark:text-gray-100 bg-[#928AEE] flex justify-between items-center">
      <h3 className="text-xl font-semibold w-fit whitespace-nowrap">
        BOOK CATALOG
      </h3>
      <div className="w-full px-10">
        <Search
          placeholder="serach books by title, author, or genre"
          className="w-full"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <ul className="hidden md:flex items-center space-x-6 w-fit whitespace-nowrap">
        <Link to="/" className="font-semibold cursor-pointer">
          <li>Home</li>
        </Link>
        <Link to="/all-books" className="font-semibold cursor-pointer">
          <li>All books</li>
        </Link>
        {accessToken && (
          <>
            <Link to="/wish-list" className="cursor-pointer">
              <li>Wish List</li>
            </Link>
            <Link to="/read-list" className="cursor-pointer">
              <li>Read List</li>
            </Link>
            <Link to="/" className="cursor-pointer" onClick={()=> dispatch(logout())}>
              <li>Logout</li>
            </Link>
          </>
        )}
        {!accessToken && (
          <>
            <Link to="/login" className="font-semibold cursor-pointer">
              <li>Login</li>
            </Link>
            <Link to="/signup" className="font-semibold cursor-pointer">
              <li>SignUp</li>
            </Link>
          </>
        )}
      </ul>
    </header>
  );
}

// <div className="flex items-center md:space-x-4">
//   <div className="relative">
//     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//       <button
//         type="submit"
//         title="Search"
//         className="p-1 focus:outline-none focus:ring"
//       >
//         <svg
//           fill="currentColor"
//           viewBox="0 0 512 512"
//           className="w-4 h-4 dark:text-gray-100"
//         >
//           <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
//         </svg>
//       </button>
//     </span>
//     <input
//       type="search"
//       name="Search"
//       placeholder="Search..."
//       className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
//     //   onChange={(e) => dispatch(setSearch(e.target.value))}
//     />
//   </div>
//   {!!accessToken || (
//     <button className="submit hidden md:flex mb-5">
//       <Link to="/auth/signin">Log in</Link>
//     </button>
//   )}
//   {!!accessToken && (
//     <button
//       className="submit hidden md:flex mb-5"
//     //   onClick={() => dispatch(logoutReducer())}
//     >
//       Log out
//     </button>
//   )}
// </div>
// <button title="Open menu" type="button" className="p-4 md:hidden">
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     className="w-6 h-6 dark:text-gray-100"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M4 6h16M4 12h16M4 18h16"
//     ></path>
//   </svg>
// </button>