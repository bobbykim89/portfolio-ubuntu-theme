import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: 'documents/**/*.md',
      schema: z.object({
        title: z.string(),
        order: z.number().optional(),
        fileName: z.string(),
        type: z.string(),
        imageUrl: z.string().optional(),
        githubUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
        emailAddress: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        image: z.string().optional(),
        githubUrl: z.string().optional(),
        linkedinUrl: z.string().optional(),
        emailAddress: z.string().optional(),
        date: z.string(),
      }),
    }),
  },
})
