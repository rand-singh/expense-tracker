const balance = document.getElementById("balance"),
  money_plus = document.getElementById("money-plus"),
  money_minus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "income", amount: 500 },
  { id: 4, text: "shorts", amount: -20 },
];

let transactions = dummyTransactions;

/**
 *
 * @param {object} e The event object
 */
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    console.error("bug");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionsDOM(transaction);

    updateValues();

    text.value = "";
    amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionsDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus"); // add class based on sign value

  item.innerHTML = `
    ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">X</button>
  `;

  list.appendChild(item);
}

// update the balance income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `£${total}`;
  money_plus.innerText = `£${income}`;
  money_minus.innerText = `£${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  init();
}

// Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsDOM);
  updateValues();
}

init();

// event listensers
form.addEventListener("submit", addTransaction);
