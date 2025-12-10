import ProizvodPageClient from "./ProizvodPageClient";
import ProizvodiSuccess from "./ProizvodiSuccess";
import ProizvodiSkeleton from "./ProizvodiSkeleton";
/* eslint-disable @typescript-eslint/no-explicit-any */



import { getProizvodi, deleteProizvod } from '@/lib/actions/proizvodi';
import { redirect } from 'next/navigation';

type ProizvodType = {
  id: string;
  cena: number;
  slika: string | null;
  kolicina: number;
  kreiran: Date;
  naziv_sr: string | null;
  kategorija_sr: string | null;
};

export default async function ProizvodPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  async function deleteAction(formData: FormData): Promise<void> {
    'use server';
    const proizvodId = formData.get('proizvodId');
    await deleteProizvod(proizvodId as string);
    redirect('/proizvodi?success=' + encodeURIComponent('Artikal je uspješno obrisan'));
  }
  const page = 1;
  const pageSize = 50;
  let proizvodi: ProizvodType[] = [];
  let successMsg = "";
  let errorMsg = "";
  let loading = false;
  try {
    const result = await getProizvodi(page, pageSize);
    const params = await searchParams;
    successMsg = params?.success || "";
    if (!result.success || !result.data) {
      errorMsg = result.error || "Greška pri učitavanju proizvoda";
    } else {
      proizvodi = result.data.proizvodi.map((p: any) => ({
        id: p.id,
        cena: p.cena,
        slika: Array.isArray(p.slike) && p.slike.length > 0 ? p.slike[0] : null,
        kolicina: p.kolicina,
        kreiran: p.kreiran,
        naziv_sr: p.naziv_sr ?? null,
        kategorija_sr: p.kategorija_sr ?? null,
      }));
    }
  } catch {
    loading = true;
  }

  return (
    <div className="p-6">
      <ProizvodiSuccess message={successMsg} />
      {loading ? (
        <ProizvodiSkeleton />
      ) : errorMsg ? (
        <div className="text-center py-8 text-red-600">{errorMsg}</div>
      ) : (
        <ProizvodPageClient proizvodi={proizvodi} deleteAction={deleteAction} />
      )}
    </div>
  );
}
