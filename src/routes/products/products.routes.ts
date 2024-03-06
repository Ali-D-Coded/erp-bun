import { zValidator } from "@hono/zod-validator";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { stream } from 'hono/streaming';
import { db } from "../../database/db";
import { NewMedia, products, productsVariant } from "../../database/schema/schema";
import { generateRandomNumber, removefile } from "../../utils/fun";
import { CreateProductDto, CreateProductVariantDto, UpdateProductDto, UpdateProductVariantDto } from "./dto/products.dto";
import prisma from "../../database/prisma";
const productsRoute = new Hono()



productsRoute.post("/create-product", zValidator("json", CreateProductDto), async (c) => {
	try {
		const dto = await CreateProductDto.parseAsync(c.req.json())
		const data = {
			...Object.entries(dto).reduce((acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value
				}
				return acc
			}, {})
		}
		console.log({ dto, data });

		// const productRes = await db.insert(products).values(data)
		const productRes = await prisma.products.create({
			data: dto
		})

		return c.json({
			msg: "product created",
			prodId: productRes.id
		})

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

productsRoute.patch("/update-product/:id", zValidator("json", UpdateProductDto), async (c) => {
	try {
		const { id } = await c.req.param()
		const dto = await UpdateProductDto.parseAsync(c.req.json())
		const data = {
			...Object.entries(dto).reduce((acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value
				}
				return acc
			}, {})
		}
		console.log({ dto, data });


		// const productRes = await db.update(products).set(data).where(eq(products.id, +id))
		const productRes = await prisma.products.update({
			where: {
				id: +id,
			},
			data: dto
		})

		return c.json({
			msg: "product updated",
			prodId: productRes[0].insertId
		})

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})




productsRoute.get("/all", async (c) => {
	try {
		const prods = await prisma.products.findMany({
			include: {
				Categories: true,
				SubCategories: true,
				variants: {
					include: {
						images: true,
						// unitsToProductVariants: true
					}
				}
			}
		})
		return c.json(prods)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


productsRoute.get("/product-variants/all", async (c) => {
	try {
		const productVariants = await prisma.productsVariant.findMany({
			include: {
				images: true,
				// unitsToProductVariants: true
			}
		})
		return c.json(productVariants)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})



const saveFile = async (files: any[], path: string, productId: number | null) => {

	console.log("31", { file: files });
	const fileNames: any[] = []
	for (const file of files) {
		const [_mime, ext] = String(file.type).split('/');
		const fileName = randomUUID() + "." + ext;
		fileNames.push({
			name: fileName,
			url: fileName,
			productsVariantId: productId
		})
		// console.log("35",{fileName});
		console.log("data:", file);

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


		// const productVariant = await db.insert(productsVariant).values({ ...data, productId: +data.productId, productCode, barCode })
		const productVariant = await prisma.productsVariant.create({
			data: {
				...data,
				productsId: +data.productsId,
				productCode, barCode: barCode

			}
		})

		const fileNames: any[] = formData.getAll("files").length > 0 ? await saveFile(formData.getAll("files"), STORE_PATH, productVariant.id) : []

		console.log({ fileNames });


		// await db.insert(media).values(fileNames)
		await prisma.media.createMany({
			data: fileNames
		})


		return c.json({
			msg: "product created"
		})
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})



productsRoute.patch("/update-product-variants/:id", zValidator("json", UpdateProductVariantDto), async (c) => {
	try {

		const { id } = await c.req.param()

		const data = await UpdateProductVariantDto.parseAsync(await c.req.json())

		console.log({ data });


		// await db.update(productsVariant).set({ ...data }).where(eq(productsVariant.id, +id))
		await prisma.productsVariant.update({
			where: {
				id: +id
			},
			data: {
				...data
			}
		})
		return c.json({
			msg: "product updated"
		})
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


productsRoute.patch("/update-product-variants-image/:productId", async (c) => {
	try {
		const { productId } = c.req.param()
		const STORE_PATH = "uploads/products";
		const formData = await c.req.formData()


		// const mediaPrev = await db.query.media.findFirst({
		// 	where: eq(media.id, +id)
		// })

		// if (mediaPrev) {
		// console.log({mediaPrev});

		const fileNames: any[] = formData.getAll("files").length > 0 ? await saveFile(formData.getAll("files"), STORE_PATH, +productId) : []
		console.log({ fileNames });


		// await db.insert(media).values(fileNames)
		await prisma.media.createMany({ data: fileNames })

		// await removefile(`${STORE_PATH}/${mediaPrev.url}`)
		return c.json({
			msg: "product updated"
		})
		// } else {
		// throw new Error("No media found")
		// }
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

productsRoute.delete("/delete/product-variant-image/:id", async (c) => {
	try {
		const STORE_PATH = "uploads/products";
		const { id } = await c.req.param()
		const mediadata = await prisma.media.findFirst({
			where: {
				id: +id
			}
		})

		// await db.delete(media).where(eq(media.id, +id))
		await prisma.media.delete({
			where: {
				id: +id
			}
		})

		await removefile(`${STORE_PATH}/${mediadata?.url}`)

		return c.json({
			msg: "image deleted"
		})

	} catch (error) {
		return c.newResponse(error, 400)
	}
})


productsRoute.delete("/delete/:id", async (c) => {
	try {
		const { id } = await c.req.param()
		// await db.delete(products).where(eq(products.id, +id))
		await prisma.products.softDelete(+id)
		return c.json("product deleted")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

productsRoute.delete("/delete-product-variants/:id", async (c) => {
	try {
		const { id } = await c.req.param()
		// await db.delete(productsVariant).where(eq(productsVariant.id, +id))
		await prisma.productsVariant.softDelete(+id)
		return c.json("product deleted")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})



productsRoute.get("/product-variant/:image", async (c) => {
	try {
		const { image } = await c.req.param()
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
		return c.newResponse(error, 400)

	}
})



export default productsRoute


