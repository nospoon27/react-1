export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    let res = items.map((x: any) => {
      if (x[objPropName] === itemId) {
        return { ...x, ...newObjProps };
      }
      return x;
    });
    console.log(res);
    return res;
}