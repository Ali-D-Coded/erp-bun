import { z } from "zod";

export const CreateProductVariantDto =  z.object({
	name: z.string(),
	description: z.string().optional(),
	productId: z.string(),
	barcode: z.string().optional(),
	files: z.any()
})

export const CreateProductDto = z.object({
	name: z.string(),

})