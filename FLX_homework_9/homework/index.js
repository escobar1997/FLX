var data = [ // input data
  {
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
];

function findTypes() { // 1
  var res = [];
  for (var i = 0; i < arguments.length; i++) {
    res[i] = typeof arguments[i];
  }

  return res;
}
findTypes(null, 5, "hello");

function executeforEach(arr, func) { // 2
  for (var i in arr) {
    func(arr[i]);
  }
}
executeforEach([1,2,3], function(el) {
 console.log(el)
});

function mapArray(arr, func) { // 3
  var modArr = []
  executeforEach(arr, function (element) {
    modArr.push(func(element));
  });

  return modArr;
}
mapArray([2, 5, 8], function(el) {
 return el + 3
});

function filterArray(arr, func) { // 4
  var totalRes = [];
  executeforEach(arr, function (element) {
    if (func(element)) {
      totalRes.push(element)
    }
  });

  return totalRes;
}
filterArray([2, 5, 8], function(el) {
 return el > 3
});

function getAmountOfAdultPeople(arrObj) { // 5
  return filterArray(arrObj, function (personAge) {
    return personAge.age > 18;
  }).length;
}
getAmountOfAdultPeople(data);

function getGreenAdultBananaLovers(arrObj) { // 6
  var resArr = [];
  var loversGAB = filterArray(arrObj, function (person) {
    return person.age > 18 && person.favoriteFruit === "banana" && person.eyeColor === "green";
  });
  mapArray(loversGAB, function (personName) {
    return resArr.push(personName.name);
  })

  return resArr;
}
getGreenAdultBananaLovers(data);

function keys(obj) { // 7
  var keys=[];
  var prop;
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      keys.push(prop);
    }
  }

  return keys;
}
keys({keyOne: 1, keyTwo: 2, keyThree: 3});

function values(obj) { // 8
  var val = [];
  var prop;
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      val.push(obj[prop]);
    }
  }

  return val;
}
values({keyOne: 1, keyTwo: 2, keyThree: 3});

function showFormattedDate(date) { // 9
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `Date: ${date.getDate()} of ${months[date.getMonth()]}, ${date.getFullYear()}`;
}
showFormattedDate(new Date('2019-01-27T01:10:00'));

function isEvenYear(date) { // 10
  return date.getFullYear() % 2 === 0;
}
isEvenYear(new Date('2019-01-27T01:10:00'));

function isEvenMonth(date) { // 11
  return (date.getMonth() + 1) % 2 === 0;
}
isEvenMonth(new Date('2019-02-27T01:10:00'));
