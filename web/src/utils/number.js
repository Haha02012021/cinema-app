export function formatNumber(number) {
  if (number >= 0) {
    const formatedPrice = new Intl.NumberFormat().format(number);

    return formatedPrice;
  }

  return;
}

export function checkNumberInRange(number, range) {
  if (range) {
    const [min, max] = range.split(" - ");
    
    return Number(number) >= min && Number(number) <= max;
  }

  return true;
}
