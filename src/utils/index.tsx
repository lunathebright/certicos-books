export const breakLines = (text: string) => {
  if (!text) return "-";
  return text
    .split(/(?<=[.?!])\s+(?=[\s\S])/g)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, idx) => {
      const endsWithPunctuation = [".", "!", "?"].includes(
        line[line.length - 1]
      );
      return <p key={idx}>{endsWithPunctuation ? line : `${line}.`}</p>;
    });
};
