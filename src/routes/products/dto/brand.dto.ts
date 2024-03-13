import { z } from "zod";

export const CreateBrandsDto = z.object({
	name: z.string(),

})
export const UpdateBrandsDto = z.object({
	name: z.string().optional(),

})