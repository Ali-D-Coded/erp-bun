import { z } from "zod";

export const CreateMediaDto = z.object({
	name: z.string(),
	path: z.string()
})

export const CreateDirectory = z.object({
	name: z.string()
})

export const RenameDirectory = z.object({
	currentName: z.string(),
	newName: z.string(),
})

export const RemoveDirectory = z.object({
	name: z.string()
})