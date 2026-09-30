import assert from 'node:assert/strict';
import { test } from 'node:test';
import { site } from './site.ts';

test('tagline is the brand tagline, with the heritage line kept as secondary', () => {
  assert.equal(site.tagline, 'Going for Christ, Growing in Christ');
  assert.equal(site.heritageLine, 'A family of faith in Candelaria — since 1970.');
});

test('services use the full names and leave out the midweek service', () => {
  assert.deepEqual(
    site.services.map((s) => `${s.day} · ${s.name} · ${s.time}`),
    ['Sunday · Sunday Worship Service · 7:30 AM', 'Friday · Friday Prayer Meeting · 6:00 PM'],
  );
});

test('address, phone, and email match the brand guide', () => {
  assert.equal(site.address.line1, 'Bansalagin St.');
  assert.equal(site.address.line2, 'Bgy. Pahinga Norte');
  assert.equal(site.contact.phone, '042-585-8829');
  assert.equal(site.contact.phoneHref, 'tel:+63425858829');
  assert.equal(site.contact.email, 'hello@candelbap.church');
});

test('every social link uses the candelbap.church handle', () => {
  for (const key of ['facebook', 'instagram', 'youtube', 'messenger']) {
    assert.match(site.contact[key], /candelbap\.church/, key);
  }
});
