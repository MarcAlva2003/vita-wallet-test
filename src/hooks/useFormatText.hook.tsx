export const useFormatText = () => {
  const formatBalanceNumber = (number: number, maxDecimals?: number): string => {
    return new Intl.NumberFormat('es-CL', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDecimals ?? 10,
    }).format(number);
  }
  return {
    formatBalanceNumber
  }
}