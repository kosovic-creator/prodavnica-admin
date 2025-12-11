import prisma from '@/lib/prisma';

import IzmeniProizvodForm from './IzmeniProizvodForm';

export default async function IzmeniProizvodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proizvod = await prisma.proizvod.findUnique({ where: { id } });
  if (!proizvod) {
    return <div className="text-red-600">Proizvod nije pronađen</div>;
  }
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <IzmeniProizvodForm proizvod={proizvod} />
    </div>
  );
}
