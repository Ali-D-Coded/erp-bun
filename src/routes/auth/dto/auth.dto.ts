import { z } from "zod";

export const RefreshDto = z.object({
	refresh: z.string(),
	userType: z.string()
})