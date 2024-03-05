import { z } from "zod";

export const CreateProductVariantDto = z.object({
	name: z.string(),
	description: z.string().optional(),
	productId: z.string(),
	barCode: z.string().optional(),
	// files: z.any()
})

export const UpdateProdutImage = z.object({
	productId: z.string(),

})

export const UpdateProductVariantDto = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	barCode: z.number().optional(),
	productCode: z.number().optional(),
})

export const CreateProductDto = z.object({
	name: z.string(),
	categoryId: z.number().optional(),
	subCategoryId: z.number().optional(),
})

export const UpdateProductDto = z.object({
	name: z.string().optional(),
	categoryId: z.number().optional(),
	subCategoryId: z.number().optional(),
})