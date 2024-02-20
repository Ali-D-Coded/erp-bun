import { zValidator } from "@hono/zod-validator";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { stream } from 'hono/streaming';
import { db } from "../../database/db";
import { NewMedia, media, media, media, products, productsVariant } from "../../database/schema/schema";
import { generateRandomNumber, removefile } from "../../utils/fun";
import { CreateProductDto, CreateProductVariantDto, UpdateProductDto, UpdateProductVariantDto } from "./dto/products.dto";
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
		
		
		const productRes = await db.insert(products).values(data)
		return c.json({
			msg: "product created",
			prodId: productRes[0].insertId
		})

	} catch (error:any) {
		return c.newResponse(error,400)
	}
})

productsRoute.patch("/update-product/:id",zValidator("json", UpdateProductDto), async (c) => {
	try {
		const {id} = await c.req.param()
		const dto = await UpdateProductDto.parseAsync(c.req.json())
		const data = {
			...Object.entries(dto).reduce((acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value
				}
				return acc
			},{})
		}
		console.log({ dto, data });
		
		
		const productRes = await db.update(products).set(data).where(eq(products.id, +id))
		return c.json({
			msg: "product updated",
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
			const productVariants = await db.query.productsVariant.findMany({
		    with: {
						 images: true,
						// unitsToProductVariants: true
					}
		})
		return c.json(productVariants)
	}catch(error){
		return c.newResponse(error,400)
	}
})



const saveFile = async (files: any[], path: string, productId: number | null) => {
	
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




productsRoute.post("/create-product-variants", zValidator("form", CreateProductVariantDto), async (c) => {
	console.log("creating product");
	
	try {
		const STORE_PATH = "uploads/products";
		const formData = await c.req.formData()
		const data = await CreateProductVariantDto.parseAsync(await c.req.parseBody())

		const countryCode = 8
		const manuCode = generateRandomNumber()
		const productCode = generateRandomNumber()
		const barCode = `${countryCode}${manuCode}${productCode}`

		// console.log({formData: formData.getAll("files").length});
		

		const productVariant = await db.insert(productsVariant).values({...data, productId: +data.productId, productCode, barCode})
		
		const fileNames: NewMedia[] = formData.getAll("files").length > 0 ? await saveFile(formData.getAll("files"), STORE_PATH, productVariant[0].insertId) : []	
		
		console.log({fileNames});
		

		await db.insert(media).values(fileNames)


		return c.json({
			msg: "product created"
		})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})



productsRoute.patch("/update-product-variants/:id",zValidator("json",UpdateProductVariantDto), async (c) => {
	try {

		const { id } = await c.req.param()
		
		const data = await UpdateProductVariantDto.parseAsync(await c.req.json())

		console.log({data});
		

		 await db.update(productsVariant).set({...data}).where(eq(productsVariant.id, +id))
		
		return c.json({
			msg: "product updated"
		})
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})


productsRoute.patch("/update-product-variants-image/:productId", async (c) => {
	try {
		const { productId } =  c.req.param()
		const STORE_PATH = "uploads/products";
		const formData = await c.req.formData()
		
		
		// const mediaPrev = await db.query.media.findFirst({
		// 	where: eq(media.id, +id)
		// })

		// if (mediaPrev) {
			// console.log({mediaPrev});
			
			const fileNames: NewMedia[] = formData.getAll("files").length > 0 ? await saveFile(formData.getAll("files"), STORE_PATH, +productId) : []
			console.log({fileNames});
			
			// await db.update(media).set(fileNames[0])
			await db.insert(media).values(fileNames)
			
			// await removefile(`${STORE_PATH}/${mediaPrev.url}`)
			return c.json({
				msg: "product updated"
			})
		// } else {
			// throw new Error("No media found")
		// }
	} catch (error:any) {
		return c.newResponse(error, 400)
	}
})

productsRoute.delete("/delete/product-variant-image/:id", async (c) => {
	try {
		const STORE_PATH = "uploads/products";
		const {id} = await c.req.param()
		const mediadata = await db.query.media.findFirst({
			where:eq(media.id, +id)
		})

		await db.delete(media).where(eq(media.id, +id))

		await removefile(`${STORE_PATH}/${mediadata?.url}`)

		return c.json({
				msg: "image deleted"
			})

	} catch (error) {
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

productsRoute.delete("/delete-product-variants/:id", async(c) =>{
	try{
		const {id} = await c.req.param()
		await db.delete(productsVariant).where(eq(productsVariant.id, +id))
		return c.json("product deleted")
	}catch(error){
		return c.newResponse(error,400)
	}
} )



productsRoute.get("/product-variant/:image", async (c) => {
	try {
		const { image} = await c.req.param()
 		const path = `uploads/products/${image}`;
		const file = Bun.file(path);
	
		const arrBuffer = await file.arrayBuffer();
		const byteArray = new Uint8Array(arrBuffer);
		return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
    })
    // Write a Uint8Array.
    await stream.write(byteArray)
  })
	} catch (error) {
		return c.newResponse(error,400)
		
	}
})



export default productsRoute


