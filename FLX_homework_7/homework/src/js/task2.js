
var randNumber, userNumber;
var prize = 0, sumPrize = 0, coef = 1, confirmation = true, max = 5, min = 0;
if (!confirm("Do you want to play a game?")) {
  alert("You did not become a millionaire, but can.");
} else {
  while (confirmation) {
    randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    for (var i = 3; i >= 1; i--) {
      if (i === 3) {
        userNumber = prompt("Enter a number from 0 to "+ max + "\n" + "Attempts left: " + i + "\n"
         +"Total prize: " + sumPrize + "$" + "\n" + "Possible prize on current attempt: " + (10 * coef) + "$");
      } else if (i === 2) {
        userNumber = prompt("Enter a number from 0 to "+ max + "\n" + "Attempts left: " + i + "\n"
         +"Total prize: " + sumPrize + "$" + "\n" + "Possible prize on current attempt: " + (5 * coef) + "$");
      } else if (i === 1) {
        userNumber = prompt("Enter a number from 0 to "+ max + "\n" + "Attempts left: " + i + "\n"
         +"Total prize: " + sumPrize + "$" + "\n" + "Possible prize on current attempt: " + (2 * coef) + "$");
      }
      if (parseInt(userNumber) === randNumber) {
        if (i === 3) {
          prize = 10 * coef;
          sumPrize += prize;
          confirmation = confirm("Congratulation! Your prize is: " + sumPrize + "$ Do you want to continue?");
          break;
        } else if (i === 2) {
          prize = 5 * coef;
          sumPrize += prize;
          confirmation = confirm("Congratulation! Your prize is: " + sumPrize + "$ Do you want to continue?");
          break;
        } else if (i === 1) {
          prize = 2 * coef;
          sumPrize += prize;
          confirmation = confirm("Congratulation! Your prize is: " + sumPrize + "$ Do you want to continue?");
          break;
        }
      } else if (userNumber !== randNumber && i === 1 || userNumber === null || !confirmation) {
        confirmation = false;
        break;
      }
    }
    if (!confirmation) {
      alert("Thank you for a game. Your prize is: " + sumPrize + "$");
      confirmation = confirm("Do you want to play again?");
      sumPrize = 0;
      coef = 1;
      max = 5;
    } else {
      coef *= 3;
      max *= 2;
    }
  }
}
