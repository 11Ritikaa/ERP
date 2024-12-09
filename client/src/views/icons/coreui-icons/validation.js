import { z } from 'zod'

export const productSchema = z.object({
  productName: z.string().min(1, 'Product Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  sku: z.string().min(1, 'SKU is required'),
  cost: z
    .string()
    .nonempty('Cost is required')
    .refine((value) => !isNaN(Number(value)), { message: 'Cost must be a valid number' })
    .refine((value) => Number(value) > 0, { message: 'Cost must be a positive number' }),
  length: z.coerce.number().positive('Length must be a positive number'),
  width: z.coerce.number().positive('Width must be a positive number'),
  height: z.coerce.number().positive('Height must be a positive number'),
  dimensionUnit: z.enum(['cm', 'mm', 'in']),
  weight: z.coerce.number().positive('Weight must be a positive number'),
  weightUnit: z.enum(['kg', 'gram', 'lbs']),
  materialType: z.string().min(1, { message: 'Material Type is required' }),
  material: z.string().optional(),
  stock: z.coerce.number().min(1, { message: 'Stock must be greater than 0' }),
  price: z.coerce.number().positive('Price must be a positive number'),
  hsn: z.coerce.number().positive('HSN code is required'),
  status: z.enum(['Active', 'Prototype', 'Draft', 'Deactive']),
  finish: z.boolean(),
  type: z.enum(['normal', 'antique']),
  paletteApplication: z.boolean(),
})
