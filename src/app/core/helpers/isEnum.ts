export const isEnum = (enumObject: any, value: any): boolean => {
  return Object.values(enumObject).includes(value)
}
