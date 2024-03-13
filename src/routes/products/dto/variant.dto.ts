import { z } from "zod";

export const CreateVariantDto = z.object({
	name: z.string(),
	values: z.array(z.string())

})
export const UpdateVariantDto = z.object({
	name: z.string(),
	values: z.number().optional(),

})