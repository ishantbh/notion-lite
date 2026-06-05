import z from 'zod'

export const loginSchema = z.object({
  email: z.email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
