import type { IMember, IMemberCreate } from "@/types/members.types"

export function toFormValues(
  member: IMember | null,
  defaultOrder = 0,
): IMemberCreate {
  if (!member) {
    return {
      name: "",
      position: "",
      image: "",
      order: defaultOrder,
      email: null,
    }
  }
  return {
    name: member.name,
    position: member.position,
    image: member.image,
    order: member.order,
    email: member.email ?? null,
  }
}
