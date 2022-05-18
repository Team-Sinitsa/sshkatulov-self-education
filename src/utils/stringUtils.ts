export const processFirebaseAuthError = (e: string) => e?.replace('auth/', '')?.replaceAll('-', ' ')?.trim()?.toUpperCase() ?? 'Unknown error';
