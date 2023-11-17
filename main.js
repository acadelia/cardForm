const cardNumberInput = document.querySelector(".card-number-input");
const cardHolderInput = document.querySelector(".card-holder-input");
const monthInput = document.querySelector("#cardMonth");
const yearInput = document.querySelector("#cardYear");
const cardCvvInput = document.querySelector("#cardCvv");
// const cardSpan = document.querySelectorAll(".card-number-hidden");
const frontCard = document.querySelector(".card-front");
const backCard = document.querySelector(".card-back");
const month = document.querySelector(".month");

cardNumberInput.addEventListener("input", (e) => {
  updateCardNumber(e.target);
});

cardHolderInput.addEventListener("input", (e) => {
  updateCardHolder(e.target);
});

monthInput.addEventListener("input", (e) => {
  updateMonth(e.target);
});

yearInput.addEventListener("input", (e) => {
  updateYear(e.target);
});

cardCvvInput.addEventListener("input", (e) => {
  updateCvv(e.target);
});

const updateCardNumber = (target) => {
  const cardNumberDisplay = document.querySelector(".card-number");
  format(target);
  const cardNumber = target.value;
  cardNumberDisplay.textContent = cardNumber;
};

const format = (target) => {
  let value = target.value.replace(/\D/g, "");
  value = value.replace(/(\d{4})/g, "$1 ").trim();
  target.value = value;
};

const updateCardHolder = (target) => {
  const cardHolderDisplay = document.querySelector(".card-holder-name");
  cardHolderDisplay.textContent = target.value;
};

const updateMonth = (target) => {
  const firstMonth = document.querySelector(".card-expire-month");
  firstMonth.textContent = target.value;
};

const updateYear = (target) => {
  const firstYear = document.querySelector(".card-expire-year");
  firstYear.textContent = target.value;
};

const updateCvv = (target) => {
  const cvvDisplay = document.querySelector(".card-cvv-content");
  cvvDisplay.textContent = target.value;
};

// cardNumberInput.addEventListener("input", (e) => {
//   updateCardNumber(e);
// });

// cardHolderInput.addEventListener("input", () => {
//   updateCardHolder();
// });

// monthInput.addEventListener("input", () => {
//   updateMonth();
// });

// yearInput.addEventListener("input", () => {
//   updateYear();
// });

// cardCvvInput.addEventListener("input", () => {
//   updateCvv();
// });

// const updateCardNumber = () => {
//   const cardNumberDisplay = document.querySelector(".card-number");
//   format();
//   const cardNumber = cardNumberInput.value;
//   cardNumberDisplay.textContent = cardNumber;
// };

// function format() {
//   let value = cardNumberInput.value.replace(/\D/g, "");
//   value = value.replace(/(\d{4})/g, "$1 ").trim();
//   cardNumberInput.value = value;
// }

// const updateCardHolder = () => {
//   const cardHolderDisplay = document.querySelector(".card-holder-name");
//   cardHolderDisplay.textContent = cardHolderInput.value;
// };

// const updateMonth = () => {
//   const firstMonth = document.querySelector(".card-expire-month");
//   firstMonth.textContent = monthInput.value;
// };

// const updateYear = () => {
//   const firstYear = document.querySelector(".card-expire-year");
//   firstYear.textContent = yearInput.value;
// };

// const updateCvv = () => {
//   const cvvDisplay = document.querySelector(".card-cvv-content");
//   cvvDisplay.textContent = cardCvvInput.value;
// };

cardCvvInput.addEventListener("focus", () => {
  frontCard.style.transform = "perspective(1000px) rotateY(-180deg)";
  backCard.style.transform = "perspective(1000px) rotateY(0deg)";
});

cardCvvInput.addEventListener("focusout", () => {
  frontCard.style.transform = "perspective(1000px) rotateY(0deg)";
  backCard.style.transform = "perspective(1000px) rotateY(180deg)";
});

const submitButton = document.querySelector(".card-form-button");
submitButton.addEventListener("click", () => {
  console.log("Card Number:", cardNumberInput.value);
  console.log("Card Holder:", cardHolderInput.value);
  console.log("Expiration Month:", monthInput.value);
  console.log("Expiration Year:", yearInput.value);
  console.log("CVV:", cardCvvInput.value);
});

//meniul - ceva gen autocompletare
const completeaza = (selectElement, values) => {
  const dropdown = document.getElementById(selectElement);

  const defaultul = document.createElement("option");
  defaultul.value = "";
  defaultul.textContent = selectElement === "cardMonth" ? "Month" : "Year";
  dropdown.appendChild(defaultul);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    dropdown.appendChild(option);
  });
};

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const years = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];

completeaza("cardMonth", months);
completeaza("cardYear", years);

// foloseste $eventul de la eventlistener

// au mai rams:
// erorile
// visa/mastercard
// update la fiecare #
