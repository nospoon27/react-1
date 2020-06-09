export const required = value => {
   if(value) return undefined;
   return 'field is required';
}

export const maxLenght = (length) => (value) => {
   if(value && value.length <= length) return undefined;
   return 'Max Lenght is ' + length;
}