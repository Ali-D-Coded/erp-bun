import { z } from "zod";

export const CreateProductVariantDto = z.object({
	name: z.string(),
	description: z.string().optional(),
	productsId: z.string(),
	barCode: z.string().optional(),
	// files: z.any()
})

export const UpdateProdutImage = z.object({
	productsId: z.string(),

})

export const UpdateProductVariantDto = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	barCode: z.string().optional(),
	productCode: z.number().optional(),
})

export const CreateProductDto = z.object({
	name: z.string(),
	categoriesId: z.number().optional(),
	subCategoriesId: z.number().optional(),
})

export const UpdateProductDto = z.object({
	name: z.string().optional(),
	categoriesId: z.number().optional(),
	subCategoriesId: z.number().optional(),
})