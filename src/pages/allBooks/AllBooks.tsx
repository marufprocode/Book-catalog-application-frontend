/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetAllBooksQuery,
  useGetAllFiltersQuery,
} from "../../redux/services/booksService";
import BookCard from "../../components/BookCard";
import { Button, Checkbox, Dropdown } from "antd";
import { useCallback, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/slices/authSlice";
import { useGetWishlistQuery } from "../../redux/services/wishlistService";
import { useGetReadingListQuery } from "../../redux/services/readingListService";

export default function AllBooks() {
  const location = useLocation();
  const {user}= useAppSelector(selectAuth)
  const [queryStr, setQueryStr] = useState("");
  const { data: books, isLoading } = useGetAllBooksQuery(queryStr);
  const {data:wishlist} = useGetWishlistQuery(null, {skip:!user});
  const {data:readingList} = useGetReadingListQuery(null, {skip:!user});
  const { data: genre } = useGetAllFiltersQuery("genre");
  const { data: years } = useGetAllFiltersQuery("publicationYear");
  const [visible, setVisible] = useState("");
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();

  console.log({booksData, wishlist})

  useEffect(() => {
    if (books?.data) {
      const updatedBooksData = books?.data.map((book:any) => {
        const updatedBook = { ...book };
  
        if (wishlist?.data?.length > 0) {
          updatedBook.wishList = wishlist?.data?.some(
            (wishlistItem:any) => wishlistItem.book.id === book.id
          );
        }
  
        if (readingList?.data?.length > 0) {
          updatedBook.readingList = readingList?.data?.some(
            (readingItem:any) => readingItem.book.id === book.id
          );
        }
  
        return updatedBook;
      });
  
      setBooksData(updatedBooksData);
    }
  }, [books?.data, readingList?.data, wishlist?.data]);
  

  const handleVisibleChange = useCallback((flag: string) => {
    setVisible(flag);
  }, []);

  const onChangeGenre = (values:string[]) => {
    const queryString = values
      ?.map((g) => `genre=${g}`)
      .join("&");
    setQueryStr(location.search? `${location.search+`&${queryString}`}`:`?${queryString}`);
  };
  const onChangeYear = (values:number[]) => {
    const queryString = values
      ?.map((g) => `publicationYear=${g}`)
      .join("&");
    setQueryStr(queryStr? `${queryStr+`&${queryString}`}`:`?${queryString}`);
  };

  useEffect(() => {
    if (location?.search) {
      setQueryStr(location?.search);
    }
  }, [location?.search]);

  if (!isLoading && !(books?.data?.length > 0))
    return <h2 className="text-xl font-semibold p-3">No Books Found</h2>;

  return (
    <div>
      <div className="w-full py-5 px-10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Books</h1>
        <div className="max-w-fit flex gap-2 items-center">
          <p className="font-semibold text-blue-600">Filters:</p>
          <Dropdown
            overlayStyle={{
              maxHeight: "350px",
              overflowY: "auto",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              scrollbarWidth: "none",
            }}
            trigger={["click"]}
            open={visible === "genre"}
            onOpenChange={() => handleVisibleChange(visible ? "" : "genre")}
            dropdownRender={() => (
              <div className="p-3 bg-white rounded-md">
                <Checkbox.Group
                  onChange={onChangeGenre}
                  className="flex flex-col "
                >
                  {genre?.data?.map((genre: string) => (
                    <Checkbox value={genre}>{genre}</Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            )}
          >
            <Button icon={<BsFilterLeft className="text-md" />}>Genre</Button>
          </Dropdown>
          <Dropdown
            overlayStyle={{
              maxHeight: "350px",
              overflowY: "auto",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              scrollbarWidth: "none",
            }}
            trigger={["click"]}
            open={visible === "year"}
            onOpenChange={() => handleVisibleChange(visible ? "" : "year")}
            dropdownRender={() => (
              <div className="p-3 bg-white rounded-md">
                <Checkbox.Group
                  onChange={onChangeYear}
                  className="flex flex-col "
                >
                  {years?.data?.map((year: string) => (
                    <Checkbox value={year}>{year}</Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            )}
          >
            <Button icon={<BsFilterLeft className="text-md" />}>
              {" "}
              Publication Year
            </Button>
          </Dropdown>
          {
            user &&
            <Button type="primary" onClick={()=>navigate('/add-book')}>Add New Book</Button>
          }
        </div>
      </div>
      {isLoading && <p>Books Loading...</p>}
      {booksData?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10 place-items-center">
          {booksData?.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
