import BooksContainer from "../../components/BooksContainer"


const ReadingList = () => {
  return (
    <div>
      <h1 className="text-2xl p-5 font-semibold">
        All Reading List Books
      </h1>
      <BooksContainer filter="readingList"/>
    </div>
  )
}

export default ReadingList