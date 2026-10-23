export const MESSAGE_MAX_LENGTH = 1000;

export type QuoteRequestValues = {
  customerName: string;
  phone: string;
  email: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceSlug: string;
  message: string;
};

export type QuoteField = keyof QuoteRequestValues;
export type QuoteErrors = Partial<Record<QuoteField, string | undefined>>;
export type QuoteServiceOption = { slug: string; title: string };

export function normalizeTurkishMobilePhone(value: string): string | null {
  if (!/^[+\d\s()-]+$/.test(value)) return null;
  let digits = value.replace(/[\s()-]/g, "");
  if (digits.startsWith("+90")) digits = digits.slice(3);
  else if (digits.startsWith("0090")) digits = digits.slice(4);
  else if (digits.length === 12 && digits.startsWith("90")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^5\d{9}$/.test(digits) ? `+90${digits}` : null;
}

export function validateQuoteRequest(
  values: QuoteRequestValues,
  serviceSlugs: readonly string[],
  currentYear: number,
): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!values.customerName.trim()) errors.customerName = "Adınızı ve soyadınızı girin.";
  else if (values.customerName.trim().length > 100) errors.customerName = "Ad soyad en fazla 100 karakter olabilir.";
  if (!normalizeTurkishMobilePhone(values.phone)) errors.phone = "Geçerli bir Türkiye cep telefonu numarası girin.";
  if (values.email.trim() && (values.email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))) {
    errors.email = "Geçerli bir e-posta adresi girin veya alanı boş bırakın.";
  }
  if (!values.vehicleBrand.trim()) errors.vehicleBrand = "Araç markasını girin.";
  else if (values.vehicleBrand.trim().length > 60) errors.vehicleBrand = "Marka en fazla 60 karakter olabilir.";
  if (!values.vehicleModel.trim()) errors.vehicleModel = "Araç modelini girin.";
  else if (values.vehicleModel.trim().length > 80) errors.vehicleModel = "Model en fazla 80 karakter olabilir.";
  const year = values.vehicleYear.trim();
  if (year && (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > currentYear + 1)) {
    errors.vehicleYear = `Model yılı 1900 ile ${currentYear + 1} arasında olmalıdır.`;
  }
  if (!serviceSlugs.includes(values.serviceSlug)) errors.serviceSlug = "Bir hizmet seçin.";
  if (values.message.length > MESSAGE_MAX_LENGTH) errors.message = `Açıklama en fazla ${MESSAGE_MAX_LENGTH} karakter olabilir.`;
  return errors;
}
