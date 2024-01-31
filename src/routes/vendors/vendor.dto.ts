import { z } from "zod"
import { emailRegex } from "../../utils/constants"

export const CreateVendorDto = z.object({
	name: z.string(),
	email: z.string().regex(emailRegex),
	contactPerson: z.string(),
	phone: z.string().min(10),
   address: z.string()
})