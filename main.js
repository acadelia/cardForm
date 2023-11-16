const cardNumberInput = document.querySelector(".card-number-input");
const cardHolderInput = document.querySelector(".card-holder-input");
const monthInput = document.querySelector("#cardMonth");
const yearInput = document.querySelector("#cardYear");
const cardCvvInput = document.querySelector("#cardCvv");

cardNumberInput.addEventListener("input", () => {
  updateCardNumber();
  format();
});

cardHolderInput.addEventListener("input", () => {
  updateCardHolder();
});

monthInput.addEventListener("input", () => {
  updateMonth();
});

yearInput.addEventListener("input", () => {
  updateYear();
});

cardCvvInput.addEventListener("input", () => {
  updateCvv();
});

const updateCardNumber = () => {
  const cardNumberDisplay = document.querySelector(".card-number");
  format(cardNumberInput.value);
  const cardNumber = cardNumberInput.value;
  cardNumberDisplay.textContent = cardNumber;
};

function format() {
  let value = cardNumberInput.value.replace(/\D/g, "");
  value = value.replace(/(\d{4})/g, "$1 ").trim();
  cardNumberInput.value = value;
}

const updateCardHolder = () => {
  const cardHolderDisplay = document.querySelector(".card-holder-name");
  cardHolderDisplay.textContent = cardHolderInput.value;
};

const updateMonth = () => {
  const firstMonth = document.querySelector(".card-expire-month");
  firstMonth.textContent = monthInput.value;
};

const updateYear = () => {
  const firstYear = document.querySelector(".card-expire-year");
  firstYear.textContent = yearInput.value;
};

const updateCvv = () => {
  const cvvDisplay = document.querySelector(".card-cvv-content");
  cvvDisplay.textContent = cardCvvInput.value;
};

const submitButton = document.querySelector(".card-form-button");
submitButton.addEventListener("click", () => {
  console.log("Card Number:", cardNumberInput.value);
  console.log("Card Holder:", cardHolderInput.value);
  console.log("Expiration Month:", monthInput.value);
  console.log("Expiration Year:", yearInput.value);
  console.log("CVV:", cardCvvInput.value);
});
