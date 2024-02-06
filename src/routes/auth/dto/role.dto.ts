import { z } from "zod";

export const CreateRoleDto = z.array(z.object({
	roleName: z.string(),
	description: z.string().optional()
}))

export const UpdateRoleDto = z.object({
	roleName: z.string().optional(),
	description: z.string().optional()
})