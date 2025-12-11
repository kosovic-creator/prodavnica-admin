'use server';
import { redirect } from 'next/navigation';
import { createProizvod } from '@/lib/actions/proizvodi';
import { z } from 'zod';

export async function dodajProizvodAction(formData: FormData) {
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
        console.error(parsed.error);
        return;
    }
    await createProizvod({
        ...parsed.data,
        slike: parsed.data.slike ?? [],
    });
    redirect('/proizvodi');
}
