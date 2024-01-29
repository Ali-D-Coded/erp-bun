import { z } from "zod";

const CreateProductDto =  z.object({
	name: z.string(),
	description: z.string().optional(),
	// price: z.number(),
	vendorId: z.number(),

})