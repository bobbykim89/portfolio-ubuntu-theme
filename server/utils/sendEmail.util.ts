import { useRuntimeConfig } from '#imports'
import { createError } from 'h3'
import nodemailer from 'nodemailer'

export const sendEmail = async (
  email: string,
  subject: string,
  text: string,
) => {
  const config = useRuntimeConfig()
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.mailerEmailAddress,
        pass: config.mailerAppPassword,
      },
    })

    if (!email || !subject || !text) {
      throw createError({
        status: 400,
        statusMessage: 'Missing required fields',
      })
    }

    await transporter.sendMail({
      from: config.mailerEmailAddress,
      to: config.public.emailAddress,
      subject,
      text: `Sender: ${email}\nContent:\n${text}`,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred'
    throw createError({
      status: 500,
      message,
      statusMessage: 'Failed to send email',
    })
  }
}
