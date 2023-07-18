/* eslint-disable @typescript-eslint/no-explicit-any */
import BooksContainer from "../../components/BooksContainer";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl p-5 font-semibold">
        Top 10 Recently Added Books
      </h1>
      <BooksContainer queryStr="?limit=10"/>
    </div>
  );
}
