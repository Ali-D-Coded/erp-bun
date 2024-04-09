import { z } from "zod";

export const CreateProductVariantDto = z.object({
	variantName: z.string(),
	variantValue: z.string(),
	sku: z.string(),
	barCode: z.string().optional(),
	quantityAlert: z.number(),
	vat: z.number(),
	discountType: z.enum(["FLAT", "PERCENT"]),
	discountValue: z.number().optional(),

	customFields: z.object({}),

	productsId: z.string(),
	// files: z.any()
})

export const UpdateProdutImage = z.object({
	productsId: z.string(),

})

export const UpdateProductVariantDto = z.object({
	variantName: z.string().optional(),
	variantValue: z.string().optional(),
	sku: z.string().optional(),
	// barCode: z.string().optional(),
	quantityAlert: z.number().optional(),
	vat: z.number().optional(),
	discountType: z.enum(["FLAT", "PERCENT"]).optional(),
	discountValue: z.number().optional().optional(),

	customFields: z.object({}).optional(),
})

const VariantCombinations = z.object({
	variantType: z.string(),
	variantValue: z.string(),

});


export const CreateProductDto = z.object({

	name: z.string(),
	description: z.string(),
	slug: z.string(),
	brandId: z.number(),
	unitsId: z.number(),
	raksId: z.number(),
	categoriesId: z.number().optional(),
	subCategoriesId: z.number().optional(),


	sku: z.string(),
	barCode: z.string(),
	productCode: z.string(),
	quantityAlert: z.number(),
	vat: z.number(),
	discountType: z.string(),
	discountValue: z.number().optional(),
	customFields: z.any(),

	variantCombinations: z.any(),
	images: z.array(z.string()),

})

export const UpdateProductDto = z.object({
	name: z.string().optional(),
	categoriesId: z.number().optional(),
	subCategoriesId: z.number().optional(),
})
