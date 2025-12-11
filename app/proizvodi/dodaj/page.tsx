import { redirect } from 'next/navigation';
// ...existing code...
import { createProizvod } from '@/lib/actions/proizvodi';
import { z } from 'zod';
import CloudinaryUploadField from '../izmeni/[id]/CloudinaryUploadField';
import Link from 'next/link';

export async function dodajProizvodAction(formData: FormData) {
    'use server';
    const schema = z.object({
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
        // Možeš dodati prikaz greške ili logovanje
        console.error(parsed.error);
        return;
    }
    await createProizvod({
        ...parsed.data,
        slike: parsed.data.slike ?? [],
    });
    redirect('/proizvodi');
// ...existing code...
}

export default function DodajProizvodPage() {
    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">Dodaj proizvod</h2>
                <form action={dodajProizvodAction} className="space-y-4">
                    <input type="text" name="naziv_sr" placeholder="Naziv (SR)" required className="input input-bordered w-full" />
                    <input type="text" name="naziv_en" placeholder="Naziv (EN)" required className="input input-bordered w-full" />
                    <textarea name="opis_sr" placeholder="Opis (SR)" className="textarea textarea-bordered w-full" />
                    <textarea name="opis_en" placeholder="Opis (EN)" className="textarea textarea-bordered w-full" />
                    <input type="text" name="karakteristike_sr" placeholder="Karakteristike (SR)" className="input input-bordered w-full" />
                    <input type="text" name="karakteristike_en" placeholder="Karakteristike (EN)" className="input input-bordered w-full" />
                    <input type="text" name="kategorija_sr" placeholder="Kategorija (SR)" required className="input input-bordered w-full" />
                    <input type="text" name="kategorija_en" placeholder="Kategorija (EN)" required className="input input-bordered w-full" />
                    <input type="number" name="cena" placeholder="Cena" required className="input input-bordered w-full" />
                    <input type="number" name="kolicina" placeholder="Količina" required className="input input-bordered w-full" />
                    <CloudinaryUploadField initialImages={[]} />
                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition w-full">Sačuvaj</button>
                        <Link href="/proizvodi" className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 transition w-full text-center">Odustani</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
