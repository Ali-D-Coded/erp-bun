import { z } from "zod";

export const CreatePurchaseDto = z.object({
	date: z.string(),
	vendorId: z.number(),
	purchaseItems: z.array(z.object({
		productVariantId: z.number(),
		purchasePrice: z.number(),
		minimumSellingPrice: z.number(),
		maximumRetailPrice: z.number(),
		commissionPercentage: z.number(),
		quantity: z.number(),
	}))

})