export interface IBook {
  id?: string;
  readingList?: boolean;
  wishList?: boolean;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  image?: string;
  reviews?: {
    user: string;
    name: string;
    review: string;
  }[];
  createdBy?:string;
}
