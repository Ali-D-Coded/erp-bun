export function generateRandomNumber(n1: number = 90000, n2: number = 10000) {
  // Use Math.random() to get a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the decimal to the desired range (10000-99999) and convert to an integer
  const randomInt = Math.floor(randomDecimal * n1) + n2;

  return randomInt;
}


export enum CalcType {
  Flat = "Flat",
  Percent = "Percent"
}

export async function calculateDisc(type: CalcType, discamount: number , productPrice:  any) {
  console.log({type, discamount, productPrice});
  
  if (type === CalcType.Flat) {
    return +productPrice - discamount
  }
  if (type === CalcType.Percent) {
    return +productPrice * discamount / 100
  }
}