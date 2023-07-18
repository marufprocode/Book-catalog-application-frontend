import BooksContainer from "../../components/BooksContainer";

const WishList = () => {
  return (
    <div>
      <h1 className="text-2xl p-5 font-semibold">
        All WishList Books
      </h1>
      <BooksContainer filter="wishList"/>
    </div>
  );
};

export default WishList;
