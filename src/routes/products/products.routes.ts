import { Hono } from "hono";
import { db } from "../../database/db";

import {randomUUID} from "crypto"

const productsRoute = new Hono()

productsRoute.get("/all", async (c) => {
	try {
		 const prods = await db.query.products.findMany({
			with: {
				productVariant: true
			}
		 })
		return c.json(prods)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})




const saveFile = async (file: any, path: string) => {
	// console.log("31",{file:file});
	const [_mime, ext]= String(file.type).split('/');
	const fileName = randomUUID() + "." + ext;
	// console.log("35",{fileName});
console.log("data:",file);

	await Bun.write(`${path}/${fileName}`, file)
	return fileName
}


productsRoute.post("/create", async (c) => {
	try {
		const STORE_PATH = "uploads/products";
		const formData = await c.req.formData()
		
		// let fileName
		// if(parsed.file){
		// if()
		const fileName = await saveFile(formData.get("files"), STORE_PATH)	
		console.log({fileName});
		
		// }

		// console.log({ formData });
		// console.log(formData.get("name"))
		
		return c.json(fileName)
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


export default productsRoute