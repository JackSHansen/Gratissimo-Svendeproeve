"use client";

import { useState, FormEvent, useEffect } from "react";
import styles from "./AnnonceFormel.module.scss";

type Option = { id: number; name?: string; type?: string };

export default function AdForm({ onSuccess }: { onSuccess?: () => void }) {
  const [msg, setMsg] = useState("");
  const [opt, setOpt] = useState<{ regions: Option[]; categories: Option[]; workTypes: Option[] }>({
    regions: [], categories: [], workTypes: []
  });

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const fetchJson = (url: string) => fetch(`${api}/${url}`).then((res) => res.json());

    Promise.all([fetchJson("regions"), fetchJson("job-categories"), fetchJson("workTypes")])
      .then(([regions, categories, workTypes]) => setOpt({ regions, categories, workTypes }))
      .catch(() => setMsg("Kunne ikke hente valgmuligheder."));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user?.id) return setMsg("Din bruger kunne ikke findes. Log ind igen.");

    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const { organisation, ...fields } = raw;
    const body = JSON.stringify({
      ...fields,
      organization: organisation,
      userId: user.id,
      workHome: "On-site",
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        return setMsg(data?.error || "Udfyld venligst alle felter korrekt.");
      }

      setMsg("Annonce oprettet succesfuldt!");
      onSuccess?.();
    } catch {
      setMsg("Kunne ikke oprette annonce.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.details}>
          <label htmlFor="title">Overskrift</label>
          <input id="title" name="title" placeholder="Eks. medhjælper søges..." required />

          <label htmlFor="organisation">Organisation / forening</label>
          <input id="organisation" name="organisation" placeholder="Skriv din forening her..." required />

          <label htmlFor="regionId">Lokation</label>
          <select id="regionId" name="regionId" required defaultValue="">
            <option value="" disabled>Vælg lokation...</option>
            {opt.regions.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>

          <label htmlFor="jobCategoryId">Kategori</label>
          <select id="jobCategoryId" name="jobCategoryId" required defaultValue="">
            <option value="" disabled>Vælg kategori...</option>
            {opt.categories.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>

          <label htmlFor="workTypeId">Arbejdstid</label>
          <select id="workTypeId" name="workTypeId" required defaultValue="">
            <option value="" disabled>Vælg arbejdstid...</option>
            {opt.workTypes.map((i) => <option key={i.id} value={i.id}>{i.type}</option>)}
          </select>

          <label htmlFor="address">Adresse</label>
          <input id="address" name="address" placeholder="Eks. Holmevej 22, 1. sal" required />

          <label htmlFor="zipcode">Postnummer</label>
          <input id="zipcode" name="zipcode" placeholder="Eks. 9000" inputMode="numeric" required />

          <label htmlFor="city">By</label>
          <input id="city" name="city" placeholder="Eks. Aalborg SV" required />
        </div>

        <div className={styles.description}>
          <label htmlFor="description">Jobbeskrivelse</label>
          <textarea id="description" name="description" placeholder="Beskriv jobbet og forventninger..." required />
        </div>

        <button type="submit">Opret annonce</button>
      </form>

      {msg && <p className={styles.message}>{msg}</p>}
    </>
  );
}