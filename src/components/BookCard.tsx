import React from "react";
import { IBook } from "../interfaces/books";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import { Button } from "antd";

interface BookCardProps {
  book: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-4 w-64 relative">
      <img
        src={book?.image || "https://edit.org/images/cat/book-covers-big-2019101610.jpg"}
        alt={book?.title}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      {/* <div className="w-full relative h-[20px]">
        <div className="ml-auto absolute right-0 flex gap-2">
        <FaEdit className="text-gray-500 cursor-pointer" />
        <FaTrash className="text-gray-500 cursor-pointer" />
        <FaHeart className="text-red-500 cursor-pointer" />
        </div>
      </div> */}
      <h3 className="text-lg font-semibold mb-2">{book?.title}</h3>
      <p className="text-gray-500 mb-2">By {book?.author}</p>
      <p className="text-gray-500 mb-2">{book?.genre}</p>
      <p className="text-gray-500">Publication Year: {book?.publicationYear}</p>
      <Button className="bg-slate-500">Details</Button>
    </div>
  );
};

export default BookCard;
