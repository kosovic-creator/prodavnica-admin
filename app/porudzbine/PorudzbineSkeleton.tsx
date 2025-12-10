"use client";

export default function PorudzbineSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Broj</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Korisnik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ukupno</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Akcije</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(8)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-20" /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-200 rounded w-20" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
