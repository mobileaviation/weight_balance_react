export function KgToLbs(kg) { return 2.20462262 * kg; }

export function LbsToKg(lbs) { return lbs / 2.20462262; }

export function GalToLiter(gal) { return 3.78541178 * gal; }

export function LiterToGal(ltr) {return ltr / 3.78541178; }

export function LiterToKgAvGas(liter) { return 0.719 * liter; }

export function GalToKgAvGas(gal) { return LiterToKgAvGas(GalToLiter(gal)); }

export function GalToLbsAvGas(gal) { return KgToLbs(GalToKgAvGas(gal)); }

export function LtrToLbsAvGas(ltr) { return GalToLbsAvGas(LiterToGal(ltr)); }