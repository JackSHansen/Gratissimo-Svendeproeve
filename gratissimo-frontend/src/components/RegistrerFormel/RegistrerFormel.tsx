"use client";

import { useState, FormEvent } from "react";
import styles from "./RegistrerFormel.module.scss";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const FIELDS = [
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "repeatPassword", label: "Gentag password", type: "password" },
  { id: "firstname", label: "Fornavn" },
  { id: "lastname", label: "Efternavn" },
  { id: "phone", label: "Telefonnummer" },
  { id: "zipcode", label: "Postnummer", inputMode: "numeric" as const, pattern: "[0-9]{4}", maxLength: 4 },
];

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [msg, setMsg] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const { repeatPassword, ...bodyData } = data;

    if (data.password !== repeatPassword) {
      return setMsg("Adgangskoderne er ikke ens.");
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        onSuccess?.();
      } else {
        const errorData = await res.json().catch(() => null);
        setMsg(errorData?.error || "Fejl ved oprettelse. Tjek venligst dine oplysninger.");
      }
    } catch {
      setMsg("Netværksfejl.");
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className={styles.form}>
        {FIELDS.map(({ id, label, type = "text", ...rest }) => (
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              name={id}
              type={type}
              placeholder={`Skriv dit ${label.toLowerCase()}...`}
              required
              {...rest}
            />
          </div>
        ))}

        <button type="submit">Opret profil</button>
      </form>

      {msg && <p className={styles.message}>{msg}</p>}
      <a href="/Login" className={styles.loginLink}>Log ind</a>
    </>
  );
}