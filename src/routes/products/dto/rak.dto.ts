import { z } from "zod";

export const CreateRaksDto = z.object({
	name: z.string(),
	salesmanId: z.number().optional(),

})
export const UpdateRaksDto = z.object({
	name: z.string().optional(),

})