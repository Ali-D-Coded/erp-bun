import { Hono } from "hono";
import { db } from "../../database/db";

import { zValidator } from "@hono/zod-validator";
import { randomUUID } from "crypto";
import { NewMedia, media, products, productsVariant } from "../../database/schema/schema";
import { CreateProductDto, CreateProductVariantDto } from "./dto/products.dto";
import { generateRandomNumber } from "../../utils/fun";
import {eq} from "drizzle-orm"
const productsRoute = new Hono()


productsRoute.post("/create-product",zValidator("json", CreateProductDto), async (c) => {
	try {
		const dto = await CreateProductDto.parseAsync(c.req.json())
		const data = {
			...Object.entries(dto).reduce((acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value
				}
				return acc
			},{})
		}
		console.log({ dto, data });
		
		
		const productRes = await db.insert(products).values(dto)
		return c.json({
			msg: "product created",
			prodId: productRes[0].insertId
		})

	} catch (error:any) {
		return c.newResponse(error,400)
	}
})

productsRoute.get("/all", async (c) => {
	try {
		 const prods = await db.query.products.findMany({
			 with: {
				category: true,
				subCategory: true,
				 productVariant: {
					with: {
						 images: true,
						// unitsToProductVariants: true
					}
				}
			}
		 })
		return c.json(prods)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


productsRoute.get("/product-variants/all", async (c) => {
	try{
		const prodctVarinats = await db.query.productsVariant.findMany()
		return c.json(prodctVarinats)
	}catch(error){
		return c.newResponse(error,400)
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




productsRoute.post("/create-product-variants",zValidator("form",CreateProductVariantDto), async (c) => {
	try {
		const STORE_PATH = "uploads/products";
		const formData = await c.req.formData()
		const data = await CreateProductVariantDto.parseAsync(await c.req.parseBody())

		const countryCode = 8
		const manuCode = generateRandomNumber()
		const productCode = generateRandomNumber()
		const barCode = `${countryCode}${manuCode}${productCode}`

		const productVariant = await db.insert(productsVariant).values({...data, productId: +data.productId, productCode, barCode})
		
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


productsRoute.delete("/delete/:id", async(c) =>{
	try{
		const {id} = await c.req.param()
		await db.delete(products).where(eq(products.id, +id))
		return c.json("product deleted")
	}catch(error){
		return c.newResponse(error,400)
	}
} )

export default productsRoute
