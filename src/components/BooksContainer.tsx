/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllBooksQuery,
} from "../redux/services/booksService";
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useGetWishlistQuery } from "../redux/services/wishlistService";
import { useGetReadingListQuery } from "../redux/services/readingListService";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/slices/authSlice";

interface BooksContainerProps {
  limit?: number;
  filter?: string;
  queryStr?: string;
}

const BooksContainer = ({queryStr, filter}:BooksContainerProps) => {
  const {user}= useAppSelector(selectAuth);
  const { data: books, isLoading } = useGetAllBooksQuery(queryStr);
  const {data:wishlist} = useGetWishlistQuery(null, {skip:!user});
  const {data:readingList} = useGetReadingListQuery(null, {skip:!user});
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    if (books?.data) {
      let updatedBooksData = books?.data.map((book:any) => {
        const updatedBook = { ...book };
  
        if (wishlist?.data?.length > 0) {
          updatedBook.wishList = wishlist?.data?.some(
            (wishlistItem:any) => wishlistItem?.book?.id === book?.id
          );
        }
  
        if (readingList?.data?.length > 0) {
          updatedBook.readingList = readingList?.data?.some(
            (readingItem:any) => readingItem?.book?.id === book?.id
          );
        }
  
        return updatedBook;
      });
      if(filter){
        updatedBooksData = updatedBooksData.filter((book:any) => book[filter]=== true)
      }
      setBooksData(updatedBooksData);
    }
  }, [books?.data, filter, readingList?.data, wishlist?.data]);

  if (!isLoading && !(books?.data?.length > 0))
    return <h2 className="text-xl font-semibold p-3">No Books Found</h2>;

  return (
    <div>
      {isLoading && <p>Books Loading...</p>}
      {booksData?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10 place-items-center">
          {booksData?.map((book: any) => (
            <BookCard key={book?.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BooksContainer