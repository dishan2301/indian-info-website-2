export function approvalPayload(item) {
  return JSON.stringify({quote: item.quote, customerName: item.customerName, companyName: item.companyName, designation: item.designation, photo: item.photo?.asset?._ref || item.photoRef || '', logo: item.logo?.asset?._ref || item.logoRef || ''});
}
