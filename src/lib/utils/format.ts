import { ethers } from 'ethers';
import { SUPPORTED_CURRENCIES } from '../constants/settings';

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(
  amount: string | number,
  currency: string = 'USD'
): string {
  const currencyInfo = SUPPORTED_CURRENCIES.find((c) => c.code === currency);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyInfo?.code || 'USD',
  });
  return formatter.format(Number(amount));
}

export function formatTransactionHash(hash: string): string {
  if (!hash) return '';
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export function parseUnits(amount: string, decimals: number = 18): ethers.BigNumber {
  return ethers.parseUnits(amount, decimals);
}

export function formatUnits(amount: ethers.BigNumber, decimals: number = 18): string {
  return ethers.formatUnits(amount, decimals);
}