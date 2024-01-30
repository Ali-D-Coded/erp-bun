import { z } from "zod";

export const CreateProductDto =  z.object({
	name: z.string(),
	description: z.string().optional(),
	// price: z.number(),
	vendorId: z.string(),
	barcode: z.string().optional(),
	minimumQuantity: z.string(),
	quantityInStock: z.string(),
	files: z.any()
})