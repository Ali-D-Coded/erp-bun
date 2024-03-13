import { unlinkSync } from "node:fs";
import { randomUUID } from "crypto";

export function generateRandomNumber(n1: number = 90000, n2: number = 10000) {
  // Use Math.random() to get a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the decimal to the desired range (10000-99999) and convert to an integer
  const randomInt = Math.floor(randomDecimal * n1) + n2;

  return randomInt;
}




export async function calculateDisc(discamount: number, productPrice: any) {
  console.log({ discamount, productPrice });
  return +productPrice * discamount / 100

}


export async function removefile(path: string) {
  try {
    unlinkSync(path);
    console.log("file deleted")
  } catch (error) {
    console.error(error)
  }
}


export const saveFile = async (file: any, path: string) => {

  console.log("31", { file });

  const [_mime, ext] = String(file.type).split('/');
  const fileName = randomUUID() + "." + ext;
  // console.log("35",{fileName});
  console.log("data:", file);

  await Bun.write(`${path}/${fileName}`, file)

  return fileName
}