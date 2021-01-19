export const now = new Date().valueOf();
export const noop = () => {};
export const companyCode = (company) => {
    switch (company.toLowerCase()) {
    case 'chums':
    case 'chi':
        return 'CHI';
    case 'bc':
    case 'bcs':
        return 'BCS';
    default:
        return 'CHI';
    }
}
