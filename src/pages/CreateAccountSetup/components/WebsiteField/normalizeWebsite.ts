// Adds https:// when the address has no scheme, so the user sees what will be sent.
export const normalizeWebsite = (value: string) => {
  const trimmed = value.trim();

  if (trimmed === '' || /^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};
