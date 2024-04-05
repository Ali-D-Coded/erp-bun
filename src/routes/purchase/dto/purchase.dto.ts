import { z } from "zod";

export const CreatePurchaseDto = z.object({
	date: z.string(),
	vendorId: z.number(),
	purchaseBillNo: z.string(),
	purchaseItems: z.array(z.object({
		productId: z.number(),
		purchasePrice: z.string(),
		minimumSellingPrice: z.string(),
		maximumRetailPrice: z.string(),
		commissionPercentage: z.string(),
		quantity: z.number(),
		unitsId: z.number(),
		unit: z.string()
	}))

})