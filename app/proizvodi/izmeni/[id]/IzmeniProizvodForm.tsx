"use client";
import React from 'react';
import { updateProizvod } from '@/lib/actions/proizvodi';
import SuccessMessage from '@/app/components/SuccessMessage';
import CloudinaryUploadField from './CloudinaryUploadField';
import { z } from 'zod';

export default function IzmeniProizvodForm({ proizvod }: { proizvod: any }) {
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(null);
    setError(null);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const schema = z.object({
      id: z.string().uuid(),
      naziv_sr: z.string().min(2),
      naziv_en: z.string().min(2),
      opis_sr: z.string().optional(),
      opis_en: z.string().optional(),
      karakteristike_sr: z.string().optional(),
      karakteristike_en: z.string().optional(),
      kategorija_sr: z.string().min(2),
      kategorija_en: z.string().min(2),
      cena: z.coerce.number().min(1),
      kolicina: z.coerce.number().min(0),
      slike: z.array(z.string()).optional(),
    });
    const data = {
      id: formData.get('id'),
      naziv_sr: formData.get('naziv_sr'),
      naziv_en: formData.get('naziv_en'),
      opis_sr: formData.get('opis_sr'),
      opis_en: formData.get('opis_en'),
      karakteristike_sr: formData.get('karakteristike_sr'),
      karakteristike_en: formData.get('karakteristike_en'),
      kategorija_sr: formData.get('kategorija_sr'),
      kategorija_en: formData.get('kategorija_en'),
      cena: formData.get('cena'),
      kolicina: formData.get('kolicina'),
      slike: formData.getAll('slike').filter(Boolean),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setError('Greška u validaciji podataka.');
      setLoading(false);
      return;
    }
    try {
      const res = await updateProizvod({
        ...parsed.data,
        slike: parsed.data.slike ?? [],
      });
      if (res?.success) {
        setSuccess('Proizvod je uspešno izmenjen!');
        setTimeout(() => {
          window.location.href = '/proizvodi';
        }, 3000);
      } else {
        setError(res?.error || 'Greška pri izmeni proizvoda.');
      }
    } catch (e) {
      setError('Greška pri izmeni proizvoda.');
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Izmeni proizvod</h2>
      {success && <SuccessMessage message={success} />}
      {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="hidden" name="id" value={proizvod.id} />
        <div>
          <label className="block text-sm font-medium mb-1">Naziv (SR)</label>
          <input type="text" name="naziv_sr" defaultValue={proizvod.naziv_sr} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Naziv (EN)</label>
          <input type="text" name="naziv_en" defaultValue={proizvod.naziv_en} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opis (SR)</label>
          <textarea name="opis_sr" defaultValue={proizvod.opis_sr || ''} className="textarea textarea-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opis (EN)</label>
          <textarea name="opis_en" defaultValue={proizvod.opis_en || ''} className="textarea textarea-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Karakteristike (SR)</label>
          <input type="text" name="karakteristike_sr" defaultValue={proizvod.karakteristike_sr || ''} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Karakteristike (EN)</label>
          <input type="text" name="karakteristike_en" defaultValue={proizvod.karakteristike_en || ''} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategorija (SR)</label>
          <input type="text" name="kategorija_sr" defaultValue={proizvod.kategorija_sr} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategorija (EN)</label>
          <input type="text" name="kategorija_en" defaultValue={proizvod.kategorija_en} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cena</label>
          <input type="number" name="cena" defaultValue={proizvod.cena} required className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Količina</label>
          <input type="number" name="kolicina" defaultValue={proizvod.kolicina} required className="input input-bordered w-full" />
        </div>
        <div className="md:col-span-2">
          <CloudinaryUploadField initialImages={proizvod.slike || []} />
        </div>
        <div className="md:col-span-2 flex gap-2 mt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition w-full">{loading ? 'Čuvam...' : 'Sačuvaj'}</button>
          <a href="/proizvodi" className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 transition w-full text-center">Odustani</a>
        </div>
      </form>
    </div>
  );
}