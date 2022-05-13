export type FirebaseApiError = {
  code: string,
  customData: {
    [key: string]: string
  },
  name: string,
}
