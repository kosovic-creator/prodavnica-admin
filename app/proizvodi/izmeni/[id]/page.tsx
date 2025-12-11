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
    <form action={izmeniProizvodAction} className="p-6 space-y-4">
      <input type="hidden" name="id" value={id} />
      <input type="text" name="naziv_sr" defaultValue={proizvod.naziv_sr} required />
      <input type="text" name="naziv_en" defaultValue={proizvod.naziv_en} required />
      <textarea name="opis_sr" defaultValue={proizvod.opis_sr || ''} />
      <textarea name="opis_en" defaultValue={proizvod.opis_en || ''} />
      <input type="text" name="karakteristike_sr" defaultValue={proizvod.karakteristike_sr || ''} />
      <input type="text" name="karakteristike_en" defaultValue={proizvod.karakteristike_en || ''} />
      <input type="text" name="kategorija_sr" defaultValue={proizvod.kategorija_sr} required />
      <input type="text" name="kategorija_en" defaultValue={proizvod.kategorija_en} required />
      <input type="number" name="cena" defaultValue={proizvod.cena} required />
      <input type="number" name="kolicina" defaultValue={proizvod.kolicina} required />
      <CloudinaryUploadField initialImages={proizvod.slike || []} />
      <button type="submit" className="btn btn-primary">Sačuvaj</button>
    </form>
  );
}
