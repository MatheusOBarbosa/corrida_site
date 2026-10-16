/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RunnerResult {
  bib: string;
  name: string;
  gender: 'M' | 'F';
  category: string;
  distance: '5K' | '10K' | '21K';
  netTimeSeconds: number;
  grossTimeSeconds: number;
  overallRank: number;
  genderRank: number;
  categoryRank: number;
  split5kSeconds?: number;
  split10kSeconds?: number;
  club?: string;
  photosCount: number;
}

export interface AthleteFormData {
  fullName: string;
  cpf: string;
  birthDate: string;
  gender: 'M' | 'F' | '';
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  runningClub?: string;
  distance: '3K' | '5K' | '10K' | '21K';
  kitType: 'basico' | 'atleta' | 'vip';
  tShirtSize: 'BL-M' | 'BL-G' | 'P' | 'M' | 'G' | 'GG';
  medalEngraving: boolean;
  sportsInsurance: boolean;
  agreedToTerms: boolean;
  paymentMethod: 'pix' | 'credit_card';
}

/**
 * Calculates running pace in mm:ss /km format given elapsed seconds and distance in kilometers.
 */
export function calculatePace(timeInSeconds: number, distanceInKm: number): string {
  if (distanceInKm <= 0 || timeInSeconds <= 0) return '00:00 min/km';
  const paceSeconds = Math.round(timeInSeconds / distanceInKm);
  const minutes = Math.floor(paceSeconds / 60);
  const remainingSeconds = paceSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(remainingSeconds)} min/km`;
}

/**
 * Formats seconds into HH:MM:SS format.
 */
export function formatTime(totalSeconds: number): string {
  if (totalSeconds < 0) return '00:00:00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Calculates order subtotal, add-ons, and final sum.
 */
export function calculateOrderTotal(
  basePrice: number,
  kitSurcharge: number,
  addOns: { medalEngraving?: boolean; sportsInsurance?: boolean } = {}
): { subtotal: number; addOnsTotal: number; grandTotal: number } {
  const subtotal = Math.max(0, basePrice) + Math.max(0, kitSurcharge);
  let addOnsTotal = 0;
  if (addOns.medalEngraving) addOnsTotal += 25.0;
  if (addOns.sportsInsurance) addOnsTotal += 15.0;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    addOnsTotal: Math.round(addOnsTotal * 100) / 100,
    grandTotal: Math.round((subtotal + addOnsTotal) * 100) / 100,
  };
}

/**
 * Computes kit surcharge based on kit tier.
 */
export function getKitPrice(kitType: 'basico' | 'atleta' | 'vip'): number {
  switch (kitType) {
    case 'basico':
      return 0; // included in base price
    case 'atleta':
      return 45.0; // camisa pro + viseira + sacochila
    case 'vip':
      return 120.0; // acesso vip lounge + corta-vento + largada especial
    default:
      return 0;
  }
}

/**
 * Filters race results by query (bib or runner name) and optional category/distance.
 */
export function filterResults(
  query: string,
  distanceFilter: string,
  results: RunnerResult[]
): RunnerResult[] {
  const cleanQuery = query.trim().toLowerCase();
  return results.filter((runner) => {
    const matchesDistance = !distanceFilter || distanceFilter === 'all' || runner.distance === distanceFilter;
    if (!matchesDistance) return false;

    if (!cleanQuery) return true;
    const matchesBib = runner.bib.toLowerCase().includes(cleanQuery);
    const matchesName = runner.name.toLowerCase().includes(cleanQuery);
    const matchesClub = runner.club?.toLowerCase().includes(cleanQuery) || false;

    return matchesBib || matchesName || matchesClub;
  });
}

/**
 * Validates registration form fields.
 */
export function validateAthleteForm(
  data: Partial<AthleteFormData>
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 5) {
    errors.fullName = 'Informe o nome completo do atleta';
  }

  // Basic CPF format check
  const cleanCpf = (data.cpf || '').replace(/\D/g, '');
  if (cleanCpf.length !== 11) {
    errors.cpf = 'CPF deve conter 11 dígitos';
  }

  if (!data.birthDate) {
    errors.birthDate = 'Informe a data de nascimento';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'E-mail válido é obrigatório';
  }

  const cleanPhone = (data.phone || '').replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    errors.phone = 'Telefone para contato é obrigatório (mínimo 10 dígitos)';
  }

  if (!data.emergencyPhone) {
    errors.emergencyPhone = 'Telefone de emergência é obrigatório';
  }

  if (!data.distance) {
    errors.distance = 'Selecione uma distância para correr';
  }

  if (!data.kitType) {
    errors.kitType = 'Escolha um kit do evento';
  }

  if (!data.tShirtSize && data.kitType !== 'basico') {
    errors.tShirtSize = 'Selecione o tamanho da camiseta';
  }

  if (!data.agreedToTerms) {
    errors.agreedToTerms = 'É obrigatório aceitar o Regulamento e Termo de Responsabilidade';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an authentic ticket registration voucher code (e.g. SN26-8942-BR)
 */
export function generateRegistrationCode(seed?: number): string {
  const val = seed ?? Math.floor(1000 + Math.random() * 9000);
  return `SN26-${val}-SP`;
}
