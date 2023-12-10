import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { Button,Table, Tag, Card, Collapse } from "antd";
import {
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import OrderExpandedRow from "./OrderExpandedRow";
import UpdateOrderModal from "./UpdateOrderModal";
import { useMediaQuery } from "react-responsive";
import "./OrderTable.css";

const OrdersTable = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const allOrders = useSelector((state) => state.allOrders);
  console.log(allOrders);
  const tableOrders = allOrders.map((order) => {
    return {
      ...order,
      key: order.id,
    };
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [order, setOrder] = useState({});

  const paymentIdFilters = allOrders?.map((order) => {
    return {
      text: order.mercadopagoTransactionId,
      value: order.mercadopagoTransactionId,
    };
  });

  const emailFilters = allOrders?.map((order) => {
    return { text: order?.User?.email, value: order?.User?.email };
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
      title: "id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      key: 1,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Comprador",
      dataIndex: "",
      key: 2,
      render: (cell) => <p>{cell?.User?.name}</p>,
    },
    {
      title: "Dirección de envío",
      dataIndex: "",
      key: 8,
      render: (cell) => <p>{cell?.User?.address? `${cell?.User?.address.calle} ${cell?.User?.address.numero} ${cell?.User?.address.dpto} ${cell?.User?.address.entreCalles} ${cell?.User?.address.localidad} ${cell?.User?.address.provincia} ${cell?.User?.address.codigoPostal}` : "No especificada"}</p>,
    },
    {
      title: "Teléfono",
      dataIndex: "",
      key: 9,
      render: (cell) => <p>{cell?.User?.phone || "No especificado"}</p>,
    },
    {
      title: "Email",
      dataIndex: "",
      key: 3,
      filters: emailFilters,
      filterSearch: true,
      onFilter: (value, record) => record.User.email.indexOf(value) === 0,
      render: (cell) => <p>{cell?.User?.email}</p>,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      key: 4,
      render: (text) => <p>${text}</p>,
    },
    {
      title: "Fecha de compra",
      dataIndex: "orderDate",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      key: 4,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Id pago",
      dataIndex: "mercadopagoTransactionId",
      key: 5,
      filters: paymentIdFilters,
      filterSearch: true,
      onFilter: (value, record) =>
        record.mercadopagoTransactionId.indexOf(value) === 0,
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
      key: 6,
      render: (text, record) => {
        return <Tag color={colorStatus(record.status)}>{text}</Tag>;
      },
    },
    {
      title: "Cambiar estado",
      dataIndex: "",
      key: 7,
      render: (text, record) => {
        return (
          <div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setShowEditModal(true), setOrder(record);
              }}
            />
          </div>
        );
      },
    },
  ];



  return (
    <div>
      {order && showEditModal && (
        <UpdateOrderModal
          order={order}
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {isMobile ? (
  tableOrders.map((order, index) => (
    <Card
    
      key={index}
      title={`Pedido de ${order.User?.name} ${order.User?.surname}`}
      bordered={false}
      hoverable={true}
      className="editOrderCard"
      style={{
        width: "95%",
        marginBottom: "10px",
        marginTop: "10px",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div className="editOrderTable">
      <p>ID: {order.id}</p>
      <p>
        Dirección:{" "}
        {order?.User?.address
          ? `${order?.User?.address.calle} ${order?.User?.address.numero} ${order?.User?.address.dpto} ${order?.User?.address.entreCalles} ${order?.User?.address.localidad} ${order?.User?.address.provincia} ${order?.User?.address.codigoPostal}`
          : "No especificada"}
      </p>
      <p>Telefono: {order.User?.phone}</p>
      <p>Total: ${order.totalAmount}</p>
      <p>Fecha: {order.orderDate}</p>
      <p>Id de pago: {order.mercadopagoTransactionId}</p>
      <p>Estado: {order.status}</p>
      <p>Cambiar estado: </p>
      <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setShowEditModal(true), setOrder(order);
              }}
            />
      </div>
      <Collapse
        ghost
        style={{ width: "100%" }}
        expandIcon={({ isActive }) => (
          <PlusOutlined
            rotate={isActive ? 45 : 0}
            style={{
              fontSize: "1.3em",
              color: isActive ? '#ba338a' : 'black',
            }}
          />
        )}
      >
        <Collapse.Panel header="Lista de productos" key="1">
          <div>
            {order.products.map((product, i) => (
              <Card
                key={i}
                title={
                  <span >
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
                <div className="settingCard" >
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
  ))
) : (
  <Table
    className="containTable"
    dataSource={tableOrders}
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <OrderExpandedRow products={record.products} />
      ),
      rowExpandable: (record) => record.name !== "Not Expandable",
    }}
    style={{ overflowX: "scroll" }}
  />
)}
    </div>
  );
};

export default OrdersTable;
