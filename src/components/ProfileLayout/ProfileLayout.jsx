import React, { useState } from "react";
import {
  ShoppingOutlined,
  UserOutlined,
  EditOutlined,
  StarOutlined,
  HeartOutlined,
  CommentOutlined, 
  CustomerServiceOutlined,
  IdcardOutlined 
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Table, FloatButton } from "antd";
import {useMediaQuery} from 'react-responsive'
import DataProfile from "../DataProfile/DataProfile";
import CreateAcountForm from "../CreateAcountModal/CreateAcountForm";
import ShoppingClient from "../ShoppingClient/ShoppingClient";
import ReviewsClient from "../ReviewsClient/ReviewsClient";
import TableShoppingClient from "../TableShoppingClient/TableShoppingClient";
import style from "./ProfileLayout.module.css";
import { Formik, Form } from "formik";
import {CreateAcountSchema} from "../CreateAcountModal/createAcountSchema";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Favs from "../../views/Favs/Favs";
import ProductFavs from "../ProductFavs/ProductFavs";


const { Header, Sider, Content } = Layout;
const ProfileLayout = ({ profileKey }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isLatop = useMediaQuery({ minWidth: 769 });
  const navigate = useNavigate();
  const infouser = useSelector((state) => state.user);
  const [dataUser, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    provincia: "",
    address: "",
    pivotuser: false,
  });

  useEffect(() => {
    
    if (infouser) {
      setFormData({
        id: infouser.id,
        name: infouser?.name || "",
        surname: infouser?.surname || "",
        email: infouser?.email || "",
        phone: infouser?.phone || "",
        address: {
          calle: infouser.address?.calle || "",
          numero: infouser.address?.numero || "",
          dpto: infouser.address?.dpto || "",
          entreCalles: infouser.address?.entreCalles || "",
          localidad: infouser.address?.localidad || "",
          codigoPostal: infouser.address?.codigoPostal || "",
          provincia: infouser.address?.provincia || "",
        },
        pivotuser: true,
      });
    }else if (!infouser.id){
      return navigate("/")
    }
  }, [infouser]);
  const [selectedKey, setSelectKey] = useState(profileKey);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const keySelect = ( access ) => {
    console.log(access);
    if (typeof access === "object") {
      const {key}=access
      navigate(`/perfil/${key}`)
      setSelectKey(key);
    } else {
      setSelectKey(access);
      navigate(`/perfil/${access}`)
    }
  };
  const items = [
    {
      key: "perfil",
      icon: <UserOutlined />,
      label: "Perfil",
    },
    {
      key: "editar",
      icon: <EditOutlined />,
      label: "Editar Perfil",
    },
    {
      key: "compras",
      icon: <ShoppingOutlined />,
      label: "Mis Compras",
    },
    {
      key: "opiniones",
      icon: <StarOutlined />,
      label: "Opiniones",
    },
    {
      key: "favoritos",
      icon: <HeartOutlined />,
      label: "Favoritos",
    },
  ];
  return (
    
    <Layout className={style.containerInfo} style={{marginTop:80 }}>
      <Sider style={{ display: isMobile ? 'none' : 'block' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          style={{ height: "80vh"}}
          defaultSelectedKeys={profileKey}
          onSelect={keySelect}
          items={items}
        />
      </Sider>
      <Layout className={style.containerInfo}>
        <Content className={style.layaout1} >
          {selectedKey === "perfil" && <DataProfile />}
          {/* selectedKey === "compras" && <ShoppingClient idUser={infouser.id} /> */}
          {selectedKey === "favoritos" && <Favs/>}
          {selectedKey === "compras" && <TableShoppingClient />}
          {selectedKey === "editar" && (
            <Formik
              initialValues={{
                name: dataUser.name,
                surname: dataUser.surname,
                calle: dataUser.address.calle,
                numero: dataUser.address.numero,
                dpto: dataUser.address.dpto,
                entreCalles: dataUser.address.entreCalles,
                localidad: dataUser.address.localidad,
                codigoPostal: dataUser.address.codigoPostal,
                provincia: dataUser.address.provincia,
                phone: dataUser.phone,
                email: dataUser.email,
                password: "",
                confirmPassword: "",
              }}
              validationSchema={CreateAcountSchema}
            >
              <div className={style.formSetting}>
                <CreateAcountForm
                  pivotuser={dataUser.pivotuser}

                  idUser={dataUser.id}
                />
              </div>
            </Formik>
          )}
          {selectedKey === "opiniones" && <ReviewsClient infoUser={infouser}/>}
        </Content>
      </Layout>
      <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24,display: isLatop ? 'none' : 'block' }}
      icon={<IdcardOutlined />}

    >
      {items.map(item => (
        <FloatButton key={item.key} icon={item.icon} label={item.label} onClick={() => keySelect(item.key)}>
        
        </FloatButton>
      ))}
     
    </FloatButton.Group>
    
    </Layout>
  );
};
export default ProfileLayout;
