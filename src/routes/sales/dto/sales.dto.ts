import { z } from "zod";

export const CreateSalesDto = z.object({
	date: z.string(),
	accountantId: z.number(),
	salesmanId: z.number(),
	customerId: z.number().optional(),
	additionalDiscountFlat: z.number().nullable().default(null),
	additionalDiscountPercent: z.number().nullable().default(null),
	products: z.array(z.object({
		stockId: z.number(),
		discountFlat: z.number().nullable().default(null),
		discountPercentage: z.number().nullable().default(null),
		quantity: z.number()

	}))
})