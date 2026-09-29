const salesMailbox = ['sales', 'indianinfotech.org'].join('@');
const supportMailbox = ['support', 'indianinfotech.org'].join('@');
const formRecipientMailbox = ['chaudharydishan90', 'gmail.com'].join('@');
export const companyFoundedOn = new Date(2011, 7, 15);

export function completedYearsSince(date: Date, from = companyFoundedOn) {
  return date.getFullYear() - from.getFullYear() - Number(date.getMonth() < from.getMonth() || (date.getMonth() === from.getMonth() && date.getDate() < from.getDate()));
}

export const companyProfile = {
  name: 'Indian Infotech',
  foundedYear: 2011,
  email: salesMailbox,
  formRecipientEmail: formRecipientMailbox,
  supportEmail: supportMailbox,
  phoneDisplay: '+91 76000 66770',
  phoneHref: 'tel:+917600066770',
  phoneSchema: '+91-76000-66770',
  whatsappDisplay: '+91 77780 66770',
  whatsappHref: 'https://wa.me/917778066770',
  linkedInHref: 'https://in.linkedin.com/company/indian-infotech',
  mapsHref: 'https://www.google.com/maps/place/Indian+Infotech/@23.0804467,72.5355153,17z/data=!3m1!4b1!4m6!3m5!1s0x395e83471ce6df1b:0x70ea32c70dfc4f7e!8m2!3d23.0804467!4d72.5355153!16s%2Fg%2F1hc89_wjh?entry=tts',
  address: {
    street: '429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Nilmani Society, Thaltej',
    locality: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '380054',
    country: 'India',
    countryCode: 'IN',
  },
} as const;

export type PublicClaim = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  display: string;
  source: string;
  owner: string;
  status: 'approved-public-source';
  verifiedOn: string;
};

/**
 * The company brochure is the currently supplied public source for these facts.
 * Update the record here only after the underlying company record is approved.
 */
export const companyStats: readonly PublicClaim[] = [
  { id: 'years-experience', value: completedYearsSince(new Date()), suffix: '+', display: `${completedYearsSince(new Date())}+`, label: 'Years of experience', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
  { id: 'products', value: 12, suffix: '+', display: '12+', label: 'Products', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
  { id: 'countries', value: 7, suffix: '+', display: '7+', label: 'Countries served', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
  { id: 'clients', value: 2500, suffix: '+', display: '2,500+', label: 'Happy clients', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
] as const;

export const postalAddressSchema = {
  '@type': 'PostalAddress',
  streetAddress: companyProfile.address.street,
  addressLocality: companyProfile.address.locality,
  addressRegion: companyProfile.address.region,
  postalCode: companyProfile.address.postalCode,
  addressCountry: companyProfile.address.countryCode,
} as const;
