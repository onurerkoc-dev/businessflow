export type ContactDetails = {
  phone?: { label: string; number: string };
  email?: string;
  address?: string;
  openingHours?: string;
};

// Populate only with verified business information.
export const contactDetails: ContactDetails = {};
