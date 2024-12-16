import { z } from 'zod';
import { TRANSFER_LIMITS } from '../constants/settings';
import { ethers } from 'ethers';

// Transfer validation schema
export const transferSchema = z.object({
  recipient: z
    .string()
    .refine((val) => ethers.isAddress(val), {
      message: 'Invalid Ethereum address',
    }),
  amount: z
    .number()
    .min(TRANSFER_LIMITS.MIN_AMOUNT, {
      message: `Minimum transfer amount is ${TRANSFER_LIMITS.MIN_AMOUNT}`,
    })
    .max(TRANSFER_LIMITS.MAX_AMOUNT, {
      message: `Maximum transfer amount is ${TRANSFER_LIMITS.MAX_AMOUNT}`,
    }),
  currency: z.string(),
});

// Profile validation schema
export const profileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  dailyLimit: z.number().min(0),
  notifications: z.boolean(),
});

// Security settings validation schema
export const securitySchema = z.object({
  twoFactorEnabled: z.boolean(),
  twoFactorMethod: z.enum(['authenticator', 'sms']),
  notificationEmail: z.string().email().optional(),
  notificationPhone: z.string().optional(),
});