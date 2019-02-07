var login = prompt("Please enter your login:");
if (!login) {
  alert("Canceled");
} else if (login.length < 4) {
    alert("I don't know any users having name length less than 4 symbols");
} else if (login === "User" || login === "Admin") {
    var pass = prompt("Please enter your password:");
  if (!pass) {
    alert("Canceled");
  } else if (login === "User" && pass === "UserPass") {
    if (new Date().getHours() < 20) {
      alert("Good day, dear User!");
    } else {
      alert("Good evening, dear User!");
    }
  } else if (login === "Admin" && pass === "RootPass") {
      if (new Date().getHours() < 20) {
        alert("Good day, dear Admin!");
      } else {
        alert("Good evening, dear Admin!");
      }
  } else {
      alert("Wrong password");
  }
} else{
    alert("I don’t know you");
}
