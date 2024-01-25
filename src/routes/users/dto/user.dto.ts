import { z } from "zod";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/i


export const CreateUser = z.object({
  fullName: z.string(),
  userName: z.string().min(3),
  email: z.string().regex(emailRegex),
  password: z.string().min(8),
  phone: z.string().min(10),
  role: z.enum(["SALESMAN", "MANAGER", "ACCOUNTANT"]),
  jobTitle: z.string()
})
