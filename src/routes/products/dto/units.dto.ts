import { z } from "zod";

export const CreateUnitsDto = z.object({
	name: z.string()
})
export const UpdateUnitsDto = z.object({
	name: z.string().optional()
})