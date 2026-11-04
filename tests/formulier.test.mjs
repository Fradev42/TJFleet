// Test van de formulierlogica: node tests/formulier.test.mjs
import assert from 'node:assert/strict';
import { leesFormulier, controleer, isSpam, bouwEmail, bouwBevestiging } from '../src/lib/formulier-logica.js';

const fd = (o) => { const f = new FormData(); for (const [k, v] of Object.entries(o)) f.append(k, v); return f; };

let g = leesFormulier(fd({ naam: '  Jan Peeters ', telefoon: '0470 12 34 56', aantal_wagens: '4-9', voorkeursmoment: 'namiddag', boodschap: 'Graag\r\nbellen' }));
assert.equal(g.naam, 'Jan Peeters');
assert.deepEqual(controleer(g), []);
assert.equal(isSpam(g), false);
assert.deepEqual(controleer(leesFormulier(fd({ naam: '', telefoon: 'abc' }))), ['naam', 'telefoon']);
assert.ok(controleer(leesFormulier(fd({ naam: 'A', telefoon: '123' }))).includes('telefoon'), 'te weinig cijfers');
assert.deepEqual(controleer(leesFormulier(fd({ naam: 'A', telefoon: '+32 470 12 34 56' }))), []);
assert.ok(controleer(leesFormulier(fd({ naam: 'A', telefoon: '0470123456', voorkeursmoment: 'nacht' }))).includes('voorkeursmoment'));
assert.ok(controleer(leesFormulier(fd({ naam: 'A', telefoon: '0470123456', email: 'geen-mail' }))).includes('email'));
assert.equal(isSpam(leesFormulier(fd({ naam: 'Bot', telefoon: '0470123456', website: 'http://spam' }))), true);
const m = bouwEmail(leesFormulier(fd({ naam: 'Eve\r\nBcc: x@y.z', telefoon: '0470123456', email: 'a@b.be' })));
assert.equal(m.onderwerp, 'Kennismaking aangevraagd: Eve Bcc: x@y.z');
assert.equal(m.antwoordAan, 'a@b.be');
assert.match(m.tekst, /Beste belmoment: -/);
const info = { naam: 'APEX Collection Care', telefoon: '0473 76 09 09', email: 'info@apexcollectioncare.be' };
assert.equal(bouwBevestiging(leesFormulier(fd({ naam: 'A', telefoon: '0470123456' })), info), undefined, 'geen e-mail, geen bevestiging');
const b = bouwBevestiging(leesFormulier(fd({ naam: 'Spam tekst http://x', telefoon: '0470123456', email: 'a@b.be', boodschap: 'koop nu' })), info);
assert.equal(b.aan, 'a@b.be');
assert.ok(!b.tekst.includes('Spam') && !b.tekst.includes('koop'), 'geen ingevulde tekst in de bevestiging');
console.log('Alle formuliertests geslaagd.');
