export const APP_MODE = import.meta.env.APP_MODE || 'internal';

export const isInternalMode = () => APP_MODE === 'internal';
export const isLicensedMode = () => APP_MODE === 'licensed';
