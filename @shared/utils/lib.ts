export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const allowNumberOnlyInput = (value: string): boolean => {
  const re = /^[0-9\b]+$/;
  if (value === "" || re.test(value)) {
    return true;
  } else return false;
};

export const formatNumberToHaveCommas = (value: string): string =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
