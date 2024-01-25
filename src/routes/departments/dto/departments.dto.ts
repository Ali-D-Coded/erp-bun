import { z } from "zod";

export const CreateDepartment = z.object({
  name: z.string(),
})