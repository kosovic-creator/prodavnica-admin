"use client";
import { useState, useTransition } from "react";
import { useTranslation } from 'react-i18next';
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { registrujKorisnika } from '../../../lib/actions';

interface RegistracijaClientProps {
  lang: string;
}

export default function RegistracijaClient({ lang }: RegistracijaClientProps) {


  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    email: "",
    lozinka: "",
    potvrdaLozinke: "",
    ime: "",
    prezime: ""
  });
  const { email, lozinka, potvrdaLozinke, ime, prezime } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !lozinka || !potvrdaLozinke || !ime || !prezime) {
      toast.error('Popunite sva polja');
      return;
    }
    if (lozinka !== potvrdaLozinke) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }
    startTransition(async () => {
      try {
        const result = await registrujKorisnika({
          email,
          lozinka,
          ime,
          prezime
        });
        if (!result.success) {
          toast.error(result.error || 'Došlo je do greške tokom registracije.');
          return;
        }
        toast.success('Uspešno ste se registrovali');
        router.push('/auth/prijava');
      } catch (error) {
        console.error('Registration error:', error);
        toast.error('Došlo je do greške tokom registracije.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <Toaster position="top-right" />
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-center">
          <FaUserPlus className="text-blue-600" />
          {'Registracija'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <FaEnvelope className="text-blue-600 text-lg shrink-0" />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              value={email}
              onChange={handleChange}
              placeholder="Email adresa"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <FaUser className="text-blue-600 text-lg shrink-0" />
            <input
              id="ime"
              name="ime"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              value={ime}
              onChange={handleChange}
              placeholder="Ime"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <FaUser className="text-blue-600 text-lg shrink-0" />
            <input
              id="prezime"
              name="prezime"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              value={prezime}
              onChange={handleChange}
              placeholder="Prezime"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <FaLock className="text-blue-600 text-lg shrink-0" />
            <input
              id="lozinka"
              name="lozinka"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              value={lozinka}
              onChange={handleChange}
              placeholder="Lozinka"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <FaLock className="text-blue-600 text-lg shrink-0" />
            <input
              id="potvrdaLozinke"
              name="potvrdaLozinke"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              value={potvrdaLozinke}
              onChange={handleChange}
              placeholder="Potvrda lozinke"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? 'Učitavanje...' : 'Registruj se'}
          </button>
        </form>
      </div>
    </div>
  );
}
