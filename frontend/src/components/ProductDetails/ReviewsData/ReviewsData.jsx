import React from "react";
import style from "./reviewsData.module.css";
//antd
import { Rate } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  EditOutlined,
  StarOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const ReviewsData = ({ productData }) => {
  //reviews
  const reviews = productData.Reviews;
  const totalReviews = reviews.length;

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

  return (
    <div className={style.reviewsData}>
      <p className={style.averageNum}>{averageProductRating.toFixed(1)}</p>
      <Rate
        disabled
        allowHalf
        defaultValue={averageProductRating}
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "8px",
          marginLeft: "8px",
        }}
      />
      <p>({reviews.length})</p>
    </div>
  );
};

export default ReviewsData;
