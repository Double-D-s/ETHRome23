// To be used in JSON.stringify when a field might be bigint
// https://wagmi.sh/react/faq#bigint-serialization
export const replacer = (key: string, value: unknown) => (typeof value === "bigint" ? value.toString() : value);

export function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export const secondsToTime = secs => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: twoDigit(hours),
    m: twoDigit(minutes),
    s: twoDigit(seconds),
  };
  return obj;
};

export const truncateStr = (str, n = 6) => {
  if (!str) return "";
  return str.length > n ? str.substr(0, n - 1) + "..." + str.substr(str.length - n, str.length - 1) : str;
};
