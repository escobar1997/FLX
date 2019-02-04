var price = prompt("input amount of money");
var discount = prompt("input the discount");
if (isNaN(price) || isNaN(discount) || (price > 9999999) || (price < 0) ||
(discount < 0) || (discount > 99) || (price === "") || (discount === "")) {
  alert("Invalid input data")
} else {
  var priceWithDiscount = price - price * discount * 0.01;
  var saved = price - priceWithDiscount;
   alert("Price without discount: " + Math.floor(price * 100) / 100 + "\n" +
  "Discount: " + Math.floor(discount * 100) / 100 + "%" + "\n" +
  "Price with discount: " + Math.floor(priceWithDiscount * 100) / 100 + "\n" +
  "Saved: " + Math.floor(saved * 100) / 100);
}
