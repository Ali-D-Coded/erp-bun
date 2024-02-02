import { z } from "zod";

export const CreatePurchaseDto = z.object({
	date: z.string(),
	vendorId: z.number(),
	purchaseItems: z.array(z.object({
		productVariantId: z.number(),
		purchasePrice: z.string(),
		minimumSellingPrice: z.string(),
		maximumRetailPrice: z.string(),
		commissionPercentage: z.string(),
		quantity: z.number(),
		unitId: z.number()
	}))

})