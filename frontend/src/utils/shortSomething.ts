export const shortAddress = (address: string) => {
  if (address) {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  }
};

export const shortDescription = (description: string, symbols?: number) => {
  return `${description.slice(0, symbols || 30)}...`;
};
