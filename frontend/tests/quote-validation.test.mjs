import assert from "node:assert/strict";
import test from "node:test";
import { MESSAGE_MAX_LENGTH, normalizeTurkishMobilePhone, validateQuoteRequest } from "../src/lib/quote-request.ts";

const slugs = ["ppf-kaplama", "seramik-kaplama", "detailing"];
const valid = { customerName: "Kurgu Test Kullanıcısı", phone: "0500 000 00 00", email: "", vehicleBrand: "Örnek Marka", vehicleModel: "Deneme Modeli", vehicleYear: "", serviceSlug: "ppf-kaplama", message: "" };
const validate = (values) => validateQuoteRequest(values, slugs, 2026);

test("required fields and whitespace-only values", () => {
  const empty = Object.fromEntries(Object.keys(valid).map((key) => [key, " "]));
  assert.deepEqual(Object.keys(validate(empty)), ["customerName", "phone", "vehicleBrand", "vehicleModel", "serviceSlug"]);
});

test("common Turkish mobile formats normalize consistently", () => {
  for (const phone of ["0500 000 00 00", "+90 (500) 000-00-00", "5000000000", "905000000000", "00905000000000"]) {
    assert.equal(normalizeTurkishMobilePhone(phone), "+905000000000");
    assert.deepEqual(validate({ ...valid, phone }), {});
  }
  for (const phone of ["02120000000", "+15000000000", "123", "abc05000000000", "++905000000000", "050000000000", "", "5e90000000"]) {
    assert.equal(normalizeTurkishMobilePhone(phone), null);
    assert.ok(validate({ ...valid, phone }).phone);
  }
});

test("optional email and model year are validated when provided", () => {
  assert.deepEqual(validate(valid), {});
  for (const email of ["invalid", "name@", "a b@example.test"]) assert.ok(validate({ ...valid, email }).email);
  assert.deepEqual(validate({ ...valid, email: "kurgu@example.test" }), {});
  for (const vehicleYear of ["1899", "2028", "9999", "20.5", "2e03", "0000"]) assert.ok(validate({ ...valid, vehicleYear }).vehicleYear);
  for (const vehicleYear of ["1900", "2026", "2027"]) assert.deepEqual(validate({ ...valid, vehicleYear }), {});
});

test("service allowlist, message boundary and text limits", () => {
  for (const serviceSlug of slugs) assert.deepEqual(validate({ ...valid, serviceSlug }), {});
  assert.ok(validate({ ...valid, serviceSlug: "unknown" }).serviceSlug);
  assert.deepEqual(validate({ ...valid, message: "x".repeat(MESSAGE_MAX_LENGTH) }), {});
  assert.ok(validate({ ...valid, message: "x".repeat(MESSAGE_MAX_LENGTH + 1) }).message);
  for (const [field, length] of [["customerName", 101], ["vehicleBrand", 61], ["vehicleModel", 81]]) {
    assert.ok(validate({ ...valid, [field]: "x".repeat(length) })[field]);
  }
});
