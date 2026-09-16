"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
  

  return (
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/Logo/logo-white.png" alt="Gratissimo Logo" width={150} height={40} />
        </Link>
      </div>
  );
}