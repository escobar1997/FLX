function reverseNumber(number) {
  var reverseNumber = number.toString().split('').reverse().join('');
  return Math.sign(number) * parseInt(reverseNumber);
}
reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);
