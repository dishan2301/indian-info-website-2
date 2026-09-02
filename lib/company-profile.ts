export const companyProfile = {
  name: 'Indian Infotech',
  foundedYear: 2011,
  email: 'sales@indianinfotech.org',
  supportEmail: 'support@indianinfotech.org',
  phoneDisplay: '+91 76000 66770',
  phoneHref: 'tel:+917600066770',
  phoneSchema: '+91-76000-66770',
  whatsappDisplay: '+91 77780 66770',
  whatsappHref: 'https://wa.me/917778066770',
  address: {
    street: '429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Thaltej',
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
  { id: 'years-experience', value: 14, suffix: '+', display: '14+', label: 'Years of experience', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
  { id: 'products', value: 12, suffix: '+', display: '12+', label: 'Products', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
  { id: 'countries', value: 7, suffix: '+', display: '7+', label: 'Countries served', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
  { id: 'clients', value: 2000, suffix: '+', display: '2,000+', label: 'Happy clients', source: 'Indian Infotech company brochure', owner: 'Indian Infotech', status: 'approved-public-source', verifiedOn: '2026-09-02' },
] as const;

export const postalAddressSchema = {
  '@type': 'PostalAddress',
  streetAddress: companyProfile.address.street,
  addressLocality: companyProfile.address.locality,
  addressRegion: companyProfile.address.region,
  postalCode: companyProfile.address.postalCode,
  addressCountry: companyProfile.address.countryCode,
} as const;
