import {
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  LineChartOutlined,
  CustomerServiceOutlined,
  RadarChartOutlined 
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { FloatButton } from "antd";

const SideBarDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isLatop = useMediaQuery({ minWidth: 769 });

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [

    {
      key: "1",
      icon: <UserOutlined />,
      label: "Usuarios",
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: "Productos",
    },
    {
      key: "3",
      icon: <ShoppingCartOutlined  />,
      label: "Ordenes de compra",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Crear producto",
    },
    {
      key: "5",
      icon: <LineChartOutlined />,
      label: "Resumen",
    },
 
    
  ];
  const handleMenu = (keySelect) => {
    let selectedKey = keySelect;

  if (typeof keySelect === "object") {
    selectedKey = keySelect.key;
  }

  switch (selectedKey) {
      case "1":
        navigate("/admin/usuarios");
        break;
      case "2":
        navigate("/admin/productos");
        break;
      case "3":
        navigate("/admin/ordenes");
        break;
      case "4":
        navigate("/admin/crear-producto");
        break;
      case "5":
        navigate("/admin");
        break;
    
      default:
        console.log("default");
        break;
    }
  };
  
  return (
    <>
      {/* <br />
      <br /> */}
      <Menu
        style={{
          width: 256,
          display: isMobile ? "none" : "block",
        }}
        defaultSelectedKeys={[""]}
        //defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        items={items}
        onSelect={handleMenu}
      />
      <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24,display: isLatop ? 'none' : 'block' }}
      icon={<RadarChartOutlined />}

    >
      {items.map(item => (
        <FloatButton key={item.key} icon={item.icon} label={item.label} onClick={() => handleMenu(item.key)}>
        
        </FloatButton>
      ))}
     
    </FloatButton.Group>
      {/* <Switch onChange={changeMode} /> Change Mode
        <Divider type="vertical" />
        <Switch onChange={changeTheme} /> Change Style */}
    </>
  );
};
export default SideBarDashboard;

//PruebaCommit