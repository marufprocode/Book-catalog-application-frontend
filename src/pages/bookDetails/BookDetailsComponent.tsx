import { Button, Divider, Form, Input, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IBook } from "../../interfaces/books";
import {
  useDeleteBookMutation,
  usePostReviewMutation,
} from "../../redux/services/booksService";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface BookDetailsProps {
  book: IBook;
}

const BookDetailsComponent: React.FC<BookDetailsProps> = ({ book }) => {
  const { user } = useAppSelector(selectAuth);
  const [deleteBook] = useDeleteBookMutation();
  const [addReview, { isSuccess: reviewAdded, isLoading }] =
    usePostReviewMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (reviewAdded) {
      form.resetFields();
    }
  }, [reviewAdded, form]);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete the book "${book?.title}"?`,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        deleteBook(book?.id);
        navigate('/')
      },
    });
  };

  const onFinish = async (values: { review: string }) => {
    await addReview({
      bookId: book?.id,
      reviewData: {
        name: user?.name,
        review: values?.review,
      },
    });
  };

  if (!book) return <h2 className="text-lg font-bold">No Book Found</h2>

  return (
    <div className="p-5">
      <div className="flex p-3 gap-2">
        <img
          src={
            book?.image ||
            "https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          }
          alt="bookImg"
          className="w-48"
        />
        <div className="flex flex-col">
          <Typography.Title level={2}>{book?.title}</Typography.Title>
          <span>
            <Typography.Text strong>Author:</Typography.Text>{" "}
            <Typography.Text>{book?.author}</Typography.Text>
          </span>
          <span>
            {" "}
            <Typography.Text strong>Genre:</Typography.Text>{" "}
            <Typography.Text>{book?.genre}</Typography.Text>
          </span>
          <span>
            <Typography.Text strong>Publication Date:</Typography.Text>{" "}
            <Typography.Text>{book?.publicationYear}</Typography.Text>
          </span>
        </div>
      </div>

      <Divider />

      <Typography.Title level={3}>Reviews</Typography.Title>
      {book?.reviews?.map((review) => (
        <div key={review.user}>
          <Typography.Text strong>{review?.name}</Typography.Text>{" "}
          <Typography.Text>{review?.review}</Typography.Text>
        </div>
      ))}

      {user && (
        <div className="mt-4">
          <Typography.Title level={4}>Submit a Review</Typography.Title>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="review"
              rules={[{ required: true, message: "Please enter your review" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      <Divider />

      {user?.id === book?.createdBy && (
        <div className="flex justify-end gap-4">
          <Button
            type="primary"
            icon={<FaEdit />}
            onClick={() => navigate(`/edit-book/${book?.id}`)}
          >
            Edit Book
          </Button>
          <Button
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={handleDelete}
          >
            Delete Book
          </Button>
        </div>
      )}

      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete the book "{book?.title}"?</p>
      </Modal>
    </div>
  );
};

export default BookDetailsComponent;
