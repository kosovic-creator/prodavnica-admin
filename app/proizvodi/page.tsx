// ...existing code...
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { deleteProizvod } from '@/lib/actions/proizvodi';
import { redirect } from 'next/navigation';

export default async function ProizvodiPage() {
  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await deleteProizvod(id);
    redirect('/proizvodi');
  }

  const proizvodi = await prisma.proizvod.findMany();

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Proizvodi</h1>
        <Link href="/proizvodi/dodaj" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition mb-6 inline-block">Dodaj proizvod</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proizvodi.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 bg-white shadow flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-800">{p.naziv_sr}</div>
              <div className="text-gray-700">Cena: <span className="font-bold">{p.cena} RSD</span></div>
              <div className="text-gray-700">Količina: {p.kolicina}</div>
              <div className="text-gray-700">Kategorija: {p.kategorija_sr}</div>
              <div className="flex gap-2 mt-2">
                <Link href={`/proizvodi/izmeni/${p.id}`} className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition">Izmeni</Link>
                <form action={handleDelete}>
                  <input type="hidden" name="id" value={p.id} />
                  <button type="submit" className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Obriši</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
