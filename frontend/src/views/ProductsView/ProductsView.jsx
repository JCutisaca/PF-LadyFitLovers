import React from "react";
import Products from "../../components/Products/Products";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import style from "./ProductsView.module.css"
import MenuBurger from "../../components/MenuBurger/MenuBurger";

const ProductsView = () => {
  const allProducts = useSelector((state) => state.allProducts);
  const menuBurger = useSelector(state => state.menuBurger)
  return (
    <div className={style.containerAll}>
      <Filters />
      <div className={style.containeProduct}>
        <Products />
      </div>
      {allProducts.length ? <Pagination /> : null}
      {menuBurger ? <MenuBurger></MenuBurger> : null}
    </div>
  );
};

export default ProductsView;
