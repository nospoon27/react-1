export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    let res = items.map(x => {
      if (x[objPropName] === itemId) {
        return { ...x, ...newObjProps };
      }
      return x;
    });
    console.log(res);
    return res;
}