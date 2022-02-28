const generateId = () => {
  return `${performance.now()}${Math.random().toString().slice(3)}`.replace(
    ".",
    ""
  );
};

export default generateId;
