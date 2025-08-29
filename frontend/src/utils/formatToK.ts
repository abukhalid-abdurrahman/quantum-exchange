export const formatToK = (num: number, currency = "$") => {
  if (Math.abs(num) >= 1_000_000_000) {
    return `${currency}${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(num) >= 1_000_000) {
    return `${currency}${(num / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(num) >= 1_000) {
    return `${currency}${(num / 1_000).toFixed(2)}K`;
  }
  return `${currency}${num}`;
};
