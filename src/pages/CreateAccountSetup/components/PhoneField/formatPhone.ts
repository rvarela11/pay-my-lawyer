// Formats as the user types: (555) 123-4567. A pasted country code (+1) is dropped.
export const formatPhone = (value: string) => {
  const allDigits = value.replace(/\D/g, '');
  const digits = (
    allDigits.length === 11 && allDigits.startsWith('1')
      ? allDigits.slice(1)
      : allDigits
  ).slice(0, 10);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length <= 3) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};
