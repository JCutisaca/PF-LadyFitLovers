import React, { useState } from "react";
import { useDispatch } from "react-redux";

//action
import loginUser from "../../redux/Actions/User/loginUser";
import userById from "../../redux/Actions/User/getUserBYId";
//imports
import { Modal, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./LoginModal.css";
const LoginModal = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // const handleLogin = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     const { email, password } = values;

  //     setLoading(true);

  //     dispatch(loginUser(email, password))
  //       .then(() => {
  //         dispatch(userById()).then(() => {
  //           setLoading(false);
  //           props.onClose();
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Login failed:", error);
  //         setLoading(false);
  //       });
  //   } catch (error) {
  //     console.error("Validation failed:", error);
  //   }
  // };

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      console.log(email, password);
      // Dispatch loginUser action
      dispatch(loginUser(email, password)).then((response) => {
        // Check if the login was successful and idUser is available
        if (response && response.id) {
          // Dispatch getUserById action with the obtained idUser
          dispatch(userById(response.id));
          // Close the modal if needed
          props.onClose();
        } else {
          console.error("Login failed or id is missing.");
        }
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  return (
    <Modal
      title="Ingresar"
      visible={props.visible}
      onCancel={props.onClose}
      footer={null}
    >
      <br />
      <Form form={form} onFinish={handleLogin} className="login-form">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Ingrese un Email" },
            {
              type: "email",
              message: "El correo electrónico no es válido",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Ingrese una contraseña" },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recordarme</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Ingresar
          </Button>
          O <a href="/register">Registrarme</a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;