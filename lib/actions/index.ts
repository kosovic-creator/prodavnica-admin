// Server Actions exports
export * from './korisnici';
export * from './proizvodi';
export * from './korpa';
export * from './omiljeni';
export * from './porudzbine';
export * from './podaci-preuzimanja';
export * from './payment';

import prisma from '../prisma';

export async function getStats() {
    const korisnici = await prisma.korisnik.count();
    const proizvodi = await prisma.proizvod.count();
    const porudzbine = await prisma.porudzbina.count();
    const prihodResult = await prisma.porudzbina.aggregate({
        _sum: { ukupno: true }
    });
    const prihod = prihodResult._sum.ukupno || 0;
    return { korisnici, proizvodi, porudzbine, prihod };
}