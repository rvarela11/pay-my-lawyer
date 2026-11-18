// Keeps only digits, at most 3, so a decimal or a "%" can't be typed.
export const formatOwnership = (value: string) =>
  value.replace(/\D/g, '').slice(0, 3);
