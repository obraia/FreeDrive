const truncateString = (text: string, length: number): string => {
  return text && text.length >= length + 3 ? text.substring(0, length).replace(/\s+/g, ' ').concat('...') : text;
};

const middleTruncateString = (text: string, length: number): string => {
  if (text && text.length >= length + 3) {
    const exedent = text.length - length;
    const middle = Math.floor(text.length / 2);
    const midleExedent = Math.floor(exedent / 2);
    return text.substring(0, middle - midleExedent).concat('...') + text.substring(text.length - midleExedent);
  }

  return text;
};

export { truncateString, middleTruncateString };
