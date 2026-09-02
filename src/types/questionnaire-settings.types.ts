export interface IQuestionnaireSettings {
  oid: string
  slug: string
  page_name: string
  h1: string
  subtitle: string
  breadcrumb_label: string
  created_at: string
  updated_at: string
}

export interface IQuestionnaireSettingsPayload {
  slug: string
  page_name: string
  h1: string
  subtitle: string
  breadcrumb_label: string
}

export type IQuestionnaireSettingsCreate = IQuestionnaireSettingsPayload
export type IQuestionnaireSettingsUpdate = IQuestionnaireSettingsPayload
