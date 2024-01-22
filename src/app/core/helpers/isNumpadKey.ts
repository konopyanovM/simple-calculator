export const isNumpadKey = (key: number | string): boolean => {
  const pressedKeyNumber = +key;
  return !isNaN(pressedKeyNumber) && pressedKeyNumber >= 0 && pressedKeyNumber <= 9;
}
