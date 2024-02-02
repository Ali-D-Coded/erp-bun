import { z } from "zod";

export const CreateUnitsDto = z.object({
	name: z.string(),
	value: z.number()
})
export const UpdateUnitsDto = z.object({
	name: z.string().optional(),
	value: z.number().optional()
})