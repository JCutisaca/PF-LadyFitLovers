import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllUsers from "../../../redux/Actions/User/getAllUsers";
import { Button, Switch, Table, Tag, message, Card } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CreateAcountModal from "../../../components/CreateAcountModal/CreateAcountModal";
import userBan from "../../../redux/Actions/User/banUser";
import "../OrderTable/OrderTable.css"

const UsersTable = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isOp = useMediaQuery({ maxWidth: 500 });
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [user, setUser] = useState({});

  const accessToken = useSelector((state) => state.accessToken);
  const allUsers = useSelector((state) => state.allUsers);

  const onChange = async (value, user) => {
    try {
      const response = await dispatch(userBan(value, user, accessToken));
      if (response) {
        dispatch(getAllUsers(accessToken));
        message.success("Usuario actualizado correctamente", [2], onClose());
      }
    } catch (error) {

    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      key: "name",
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      key: "email",
      render: (text) => <p style={{ width: "60%" }}>{text}</p>,
    },
    
    {
      title: "Banneado",
      dataIndex: "",
      key: "userBan",
      render: (cell) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={cell.userBan === true ? true : false}
            onChange={() =>
              onChange(cell.userBan === true ? false : true, cell)
            }
          />
        );
      },
    },
  ];

  if (!isMobile) {
    // Si no es un dispositivo móvil, agregamos las columnas de "Apellido", "Telefono", "Acciones" y "Dirección"
    columns.splice(1, 0, {
      title: "Apellido",
      dataIndex: "surname",
      key: "surname",
      render: (text) => <p>{text}</p>,
    });
    columns.splice(3, 0, {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <p>{text || "No definido"}</p>,
    });
    columns.splice(5,0,{
      title: "Rol",
      dataIndex: "typeUser",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Usuario", value: "User" },
      ],
      onFilter: (value, record) => record.typeUser.indexOf(value) === 0,
      key: "typeUser",
      render: (text, record) => {
        return (
          <Tag color={record.typeUser === "Admin" ? "green" : "blue"}>
            {text}
          </Tag>
        );
      },
    },)
    columns.push(
      {
        title: "Acciones",
        dataIndex: "",
        key: "action",
        render: (text, record) => {
          return (
            <div>
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => {
                  setShowEditModal(true), setUser(record);
                }}
              />
            </div>
          );
        },
      },
      {
        title: "Dirección",
        dataIndex: "address",
        key: "address",
        render: (value) => (
          <p>
            {value !== null
              ? `${value?.calle} ${value?.numero} ${value?.dpto} ${value?.entreCalles} ${value?.localidad} ${value?.provincia} ${value?.codigoPostal}`
              : "No definido"}
          </p>
        ),
      }
    );
  }

  useEffect(() => {
    dispatch(getAllUsers(accessToken));
  }, []);

  return (
    <div>
      {user && showEditModal && (
        <CreateAcountModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          isEditing={true}
          user={user}
        />
      )}
      
      {isOp ? (
      allUsers.map((user, index) => (
        <Card
          key={index}
          title={`Usuario ${user.name} ${user.surname}`}
          bordered={false}
          hoverable={true}
          style={{
            width: "100%",
            marginBottom: "10px",
            marginTop: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <p style={{fontWeight: 600}}>Email: {user.email}</p>
          <p style={{fontWeight: 600}}>Telefono: {user.phone}</p>
          <p style={{fontWeight: 600}}>Rol: {user.typeUser}</p>
          <p style={{fontWeight: 600}}>Dirección: {`${user?.address?.calle} ${user?.address?.numero} ${user?.address?.dpto} ${user?.address?.entreCalles} ${user?.address?.localidad} ${user?.address?.provincia} ${user?.address?.codigoPostal}` || "No especificada"}</p>
          
          <p style={{fontWeight: 600}}>Bloquear Usuario:</p><Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={allUsers.userBan === true ? true : false}
            onChange={() =>
              onChange(allUsers.userBan === true ? false : true, allUsers)
            }
          />
          <p style={{fontWeight: 600}}>Acciones:</p><Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => {
                  setShowEditModal(true), setUser(user);
                }}
              />

        

        </Card>
      ))
    ) : (
      <Table style={{ width: isOp ? 0 : "100%" }} dataSource={allUsers} columns={columns} />
    )}
    </div>
  );
};

export default UsersTable;
