import { useDispatch, useSelector } from "react-redux";
import getFavoritesByIdUser from "../../redux/Actions/Favs/getFavoritesByIdUser";
// import style from "../Products/Products.module.css"
import { Button, Card, Col, Image, Row } from "antd";
import { useEffect } from "react";
import NoFoundScreen from "../NoFoundScreen/NoFoundScreen";
import deleteFav from "../../redux/Actions/Favs/deleteFav";
import { NavLink } from "react-router-dom";
import style from "./ProductFavs.module.css";
import Product from "../Product/Product";
//and le


const ProductFavs = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const favorites = useSelector((state) => state.favorites)
  const accessToken = useSelector((state) => state.accessToken);



  useEffect(() => {
    dispatch(getFavoritesByIdUser(user.id))

  }, [])
  // console.log(favorites, "mis favortios");

  return (
    <div className={style.shoppingClientContainer}>
      {!favorites.length ? <NoFoundScreen text={"No se encontraron favoritos"} />

        : favorites?.map(({id, name, image, price, unitsSold, stock, priceOnSale }) => (
          <div key={id}>
            <Product key={id}
             id={id}
             name={name}
             image={image}
             price={price}
             unitsSold={unitsSold}
             stock={stock}
             priceOnSale={priceOnSale}

          >
            </Product>

              {/* <Button style={{ position: "absolute", top: 5, right: 5 }} id={fav.name} shape='circle' size='small' onClick={() => dispatch(deleteFav(fav.id, user.id, accessToken))}>x</Button>
              <div className={style.detailFav}>
              <NavLink className={style.buy} to={`/detail/${fav.id}`}>
                {fav.name}
              </NavLink>
                <div><Image alt={fav.name} src={fav.image && fav.image} width={100} /></div>
                <div>Precio: ${fav.price}</div>
              </div>
              */}

            {/* </Card> */}
          </div>
        ))}
    </div>
  )
}

export default ProductFavs


