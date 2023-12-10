import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filtByCategory } from "../../redux/Actions/Filter/filtByCategory";
import { filtByColor } from "../../redux/Actions/Filter/filtByColor";
import { filtBySize } from "../../redux/Actions/Filter/filtBySize";
import { saveFilter } from "../../redux/Actions/Filter/saveFilter";
import getProductByName from "../../redux/Actions/Product/getProductByName";
import setCurrentPage from "../../redux/Actions/Filter/setCurrentPage";
import style from "./Filters.module.css";
import { Select, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import order from "../../redux/Actions/Filter/order";
import { getColorName } from "../../utils/getColorName";

const Filters = () => {
  const size = ["S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const filtersave = useSelector((state) => state.saveFilters);
  
  const [uniqueFilters, setUniqueFilters] = useState({
    category: [],
    color: [],
    selectCategory: "",
    selectColor: "",
    selectSize: "",
    selectOrdered: "",
  });

  useEffect(() => {
    dispatch(setCurrentPage(1));
    dispatch(saveFilter(uniqueFilters));
    handleChangeCategory;
    handleChangeColor;
    handleSize;
    handleOrder;
  }, [allProducts, uniqueFilters]);
  useEffect(() => {
    if (uniqueFilters.selectCategory !== "") {
      dispatch(filtByCategory(uniqueFilters.selectCategory));
    }
    if (uniqueFilters.selectColor !== "") {
      dispatch(filtByColor(uniqueFilters.selectColor));
    }
    if (uniqueFilters.selectSize !== "") {
      dispatch(filtBySize(uniqueFilters.selectSize));
    }
    if(uniqueFilters.selectOrdered !== "") {
      dispatch(order(uniqueFilters.selectOrdered))
    }

  }, [
    uniqueFilters.selectCategory,
    uniqueFilters.selectColor,
    uniqueFilters.selectSize,
    uniqueFilters.selectOrdered 
  ]);

  useEffect(() => {
    if (allProducts) {
      const uniqueCategoryNames = Array.from(
        new Set(
          allProducts
            .filter((product) => product.Category.name)
            .map((product) => product.Category.name)
        )
      );
      const uniqueColorFil = Array.from(
        new Set(
          allProducts
            .flatMap((product) =>
              product.stock.map((stockItem) => stockItem.color)
            )
            .filter((color) => color)
        )
      );
      setUniqueFilters({
        category: uniqueCategoryNames,
        color: uniqueColorFil,
        selectCategory: filtersave.selectCategory,
        selectColor: filtersave.selectColor,
        selectSize: filtersave.selectSize,
        selectOrdered: filtersave.selectOrdered
      });
    }
  }, [allProducts]);

  const handleChangeCategory = (value) => {
    setUniqueFilters({
      ...uniqueFilters,
      selectCategory: value,
    });
  };

  const handleChangeColor = (value) => {
    setUniqueFilters({
      ...uniqueFilters,
      selectColor: value,
    });
  };

  const handleSize = (value) => {
    setUniqueFilters({
      ...uniqueFilters,
      selectSize: value,
    });
  };

  const handleOrder = (value) => {
    setUniqueFilters({
      ...uniqueFilters,
      selectOrdered: value
    })
  }

  const categoryOptions = [
    { value: "TA", label: "CATEGORIA" },
    ...filtersave.category.map((categoria) => {
      return { value: categoria, label: categoria };
    })
  ];
  const colorOptions = [
    { value: "", label: "COLOR" },
    ...filtersave.color.map((color) => {
      return { value: color, label: getColorName(color)};
    })
  ];

  const sizeOptions = [
    { value: "", label: "TALLA" },
    ...size.map((size) => {
      return { value: size, label: size };
    })
  ]

  const orderOptions = [
    { value: "", label: "PRECIO" },
    { value: "A", label: "Menor a Mayor" },
    { value: "D", label: "Mayor a Menor" },
  ]

  const handleClick = () => {
    setUniqueFilters({
      ...uniqueFilters,
      selectCategory: "TA",
      selectColor: "",
      selectSize: "",
      selectOrdered: "",
    });
  };
 
  return (
    <div className={style.containerFilter}>
      <div className={style.subcontainer}>
        <Button className={style.buttonReload} onClick={() => handleClick()}><ReloadOutlined /></Button>
        <div className={style.contenselect}>
          <Select
            defaultValue={"CATEGORIA"}
            value={!uniqueFilters.selectCategory ? "CATEGORIA" : uniqueFilters.selectCategory}
            options={categoryOptions}
            style={{ width: "100%" }}
            onChange={handleChangeCategory}
          />
        </div>
        <div className={style.contenselect}>
          <Select
            defaultValue={""}
            value={uniqueFilters.selectColor}
            options={colorOptions}
            style={{ width: "100%" }}
            onChange={handleChangeColor}
          />
        </div>
        <div className={style.contenselect}>
          <Select
            defaultValue={"TA"}
            value={!uniqueFilters.selectSize ? "TALLA" : uniqueFilters.selectSize}
            options={sizeOptions}
            style={{ width: "100%" }}
            onChange={handleSize}
          />

        </div>
        <div className={style.contenselect}>
          <Select
            defaultValue={"OR"}
            value={!uniqueFilters.selectOrdered ? "PRECIO" : uniqueFilters.selectOrdered}
            options={orderOptions}
            style={{ width: "100%" }}
            onChange={handleOrder}
          />

        </div>
      </div>
    </div>
  );
};

export default Filters;