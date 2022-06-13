import dayjs from 'dayjs';

type ReturnProps = {
  [key in 'year' | 'month' | 'day']: string;
};

export default (): ReturnProps => ({
  year: dayjs().year().toString(),
  month: (dayjs().month() + 1).toString(),
  day: dayjs().date().toString(),
});
