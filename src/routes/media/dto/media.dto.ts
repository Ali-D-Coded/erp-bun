import { z } from "zod";

export const CreateMediaDto = z.object({
	name: z.string(),
	path: z.string()
})