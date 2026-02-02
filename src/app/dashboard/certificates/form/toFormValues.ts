import type {
  ICertificate,
  ICertificateCreate,
  ICertificateGroup,
  ICertificateGroupCreate,
} from "@/types/certificates.types"

export function toCertificateGroupFormValues(
  group: ICertificateGroup | null,
): ICertificateGroupCreate {
  if (!group) {
    return {
      section: "Декларации",
      title: "",
      content: "",
      order: 0,
      is_active: true,
    }
  }
  return {
    section: group.section,
    title: group.title,
    content: group.content,
    order: group.order,
    is_active: group.is_active,
  }
}

export function toCertificateFormValues(
  certificate: ICertificate | null,
): ICertificateCreate {
  if (!certificate) {
    return {
      title: "",
      link: "",
      order: 0,
    }
  }
  return {
    title: certificate.title,
    link: certificate.link,
    order: certificate.order,
  }
}
