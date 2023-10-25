import { useSelector } from "react-redux";
import { Table, Tag, Button } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ShoppingClient from "../ShoppingClient/ShoppingClient";
import getOrdersByUser from "../../redux/Actions/Order/getOrdersByUser";
import { useMediaQuery } from "react-responsive";
import style from "./TableShoppingClient.module.css";

const TableShoppingClient = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
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
        console.log(ordersUser);
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
  if(!isMobile){
    columns.splice(1,0,{
      
        title: "Teléfono",
        dataIndex: "",
        key: 3,
        render: (cell) => <p>{cell?.User?.phone || "No especificado"}</p>,
      
    })
  }

  return (
    // <div className={style.container}>
    <Table
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
      }}
    />
    // </div>
  );
};

export default TableShoppingClient;
