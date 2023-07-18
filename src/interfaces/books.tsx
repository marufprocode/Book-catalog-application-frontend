export interface IBook {
  id?:string;
  wishList?: boolean;
  readingList?:boolean;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  image?: string;
}
