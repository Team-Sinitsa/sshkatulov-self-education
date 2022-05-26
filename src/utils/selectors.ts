import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

const getFirebase = (state: RootState) => state.firebase;
const getLogger = (state: RootState) => state.logger;

export const getFirebaseSelector = () => useAppSelector(getFirebase);
export const getLoggerSelector = () => useAppSelector(getLogger);
