import Link from 'next/link';
import { FaSave, FaTimes } from 'react-icons/fa';
import { getProizvodById } from '@/lib/actions/proizvodi';
import { izmeniProizvodAction } from './actions';

import CloudinaryUploadField from './CloudinaryUploadField';

export default async function IzmeniProizvodPage({ params }: { params: { id: string } }) {
  console.log("params:", params);
  const id = params.id;
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
    <form action={izmeniProizvodAction} className="flex flex-col gap-2 max-w-md">
      <h2 className="text-2xl text-blue-600 font-semibold mb-6">Izmeni proizvod</h2>
      <input type="hidden" name="id" value={form.id} />
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="naziv_sr">Naziv (Srpski)</label>
        <input
          id="naziv_sr"
          name="naziv_sr"
          defaultValue={form.naziv_sr || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="naziv_en">Naziv (Engleski)</label>
        <input
          id="naziv_en"
          name="naziv_en"
          defaultValue={form.naziv_en || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="opis_sr">Opis (Srpski)</label>
        <textarea
          id="opis_sr"
          name="opis_sr"
          defaultValue={form.opis_sr || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="opis_en">Opis (Engleski)</label>
        <textarea
          id="opis_en"
          name="opis_en"
          defaultValue={form.opis_en || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="karakteristike_sr">Karakteristike (Srpski)</label>
        <input
          id="karakteristike_sr"
          name="karakteristike_sr"
          defaultValue={form.karakteristike_sr || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="karakteristike_en">Karakteristike (Engleski)</label>
        <input
          id="karakteristike_en"
          name="karakteristike_en"
          defaultValue={form.karakteristike_en || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="kategorija_sr">Kategorija (Srpski)</label>
        <input
          id="kategorija_sr"
          name="kategorija_sr"
          defaultValue={form.kategorija_sr || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="kategorija_en">Kategorija (Engleski)</label>
        <input
          id="kategorija_en"
          name="kategorija_en"
          defaultValue={form.kategorija_en || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="cena">Cena</label>
        <input
          id="cena"
          name="cena"
          type="number"
          step="0.01"
          defaultValue={form.cena || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="kolicina">Količina</label>
        <input
          id="kolicina"
          name="kolicina"
          type="number"
          defaultValue={form.kolicina || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <CloudinaryUploadField initialImages={form.slike || []} />
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
        >
          <FaSave /> Sačuvaj
        </button>
        <Link
          href="/proizvodi"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition flex items-center gap-2 cursor-pointer"
        >
          <FaTimes /> Otkaži
        </Link>
      </div>
    </form>
  );
}