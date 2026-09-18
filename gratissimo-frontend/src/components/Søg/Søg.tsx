"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FilterValues } from "../Filter/Filter";
import styles from "./Søg.module.scss";

interface Job {
  id: number;
  title: string;
  organization: string;
  city: string;
  createdAt: string;
  workHome: string;
  region?: { name: string };
  workType?: { type: string };
  jobCategory?: { name: string | null };
}

export default function Søg({ filters }: { filters?: FilterValues }) {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Henter annoncerne, som bruges til søgeforslag og filtrering.
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-listings`)
      .then((res) => res.json())
      .then(setJobs)
      .catch(() => setJobs([]));
  }, []);

  const navigate = (q: string) => {
    // Gemmer søgeteksten i URL'en, så søgeresultatet kan genskabes.
    const params = new URLSearchParams(window.location.search);
    q ? params.set("q", q) : params.delete("q");
    setQuery("");
    router.push(`/Soeg?${params.toString()}`);
  };

  const suggestions = query.trim()
    ? jobs.filter((job) => isMatch(job, query, filters)).slice(0, 5)
    : [];

  return (
    <form onSubmit={(e) => { e.preventDefault(); navigate(query); }} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <Image src="/Icon/icons8-search-50.png" alt="Søg" width={20} height={20} />
        <input
          type="text"
          placeholder="Eks. cafémedhjælper..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.submitButton}>Søg</button>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((job) => (
            <button
              type="button"
              key={job.id}
              className={styles.suggestion}
              onClick={() => navigate(job.title)}
            >
              <strong>{job.title}</strong>
              <span>{job.organization} · {job.city}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}


function isMatch(job: Job, query: string, filters?: FilterValues) {
  // Kontrollerer om annoncen matcher søgetekst og valgte filtre.
  const q = query.toLowerCase();
  const text = `${job.title} ${job.organization} ${job.city} ${job.jobCategory?.name || ""}`.toLowerCase();
  if (!text.includes(q)) return false;

  if (!filters) return true;

  const reg = filters.region.toLowerCase();
  const cat = filters.kategori.toLowerCase();
  const wt = filters.arbejdstid.toLowerCase();
  const wh = filters.hjemmearbejde.toLowerCase();
  const created = new Date(job.createdAt).getTime();
  const now = Date.now();

  return (
    (!reg || job.region?.name.toLowerCase() === reg || job.city.toLowerCase() === reg) &&
    (!cat || job.jobCategory?.name?.toLowerCase() === cat) &&
    (!wt || job.workType?.type.toLowerCase() === wt) &&
    (!wh || job.workHome.toLowerCase() === wh) &&
    (!filters.periode ||
      (filters.periode === "Denne uge" && created >= now - 604800000) ||
      (filters.periode === "Denne måned" && created >= now - 2592000000))
  );
}