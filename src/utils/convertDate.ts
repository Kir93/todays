import dayjs from 'dayjs';

export const convertDateFormat = (date: Date): string => dayjs(date).format('YYYY-MM-DD');
