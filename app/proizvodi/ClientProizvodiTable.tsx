"use client";
import React from "react";
import { deleteProizvod } from "@/lib/actions/proizvodi";
import Link from "next/link";
import SuccessMessage from "@/app/components/SuccessMessage";

type Proizvod = {
  id: string;
  naziv_sr: string;
  naziv_en: string;
  cena: number;
  // Add other fields as needed
};

interface Props {
  proizvodi: Proizvod[];
  total: number;
  totalPages: number;
  page: number;
}

const ClientProizvodiTable: React.FC<Props> = ({ proizvodi, total, totalPages, page }) => {
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?")) return;
    setLoadingId(id);
    const res = await deleteProizvod(id);
    setLoadingId(null);
    if (res?.success) {
      setSuccess(res.message || "Proizvod je uspešno obrisan");
      setTimeout(() => {
        window.location.href = "/proizvodi?success=Proizvod+je+uspešno+obrisan";
      }, 1500);
    } else {
      setError(res?.error || "Greška pri brisanju proizvoda");
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) {
      setSuccess(params.get("success")!);
      setTimeout(() => {
        window.location.href = "/proizvodi";
      }, 3000);
    }
    if (params.get("error")) {
      setError(params.get("error")!);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {success && <SuccessMessage message={success} />}
      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">{error}</div>
      )}
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Upravljanje proizvodima</h1>
        <p className="text-gray-600 mt-2">Dodaj, izmijeni ili ukloni proizvode iz prodavnice</p>
      </div>
      {/* Navigation tabs */}
      <div className="flex items-center gap-4 mb-6 border-b pb-2">
        <Link href="/proizvodi" className="text-blue-700 font-semibold border-b-2 border-blue-700 pb-1">Svi proizvodi</Link>
        <Link href="/proizvodi/dodaj" className="text-gray-500 hover:text-blue-700">+ Dodaj proizvod</Link>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naziv (SR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naziv (EN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cena</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcije</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proizvodi.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">Nema proizvoda.</td>
              </tr>
            ) : (
              proizvodi.map((proizvod) => (
                <tr key={proizvod.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{proizvod.naziv_sr}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proizvod.naziv_en}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proizvod.cena} RSD</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <Link href={`/proizvodi/izmeni/${proizvod.id}`} className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold">Izmeni</Link>
                    <button
                      onClick={() => handleDelete(proizvod.id)}
                      disabled={loadingId === proizvod.id}
                      className={`px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold ${loadingId === proizvod.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loadingId === proizvod.id ? 'Brišem...' : 'Obriši'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Paginate and info */}
      <div className="flex items-center justify-between mt-6">
        <span>Ukupno proizvoda: {total} | Stranica {page} od {totalPages}</span>
        <div className="flex gap-2">
          <Link
            href={`/proizvodi?page=${page - 1}`}
            className={`px-3 py-1 rounded border ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : 0}
          >
            Prethodna
          </Link>
          <Link
            href={`/proizvodi?page=${page + 1}`}
            className={`px-3 py-1 rounded border ${page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : 0}
          >
            Sledeća
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientProizvodiTable;