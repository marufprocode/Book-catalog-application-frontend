import BookCard from "../../components/BookCard";
import { useGetAllBooksQuery } from "../../redux/services/booksService";

export default function Home() {
  const { data: books } = useGetAllBooksQuery(null);

  return (
    <div>
      <h1 className="text-2xl p-5 font-semibold">
        Top 10 Recently Added Books
      </h1>
      {books?.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {books?.data?.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
