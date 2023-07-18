import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useSignupMutation } from "../../redux/services/authService";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [signup, {isLoading, isSuccess}] = useSignupMutation()
  const navigate = useNavigate()
  const onFinish = async (values: Record<string, unknown>) => {
    console.log(values);
    await signup(values)
  };

  useEffect(()=>{
    if(isSuccess){
      toast.success('User Signed up successfully, please log in now.');
      navigate('/login')
    }
  },[isSuccess, navigate]) 

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl mb-6 text-center">Signup</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md"
              loading={isLoading}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
