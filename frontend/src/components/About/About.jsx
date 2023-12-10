import React, { useEffect } from "react";
import "./about.css";
import AboutCard from "./AboutCard";
import { useSelector } from "react-redux";
import MenuBurger from "../MenuBurger/MenuBurger";

const About = () => {
  const menuBurger = useSelector((state) => state.menuBurger);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const users = [
    {
      name: "Alejandra Osuna",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697166111/ale_zfawdj.jpg",
      linkedin: "https://www.linkedin.com/in/alejandra-osuna-258b8a248/",
      github: "https://github.com/ruthosuna92",
    },
    {
      name: "Davian Pabon Amado",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697217646/davian_ogvkuv.jpg",
      linkedin: "https://www.linkedin.com/in/davian-pabon-amado-54105627a/",
      github: "https://github.com/altair201",
    },
    {
      name: "Hebe Lia Romeu",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697330695/hebe_pcq2he.jpg",
      linkedin: "https://www.linkedin.com/in/hebeliaromeu/",
      github: "https://github.com/hebelia",
    },
    {
      name: "Jhonathan Cutisaca",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697599301/23-09-23_hmqerb.jpg",
      linkedin: "https://www.linkedin.com/in/jhonathan-cutisaca/",
      github: "https://github.com/JCutisaca",
    },
    {
      name: "Leonardo Rodríguez",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697155062/a59fecd1-6695-4379-995d-3d15f54734a8_hjsnwk.jpg",
      linkedin: "https://www.linkedin.com/in/leonardo-rodriguez-803560241/",
      github: "https://github.com/LeonardoRodriguez22",
    },
    {
      name: "Marina Solange García",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697565079/SOL_mfgxr3.jpg",
      linkedin: "https://www.linkedin.com/in/marina-solange-garcia/",
      github: "https://github.com/msolangeg",
    },
    {
      name: "Matias Gochez",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697563108/matias_t9crxh.jpg",
      linkedin: "https://www.linkedin.com/in/matias-gochez-1b2921119/",
      github: "https://github.com/MGochez",
    },
    {
      name: "Mayra Denhoff",
      description: "Full Stack Developer.",
      image:
        "https://res.cloudinary.com/dv7kzlqy6/image/upload/v1697687279/LadyFitLovers/may_ok1hna.jpg",
      linkedin: "https://www.linkedin.com/in/mayradenhoff/",
      github: "https://github.com/Maydenhoff",
    },
  ];
  return (
    <div className="aboutContainer">
      {menuBurger ? <MenuBurger></MenuBurger> : null}
      <div className="barra">
        <h1 className="titleAbout">Grupo de desarrollo web</h1>
        <p className="pAbout">
          Somos un grupo de desarrolladores web, egresados del bootcamp "Henry",
          donde conformamos un equipo para crear un e-commerce de ropa deportiva
          femenina, partiendo desde la maquetación y el diseño de su marca y
          funcionalidades. Realizamos un proyecto íntegro y responsivo para
          todos los dispositivos gracias a nuestro diligente trabajo en equipo
          en el cual utilizamos React, JavaScript, Express, PostgreSQL,
          Sequelize y Ant Design, entre otras tecnologías. Priorizamos la
          facilidad de uso y la navegación intuitiva para garantizar una
          experiencia de compra sin complicaciones. En términos de seguridad,
          hacemos hincapié en la protección de datos con el uso de JWT y la
          autorización a través de plataformas como Google y Facebook. Además,
          para garantizar transacciones seguras y eficientes, facilitamos el
          pago a través de Mercado Pago, un método de pago confiable y
          ampliamente utilizado.
        </p>
      </div>
      <div className="aboutCardsContainer">
        {users.map((user) => (
          <AboutCard key={user.name} user={user} />
        ))}
      </div>
    </div>
  );
};

export default About;
