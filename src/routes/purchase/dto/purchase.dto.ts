import { z } from "zod";

export const CreatePurchaseDto = z.object({
	date: z.date(),
	vendorId: z.number(),
	purchasePrice: z.number(),
	minimumSellingPrice: z.number(),
	maximumRetailPrice: z.number(),
	commissionPercentage: z.number(),
	quantity: z.number(),
	products: z.array(z.object({
		name: z.string()
	}))

})