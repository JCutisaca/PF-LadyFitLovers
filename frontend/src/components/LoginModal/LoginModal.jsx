import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//action
import loginUser from "../../redux/Actions/User/loginUser";
import userById from "../../redux/Actions/User/getUserById";
//imports
import { Modal, Form, Input, Button, Checkbox, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import "./loginModal.css";
import ButtonTertiary from "../ButtonTertiary/ButtonTertiary";
import getCart from "../../redux/Actions/ShoppingCart/getCart";
import FacebookAuth from "../FacebookAuth/FacebookAuth";

//Enviar a una variable de entorno!!!!!!!!!!!!!!!!!!!!!!!!!!!
const clientId =
  "580974311123-nc3kg5o1m7v086iev09g1tm2thlp2pv3.apps.googleusercontent.com";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  // auth google
  useEffect(() => {
    if (user && user.id) {
      setLoading(false);
      return props.onClose();
    }
  }, [user])
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      setLoading(true);
      const response = await dispatch(loginUser(email.toLowerCase(), password));
      const user = await dispatch(
        userById(response.payload.idUser, response.payload.token)
      ); //idUser es lo que devuelve el loginser del back.

      if (user) {
        setLoading(false);
        return props.onClose();
      }
    } catch (error) {
      setLoading(false);
      message.error("Email o contraseña incorrectos");
    }
  };
  const handleGoogleLoginSuccess = () => {
    props.onClose();
  };
  const handleFacebookLoginSuccess = () => {
    props.onClose();
  };

  return (
    <Modal
      title="Ingresar"
      open={props.visible}
      onCancel={props.onClose}
      footer={null}
    >
      <br />
      <Form form={form} onFinish={handleLogin} className="login-form">
        <Divider orientation="left" style="">
          E-mail
        </Divider>
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
          O
          <ButtonTertiary
            title="Registrarme"
            type="button"
            onClick={() => {
              props.onClose();
              props.setCreateAcountModalVisible(true);
            }}
          />
        </Form.Item>
        <Link to="/recuperar-contrasena">
          <p style={{ color: "#BA338A", fontSize: "0.9rem" }}>
            ¿Has olvidado tu contraseña?
          </p>
        </Link>
        <Divider orientation="left" style="">
          Google
        </Divider>
        <Form.Item>
          <GoogleAuth onGoogleLoginSuccess={handleGoogleLoginSuccess} />
        </Form.Item>
        <Divider orientation="left" style="">
          Facebook
        </Divider>
        <Form.Item>
          <FacebookAuth onFacebookLoginSuccess={handleFacebookLoginSuccess} />
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default LoginModal;