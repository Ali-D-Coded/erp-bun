import { Hono } from "hono";
import { db } from "../../database/db";

import {randomUUID} from "crypto"
import { zValidator } from "@hono/zod-validator";
import { CreateProductDto } from "./dto/products.dto";
import { NewMedia, media, products, productsVariant } from "../../database/schema/schema";
import JsBarcode from "jsbarcode";
import { Canvas, createCanvas } from "canvas";

const productsRoute = new Hono()

productsRoute.get("/all", async (c) => {
	try {
		 const prods = await db.query.products.findMany({
			with: {
				 productVariant: {
					with: {
						 images: true,
						 vendor: true,
						unitsToProductVariants: true
					}
				}
			}
		 })
		return c.json(prods)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})




const saveFile = async (files: any[], path: string, productId: number) => {
	
	console.log("31", { file: files });
	const fileNames :any[] = []
	for (const file of files) {
		const [_mime, ext]= String(file.type).split('/');
		const fileName = randomUUID() + "." + ext;
		 fileNames.push({
			 name: fileName,
			 url: fileName,
			 productId: productId
		 })
		// console.log("35",{fileName});
		console.log("data:",file);
	
		await Bun.write(`${path}/${fileName}`, file)
	}
	return fileNames
}

function generateRandomNumber() {
  // Use Math.random() to get a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the decimal to the desired range (10000-99999) and convert to an integer
  const randomInt = Math.floor(randomDecimal * 90000) + 10000;

  return randomInt;
}


productsRoute.post("/create",zValidator("form",CreateProductDto), async (c) => {
	try {
		const STORE_PATH = "uploads/products";
		const formData = await c.req.formData()
		const data = await CreateProductDto.parseAsync(await c.req.parseBody())
		console.log("FILES :",data.files);
		
		
		
		
		const product = await db.insert(products).values({
			name: data.name,
		})
		const countryCode = 8
		const manuCode = generateRandomNumber()
		const productCode = generateRandomNumber()
		const barCode = `${countryCode}${manuCode}${productCode}`

		const productVariant = await db.insert(productsVariant).values({
			name: data.name,
			description: data.description,
			productId: product[0].insertId,
			vendorId: +data.vendorId,
			minimumQuantity: +data.minimumQuantity,
			quantityInStock: +data.quantityInStock,
			price: "45",
			barCode,
			productCode
		})
		
		const fileNames : NewMedia[] =formData.getAll("files").length > 1 ? await saveFile(formData.getAll("files"), STORE_PATH, productVariant[0].insertId) : []	

		await db.insert(media).values(fileNames)

		
		// console.log({barcode});

		return c.json({
			msg: "product created"
		})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


export default productsRoute