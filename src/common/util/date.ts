import * as dayjs from 'dayjs';

export const now = () => dayjs().unix() * 1_000;
