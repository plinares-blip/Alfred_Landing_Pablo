export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const parseCurrencyInput = (val: string): number => {
    return Number(val.replace(/[^0-9]/g, ''));
};
