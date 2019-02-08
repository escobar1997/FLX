function formatTime(minutes) {
  var days = Math.floor(minutes / 1440);
  var hours = Math.floor((minutes % 1440) / 60);
  var newMinutes = (minutes % 1440) % 60;
  console.log(days + " day(s) " + hours + " hour(s) " + newMinutes + " minute(s)");
}
formatTime(120);
formatTime(59);
formatTime(3601);
