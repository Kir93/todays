type IProps = {
  [key in 'year' | 'month' | 'day']: string;
};
export default ({ year, month, day }: IProps): string =>
  `${year}-${month.slice(-2).length < 2 ? 0 + month.slice(-2) : month.slice(-2)}-${
    day.slice(-2).length < 2 ? 0 + day.slice(-2) : day.slice(-2)
  }`;
