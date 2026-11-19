// Formats as the user types: 12-3456789.
export const formatEin = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 9);

  return digits.length <= 2
    ? digits
    : `${digits.slice(0, 2)}-${digits.slice(2)}`;
};
