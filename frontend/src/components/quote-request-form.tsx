"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  MESSAGE_MAX_LENGTH, normalizeTurkishMobilePhone, validateQuoteRequest,
  type QuoteErrors, type QuoteField, type QuoteRequestValues, type QuoteServiceOption,
} from "@/lib/quote-request";

type InputField = {
  name: Exclude<QuoteField, "serviceSlug" | "message">;
  label: string;
  type: "text" | "tel" | "email";
  required?: boolean;
  maxLength: number;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email";
  hint?: string;
  wide?: boolean;
};

const customerFields: InputField[] = [
  { name: "customerName", label: "Ad Soyad", type: "text", required: true, maxLength: 100, autoComplete: "name", wide: true },
  { name: "phone", label: "Telefon", type: "tel", required: true, maxLength: 32, autoComplete: "tel", inputMode: "tel", hint: "05xx xxx xx xx veya +90 5xx xxx xx xx." },
  { name: "email", label: "E-posta", type: "email", maxLength: 254, autoComplete: "email", inputMode: "email" },
];
const vehicleFields: InputField[] = [
  { name: "vehicleBrand", label: "Araç markası", type: "text", required: true, maxLength: 60 },
  { name: "vehicleModel", label: "Araç modeli", type: "text", required: true, maxLength: 80 },
  { name: "vehicleYear", label: "Model yılı", type: "text", maxLength: 4, inputMode: "numeric", hint: "Dört haneli model yılı." },
];
const fieldOrder: QuoteField[] = ["customerName", "phone", "email", "vehicleBrand", "vehicleModel", "vehicleYear", "serviceSlug", "message"];

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function QuoteRequestForm({ services, initialServiceSlug, invalidInitialService, pending = false }: {
  services: QuoteServiceOption[];
  initialServiceSlug: string;
  invalidInitialService: boolean;
  pending?: boolean;
}) {
  // Disabled server HTML prevents native submission before JavaScript takes over.
  const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot) && !pending;
  const [values, setValues] = useState<QuoteRequestValues>({
    customerName: "", phone: "", email: "", vehicleBrand: "", vehicleModel: "", vehicleYear: "",
    serviceSlug: initialServiceSlug, message: "",
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [review, setReview] = useState<QuoteRequestValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const wasReviewing = useRef(false);

  useEffect(() => {
    if (review) reviewHeadingRef.current?.focus();
    else if (wasReviewing.current) formRef.current?.querySelector<HTMLInputElement>("#customerName")?.focus();
    wasReviewing.current = Boolean(review);
  }, [review]);

  function validate(next: QuoteRequestValues) {
    return validateQuoteRequest(next, services.map((service) => service.slug), new Date().getFullYear());
  }

  function updateField(field: QuoteField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (Object.hasOwn(errors, field)) setErrors({ ...errors, [field]: validate(next)[field] });
  }

  function checkField(field: QuoteField) {
    setErrors((previous) => ({ ...previous, [field]: validate(values)[field] }));
  }

  function inputId(field: QuoteField) {
    return pending ? `quote-loading-${field}` : field;
  }

  function describedBy(field: QuoteField, hasHint = false) {
    const id = inputId(field);
    return [hasHint && `${id}-hint`, errors[field] && `${id}-error`].filter(Boolean).join(" ") || undefined;
  }

  function renderInput(field: InputField) {
    const error = errors[field.name];
    return (
      <div className={`quote-field${field.wide ? " quote-field-wide" : ""}`} key={field.name}>
        <label htmlFor={inputId(field.name)}>{field.label}{!field.required && <span> (isteğe bağlı)</span>}</label>
        <input
          id={inputId(field.name)} type={field.type} required={field.required}
          autoComplete={field.autoComplete ?? "off"} inputMode={field.inputMode} maxLength={field.maxLength}
          value={values[field.name]} onChange={(event) => updateField(field.name, event.target.value)}
          onBlur={() => checkField(field.name)} aria-invalid={Boolean(error)}
          aria-describedby={describedBy(field.name, Boolean(field.hint))}
        />
        {field.hint && <p className="quote-hint" id={`${inputId(field.name)}-hint`}>{field.hint}</p>}
        {error && <p className="quote-error" id={`${inputId(field.name)}-error`}>{error}</p>}
      </div>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus());
      return;
    }
    setReview({
      customerName: values.customerName.trim(), phone: normalizeTurkishMobilePhone(values.phone)!,
      email: values.email.trim(), vehicleBrand: values.vehicleBrand.trim(), vehicleModel: values.vehicleModel.trim(),
      vehicleYear: values.vehicleYear.trim(), serviceSlug: values.serviceSlug, message: values.message.trim(),
    });
  }

  if (review) {
    const rows = [
      ["Ad Soyad", review.customerName], ["Telefon", review.phone], ["E-posta", review.email],
      ["Araç markası", review.vehicleBrand], ["Araç modeli", review.vehicleModel], ["Model yılı", review.vehicleYear],
      ["Hizmet", services.find((service) => service.slug === review.serviceSlug)?.title], ["Ek açıklama", review.message],
    ];
    return (
      <section className="quote-panel quote-review" aria-labelledby="quote-review-title">
        <h2 id="quote-review-title" ref={reviewHeadingRef} tabIndex={-1}>Bilgi özeti</h2>
        <p className="quote-disclosure" role="status">Teklif gönderimi henüz aktif değil. Bilgileriniz kaydedilmedi veya gönderilmedi.</p>
        <dl className="quote-summary">
          {rows.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <button className="button button-dark" type="button" onClick={() => setReview(null)}>Bilgileri Düzenle</button>
      </section>
    );
  }

  return (
    <div className="quote-panel">
      {/* Nameless controls keep personal data out of native form serialization. */}
      <form ref={formRef} className="quote-form" aria-busy={pending || undefined} noValidate onSubmit={handleSubmit}>
        <p className="quote-form-note">İsteğe bağlı olarak belirtilmeyen alanlar zorunludur.</p>
        <fieldset disabled={!interactive}>
          <legend>Müşteri bilgileri</legend>
          <div className="quote-fields">{customerFields.map(renderInput)}</div>
        </fieldset>
        <fieldset disabled={!interactive}>
          <legend>Araç bilgileri</legend>
          <div className="quote-fields">{vehicleFields.map(renderInput)}</div>
        </fieldset>
        <fieldset disabled={!interactive}>
          <legend>Hizmet seçimi</legend>
          <div className="quote-field">
            <label htmlFor={inputId("serviceSlug")}>İlgilendiğiniz hizmet</label>
            <select id={inputId("serviceSlug")} required value={values.serviceSlug}
              onChange={(event) => updateField("serviceSlug", event.target.value)} onBlur={() => checkField("serviceSlug")}
              aria-invalid={Boolean(errors.serviceSlug)} aria-describedby={describedBy("serviceSlug", invalidInitialService)}>
              <option value="">Bir hizmet seçin</option>
              {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
            </select>
            {invalidInitialService && <p className="quote-hint" id={`${inputId("serviceSlug")}-hint`}>Bağlantıdaki hizmet seçimi tanınmadı. Lütfen bir hizmet seçin.</p>}
            {errors.serviceSlug && <p className="quote-error" id={`${inputId("serviceSlug")}-error`}>{errors.serviceSlug}</p>}
          </div>
        </fieldset>
        <div className="quote-field">
          <label htmlFor={inputId("message")}>Ek açıklama <span>(isteğe bağlı)</span></label>
          <textarea id={inputId("message")} rows={4} maxLength={MESSAGE_MAX_LENGTH} value={values.message} disabled={!interactive}
            onChange={(event) => updateField("message", event.target.value)} onBlur={() => checkField("message")}
            aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message", true)} />
          <p className="quote-hint" id={`${inputId("message")}-hint`}>Aracınızın durumunu veya uygulama beklentinizi paylaşabilirsiniz. {values.message.length} / {MESSAGE_MAX_LENGTH} karakter. Kimlik, plaka, şasi veya adres bilgisi eklemeyin.</p>
          {errors.message && <p className="quote-error" id={`${inputId("message")}-error`}>{errors.message}</p>}
        </div>
        <p className="quote-validation-status" role="status">{Object.values(errors).some(Boolean) ? "Lütfen işaretlenen alanları kontrol edin." : ""}</p>
        <div className="quote-submit">
          <button className="button button-dark" type="submit" disabled={!interactive}>Bilgileri Kontrol Et</button>
          <p>Bilgiler yalnızca bu sayfada kontrol edilir; kaydedilmez veya gönderilmez.</p>
        </div>
      </form>
    </div>
  );
}
