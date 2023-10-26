import { useDispatch, useSelector } from "react-redux";
import getFavoritesByIdUser from "../../redux/Actions/Favs/getFavoritesByIdUser";
// import style from "../Products/Products.module.css"
import { Button, Card, Col, Image, Row } from "antd";
import { useEffect } from "react";
import NoFoundScreen from "../NoFoundScreen/NoFoundScreen";
import deleteFav from "../../redux/Actions/Favs/deleteFav";
import { NavLink } from "react-router-dom";
import style from "./ProductFavs.module.css";



const ProductFavs = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const favorites = useSelector((state) => state.favorites)
  const accessToken = useSelector((state) => state.accessToken);



  useEffect(() => {
    dispatch(getFavoritesByIdUser(user.id))

  }, [])


  return (
    <div className={style.shoppingClientContainer}>
      {!favorites.length ? <NoFoundScreen text={"No se encontraron favoritos"} />

        : favorites?.map((fav) => (
          <div key={fav.id}>
            <Card
              key={fav.id}
              bordered={false}
              hoverable={true}
              className={style.cardFavs}
              style={{
                width: 250,
                height: 250,
                margin: 5,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              id={fav.id}
            >

              <Button style={{ position: "absolute", top: 5, right: 5 }} id={fav.name} shape='circle' size='small' onClick={() => dispatch(deleteFav(fav.id, user.id, accessToken))}>x</Button>
              <div className={style.detailFav}>
              <NavLink className={style.buy} to={`/detail/${fav.id}`}>
                {fav.name}
              </NavLink>
                <div><Image alt={fav.name} src={fav.image && fav.image} width={100} /></div>
                <div>Precio: ${fav.price}</div>
              </div>
             

            </Card>
          </div>
        ))}
    </div>
  )
}

export default ProductFavs