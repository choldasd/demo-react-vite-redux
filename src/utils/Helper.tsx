export const countDecimals = (value:any) => {
  if (value !== null || value !== "") {
    let num = (+value).toFixed(8).replace(/(\.0+|0+)$/, '')
    return num;
  }
};

export const convertToAMPM = (time24: string) => {
  // Split the input time into hours, minutes, and seconds
  const [hours, minutes] = time24.split(':').map(Number);

  // Determine whether it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12; // 0 should become 12

  // Create the formatted time string
  const time12 = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;

  return time12;
}

export const toTitleCase = (str:string) => {
  return str.replace(/\w\S*/g, function (txt:any) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const validateNumberWithTwoDecimal = (event:any, fieldName:any, setValue:any) => {
  const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
  let value = event.target.value;
  setValue(fieldName, value.match(regex)[0])
}
