function userCard (index) {
  let topRange = 3;
  if (index > topRange || index < 1) {
    console.error('userCard index should be in range from 1 to 3');
    return false;
  }
  let balance = 100;
  let transactionLimit = 100;
  let historyLogs = [];
  let key;

  function zeroBeforeDate(date) {
    let value = 10;
    date < value ? date = '0' + date : date;
    return date;
  }

  function getOperationDate() {
    let date = new Date();

    return `${zeroBeforeDate(date.getDate())}/${zeroBeforeDate(date.getMonth() + 1)}/${date.getFullYear()},\
 ${zeroBeforeDate(date.getHours())}:${zeroBeforeDate(date.getMinutes())}:${zeroBeforeDate(date.getSeconds())}`;
  }

  return {
    getCardOptions: function () {
      return {balance: balance, transactionLimit: transactionLimit, historyLogs: historyLogs, key: index};
    },

    putCredits: function (putCred) {
        balance += putCred;
        historyLogs.push({operationType: 'Received credits', credits: putCred, operationTime: getOperationDate()});
    },

    takeCredits: function (takeCred) {
      if (transactionLimit >= takeCred && balance >= takeCred) {
        balance -= takeCred;
        historyLogs.push({operationType: 'Withdrawal of credits',
                          credits: takeCred,
                          operationTime: getOperationDate()});
      } else {
        console.error("You cannot do this because of transaction limit or you don't have enough money");
      }
    },

    setTransactionLimit: function (transLim) {
      transactionLimit = transLim;
      historyLogs.push({operationType: 'Transaction limit change',
                        credits: transLim,
                        operationTime: getOperationDate()});
    },

    transferCredits: function transferCredits(transCred, obj) {
      let taxCoef = 0.005;
      let tax = taxCoef * transCred;
      if (transactionLimit >= transCred && balance - tax >= transCred) {
        balance -= transCred + tax;
        obj.putCredits(transCred);
        historyLogs.push({operationType: 'Withdrawal of credits',
                          credits: transCred + tax,
                          operationTime: getOperationDate()});
      } else {
        console.error("You cannot do this because of transaction limit or you don't have enough money");
      }
    }
  };
}

function check(value, arr) {
  for (let prop in arr) {
    if (value === arr[prop]) {
      return false;
    }
  }
  return true;
}

class UserAccount {

  constructor(name) {
    this.name = name;
    this.cards = [];
    this.maxCards = 3;
    this.keys = [];
  }

  addCard() {
    if (this.cards.length < this.maxCards) {
      this.cards.push(userCard(this.cards.length + 1));
    } else {
      console.error('Operation can not be executed: you have maximum amount of cards!');
    }
  }

  getCardByKey(key) {
    let downRange = 1;
    let topRange = 3;
    if (key >= downRange && key <= topRange && check(key, this.keys)) {
      this.keys.push(key);
      return this.cards[key - 1];
    } else {
      console.error('getCardByKey argument should be unique and set in range from 1 to 3');
    }
  }
}
