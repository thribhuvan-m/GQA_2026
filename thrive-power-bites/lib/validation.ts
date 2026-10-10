export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactInput = { name: string; email: string; message: string };

export function validateContact(input: ContactInput): FieldErrors<keyof ContactInput> {
  const errors: FieldErrors<keyof ContactInput> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "Please keep your name under 80 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  if (message.length < 10) errors.message = "Please write at least 10 characters.";
  else if (message.length > 2000) errors.message = "Please keep your message under 2000 characters.";

  return errors;
}

export type DeliveryInput = {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  pincode: string;
};

export function validateDelivery(input: DeliveryInput): FieldErrors<keyof DeliveryInput> {
  const errors: FieldErrors<keyof DeliveryInput> = {};
  if (input.fullName.trim().length < 2) errors.fullName = "Please enter the recipient's name.";
  if (!/^[6-9]\d{9}$/.test(input.phone.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "")))
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (input.addressLine.trim().length < 8) errors.addressLine = "Please enter the full delivery address.";
  if (input.city.trim().length < 2) errors.city = "Please enter the city.";
  if (!/^[1-9]\d{5}$/.test(input.pincode.trim())) errors.pincode = "Please enter a valid 6-digit pincode.";
  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
