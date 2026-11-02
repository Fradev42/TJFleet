// Snelle test van de formulierlogica (zonder Cloudflare): node test.mjs
import assert from 'node:assert/strict';
import { leesFormulier, controleer, isSpam, bouwEmail } from './src/logica.js';

const fd = (o) => { const f = new FormData(); for (const [k, v] of Object.entries(o)) f.append(k, v); return f; };

let g = leesFormulier(fd({ naam: '  Jan Peeters ', telefoon: '0470 12 34 56', aantal_wagens: '4-9', voorkeursmoment: 'namiddag', boodschap: 'Graag\r\nbellen', _gotcha: '' }));
assert.equal(g.naam, 'Jan Peeters');
assert.deepEqual(controleer(g), []);
assert.equal(isSpam(g), false);

assert.deepEqual(controleer(leesFormulier(fd({ naam: '', telefoon: 'abc' }))), ['naam', 'telefoon']);
assert.ok(controleer(leesFormulier(fd({ naam: 'A', telefoon: '0470123456', voorkeursmoment: 'nacht' }))).includes('voorkeursmoment'));
assert.ok(controleer(leesFormulier(fd({ naam: 'A', telefoon: '0470123456', email: 'geen-mail' }))).includes('email'));
assert.equal(isSpam(leesFormulier(fd({ naam: 'Bot', telefoon: '0470123456', _gotcha: 'http://spam' }))), true);

// Kopinjectie via naam of e-mail mag geen extra koppen opleveren.
g = leesFormulier(fd({ naam: 'Eve\r\nBcc: x@y.z', telefoon: '0470123456', email: 'a@b.be' }));
const mail = bouwEmail({ van: 'website@voorbeeld.be', naar: 'info@voorbeeld.be', gegevens: g, nu: new Date('2026-11-02T10:00:00Z'), id: 'test' });
const [koppen, lichaam] = mail.split('\r\n\r\n');
assert.ok(!/^Bcc:/mi.test(koppen), 'geen Bcc-kop');
assert.match(koppen, /^Reply-To: <a@b\.be>$/m);
assert.match(koppen, /^Message-ID: <test@voorbeeld\.be>$/m);
const tekst = new TextDecoder().decode(Uint8Array.from(atob(lichaam.replace(/\r\n/g, '')), (c) => c.charCodeAt(0)));
assert.match(tekst, /Telefoonnummer: 0470123456/);
assert.match(tekst, /^Naam: Eve Bcc: x@y\.z$/m, 'naam op één regel');
assert.match(tekst, /Wanneer bellen we best: -/);
console.log('Alle tests geslaagd.\n---\n' + koppen + '\n---\n' + tekst);
