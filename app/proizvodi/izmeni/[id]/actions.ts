"use server";
import { updateProizvod } from "@/lib/actions/proizvodi";
import { redirect } from "next/navigation";

export async function izmeniProizvodAction(formData: FormData) {
  const id = formData.get("id") as string;
  const naziv_sr = formData.get("naziv_sr") as string;
  const naziv_en = formData.get("naziv_en") as string;
  const opis_sr = formData.get("opis_sr") as string;
  const opis_en = formData.get("opis_en") as string;
  const karakteristike_sr = formData.get("karakteristike_sr") as string;
  const karakteristike_en = formData.get("karakteristike_en") as string;
  const kategorija_sr = formData.get("kategorija_sr") as string;
  const kategorija_en = formData.get("kategorija_en") as string;
  const cena = formData.get("cena") as string;
  const kolicina = formData.get("kolicina") as string;
  const slike = formData.getAll("slike").filter(Boolean) as string[];

  const result = await updateProizvod({
    id,
    naziv_sr,
    naziv_en,
    opis_sr,
    opis_en,
    karakteristike_sr,
    karakteristike_en,
    kategorija_sr,
    kategorija_en,
    cena: Number(cena),
    kolicina: kolicina ? Number(kolicina) : undefined,
    slike,
  });

  if (result.success) {
    redirect("/proizvodi");
    // Do not return anything after redirect
    return;
  }
  // Optionally, handle error (e.g., show toast, log, etc.), but do not return a value
  // No return statement here
}
