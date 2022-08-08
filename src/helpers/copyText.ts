export const copyText = async (text: string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    alert("Copied succesfully");
  }
};
