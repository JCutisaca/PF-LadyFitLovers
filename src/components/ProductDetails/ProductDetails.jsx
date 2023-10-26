import React, { useState, useEffect } from "react";
import { getColorName } from "../../utils/getColorName";
import {
  Select,
  message,
  Divider,
  Radio,
  InputNumber,
  Space,
  Card,
  Button,
  Row,
  Col,
} from "antd";
import {
  TagsOutlined,
  CheckOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "./productDetails.css";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import { Link } from "react-router-dom";
import DrawerCart from "../ShoppingCart/Drawer/DrawerCart";
import { useDispatch, useSelector } from "react-redux";
import addingProduct from "../../redux/Actions/ShoppingCart/addingProduct";
//import sub components
import ProductReviews from "./ProductReviews/ProductReviews";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsData from "./ReviewsData/ReviewsData";
//actions
import getOrdersByUser from "../../redux/Actions/Order/getOrdersByUser";
import addFavs from "../../redux/Actions/Favs/addFavorites";
import deleteFav from "../../redux/Actions/Favs/deleteFav";
//react router dom
import { useParams } from "react-router-dom";
import MenuBurger from "../MenuBurger/MenuBurger";

const ProductDetails = ({ productData }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.id);
  const menuBurger = useSelector((state) => state.menuBurger);
  useEffect(() => {
    // saveCartLocal()
  }, []);
  const [messageApi, contextHolder] = message.useMessage();

  //=============================inicializo el arreglo que tiene los objetos con props color y sizeAndQuantity
  let array = productData && productData?.stock;
  //==============================mapeo para obtener el arreglo de solo colores

  const colorsFunc = (array) => {
    if (!array.length) {
      array = ["N/A"];
      return array;
    } else {
      let colors = array.map((col) => col.color);
      return colors;
    }
  };
  const colors = colorsFunc(array);
  //=============================inicializo función que según los parametros que reciba retorna las tallas y cantidades correspondientes a esos colores y/o talla
  const selectsArrays = (color, size) => {
    if (array.length !== 0) {
      const sizeAndQuantity = array?.filter(
        (element) => element.color === color
      )[0].sizeAndQuantity;
      const sizes = sizeAndQuantity?.map((element) => element.size);
      const range = (start, stop, step) =>
        Array.from(
          { length: (stop - start) / step + 1 },
          (_, i) => start + i * step
        );
      if (!size) {
        return {
          sizes,
          quantities: range(1, sizeAndQuantity[0].quantity, 1),
          size: sizes[0],
        };
      } else {
        const quantities = range(
          1,
          sizeAndQuantity.filter((element) => element.size === size)[0]
            .quantity,
          1
        );
        return {
          sizes,
          quantities,
          size,
        };
      }
    } else {
      return {
        sizes: ["Sin stock"],
        quantities: [0],
        size: ["Sin stock"],
      };
    }
  };
  //=======================================estado local que se setea cada vez que el cliente selecciona algo, a su vez se combina con la función
  const [selects, setSelects] = useState({
    color: colors[0],
    sizes: selectsArrays(colors[0], null).sizes,
    quantities: selectsArrays(colors[0], null).quantities,
    size: selectsArrays(colors[0], null).size,
    quantity: selectsArrays(colors[0], null).quantities[0],
  });
  //======================================estado local que abre el DrawerCart
  const [openDrawer, setOpenDrawer] = useState(false);
  //======================================estado local que cierra el DrawerCart
  const onClose = (boolean) => {
    setOpenDrawer(boolean);
  };

  //====================================array de colores mapeado nuevamente para usarlo en el select de ant
  const colorOptions = colors.map((color) => {
    return { value: color, label: getColorName(color) };
  });

  //====================================array de talles mapeado nuevamente para usarlo en el select de ant
  const sizeOptions = selects.sizes.map((size) => {
    return { value: size, label: size };
  });

  //====================================array de cantidades mapeado nuevamente para usarlo en el select de ant
  const quantitiesOptions = selects.quantities.map((q) => {
    return { value: q, label: q };
  });
  //===================================objeto con la información de la selección del cliente
  const shopping = {
    id: productData.id,
    name: productData.name,
    price: productData.price,
    image: productData.image,
    color: selects.color,
    size: selects.size,
    quantity: selects.quantity,
  };
  const max = selects.quantities[selects.quantities.length - 1]; //cantidad máxima de stock del producto renderizado en detail

  const handle = () => {
    if (shopping.quantity) {
      let productExist = cart.find(
        (prod) =>
          prod.id === shopping.id &&
          prod.color === shopping.color &&
          prod.size === shopping.size
      );
      if (productExist && productExist.quantity + shopping.quantity > max) {
        messageApi.open({
          type: "warning",
          content: `Has excedido el límite del stock, puedes agregar ${
            max - productExist.quantity
          } producto(s) más`,
        });
      } else {
        dispatch(addingProduct(shopping));
        setOpenDrawer(true);
      }
    } else {
      messageApi.open({
        type: "warning",
        content: "Este producto esta sin stock",
      });
    }
  };

  //REVIEWS----------------------------------------------------------------
  const accessToken = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.user);
  const currentProductId = productData.id;
  const [userHasPurchased, setUserHasPurchased] = useState(false);
  const [userHasAlreadyReviewed, setHasAlreadyReviewed] = useState(false);
  //mapear las ordenes del usuario y verificar si dentro de esas ordenes hay al menos un product.id que coincida con el currentProductId

  useEffect(() => {
    if (user.email) {
      dispatch(getOrdersByUser({ userId, accessToken })).then(
        (ordersByUser) => {
          // console.log("entro al then");
          // console.log("ordersByUser:", ordersByUser.payload);
          const hasPurchased =
            Array.isArray(ordersByUser.payload) &&
            ordersByUser.payload.length > 0
              ? ordersByUser.payload.some((order) =>
                  order.products.some(
                    (product) => product.id === currentProductId
                  )
                )
              : false;
          // console.log(ordersByUser);
          // console.log(hasPurchased, "hasPurchased");
          setUserHasPurchased(hasPurchased);
        }
      );
      //verificar si el usuario YA hizo una review
      const hasAlreadyReviewed =
        productData.Reviews &&
        productData.Reviews.some((review) => review.User[0]?.id === userId);
      setHasAlreadyReviewed(hasAlreadyReviewed);
    }
  }, []);
  //FAVORITES-------------------------------

  const favorites = useSelector((state) => state.favorites);

  const hasSale =
    productData.priceOnSale !== 0 && productData.priceOnSale !== null;

  const addfavHandler = () => {
    dispatch(addFavs(productData.id, user.id, accessToken));
    setIsFav(true);
  };

  const deleteFavHandler = () => {
    dispatch(deleteFav(productData.id, user.id, accessToken));
    setIsFav(false);
  };
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === productData.id) {
        setIsFav(true);
      }
    });
  }, [favorites]);

  return (
    <div>
      {contextHolder}
      {openDrawer && <DrawerCart openDrawer={openDrawer} onClose={onClose} />}
      {menuBurger ? <MenuBurger></MenuBurger> : null}
      <div className="productDetailContainer">
        <div className="productDetailContainerTop">
          <div
            className="productDetailImageContainer"
            style={{ position: "relative" }}
          >
            <img
              className="productDetailImage"
              src={productData.image}
              alt={productData.name}
            />
          </div>
          <div className="productDetailInfoContainer">
            <div>
              <Row>
                <Col
                  span={20}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <h1 className="productDetailTitle">{productData.name}</h1>
                </Col>
                <Col
                  span={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {user.id &&
                    (isFav ? (
                      <Button
                        onClick={() => deleteFavHandler()}
                        shape="circle"
                        size="large"
                        style={{
                          backgroundColor: "#f6f1f5",
                          color: "gray",
                          borderRadius: "2rem 0 2rem 2rem",
                          border: "0.1px solid #d9d9d9",
                          marginRight: "10px",
                        }}
                      >
                        <HeartFilled style={{ color: "#ba338a" }} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => addfavHandler()}
                        shape="circle"
                        size="large"
                        style={{
                          backgroundColor: "#f6f1f5",
                          color: "gray",
                          borderRadius: "2rem 0 2rem 2rem",
                          border: "0.1px solid #d9d9d9",
                          marginRight: "10px",
                        }}
                      >
                        <HeartOutlined />
                      </Button>
                    ))}
                </Col>
              </Row>

              <ReviewsData productData={productData} />
              <p className="productDetailPrice">$ {productData.price}</p>
              <div className="links">
                <p>
                  <Link to="/preguntas-frecuentes">Ver los medios de pago</Link>
                </p>
                <p>
                  <Link to="/preguntas-frecuentes">Ver formas de entrega</Link>
                </p>
              </div>
            </div>
            <div className="productDetailDescription">
              {/* <p> Soy la descripción del producto</p> */}
              <p className="productDescriptionText">
                {productData.description}
              </p>
            </div>
            <div>
              <div className="productDetailInputs">
                <div
                  className="colorSelectorsContainer"
                  style={{ display: "flex" }}
                >
                  {colors
                    ? colors.map((color, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              margin: "5px",
                              width: "40px",
                              height: "40px",
                            }}
                          >
                            <Button
                              // bordered
                              style={{
                                background: color,
                                border: `6px solid ${
                                  selects.color === color ? "#BA338A" : "white"
                                }`,
                                borderRadius: "50%",
                                width: "100%",
                                height: "100%",
                                padding: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                const sizes = selectsArrays(
                                  color,
                                  selects.size
                                ).sizes;
                                const quantities = selectsArrays(
                                  color,
                                  selects.size
                                ).quantities;
                                setSelects({
                                  ...selects,
                                  color: color,
                                  sizes: sizes,
                                  quantities: quantities,
                                  quantity: quantities[0],
                                });
                              }}
                            >
                              {selects.color === color && (
                                <CheckOutlined style={{ color: "white" }} />
                              )}
                            </Button>
                          </div>
                        );
                      })
                    : ""}
                </div>
                {selects.sizes.length > 0 ? (
                  <Radio.Group
                    defaultValue={selects.size}
                    options={sizeOptions}
                    onChange={(e) =>
                      setSelects({
                        ...selects,
                        size: e.target.value,
                        quantities: selectsArrays(selects.color, e.target.value)
                          .quantities,
                      })
                    }
                  />
                ) : (
                  <Select
                    defaultValue={selects.size}
                    options={sizeOptions}
                    onChange={(size) =>
                      setSelects({
                        ...selects,
                        size,
                        quantities: selectsArrays(selects.color, size)
                          .quantities,
                      })
                    }
                    style={{ width: "100%" }}
                  />
                )}

                {selects.quantities.length > 0 ? (
                  <div className="inputQuantity">
                    <InputNumber
                      addonBefore={<TagsOutlined />}
                      min={1}
                      max={max}
                      value={selects.quantity}
                      onChange={(value) => {
                        if (value) {
                          setSelects({ ...selects, quantity: value });
                        }
                      }}
                      style={{ width: "35%" }}
                    />
                    <div className="availableStock">({max} disponibles)</div>
                  </div>
                ) : (
                  <Card>
                    Disculpe, de momento no contamos con stock para el talle y
                    color especificado.
                  </Card>
                )}

                {/* <ButtonPrimary
                title="Agregar al carrito"
                type="button"
                onClick={handle}
                className="addToCartButton"
              /> */}
                <Button
                  type="primary"
                  shape="round"
                  icon={<ShoppingOutlined />}
                  onClick={handle}
                  style={{ width: "200px" }}
                  size="large"
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="productDetailContainerBottom">
          <h2>Opiniones de clientes</h2>

          {userHasPurchased && !userHasAlreadyReviewed && (
            <ReviewForm
              productData={productData}
              userId={userId}
              accessToken={accessToken}
            />
          )}

          <ProductReviews productData={productData} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
