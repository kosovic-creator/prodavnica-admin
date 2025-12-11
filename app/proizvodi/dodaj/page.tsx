"use client";
import React from 'react';
import CloudinaryUploadField from '../izmeni/[id]/CloudinaryUploadField';
import Link from 'next/link';
import { dodajProizvodAction } from './action';
import SuccessMessage from '@/app/components/SuccessMessage';


export default function DodajProizvodPage() {
    // Tailwind tab state
    const [tab, setTab] = React.useState<'sr' | 'en'>('sr');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                window.location.href = '/proizvodi';
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        try {
            await dodajProizvodAction(formData);
            setSuccess(true);
        } catch (err) {
            setError('Došlo je do greške prilikom dodavanja proizvoda.');
        }
        }

    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">Dodaj proizvod</h2>
                    {success && <SuccessMessage message="Proizvod je uspešno dodat!" />}
                    {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">{error}</div>}
                    <div className="mb-6">
                        <div className="flex gap-2 border-b">
                            <button type="button" onClick={() => setTab('sr')} className={`px-4 py-2 font-semibold ${tab === 'sr' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500'}`}>Srpski</button>
                            <button type="button" onClick={() => setTab('en')} className={`px-4 py-2 font-semibold ${tab === 'en' ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500'}`}>Engleski</button>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {tab === 'sr' && (
                            <>
                                <input type="text" name="naziv_sr" placeholder="Naziv (SR)" required className="input input-bordered w-full" />
                                <textarea name="opis_sr" placeholder="Opis (SR)" className="textarea textarea-bordered w-full" />
                                <input type="text" name="karakteristike_sr" placeholder="Karakteristike (SR)" className="input input-bordered w-full" />
                                <input type="text" name="kategorija_sr" placeholder="Kategorija (SR)" required className="input input-bordered w-full" />
                            </>
                        )}
                        {tab === 'en' && (
                            <>
                                <input type="text" name="naziv_en" placeholder="Naziv (EN)" required className="input input-bordered w-full" />
                                <textarea name="opis_en" placeholder="Opis (EN)" className="textarea textarea-bordered w-full" />
                                <input type="text" name="karakteristike_en" placeholder="Karakteristike (EN)" className="input input-bordered w-full" />
                                <input type="text" name="kategorija_en" placeholder="Kategorija (EN)" required className="input input-bordered w-full" />
                            </>
                        )}
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
