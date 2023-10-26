import { Collapse } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../../components/LoginModal/LoginModal";

import './qAndA.css'

const QandA = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const emailLink = () => {
    const email = "ladyfitlovers@gmail.com";

    return <a href={`mailto:${email}`}>ladyfitlovers@gmail.com</a>;
  };

  const data = [
    {
      key: "1",
      label: "¿Debo registrarme para poder comprar?",
      children: [
        <p key={"1"}>
          Si, podés hacerlo{" "}
          <Link to="#" onClick={() => setLoginModalVisible(true)}>
            haciendo click aquí.
          </Link>
        </p>,
      ],
    },
    {
      key: "2",
      label: "¿Cómo puedo realizar una compra?",
      children: [
        <p key={"1"}>1- Seleccione los productos que desea comprar.</p>,
        <p key={"2"}>2- Agregue los productos al carrito de compras.</p>,
        <p key={"3"}>3- Ingrese su información de envío y facturación.</p>,
        <p key={"4"}>4- Seleccione el método de pago.</p>,
        <p key={"5"}>5- Confirme su compra.</p>,
      ],
    },
    {
      key: "10",
      label: "¿Qué talla debo elegir?",
      children: [
        <p key={"1"}>
          La talla que debe elegir depende de sus medidas. Consulte la tabla de
          tallas de cada producto para obtener más información.
        </p>,
      ],
    },
    {
      key: "3",
      label: "¿Cómo puedo pagar mi pedido?",
      children: [
        <p key={"1"}>Aceptamos los siguientes métodos de pago:</p>,
        <p key={"2"}>- Mercado pago</p>,
        <p key={"3"}>- Efectivo</p>,
        <p key={"4"}>- Transferencia bancaria</p>,
      ],
    },
    {
      key: "4",
      label: "¿Cuál es el plazo de entrega?",
      children: [
        <p key={"1"}>
          El tiempo de entrega de mi pedido depende del método de envío que
          elija:
        </p>,
        <p key={"2"}>- Retiro por punto de entrega: 24hs hábiles.</p>,
        <p key={"3"}>- Envío a domicilio: dependerá del servicio de entrega del correo.</p>,
      ],
    },
    {
      key: "5",
      label: "¿Cuál es el costo de envío?",
      children: [
        <p key={"1"}>
          El costo de envío se calculará según el peso y volumen de los
          productos que seleccione y la dirección de entrega.
        </p>,
      ],
    },

    {
      key: "6",
      label: "¿Puedo devolver o cambiar mi pedido?",
      children: [
        <p key={"1"}>
          Sí, puede devolver o cambiar su pedido dentro de los 30 días
          posteriores a la recepción.
        </p>,
        <p key={"2"}>Contactate vía mail a: {emailLink()} para poder ayudarte.</p>,
      ],
    },
    {
      key: "7",
      label: "¿Cómo puedo contactarme con ustedes?",
      children: [<p key={"1"}>Podes contactarte vía mail, whatsapp o redes sociales.</p>],
    },
    {
      key: "8",
      label: "¿Dónde puedo encontrar más información sobre sus productos?",
      children: [
        <p key={"1"}>
          Podes encontrar más información sobre nuestros productos en la sección
          de productos de nuestra página web y redes sociales.
        </p>,
      ],
    },
    {
      key: "9",
      label: "¿Tienen cupones, descuentos y promociones?",
      children: [
        <p key={"1"}>
          Ofrecemos cupones y descuentos con frecuencia. Puede encontrar más
          información sobre nuestros cupones y descuentos en nuestro sitio web o
          en nuestras redes sociales. Y si te registras en nuestra página
          recibirás un 10% de descuento en tu primera compra.
        </p>,
      ],
    },
  ];
  return (
    <div>
      <h1>Preguntas frecuentes</h1>
      <div className="containerQA1">
        <div className="containerQA">
          <Collapse defaultActiveKey={["1"]} ghost items={data} />
        </div>
        <div className="containerQA2">
          <img
            alt="imagen"
            src="https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697483973/5219070_xs5tdt.jpg"
          ></img>
        </div>
      </div>
      {loginModalVisible && (
        <LoginModal
          visible={loginModalVisible}
          onClose={() => setLoginModalVisible(false)}
        />
      )}
    </div>
  );
};

export default QandA;
