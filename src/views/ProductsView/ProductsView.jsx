import React from "react";
import Products from "../../components/Products/Products";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import style from "./ProductsView.module.css"

const ProductsView = () => {
  const allProducts = useSelector((state) => state.allProducts);

  return (
    <div className={style.containerAll}>
      <Filters />
      <div className={style.containeProduct}>
        <Products />
      </div>
      <Pagination />
    </div>
  );
};

export default ProductsView;
