import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateSalesDto } from "./dto/sales.dto";
import { db } from "../../database/db";
import { productStocks, productsVariant, purchaseItems } from "../../database/schema/schema";
import { eq } from "drizzle-orm";
import { CalcType, calculateDisc } from "../../utils/fun";

const salesRoutes = new Hono()

salesRoutes.post("/create", zValidator("json",CreateSalesDto),async (c) => {
	try {
		const dto = await CreateSalesDto.parseAsync(c.req.json())
		
		//totalAmount
		//totalDiscountAmount
		//grandTotal

		const productsData = await Promise.all(dto.products.map(async (item) => {
			const prod = await db.select({
			id: productStocks.id,
			quantityInStock:productStocks.quantityInStock,
				purchaseItem:purchaseItems,
			
			}).from(productStocks).leftJoin(purchaseItems, eq(productStocks.productVariantId, purchaseItems.productVariantId)).where(eq(productStocks.productVariantId, +item.productVariantId)) 

			const productAmount = prod ? prod[0].purchaseItem?.maximumRetailPrice * item.quantity : 0
			const flatAmt = item.discountFlat ? item.discountFlat : 0
			const percentAmt = item.discountPercentage ? item.discountPercentage : 0
			
			const discountAmount = item.discountFlat ? await calculateDisc(CalcType.Flat, flatAmt, productAmount) : await calculateDisc(CalcType.Percent,percentAmt,productAmount)
			
			return {
			productAmount,
				discountAmount,
				productVariantId: item.productVariantId,
				quantity: item.quantity,
			}
		})) 


		// const totalAmount = productsData.reduce((a,b) => +a.productamount + +b.productamount  ,0)
		
		
		return c.json(productsData)
	} catch (error) {
		return c.newResponse(error,400)
	}
})

export default salesRoutes