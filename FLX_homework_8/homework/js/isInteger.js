function isInteger(value) {
  if (Math.ceil(value) - value > 0) {
    return false;
  } else {
    return true;
  }
}
isInteger(5);
isInteger(5.1);
