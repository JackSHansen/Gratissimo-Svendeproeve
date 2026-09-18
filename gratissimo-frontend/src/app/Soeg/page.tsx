"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Søg from "@/components/Søg/Søg";
import Filter, { FilterValues } from "@/components/Filter/Filter";
import AnnonceCards from "@/components/AnnonceCards/AnnonceCards";
import styles from "./Soeg.module.scss";

interface Annonce {
  id: number;
  title: string;
  description: string;
  organization: string;
  city: string;
  address: string;
  workHome: string;
  createdAt: string;
  region?: { name: string };
  jobCategory?: { name: string | null };
  workType?: { type: string };
}

export default function SoegPage() {
  const searchParams = useSearchParams();
  const [annoncer, setAnnoncer] = useState<Annonce[]>([]);
  
  const getParam = (key: string) => searchParams.get(key) || "";

  const [filters, setFilters] = useState<FilterValues>({
    region: getParam("region"),
    kategori: getParam("kategori"),
    arbejdstid: getParam("arbejdstid"),
    periode: getParam("periode"),
    hjemmearbejde: getParam("hjemmearbejde"),
  });

  useEffect(() => {
    // Henter annoncer og viser kun dem, der passer til søgning og filtre.
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-listings`)
      .then((res) => res.json())
      .then((data: Annonce[]) => setAnnoncer(data.filter((item) => isMatch(item, getParam("q"), filters))))
      .catch(() => setAnnoncer([]));
  }, [searchParams, filters]);

  return (
    <div className={styles.container}>
      <Søg filters={filters} />
      <Filter initialValues={filters} onChange={setFilters} />

      <h2>Søgeresultater ({annoncer.length})</h2>

      {annoncer.length > 0 ? (
        <div className={styles.resultsList}>
          {annoncer.map((a) => (
            <AnnonceCards
              key={a.id}
              id={a.id}
              title={a.title}
              description={a.description}
              organization={a.organization}
              category={a.jobCategory?.name || "Forening"}
              location={a.city}
              address={a.address}
              workType={a.workType?.type || "Ikke oplyst"}
              workHome={a.workHome}
              createdAt={a.createdAt}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>Ingen annoncer fundet.</p>
      )}
    </div>
  );
}

function isMatch(a: Annonce, query: string, f: FilterValues) {
  // Sammenligner én annonce med alle aktive filterværdier.
  const text = `${a.title} ${a.description} ${a.organization} ${a.city} ${a.jobCategory?.name || ""}`.toLowerCase();
  if (query && !text.includes(query.toLowerCase())) return false;

  const created = new Date(a.createdAt).getTime();
  const now = Date.now();

  return (
    (!f.kategori || a.jobCategory?.name?.toLowerCase() === f.kategori.toLowerCase()) &&
    (!f.region || a.region?.name.toLowerCase() === f.region.toLowerCase() || a.city.toLowerCase() === f.region.toLowerCase()) &&
    (!f.arbejdstid || a.workType?.type.toLowerCase() === f.arbejdstid.toLowerCase()) &&
    (!f.hjemmearbejde || a.workHome.toLowerCase() === f.hjemmearbejde.toLowerCase()) &&
    (!f.periode ||
      (f.periode === "Denne uge" && created >= now - 604800000) ||
      (f.periode === "Denne måned" && created >= now - 2592000000))
  );
}