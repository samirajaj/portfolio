export function getEmailHref(email: string) {
  return `mailto:${email}`
}

export function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`
}
