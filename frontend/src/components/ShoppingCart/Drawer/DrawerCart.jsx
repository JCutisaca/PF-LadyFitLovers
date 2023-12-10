import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Space,
  Card,
  Row,
  Col,
  Image,
  message,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import decrementQuantity from "../../../redux/Actions/ShoppingCart/decrementQuantity";
import incrementQuantity from "../../../redux/Actions/ShoppingCart/incrementQuantity";
import { getColorName } from "../../../utils/getColorName";
import removingProduct from "../../../redux/Actions/ShoppingCart/removingProduct";
import checkout from "../../../redux/Actions/Checkout/checkout";
import LoginModal from "../../LoginModal/LoginModal";
import EmptyCart from "../EmptyCart/EmptyCart";
import { useNavigate } from "react-router";
import Checkout from "../Checkout/Checkout";
import style from './DrawerCart.module.css'

const DrawerCart = ({ openDrawer, onClose }) => {
  const allProductsAdmin = useSelector((state) => state.allProductsAdmin);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [createAcountModalVisible, setCreateAcountModalVisible] =
    useState(false);
  const [open, setOpen] = useState(openDrawer);
  const [openCheckout, setOpenCheckout] = useState(false);
  const onCloseCheckout = (boolean) => {
    setOpenCheckout(boolean);
    console.log(openCheckout);
  };
  const showDefaultDrawer = () => {
    setOpen(openDrawer);
  };
  // const style = {
  //   padding: "8px 0",
  //   width: 20,
  //   height: 20,
  // };

  const prices = cart.map((prod) => prod.price);

  const total = cart
    .map((prod) => prod.price * prod.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  const handleCard = (e) => {
    if (e.target.outerText === "x") {
      if (e.target.localName === "span") {
        let index = e.target.offsetParent.id;
        dispatch(removingProduct(index));
        return;
      } else {
        let indexCart = e.target.id;
        dispatch(removingProduct(indexCart));
        return;
      }
    }
    if (e.target.outerText !== "Comprar") {
      if (e.target.localName === "span") {
        const id =
          e.nativeEvent.srcElement.parentElement.offsetParent.offsetParent.id;
        let colorSelected = cart[e.target.offsetParent.id]?.color;
        let sizeSelected = e.target.offsetParent.name;
        let indexCart = e.target.offsetParent.id;
        const top = allProductsAdmin
          .find((p) => p.id === Number(id))
          ?.stock.find((col) => col.color === colorSelected)
          .sizeAndQuantity.find((siz) => siz.size === sizeSelected).quantity;
        if (e.target.innerText === "-") {
          dispatch(decrementQuantity(indexCart));
        }
        if (e.target.innerText === "+") {
          dispatch(incrementQuantity(indexCart, top));
        }
      }
      if (e.target.localName === "button") {
        const id =
          e.nativeEvent.srcElement.parentElement.offsetParent.offsetParent.id;
        let colorSelected = cart[e.target.id]?.color;
        let sizeSelected = e.target.name;
        let indexCart = e.target.id;

        const top = allProductsAdmin
          .find((p) => p.id === Number(id))
          ?.stock.find((col) => col.color === colorSelected)
          .sizeAndQuantity.find((siz) => siz.size === sizeSelected).quantity;

        if (e.target.innerText === "-") {
          dispatch(decrementQuantity(indexCart));
        }
        if (e.target.innerText === "+") {
          dispatch(incrementQuantity(indexCart, top));
        }
      }
    }
  };

  const handleBuy = async () => {
    if (user.email && total > 0) {
      dispatch(checkout(cart));
    } else {
      setLoginModalVisible(true);
    }
  };
  const handle = () => {
    onClose(false);
    navigate("/products");
  };
  const handleCheckout = () => {
    if (!user.email) {
      setLoginModalVisible(true);
    } else {
      navigate("/checkout");
      onClose(false);
    }
  };
 
  return (
    <div style={{ width: '30rem' }} className={style.cartContainer}>
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        setCreateAcountModalVisible={setCreateAcountModalVisible}
      />
      {contextHolder}
      <Drawer
        title="Carrito de compras"
        placement="right"
        size="large"
        onClose={() => onClose(false)}
        open={open}
        onClick={(e) => handleCard(e)}
      >
        {total === 0 && (
          <Card
            bordered={false}
            style={{
              backgroundColor: "#FFFFFF",
              // width: '40rem',
              margin: '15px',
              textAlign: 'center'
            }}
          >
            <EmptyCart />
          </Card>
        )}
        {cart.length > 0 &&
          cart.map(({ name, color, image, size, quantity, price, id }, i) => {
            return (
              <div key={`${name}${color}${size}`}>
                <Card
                  bordered={false}
                  hoverable={true}
                  style={{
                    width: '100%',
                    margin: '15px',
                    textAlign: 'center',
                    position: 'relative',
                    left: '-1rem'
                  }}
                  id={id}
                  name={size}
                >
                  <Row gutter={16}>
                    <Col span={24} md={12} lg={8}>
                      <div>
                        Nombre<br></br> {name}{" "}
                      </div>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <div>
                        <Image alt={name} src={image && image} width={35} />
                      </div>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <div>
                        Color<br></br>
                        {getColorName(color)}
                      </div>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <div>
                        Cant.<br></br>
                        <Button
                          style={{ backgroundColor: "#e0b3cd", color: "black" }}
                          size="small"
                          className={i}
                          id={i}
                          type="secondary"
                          name={size}
                          shape="circle"
                        >
                          {"-"}
                        </Button>{" "}
                        {quantity}{" "}
                        <Button
                          style={{ backgroundColor: "#e0b3cd", color: "black" }}
                          size="small"
                          className={i}
                          id={i}
                          type="secondary"
                          name={size}
                          shape="circle"
                        >
                          {"+"}
                        </Button>
                      </div>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <div>
                        Precio x unidad<br></br>
                        {price}
                      </div>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <div>
                        Total<br></br>
                        {price * quantity}
                      </div>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <Button
                        id={i}
                        shape="circle"
                        size="small"
                        className={style.buttonRemove}
                      >
                        x
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </div>
            );
          })}
        <Divider style={{ borderColor: "#e0b3cd" }} />
        {total > 0 && (
          <div>
            Costo total<br></br>$ {total}
          </div>
        )}
        <Divider style={{ borderColor: "#e0b3cd" }} />
        <Space>
          {total === 0 && <Button onClick={handle}>Buscar productos</Button>}
          {total > 0 && (
            <Button onClick={() => onClose(false)}>Seguir comprando</Button>
          )}

          <Button
            type="primary"
            disabled={total === 0}
            onClick={handleCheckout}
          >
            Comprar
          </Button>
        </Space>
      </Drawer>
      {openCheckout && (
        <Checkout
          openCheckout={openCheckout}
          onCloseCheckout={onCloseCheckout}
        />
      )}
    </div>
  );
};
export default DrawerCart;
