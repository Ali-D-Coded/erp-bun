import { z } from "zod";

export const CreateRoleDto = z.object({
	roleName: z.string(),
	description: z.string().optional(),
	privileges: z.object({
		create: z.object({
			crud: z.boolean().optional(),
			create: z.array(z.string()).optional(),
			read: z.array(z.string()).optional(),
			update: z.array(z.string()).optional(),
			delete: z.array(z.string()).optional(),
		})
	})
})


export const CreatePrivilegeCode = z.object({
	source: z.string(),
	code: z.string(),
})

export const UpdateRoleDto = z.object({
	roleName: z.string().optional(),
	description: z.string().optional()
})