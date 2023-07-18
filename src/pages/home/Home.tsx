/* eslint-disable @typescript-eslint/no-explicit-any */
import BookCard from "../../components/BookCard";
import { useGetAllBooksQuery } from "../../redux/services/booksService";

export default function Home() {
  const { data: books, isLoading } = useGetAllBooksQuery(null);

  if (isLoading) return <p>Books Loading...</p>;

  if (!isLoading && !(books?.data?.length > 0))
    return <h2 className="text-xl font-semibold p-3">No Books Found</h2>;

  return (
    <div>
      <h1 className="text-2xl p-5 font-semibold">
        Top 10 Recently Added Books
      </h1>
      {books?.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10 place-items-center">
          {books?.data?.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
