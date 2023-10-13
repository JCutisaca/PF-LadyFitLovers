import React, { useState, useEffect } from "react";
import { Avatar, Card, Rate, Skeleton } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./Review.module.css";

const { Meta } = Card;

const Review = ({ id, reviewText, rating, updatedAt, user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  //feccha
  const formattedDate = new Date(updatedAt).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (

      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        loading={loading}
        className={styles.reviewContainer}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            // avatar={
            //   <Avatar src={user.image} />
            // }
            // title={user.name}
            avatar={<Avatar src="/svg/logo.png" />}
            title="hola"
            description={formattedDate}
          />
          <div className={styles.reviewDescription}>
            <Rate disabled defaultValue={rating} className={styles.rating} />
            <div className={styles.reviewText}>{reviewText}</div>
          </div>
        </Skeleton>
      </Card>

  );
};

export default Review;