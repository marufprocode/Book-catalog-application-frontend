import { useParams } from "react-router-dom"
import BookDetailsComponent from "./BookDetailsComponent"
import { useGetBookByIdQuery } from "../../redux/services/booksService"


const BookDetails = () => {
    const {id} = useParams()
    const {data:book, isLoading, isError} = useGetBookByIdQuery(id, {skip:!id})

    isError && <p>Something Went Wrong</p>
    isLoading && <p>Loading...</p>

  return (
    <BookDetailsComponent book={book?.data}/>
  )
}

export default BookDetails