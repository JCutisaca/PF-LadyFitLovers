import React, { useState } from "react";
//styles
import style from "./productReviews.module.css";

//actions
//components
import Review from "../Review/Review";
//antd
import { Pagination, Select, Progress, Rate } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  EditOutlined,
  StarOutlined,
  HeartOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const ProductReviews = ({ productData }) => {
  // console.log(productData);

  //reviews
  const reviews = productData.Reviews;

  //paginacion
  const [current, setCurrent] = useState(1);
  const pageSize = 4;
  const onChange = (page) => {
    setCurrent(page);
  };
  //estado local filtros
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  //filtros
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };
  const filteredReviews =
    selectedFilter === "Todos"
      ? reviews
      : reviews.filter((review) => review.rating.toString() === selectedFilter);

  //porcentage
  const calculateAverageProductRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return totalRating / reviews.length;
  };
  const averageProductRating = calculateAverageProductRating();

  // console.log(averageProductRating);

  //funcion porcentajes
  const calculateRatingPercentages = (reviews) => {
    const ratingCounts = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      const ratingIndex = review.rating - 1;
      ratingCounts[ratingIndex] += 1;
    });
    const totalReviews = reviews.length;
    return ratingCounts.map((count) =>
      Math.round((count / totalReviews) * 100)
    );
  };
  const ratingPercentages = calculateRatingPercentages(reviews);
  const reversedRatingPercentages = ratingPercentages.slice().reverse();

  return (
    <div className={style.container}>
      {/* agregar filtro por rating y ordenamiento por fecha */}

      <div className={style.reviewStats}>
        <div className={style.reviewAverage}>
          <div className={style.reviewAverageNum}>
            <h1 className={style.averageNum}>
              {averageProductRating.toFixed(1)}
            </h1>
            <h1>/5</h1>
          </div>
          <div className={style.rateTotal}>
            <Rate disabled allowHalf defaultValue={averageProductRating} />
            <p>{reviews.length} reseñas</p>
          </div>
        </div>
        <div className={style.reviewPercentagesContainer}>
          {reversedRatingPercentages.map((percentage, index) => (
            <div key={index} className={style.reviewPercentage}>
              {5 - index}
              <StarOutlined /> <Progress percent={percentage} status="active" />
            </div>
          ))}
        </div>
      </div>

      {reviews.length === 0 ? (
        <h4 className={style.noReviews}>
          Actualmente este producto no cuenta con reseñas, ¡sé el primero!
        </h4>
      ) : (
        <>
          <div className={style.filters}>
            <Select
              defaultValue="Todos"
              style={{ width: 120 }}
              onChange={handleFilterChange}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </div>
          {filteredReviews.length === 0 ? (
            <h4 className={style.noReviews}>
              No hay reseñas disponibles para esta categoría seleccionada.
            </h4>
          ) : (
            <div className={style.reviewsContainer}>
              {/* map the filtered reviews based on the selected filter */}
              {filteredReviews
                .slice((current - 1) * pageSize, current * pageSize)
                .map(({ id, reviewText, rating, productreview, User }) => (
                  <Review
                    key={id}
                    id={id}
                    reviewText={reviewText}
                    rating={rating}
                    updatedAt={productreview.updatedAt}
                    user={User}
                  />
                ))}
            </div>
          )}

          <div className={style.pagination}>
            <Pagination
              current={current}
              onChange={onChange}
              total={reviews ? reviews.length : 0}
              pageSize={pageSize}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductReviews;
