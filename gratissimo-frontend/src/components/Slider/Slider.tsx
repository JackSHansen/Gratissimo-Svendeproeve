"use client";

import { useEffect, useState } from "react";
import styles from "./Slider.module.scss";

interface Review {
  id: string;
  name: string;
  content: string;
  title: string;
}

export default function Slider() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimony`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className={styles.sliderContainer}>
      <p className={styles.reviewtitle}>
        "{currentReview.title}"
      </p>
      <p className={styles.reviewcontent}>
        {currentReview.content}
      </p>
      <p className={styles.reviewName}>
        {currentReview.name}
      </p>
      <div className={styles.dots}>
        {reviews.map((review, index) => (
          <button
            key={review.id}
            className={index === currentIndex ? styles.activeDot : ""}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Vis anbefaling ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}