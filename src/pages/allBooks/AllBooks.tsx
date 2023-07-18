/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetAllFiltersQuery,
} from "../../redux/services/booksService";
import { useCallback, useState } from "react";
import { Button, Checkbox, Dropdown } from "antd";
import { BsFilterLeft } from "react-icons/bs";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/slices/authSlice";
import BooksContainer from './../../components/BooksContainer';
import { CheckboxValueType } from "antd/es/checkbox/Group";

export default function AllBooks() {
  const [queryStr, setQueryStr] = useState("");
  const {user}= useAppSelector(selectAuth)
  const location = useLocation();

  const { data: genre } = useGetAllFiltersQuery("genre");
  const { data: years } = useGetAllFiltersQuery("publicationYear");
  const [visible, setVisible] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.search) {
      setQueryStr(location?.search);
    }
  }, [location?.search]);

  const handleVisibleChange = useCallback((flag: string) => {
    setVisible(flag);
  }, []);

  const onChangeGenre = (values:CheckboxValueType[]) => {
    const queryString = values
      ?.map((g) => `genre=${g}`)
      .join("&");
    setQueryStr(location.search? `${location.search+`&${queryString}`}`:`?${queryString}`);
  };
  const onChangeYear = (values:CheckboxValueType[]) => {
    const queryString = values
      ?.map((g) => `publicationYear=${g}`)
      .join("&");
    setQueryStr(queryStr? `${queryStr+`&${queryString}`}`:`?${queryString}`);
  };

  return (
    <div>
      <div className="w-full py-5 px-10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Books</h1>
        <div className="max-w-fit flex gap-2 items-center">
          <p className="font-semibold text-blue-600">Filters:</p>
          <Dropdown
            overlayStyle={{
              maxHeight: "350px",
              overflowY: "auto",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              scrollbarWidth: "none",
            }}
            trigger={["click"]}
            open={visible === "genre"}
            onOpenChange={() => handleVisibleChange(visible ? "" : "genre")}
            dropdownRender={() => (
              <div className="p-3 bg-white rounded-md">
                <Checkbox.Group
                  onChange={onChangeGenre}
                  className="flex flex-col "
                >
                  {genre?.data?.map((genre: string) => (
                    <Checkbox value={genre}>{genre}</Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            )}
          >
            <Button icon={<BsFilterLeft className="text-md" />}>Genre</Button>
          </Dropdown>
          <Dropdown
            overlayStyle={{
              maxHeight: "350px",
              overflowY: "auto",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              scrollbarWidth: "none",
            }}
            trigger={["click"]}
            open={visible === "year"}
            onOpenChange={() => handleVisibleChange(visible ? "" : "year")}
            dropdownRender={() => (
              <div className="p-3 bg-white rounded-md">
                <Checkbox.Group
                  onChange={onChangeYear}
                  className="flex flex-col "
                >
                  {years?.data?.map((year: string) => (
                    <Checkbox value={year}>{year}</Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            )}
          >
            <Button icon={<BsFilterLeft className="text-md" />}>
              {" "}
              Publication Year
            </Button>
          </Dropdown>
          {
            user &&
            <Button type="primary" onClick={()=>navigate('/add-book')}>Add New Book</Button>
          }
        </div>
      </div>
      <BooksContainer queryStr={queryStr}/>
    </div>
  );
}
