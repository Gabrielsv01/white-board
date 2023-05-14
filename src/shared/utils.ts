const getIndexById = (list: {id: string; color: string}[], id: string) => {
  const index = list.findIndex(item => item.id === id);
  return index !== -1 ? index : null;
};

export {getIndexById};
