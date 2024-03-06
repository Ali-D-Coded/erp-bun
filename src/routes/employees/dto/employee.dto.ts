import { z } from "zod";
import { emailRegex } from "../../../utils/constants";

export const CreateEmployeeDto = z.object({
  fullName: z.string(),
  userName: z.string().min(3),
  email: z.string().regex(emailRegex),
  password: z.string().min(8),
  phone: z.string().min(10),
  // rolesId: z.number(),
  jobTitle: z.string(),
  departmentsId: z.number(),
  joiningDate: z.string(),
  salary: z.string()

})

export const UpdateEmployeeDto = z.object({
  fullName: z.string().optional(),
  userName: z.string().min(3).optional(),
  email: z.string().regex(emailRegex).optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).optional(),
  rolesId: z.number().optional(),
  jobTitle: z.string().optional(),
  departmentsId: z.number().optional(),
  joiningDate: z.string().optional(),
  salary: z.string().optional()
})
