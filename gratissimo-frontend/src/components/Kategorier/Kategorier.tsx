"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Kategorier.module.scss";

interface Category {
  name: string;
  count: number;
}

export default function Kategorier() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className={styles.categoryGrid}>
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() =>
            router.push(`/Soeg?kategori=${encodeURIComponent(cat.name)}`)
          }
          className={styles.categoryCard}
        >
          <strong>{cat.name}</strong>
          <p>{cat.count} jobs</p>
        </button>
      ))}
    </div>
  );
}