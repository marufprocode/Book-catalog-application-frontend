import { Form, Input, Button } from "antd";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../../redux/services/booksService";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const {id}= useParams();
  const [updateBook, { isLoading, isSuccess }] = useUpdateBookMutation();
  const [form] = Form.useForm();
  const {data:book, isLoading:bookGetLoading}= useGetBookByIdQuery(id, {skip:!id})
  const navigate = useNavigate();

  const onFinish = async (values:Record<string, string|number>) => {
    await updateBook({...values, id});
  };

  useEffect(()=>{
    if(isSuccess)  {
      toast.success("Book Updated successfully")
      navigate('/')
    }
  },[isSuccess, navigate])

  if (bookGetLoading) return <p>Loading...</p>

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg bg-white my-10 rounded-md shadow-lg">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Add Book</h1>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={book?.data}>
          <Form.Item
            label="Title"
            name="title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Publication Year"
            name="publicationYear"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Image Url"
            name="image"
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditBook;
