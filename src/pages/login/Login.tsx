/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useLoginMutation } from "../../redux/services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const [login, { data, isLoading, error }] = useLoginMutation();
  const [errorData, setErrorData] = useState<any>(null);
  const navigate = useNavigate();
  const onFinish = async (values: LoginValues): Promise<void> => {
    await login(values);
  };
  useEffect(() => {
    if (data?.success) {
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(()=>{
    if(error && 'data' in error) {
      const errorData = 'data' in error && error.data
      setErrorData(errorData)
    }
  },[error])

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
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
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password className="rounded-md" />
          </Form.Item>
            {
              errorData &&
              <p className="text-red-500 ml-32 -mt-3 mb-2">{errorData?.message}</p>
            }
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md bg-stone-600 hover:bg-stone-700"
              loading={isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
