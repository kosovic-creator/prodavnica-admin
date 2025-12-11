import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { updateProizvod } from '@/lib/actions/proizvodi';
import CloudinaryUploadField from './CloudinaryUploadField';
import { z } from 'zod';

export async function izmeniProizvodAction(formData: FormData) {
  'use server';
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
    console.error(parsed.error);
    return;
  }
  await updateProizvod({
    ...parsed.data,
    slike: parsed.data.slike ?? [],
  });
  redirect('/proizvodi');
}

export default async function IzmeniProizvodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proizvod = await prisma.proizvod.findUnique({ where: { id } });
  if (!proizvod) {
    return <div className="text-red-600">Proizvod nije pronađen</div>;
  }
  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Izmeni proizvod</h2>
        <form action={izmeniProizvodAction} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <input type="text" name="naziv_sr" defaultValue={proizvod.naziv_sr} required className="input input-bordered w-full" />
          <input type="text" name="naziv_en" defaultValue={proizvod.naziv_en} required className="input input-bordered w-full" />
          <textarea name="opis_sr" defaultValue={proizvod.opis_sr || ''} className="textarea textarea-bordered w-full" />
          <textarea name="opis_en" defaultValue={proizvod.opis_en || ''} className="textarea textarea-bordered w-full" />
          <input type="text" name="karakteristike_sr" defaultValue={proizvod.karakteristike_sr || ''} className="input input-bordered w-full" />
          <input type="text" name="karakteristike_en" defaultValue={proizvod.karakteristike_en || ''} className="input input-bordered w-full" />
          <input type="text" name="kategorija_sr" defaultValue={proizvod.kategorija_sr} required className="input input-bordered w-full" />
          <input type="text" name="kategorija_en" defaultValue={proizvod.kategorija_en} required className="input input-bordered w-full" />
          <input type="number" name="cena" defaultValue={proizvod.cena} required className="input input-bordered w-full" />
          <input type="number" name="kolicina" defaultValue={proizvod.kolicina} required className="input input-bordered w-full" />
          <CloudinaryUploadField initialImages={proizvod.slike || []} />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition w-full">Sačuvaj</button>
            <a href="/proizvodi" className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 transition w-full text-center">Odustani</a>
          </div>
        </form>
      </div>
    </div>
  );
}
