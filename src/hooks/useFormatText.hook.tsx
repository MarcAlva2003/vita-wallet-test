export const useFormatText = () => {
  const formatBalanceNumber = (number: number): string => {
    return new Intl.NumberFormat('es-CL', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }
  return {
    formatBalanceNumber
  }
}