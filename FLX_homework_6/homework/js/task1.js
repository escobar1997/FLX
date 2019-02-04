var a = prompt('Input a:');
var b = prompt('Input b:');
var c = prompt('Input c:');
if (isNaN(a) || isNaN(b) || isNaN(c) || a === "" || b === "" || c === "") {
  alert("Invalid input data");
} else {
  var dysk = Math.pow(b, 2) - 4 * a * c;
  if (dysk > 0) {
    var x1 = (-b - Math.sqrt(dysk)) / 2 * a;
    var x2 = (-b + Math.sqrt(dysk)) / 2 * a;
    if (x1 === x2) {
      alert("x = " + x1);
    } else {
      alert("x1 = " + x1 + " and x2 = " + x2);
    }
  } else if (dysk === 0) {
    alert("x = " + (-b / 2 * a));
  } else if (dysk < 0){
    alert("no solution");
  }
}
