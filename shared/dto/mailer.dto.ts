import { z } from 'zod'

export const mailerInputSchema = z.object({
  email: z.email(),
  subject: z.string(),
  text: z.string(),
})

export type MailerInput = z.infer<typeof mailerInputSchema>
