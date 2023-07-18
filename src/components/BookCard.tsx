import React, { useEffect } from "react";
import { IBook } from "../interfaces/books";
import { FaBook, FaHeart } from "react-icons/fa";
import { Button, Tag } from "antd";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/slices/authSlice";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../redux/services/wishlistService";
import { toast } from "react-hot-toast";
import {
  useRemoveFromReadingListMutation,
  useUpdateReadingListMutation,
} from "../redux/services/readingListService";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { user } = useAppSelector(selectAuth);
  const [addWishList, { isSuccess: wishListAdded }] =
    useAddToWishlistMutation();
  const [addToReadingList, { isSuccess: readingListAdded }] =
    useUpdateReadingListMutation();
  const [updateReadingStatus, { isSuccess: readingStatusUpdated }] =
    useUpdateReadingListMutation();
  const [deleteFromWishList, { isSuccess: wishListRemoved }] =
    useRemoveFromWishlistMutation();
  const [deleteFromReadingList, { isSuccess: readingListRemoved }] =
    useRemoveFromReadingListMutation();
  const navigate = useNavigate();

  useEffect(() => {
    wishListAdded && toast.success("Wish list added successfully");
  }, [wishListAdded]);
  useEffect(() => {
    readingStatusUpdated && toast.success("Reading Status Updated Successfully");
  }, [readingStatusUpdated]);
  useEffect(() => {
    readingListAdded && toast.success("Reading list added successfully");
  }, [readingListAdded]);
  useEffect(() => {
    wishListRemoved && toast.success("Removed from wishlist successfully");
  }, [wishListRemoved]);
  useEffect(() => {
    readingListRemoved &&
      toast.success("Removed from readinglist successfully");
  }, [readingListRemoved]);

  return (
    <div className="p-3 rounded-md bg-slate-50 relative flex gap-3 max-h-fit w-full">
      <img
        src={
          book?.image ||
          "https://edit.org/images/cat/book-covers-big-2019101610.jpg"
        }
        alt={book?.title}
        className="w-32 object-cover rounded-md"
      />
      <div className="rounded-md w-fit relative leading-5 whitespace-nowrap">
        {user && (
          <div className="w-full relative h-[20px]">
            <div className="ml-auto absolute right-0 flex gap-2">
              <button
                onClick={async () => {
                  if (book?.wishList) {
                    await deleteFromWishList(book?.id as string);
                  } else {
                    await addWishList({ book: book?.id });
                  }
                }}
              >
                <FaHeart
                  className={`${
                    book?.wishList ? "text-red-500" : "text-gray-500"
                  }  cursor-pointer`}
                />
              </button>
              <button
                onClick={async () => {
                  if (book?.readingList?.id) {
                    await deleteFromReadingList(book?.id as string);
                  } else {
                    await addToReadingList({
                      id: book?.id,
                      status: "Read Soon",
                    });
                  }
                }}
              >
                <FaBook
                  className={`${
                    book?.readingList?.id ? "text-red-500" : "text-gray-500"
                  }  cursor-pointer`}
                />
              </button>
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2 whitespace-pre-wrap">
          {book?.title}
        </h3>
        <p className="text-gray-500 text-sm font-semibold">By {book?.author}</p>
        <p className="text-gray-500 text-sm font-semibold">{book?.genre}</p>
        <p className="text-gray-500 text-sm font-semibold">
          Publication Year: {book?.publicationYear}
        </p>
        {book?.readingList?.id && (
          <div>
            <p className="text-gray-500 text-sm font-semibold">Status:</p>
            <button onClick={async ()=> {
              if(book?.readingList?.status !== "Read Soon"){
                await updateReadingStatus({
                  id: book?.id,
                  status: "Read Soon",
                })
              }
            }}>
              <Tag color={`${book?.readingList?.status === "Read Soon" ? "#f50":"gold"}`}>Read Soon</Tag>
            </button>
            <button onClick={async ()=>{
              if(book?.readingList?.status !== "Currently Reading"){
                await updateReadingStatus({
                  id: book?.id,
                  status: "Currently Reading",
                })
              }
            }}>
            <Tag color={`${book?.readingList?.status === "Currently Reading" ? "#2db7f5":"cyan"}`}>Reading</Tag>
            </button>
            <button onClick={async ()=>{
              if(book?.readingList?.status !== "Reading Completed"){
                await updateReadingStatus({
                  id: book?.id,
                  status: "Reading Completed",
                })
              }
            }}>
            <Tag color={`${book?.readingList?.status === "Reading Completed" ? "#87d068":"green"}`}>Completed</Tag>
            </button>
          </div>
        )}
        <Button
          className="bg-slate-500 mt-4"
          size="small"
          onClick={() => navigate(`/book/${book?.id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
