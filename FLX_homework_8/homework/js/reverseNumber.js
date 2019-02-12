function reverseNumber(number) {
  var rev = [];
  var stringNumber = number.toString().split('');
  for (var i = 0; i < stringNumber.length; i++){
    rev[i] = stringNumber[(stringNumber.length - 1) - i];
  }
  stringNumber = rev.join('');
  return Math.sign(number) * parseInt(stringNumber);
}
reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);
