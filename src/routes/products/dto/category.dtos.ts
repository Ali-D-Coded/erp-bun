import { z } from "zod";

export const CreateCategoryDto = z.object({
	name: z.string()
})
export const CreateSubCategoryDto = z.object({
	name: z.string().trim(),
	categoryId: z.number()
})