export const wipeDigit = (value: string | number): number => {
  const stringValue = String(value);
  const newStringValue = stringValue.slice(0, -1);
  return newStringValue ? Number(newStringValue) : 0;
}
