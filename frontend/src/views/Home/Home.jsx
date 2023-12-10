import { useSelector } from "react-redux";
import Carousel from "../../components/Carousel/Carousel";
import MostSoldProducts from "../../components/MostSoldProducts/MostSoldProducts";
import Seccion from "../../components/Seccion/Seccion";
import MenuBurger from "../../components/MenuBurger/MenuBurger";

const Home = () => {
  const menuBurger = useSelector(state => state.menuBurger)
  return (
    <div>
      <Carousel />
      <MostSoldProducts />
      <div>
        <Seccion />
      </div>
      {menuBurger ? <MenuBurger></MenuBurger> : null}
    </div>
  );
};

export default Home;
