import {
  Form,
  Input,
  Space,
  Radio,
  Card,
  Button,
  Select,
  Divider,
  Row,
  Col,
  Image,
  Collapse,
  theme,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { provincias } from "../../CreateAcountModal/Provincias";
import { useDispatch, useSelector } from "react-redux";
import amount from "./shipping";
import shippingType from "../../../redux/Actions/Checkout/shippingType";
import shippingCost from "../../../redux/Actions/Checkout/shippingCost";
import checkout from "../../../redux/Actions/Checkout/checkout";
import updateUser from "../../../redux/Actions/User/updateUser";
import { getColorName } from "../../../utils/getColorName";
import userById from "../../../redux/Actions/User/getUserById";
import style from "./Checkout.module.css";
import MenuBurger from "../../MenuBurger/MenuBurger";

const Checkout = () => {
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState("Retiro en punto de entrega");
  const [editing, setEditing] = useState({
    address: false,
    phone: false,
  });
  const [disabled, setDisable] = useState({
    address: true,
    phone: true,
  });
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const costSelected = useSelector((state) => state.shippingCost);
  const accessToken = useSelector((state) => state.accessToken);
  const menuBurger = useSelector(state => state.menuBurger)
  const total = cart
    .map((prod) => prod.price * prod.quantity)
    .reduce((acc, cur) => acc + cur, 0);
  const [userUpdated, setUserUpdated] = useState({
    id: user.id,
    address: null,
    phone: null,
  });
  const [item, setItem] = useState({
    calle: user?.address?.calle,
    numero: user?.address?.numero,
    dpto: user?.address?.dpto,
    entreCalles: user?.address?.entreCalles,
    localidad: user?.address?.localidad,
    codigoPostal: user?.address?.codigoPostal,
    provincia: user?.address?.provincia,
    phone: null,
  });

  useEffect(() => {
    dispatch(shippingType(shipping));
    dispatch(shippingCost(amount(shipping)));
    if (user?.address?.calle && user.phone) {
      let {
        calle,
        numero,
        dpto,
        entreCalles,
        localidad,
        codigoPostal,
        provincia,
      } = user.address;
      setItem({
        ...item,
        calle,
        numero,
        dpto,
        entreCalles,
        localidad,
        codigoPostal,
        provincia,
        phone: user.phone,
      });
    }
  }, [shipping, user]);

  const handleRadio = (event) => {
    setShipping(event.target.value);
  };
  const handleChange = (value) => {
    setItem({
      ...item,
      provincia: value,
    });
  };

  const handleForm = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  };
  const handleEdit = (event) => {
    const edit = event.target.innerText;
    if (edit === "Editar dirección") {
      setEditing({
        ...editing,
        address: true,
      });
    } else {
      setEditing({
        ...editing,
        phone: true,
      });
    }
  };
  const handleUpdate = (event) => {
    const update = event.target.innerText;
    if (
      update === "Actualizar dirección" &&
      item.calle &&
      item.numero &&
      item.entreCalles &&
      item.codigoPostal &&
      item.localidad &&
      item.provincia
    ) {
      setUserUpdated({
        ...userUpdated,
        address: {
          calle: item.calle,
          numero: item.numero,
          dpto: item.dpto,
          entreCalles: item.entreCalles,
          codigoPostal: item.codigoPostal,
          localidad: item.localidad,
          provincia: item.provincia,
        },
      });
      setEditing({ address: false });
      dispatch(
        updateUser(
          { id: userUpdated.id, address: userUpdated.address },
          accessToken
        )
      );
      dispatch();
    }
    if (update === "Actualizar teléfono" && item.phone) {
      setUserUpdated({
        ...userUpdated,
        phone: item.phone,
      });
      dispatch(
        updateUser(
          { id: userUpdated.id, phone: userUpdated.phone },
          accessToken
        )
      );
    }
  };
  const handleCheckout = () => {
    dispatch(checkout(cart, costSelected));
  };
  const {
    calle,
    numero,
    dpto,
    entreCalles,
    localidad,
    provincia,
    codigoPostal,
  } = user.address || {};

  useEffect(() => {
    if (
      item.calle &&
      item.numero &&
      item.dpto &&
      item.entreCalles &&
      item.localidad &&
      item.provincia &&
      item.codigoPostal
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [item]);
  useEffect(() => {
    const updateUserAsync = async () => {
      try {
        const response = await dispatch(
          updateUser(
            { id: userUpdated.id, address: userUpdated.address },
            accessToken
          )
        );
        if (response.message === "Usuario editado correctamente") {
          setEditing({
            ...editing,
            address: false,
          });
          dispatch(userById(userUpdated.id, accessToken));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userUpdated.address) {
      updateUserAsync();
    }
  }, [userUpdated.address]);
  return (
    <>
      {menuBurger ? <MenuBurger></MenuBurger> : null}
      <div
        className={style.containerCheckout}
        direction="horizontal"
        size="middle"
        style={{
          alignItems: "flex-start",
          marginTop: "86px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className={style.containerLeft} direction="vertical">
          <h2 style={{ marginLeft: "20px" }}>Escoge el tipo de entrega</h2>
          <Radio.Group
            className={style.containerShipping}
            onChange={handleRadio}
            defaultValue={"Retiro en punto de entrega"}
          >
            <Radio.Button
              className={style.buttonShipping}
              value="Retiro en punto de entrega"
            >
              Retiro en punto de entrega
            </Radio.Button>
            <Radio.Button
              className={style.buttonShipping}
              value="Envío a domicilio"
            >
              Envío a domicilio
            </Radio.Button>
          </Radio.Group>
          {shipping === "Retiro en punto de entrega" && (
            <Card
              style={{
                width: "90%",
                height: 200,
                margin: 20,
              }}
            >
              <h3>RETIRO EN PUNTO DE ENTREGA</h3>
              <p>
                AV MITRE 1465 BERAZATEGUI - DE LUNES A SABADOS DE 7AM A 21HS -
                Punto de retiro de pedidos en Av Mitre 1465 (entre 14 y 15),
                Berazategui
              </p>
            </Card>
          )}
          {shipping === "Envío a domicilio" && calle && !editing.address && (
            <Card
              style={{
                width: "90%",
                height: 200,
                margin: 20,
              }}
            >
              <h3>Dirección de envío:</h3>
              <p>{`Calle ${calle} número ${numero} dpto ${dpto}, entre: ${entreCalles}, ${localidad} - CP: ${codigoPostal}, ${provincia}`}</p>
              <Button size="small" type="primary" onClick={handleEdit}>
                Editar dirección
              </Button>
            </Card>
          )}
          {shipping === "Envío a domicilio" && (!calle || editing.address) && (
            <Card
              style={{
                width: "90%",
                height: 320,
                margin: 20,
              }}
            >
              <h3>Dirección de envío:</h3>
              <Form onChange={handleForm} onClick={handleUpdate}>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    name="Calle"
                    style={{
                      display: "inline-block",
                      width: "calc(33% - 8px)",
                    }}
                  >
                    <Input
                      rules={[
                        { required: true, message: "Ingrese un Email" },
                        {
                          type: "email",
                          message: "El correo electrónico no es válido",
                        },
                      ]}
                      placeholder="Calle*"
                      name="calle"
                      defaultValue={item.calle}
                      value={item.calle}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Número"
                    style={{
                      display: "inline-block",
                      width: "calc(33% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input
                      placeholder="Número*"
                      name="numero"
                      defaultValue={item.numero}
                      value={item.numero}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Dpto"
                    style={{
                      display: "inline-block",
                      width: "calc(33% - 8px)",
                    }}
                  >
                    <Input
                      placeholder="Dpto*"
                      name="dpto"
                      defaultValue={item.dpto}
                      value={item.dpto}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    name="Entre calles"
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                    }}
                  >
                    <Input
                      placeholder="Entre calles*"
                      name="entreCalles"
                      defaultValue={item.entreCalles}
                      value={item.entreCalles}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Form.Item
                    name="Localidad"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input
                      placeholder="Localidad*"
                      name="localidad"
                      defaultValue={item.localidad}
                      value={item.localidad}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Código postal"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                      marginBottom: 10,
                    }}
                  >
                    <Input
                      placeholder="Código Postal*"
                      name="codigoPostal"
                      defaultValue={item.codigoPostal}
                      value={item.codigoPostal}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      marginBottom: 0,
                    }}
                    name="Provincia"
                  >
                    <Select
                      style={{
                        display: "inline-block",
                        width: "calc(100% - 8px)",
                        // margin: '0 8px',
                      }}
                      defaultValue={"Seleccione una provincia"}
                      value={item.provincia}
                      onChange={handleChange}
                      options={provincias}
                    />
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  name="actualizar"
                  label=" "
                  colon={false}
                  id="prueba"
                >
                  <Button
                    disabled={disabled}
                    size="small"
                    name="actualizar"
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: 10 }}
                    id="prueba"
                  >
                    Actualizar dirección
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
          {user.phone && !editing.phone && (
            <Card
              style={{
                width: "90%",
                height: 200,
                margin: 20,
              }}
            >
              <h3>Número telefónico: </h3>
              <p>{user.phone}</p>
              <Button
                size="small"
                style={{ marginTop: 10 }}
                name="editPhone"
                type="primary"
                onClick={handleEdit}
              >
                Editar teléfono
              </Button>
            </Card>
          )}
          {(editing.phone || !user.phone) && (
            <Card
              style={{
                width: "90%",
                height: 200,
                margin: 20,
              }}
            >
              <h3>Número telefónico: </h3>
              <Form onChange={handleForm} onClick={handleUpdate}>
                <Form.Item
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <Input
                    placeholder="Número telefónico"
                    name="phone"
                    defaultValue={item.phone}
                  />
                </Form.Item>
              </Form>

              <Button
                disabled={disabled.phone}
                size="small"
                name="editPhone"
                type="primary"
                style={{ marginTop: 10 }}
                onClick={handleEdit}
              >
                Actualizar teléfono
              </Button>
            </Card>
          )}
        </div>

        {/* // RESUMEN DE COMPRA-------------------------------------------------------------------> */}
        <div className={style.containerRight} direction="vertical">
          {/* card de la derecha */}

          <Card
            title="Resumen de compra"
            bordered={false}
            className={style.card}
            // style={{ width: '90%', marginRight: '20px', }}
          >
            <div>
              {/* collapse panel------------------ */}
              <Collapse
                ghost
                expandIcon={({ isActive }) => (
                  <PlusOutlined rotate={isActive ? 45 : 0} style={{fontSize:"1.3em", color: isActive ? '#ba338a' : 'black',}} />
                )}
              >
                <Collapse.Panel header="Lista de productos" key="1">
                  {cart.length > 0 &&
                    cart.map(
                      (
                        { name, color, image, size, quantity, price, id },
                        i
                      ) => {
                        return (
                          <div key={`${id}${name}${color}${size}`}>
                            <Card
                              // className={styles.productShow}
                              title={name}
                              bordered={false}
                              hoverable={true}
                              style={{
                                width: "100%",
                                marginBottom: "10px",
                                marginTop: "10px",
                                backgroundColor: "#f5f5f5",
                              }}
                              id={id}
                              name={size}
                            >
                              <Col
                                span={24}
                                style={{
                                  margin: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div>
                                  <Image
                                    alt={name}
                                    src={image && image}
                                    width={35}
                                  />
                                </div>
                              </Col>
                              <Divider
                                style={{
                                  borderColor: "#e0b3cd",
                                  margin: "10px",
                                  marginLeft: 0,
                                  marginRight: 0,
                                  width: "100%",
                                  minWidth: 0,
                                }}
                              />
                              <Col
                                span={24}
                                style={{
                                  margin: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div className={style.cardLeft}>Color</div>
                                <div className={style.cardRight}>
                                  {getColorName(color)}
                                </div>
                              </Col>
                              <Divider
                                style={{
                                  borderColor: "#e0b3cd",
                                  margin: "10px",
                                  marginLeft: 0,
                                  marginRight: 0,
                                  width: "100%",
                                  minWidth: 0,
                                }}
                              />
                              <Col
                                span={24}
                                style={{
                                  margin: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div className={style.cardLeft}>Cant.</div>
                                <div className={style.cardRight}>
                                  {quantity}
                                </div>
                              </Col>
                              <Divider
                                style={{
                                  borderColor: "#e0b3cd",
                                  margin: "10px",
                                  marginLeft: 0,
                                  marginRight: 0,
                                  width: "100%",
                                  minWidth: 0,
                                }}
                              />
                              <Col
                                span={24}
                                style={{
                                  margin: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div className={style.cardLeft}>
                                  Precio x unidad
                                </div>
                                <div className={style.cardRight}>$ {price}</div>
                              </Col>
                              <Divider
                                style={{
                                  borderColor: "#e0b3cd",
                                  margin: "10px",
                                  marginLeft: 0,
                                  marginRight: 0,
                                  width: "100%",
                                  minWidth: 0,
                                }}
                              />
                              <Col
                                span={24}
                                style={{
                                  margin: 3,
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div className={style.cardLeft}>Total</div>
                                <div className={style.cardRight}>
                                  ${price * quantity}
                                </div>
                              </Col>
                            </Card>
                          </div>
                        );
                      }
                    )}
                </Collapse.Panel>
              </Collapse>
              {/* ----------------- */}

              <Divider style={{ borderColor: "#e0b3cd" }} />
              <p>Subtotal ${total}</p>
              <p>Envío ${costSelected}</p>
              <Divider style={{ borderColor: "#e0b3cd" }} />
              <p>Total ${total + costSelected}</p>
            </div>

            <Button
              style={{ marginTop: "1rem" }}
              type="primary"
              disabled={
                shipping === "Retiro en punto de entrega"
                  ? false
                  : !calle ||
                    !numero ||
                    !dpto ||
                    !entreCalles ||
                    !localidad ||
                    !provincia ||
                    !codigoPostal
              }
              onClick={handleCheckout}
            >
              Ir a pagar
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Checkout;
