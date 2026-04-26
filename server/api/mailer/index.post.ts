import { mailerInputSchema } from '#shared/dto'

export default defineEventHandler(async (e) => {
  const { email, subject, text } = await readValidatedBody(
    e,
    mailerInputSchema.parse,
  )
  await sendEmail(email, subject, text)

  setResponseStatus(e, 200)

  return {
    ok: true,
    status_code: '200',
    message: 'Email sent successfully',
  }
})
