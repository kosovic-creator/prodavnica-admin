/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProizvodi, deleteProizvod } from '@/lib/actions/proizvodi';
import { revalidatePath } from 'next/cache';

type Proizvod = {
  id: string;
  cena: number;
  slika: string | null;
  kolicina: number;
  kreiran: Date;
  naziv_sr: string | null;
  kategorija_sr: string | null;
};

export default async function ProizvodPage() {

  async function deleteAction(formData: FormData): Promise<void> {
    'use server';
    const proizvodId = formData.get('proizvodId');
    await deleteProizvod(proizvodId as string);
    revalidatePath('/proizvodi');
  }
  const page = 1;
  const pageSize = 50;
  const result = await getProizvodi(page, pageSize);

  if (!result.success || !result.data) {
    return <div className="text-center py-8 text-red-600">{result.error || 'Greška pri učitavanju proizvoda'}</div>;
  }

  const proizvodi: Proizvod[] = result.data.proizvodi.map((p: any) => ({
    id: p.id,
    cena: p.cena,
    slika: Array.isArray(p.slike) && p.slike.length > 0 ? p.slike[0] : null,
    kolicina: p.kolicina,
    kreiran: p.kreiran,
    naziv_sr: p.naziv_sr ?? null,
    kategorija_sr: p.kategorija_sr ?? null,
  }));

  // useFormState hook (client) možeš dodati u posebnu Client komponentu za prikaz greške, ali ovde prikazujemo samo server-side
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naziv</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategorija</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cena</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Na stanju</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcije</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proizvodi.map((proizvod) => (
                <tr key={proizvod.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {proizvod.naziv_sr}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {proizvod.kategorija_sr || 'Nema kategorije'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {proizvod.cena}€
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {proizvod.kolicina} kom
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <form action={deleteAction}>
                      <input type="hidden" name="proizvodId" value={proizvod.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        Obriši
                      </button>
                    </form>
                    {/* Dodaj dugmad za detalje/izmenu ako želiš kao linkove */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
