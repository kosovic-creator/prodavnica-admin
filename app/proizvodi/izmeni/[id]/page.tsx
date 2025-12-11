import Link from 'next/link';
import { FaSave, FaTimes } from 'react-icons/fa';
import { getProizvodById } from '@/lib/actions/proizvodi';
import { redirect } from 'next/navigation';
import { updateProizvod } from '@/lib/actions/proizvodi';
export async function izmeniProizvodAction(formData: FormData) {
  const id = formData.get("id") as string;
  console.log("ID iz forme:", id);
  if (!id) {
    console.error("ID nije prosleđen u izmeniProizvodAction");
    return;
  }
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
    return;
  }
  // Ako nije success, samo loguj, ne vraćaj ništa
  if (result.error) {
    console.error("Greška pri izmeni proizvoda:", result.error);
  }
  return;
}

import CloudinaryUploadField from './CloudinaryUploadField';

export default async function IzmeniProizvodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log("id:", id);
  const result = await getProizvodById(id);

  if (!result.success || !result.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">Proizvod nije pronađen</div>
      </div>
    );
  }

  const form = result.data;

  return (
    <form action={izmeniProizvodAction}>
      <input type="text" name="test" defaultValue="test" />
      <button type="submit">Test</button>
    </form>
  );
}