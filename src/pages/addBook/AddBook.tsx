import { Form, Input, Button } from "antd";
import { useCreateBookMutation } from "../../redux/services/booksService";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const AddBook = () => {
  const [createBook, { isLoading, isSuccess }] = useCreateBookMutation();
  const [form] = Form.useForm();

  const onFinish = async (values:Record<string, string|number>) => {
    await createBook(values);
  };

  useEffect(()=>{
    isSuccess && toast.success("Book created successfully")
  },[isSuccess])

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg bg-white my-10 rounded-md shadow-lg">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Add Book</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the book title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            rules={[
              { required: true, message: "Please enter the book author" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: "Please enter the book genre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Publication Year"
            name="publicationYear"
            rules={[
              { required: true, message: "Please enter the publication year" },
            ]}
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
              Add Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
