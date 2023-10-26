import { useSelector } from "react-redux";
import { Table, Tag, Button, Collapse, Card, Grid } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ShoppingClient from "../ShoppingClient/ShoppingClient";
import getOrdersByUser from "../../redux/Actions/Order/getOrdersByUser";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import style from "./TableShoppingClient.module.css";

const TableShoppingClient = () => {
  const isMobile = useMediaQuery({ maxWidth: 914 });
  const minIsMobile = useMediaQuery({ maxWidth: 700 });
  const ordersUser = useSelector((state) => state.ordersUser);
  const accessToken = useSelector((state) => state.accessToken);
  const userId = useSelector((state) => state.user.id);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersByUser({ userId, accessToken }));
  }, [dispatch]);
  const tableOrders = ordersUser?.map((order) => {
    return {
      ...order,
      key: order.id,
    };
  });

  const paymentIdFilters = ordersUser?.map((order) => {
    return {
      text: order.mercadopagoTransactionId,
      value: order.mercadopagoTransactionId,
    };
  });

  const colorStatus = (status) => {
    switch (status) {
      case "En proceso":
        return "blue";
      case "Cancelada":
        return "red";
      case "Entregada":
        return "green";
      default:
        return "blue";
    }
  };
  const columns = [
    {
      title: "Dirección",
      dataIndex: "",
      key: 2,
      render: (ordersUser) => {
        if (ordersUser && ordersUser.User && ordersUser.User.address) {
          const { User } = ordersUser;
          const { address } = User;

          // Verificar si la dirección es válida y crear una cadena
          const addressString = `${address?.calle} ${address?.numero} ${address?.dpto} ${address?.entreCalles} ${address?.localidad} ${address?.provincia} ${address?.codigoPostal}`;

          return <p>{addressString}</p>;
        } else {
          return <p>No especificada</p>;
        }
      }
    },

    {
      title: "Total",
      dataIndex: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      key: 4,
      render: (text) => <p>${text}</p>,
    },
    {
      title: "Fecha",
      dataIndex: "orderDate",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      key: 5,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      filters: [
        { text: "En proceso", value: "En proceso" },
        { text: "Cancelada", value: "Cancelada" },
        { text: "Entregada", value: "Entregada" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      key: 7,
      render: (text, record) => {
        return <Tag color={colorStatus(record.status)}>{text}</Tag>;
      },
    },
  ];
  if (!isMobile) {
    columns.splice(1, 0, {

      title: "Teléfono",
      dataIndex: "",
      key: 3,
      render: (cell) => <p>{cell?.User?.phone || "No especificado"}</p>,

    })
  }

  return (
    // <div className={style.container}>

    minIsMobile ? ordersUser.map((order, index) => (
      <Card
        key={index}
        title={`Información del Pedido ${index + 1}`}
        bordered={false}
        hoverable={true}
        style={{
          width: "80%",
          marginBottom: "10px",
          marginTop: "10px",
          backgroundColor: "#f5f5f5",
        }}
        id={order.id}
      >
        <p>Dirección: {order?.shippingType === "Retiro en punto de entrega" ? "Retiro en tienda Fisica" : `${order?.User?.address?.calle} ${order?.User?.address?.numero} ${order?.User?.address?.dpto} ${order?.User?.address?.entreCalles} ${order?.User?.address?.localidad} ${order?.User?.address?.provincia} ${order?.User?.address?.codigoPostal}` || "No especificada"}</p>
        <p>Total: ${order.totalAmount}</p>
        <p>Fecha: {order.orderDate}</p>
        <p>Estado: {order.status}</p>

        <Collapse
        ghost
          style={{width: "100%"}}
          expandIcon={({ isActive }) => (
            <PlusOutlined
              rotate={isActive ? 45 : 0}
              style={{ fontSize: "1.3em", color: isActive ? '#ba338a' : 'black' }}
            />
          )}
        >
          <Collapse.Panel   header="Lista de productos" key="1">
            <div >
              {order.products.map((product, i) => (
                <Card
                  key={i}
                  title={
                    <span className={style.title}>
                      {product.name}
                    </span>
                  }
                  bordered={false}
                  hoverable={true}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "10px",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  id={product.id}
                >
                  <div className={style.subCard}>
                    <img src={product.image} alt="" />
                    <div>
                      <p>Cantidad: {product.quantity}</p>
                      <p>
                        Color:{" "}
                        <div
                          style={{
                            backgroundColor: product.color,
                            height: 25,
                            width: 25,
                            borderRadius: 50,
                            textAlign: "center",
                            margin: "auto",
                          }}
                        ></div>
                      </p>
                      <p>Talla: {product.size}</p>
                      <p>Precio: ${product.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Collapse.Panel>
        </Collapse>

      </Card>

    )
    ) : (<Table
      dataSource={tableOrders}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <ShoppingClient products={record.products} />
        ),
      }}
      style={{
        width: "90%",
        position: "relative",
        height: "100%",
        display: minIsMobile ? "none" : "block",
      }}
    />)


    // </div>
  );
};

export default TableShoppingClient;
