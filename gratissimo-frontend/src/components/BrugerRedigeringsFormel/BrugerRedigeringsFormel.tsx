"use client";

import { FormEvent } from "react";
import styles from "./BrugerRedigeringsFormel.module.scss";

type UserData = {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
};

interface Props {
  initialData: UserData;
  onSubmit: (data: UserData) => void;
}

export default function BrugerRedigeringsFormel({ initialData, onSubmit }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Sender de redigerede felter videre til profilsiden.
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as UserData;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="profile-email">Email</label>
      <input id="profile-email" name="email" type="email" defaultValue={initialData.email} placeholder="Skriv din email..." required />
      <label htmlFor="profile-firstname">Fornavn</label>
      <input id="profile-firstname" name="firstname" defaultValue={initialData.firstname} placeholder="Skriv dit fornavn..." required />
      <label htmlFor="profile-lastname">Efternavn</label>
      <input id="profile-lastname" name="lastname" defaultValue={initialData.lastname} placeholder="Skriv dit efternavn..." required />
      <label htmlFor="profile-phone">Telefon nummer</label>
      <input id="profile-phone" name="phone" defaultValue={initialData.phone} placeholder="Skriv dit telefon nummer..." required />
      
      <button type="submit">Gem ændringer</button>
    </form>
  );
}