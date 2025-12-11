// ...existing code...
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteProizvod } from '@/lib/actions/proizvodi';
import { redirect } from 'next/navigation';

export default async function ProizvodiPage() {
  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await deleteProizvod(id);
    redirect('/proizvodi');
  }

  // Paginacija
  const searchParams = (typeof window === 'undefined' ? {} : window.location.search);
  const urlParams = new URLSearchParams(searchParams);
  const page = parseInt(urlParams.get('page') || '1', 10);
  const pageSize = 10;
  const total = await prisma.proizvod.count();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const proizvodi = await prisma.proizvod.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { naziv_sr: 'asc' },
  });

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Proizvodi</h1>
        <Link href="/proizvodi/dodaj" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition mb-6 inline-block">Dodaj proizvod</Link>
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naziv</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cena</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Količina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategorija</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcije</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proizvodi.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-800">{p.naziv_sr}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{p.cena} RSD</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{p.kolicina}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{p.kategorija_sr}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link href={`/proizvodi/izmeni/${p.id}`} className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition text-xs font-semibold">Izmeni</Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs font-semibold">Obriši</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginacija info i kontrole */}
        <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
          <span>Ukupno proizvoda: {total} | Stranica {page} od {totalPages}</span>
          <div className="flex gap-2">
            <Link href={`/proizvodi?page=${page - 1}`} className={`px-3 py-1 rounded border ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 hover:bg-blue-50'}`}>Prethodna</Link>
            <Link href={`/proizvodi?page=${page + 1}`} className={`px-3 py-1 rounded border ${page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 hover:bg-blue-50'}`}>Sledeća</Link>
          </div>
        </div>
      </div>
    </>
  );
}
