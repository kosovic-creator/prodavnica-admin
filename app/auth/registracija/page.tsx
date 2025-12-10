
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registrujKorisnika } from '@/lib/actions';
import { registracijaSchema } from '@/zod';


export default function RegistracijaPage() {
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  async function handleRegistracija(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const lozinka = formData.get('lozinka') as string;
    const potvrdaLozinke = formData.get('potvrdaLozinke') as string;
    const ime = formData.get('ime') as string;
    const prezime = formData.get('prezime') as string;

    // Validacija sa zod
    const result = registracijaSchema.safeParse({
      email: email || '',
      lozinka: lozinka || '',
      ime: ime || '',
      prezime: prezime || '',
      uloga: 'admin', // default
    });
    if (!result.success) {
      const msg = result.error.issues[0]?.message || 'Greška pri validaciji.';
      setMessage(msg);
      return;
    }
    if (lozinka !== potvrdaLozinke) {
      setMessage('Lozinke se ne poklapaju');
      return;
    }

    const regResult = await registrujKorisnika({ email, lozinka, ime, prezime });
    if (!regResult.success) {
      setMessage(regResult.error || 'Greška pri registraciji.');
      return;
    }
    setSuccess(true);
    setMessage('Uspješna registracija! Prijavite se.');
    e.currentTarget.reset();
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/auth/prijava');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-center">
          Registracija
        </h1>
        {message && (
          <div className={`mb-4 text-center font-semibold ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
        )}
        <form onSubmit={handleRegistracija} className="space-y-4">
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              placeholder="Email adresa"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <input
              id="ime"
              name="ime"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              placeholder="Ime"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <input
              id="prezime"
              name="prezime"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              placeholder="Prezime"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <input
              id="lozinka"
              name="lozinka"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              placeholder="Lozinka"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg hover:border-blue-400 transition-colors">
            <input
              id="potvrdaLozinke"
              name="potvrdaLozinke"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md input-focushover:border-blue-400 transition-colors !input-focus!ring-0"
              placeholder="Potvrda lozinke"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Registruj se
          </button>
        </form>
      </div>
    </div>
  );
}


