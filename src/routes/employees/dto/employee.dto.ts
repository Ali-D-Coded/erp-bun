import { z } from "zod";
import { emailRegex } from "../../../utils/constants";

export const CreateEmployeeDto = z.object({
  fullName: z.string(),
  userName: z.string().min(3),
  email: z.string().regex(emailRegex),
  password: z.string().min(8),
  phone: z.string().min(10),
  role: z.enum(["SALESMAN", "MANAGER", "ACCOUNTANT"]),
  jobTitle: z.string(),
  departmentId: z.number(),
  permissionId: z.number().optional(),

})

export const UpdateEmployeeDto = z.object({
  fullName: z.string().optional(),
  userName: z.string().min(3).optional(),
  email: z.string().regex(emailRegex).optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).optional(),
  role: z.enum(["SALESMAN", "MANAGER", "ACCOUNTANT"]).optional(),
  jobTitle: z.string().optional(),
  departmentId: z.number().optional(),
  permissionId: z.number().optional(),

})
