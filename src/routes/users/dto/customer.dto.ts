import { z } from "zod";
import { emailRegex } from "../../../utils/constants";

export const CreateCustomerDto = z.object({
	fullName: z.string(),
	email: z.string().regex(emailRegex),
	phone: z.string().min(10),
	address:z.string()

})