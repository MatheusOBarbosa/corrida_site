import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePace,
  formatTime,
  calculateOrderTotal,
  getKitPrice,
  filterResults,
  validateAthleteForm,
  generateRegistrationCode,
  type RunnerResult,
} from './raceLogic.ts';

test('calculatePace calculates correct pace min/km', () => {
  // 5km in 20 minutes (1200s) -> 4:00 min/km
  assert.equal(calculatePace(1200, 5), '04:00 min/km');

  // 10km in 45m 30s (2730s) -> 273s/km -> 4:33 min/km
  assert.equal(calculatePace(2730, 10), '04:33 min/km');

  // 21.097km in 1h 35m 00s (5700s) -> 270s/km -> 04:30 min/km
  assert.equal(calculatePace(5700, 21.097), '04:30 min/km');

  // Boundary cases
  assert.equal(calculatePace(0, 5), '00:00 min/km');
  assert.equal(calculatePace(1200, 0), '00:00 min/km');
});

test('formatTime formats seconds into hh:mm:ss properly', () => {
  assert.equal(formatTime(3665), '01:01:05');
  assert.equal(formatTime(1245), '00:20:45');
  assert.equal(formatTime(0), '00:00:00');
  assert.equal(formatTime(-10), '00:00:00');
});

test('calculateOrderTotal adds base, kit and optional add-ons correctly', () => {
  const result1 = calculateOrderTotal(99.9, 45.0, { medalEngraving: true, sportsInsurance: false });
  assert.equal(result1.subtotal, 144.9);
  assert.equal(result1.addOnsTotal, 25.0);
  assert.equal(result1.grandTotal, 169.9);

  const result2 = calculateOrderTotal(129.9, 120.0, { medalEngraving: true, sportsInsurance: true });
  assert.equal(result2.addOnsTotal, 40.0);
  assert.equal(result2.grandTotal, 289.9);
});

test('getKitPrice returns accurate pricing per kit tier', () => {
  assert.equal(getKitPrice('basico'), 0);
  assert.equal(getKitPrice('atleta'), 45.0);
  assert.equal(getKitPrice('vip'), 120.0);
});

test('filterResults filters runner search by bib, name or club', () => {
  const sampleData: RunnerResult[] = [
    {
      bib: '1042',
      name: 'Lucas Ferreira Mendes',
      gender: 'M',
      category: 'M30-34',
      distance: '10K',
      netTimeSeconds: 2310,
      grossTimeSeconds: 2335,
      overallRank: 14,
      genderRank: 12,
      categoryRank: 3,
      club: 'Equipe Alpha Runners',
      photosCount: 8,
    },
    {
      bib: '2088',
      name: 'Mariana Duarte Costa',
      gender: 'F',
      category: 'F25-29',
      distance: '21K',
      netTimeSeconds: 5410,
      grossTimeSeconds: 5422,
      overallRank: 32,
      genderRank: 4,
      categoryRank: 1,
      club: 'Assessoria Pace Real',
      photosCount: 14,
    },
    {
      bib: '5012',
      name: 'Carlos Eduardo Santos',
      gender: 'M',
      category: 'M40-44',
      distance: '5K',
      netTimeSeconds: 1180,
      grossTimeSeconds: 1195,
      overallRank: 8,
      genderRank: 8,
      categoryRank: 2,
      club: 'Nike Running Club SP',
      photosCount: 5,
    },
  ];

  // Filter by bib
  const byBib = filterResults('1042', 'all', sampleData);
  assert.equal(byBib.length, 1);
  assert.equal(byBib[0].name, 'Lucas Ferreira Mendes');

  // Filter by name fragment
  const byName = filterResults('Mariana', 'all', sampleData);
  assert.equal(byName.length, 1);
  assert.equal(byName[0].bib, '2088');

  // Filter by club
  const byClub = filterResults('Nike', 'all', sampleData);
  assert.equal(byClub.length, 1);
  assert.equal(byClub[0].name, 'Carlos Eduardo Santos');

  // Filter by distance
  const byDist = filterResults('', '21K', sampleData);
  assert.equal(byDist.length, 1);
  assert.equal(byDist[0].distance, '21K');
});

test('validateAthleteForm flags missing fields and accepts valid input', () => {
  const invalid = validateAthleteForm({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.cpf);
  assert.ok(invalid.errors.email);

  const valid = validateAthleteForm({
    fullName: 'Roberto Silva Junior',
    cpf: '123.456.789-00',
    birthDate: '1992-05-14',
    gender: 'M',
    email: 'roberto@email.com',
    phone: '11987654321',
    emergencyContact: 'Ana Silva',
    emergencyPhone: '11999998888',
    distance: '10K',
    kitType: 'atleta',
    tShirtSize: 'M',
    medalEngraving: false,
    sportsInsurance: true,
    agreedToTerms: true,
    paymentMethod: 'pix',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateRegistrationCode produces consistent format', () => {
  const code = generateRegistrationCode(7777);
  assert.equal(code, 'SN26-7777-SP');
});
