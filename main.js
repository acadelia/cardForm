const cardNumberInput = document.querySelector(".card-number-input");
const cardHolderInput = document.querySelector(".card-holder-input");
const monthInput = document.querySelector("#cardMonth");
const yearInput = document.querySelector("#cardYear");
const cardCvvInput = document.querySelector("#cardCvv");
const frontCard = document.querySelector(".card-front");
const backCard = document.querySelector(".card-back");
const bankType = document.querySelector(".bank-type");
const cardHolderName = document.querySelector(".card-holder-name");
const firstMonth = document.querySelector(".card-expire-month");
const firstYear = document.querySelector(".card-expire-year");
const myPopup = document.getElementById("myPopup");
const cardNumberDisplay = document.querySelectorAll(".card-number-hidden");
const backImage = document.querySelector(".back-img-change");
const submitButton = document.querySelector(".card-form-button");
//for border
const cardNumberBord = document.querySelector(".card-number");
const cardNameBord = document.querySelector(".card-holder-info");
const cardDateBord = document.querySelector(".card-date");

// let popupShown = false;

cardNumberInput.addEventListener("beforeinput", (e) => {
  const inputType = e.inputType;

  if (inputType === "insertText" && /\D/.test(e.data)) {
    showPopup();
    e.preventDefault();
  }
});

cardNumberInput.addEventListener("input", () => {
  const cardNumber = cardNumberInput.value.replace(/\D/g, "");
  updateCardNumber(cardNumber);
});

const updateCardNumber = (cardNumber) => {
  format(cardNumber);

  cardNumberDisplay.forEach((element, i) => {
    const currentDigit = cardNumber[i] || "#";
    if (element.textContent !== currentDigit) {
      element.textContent = "#";
      element.classList.add("slide");
      setTimeout(() => {
        if (element.textContent === "#") {
          element.textContent = currentDigit;
          element.classList.remove("slide");
        }
      }, 400);
    }
    if (cardNumber[0] === "4") {
      bankType.src = "/img/mastercard.png";
      backImage.src = "/img/mastercard.png";
    } else if (cardNumber[0] === "5") {
      bankType.src = "/img/amex.png";
      backImage.src = "/img/amex.png";
    } else {
      bankType.src = "/img/visa.png";
      backImage.src = "/img/visa.png";
    }
  });
};

const format = (cardNumber) => {
  let formattedValue = cardNumber.replace(/(\d{4})/g, "$1 ").trim();
  cardNumberInput.value = formattedValue;
};

const showPopup = () => {
  myPopup.classList.add("show");
  myPopup.addEventListener("animationend", () => {
    myPopup.classList.remove("show");
  });
};

const updateCardHolder = (target) => {
  cardHolderName.textContent = target.value;
};

const updateMonth = (target) => {
  firstMonth.textContent = target.value;
};

const updateYear = (target) => {
  firstYear.textContent = target.value;
};

const updateCvv = (target) => {
  const numericCvv = target.value.replace(/\D/g, "");

  const cvvDisplay = document.querySelector(".card-cvv-content span");
  cvvDisplay.textContent = numericCvv;
};

cardCvvInput.addEventListener("focus", () => {
  frontCard.style.transform = "perspective(1000px) rotateY(-180deg)";
  backCard.style.transform = "perspective(1000px) rotateY(0deg)";
});

cardCvvInput.addEventListener("focusout", () => {
  frontCard.style.transform = "perspective(1000px) rotateY(0deg)";
  backCard.style.transform = "perspective(1000px) rotateY(180deg)";
});

//meniul - ceva gen autocompletare :)
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

const facemBorder = (element, classList) => {
  element.addEventListener("focus", () => {
    classList.add("border");
  });
  element.addEventListener("focusout", () => {
    classList.remove("border");
  });
};

facemBorder(cardNumberInput, cardNumberBord.classList);
facemBorder(cardHolderInput, cardNameBord.classList);
facemBorder(monthInput, cardDateBord.classList);
facemBorder(yearInput, cardDateBord.classList);

const addInputEventListeners = (inputElement, updateFunction) => {
  inputElement.addEventListener("input", (e) => {
    updateFunction(e.target);
  });
};

addInputEventListeners(cardHolderInput, updateCardHolder);
addInputEventListeners(monthInput, updateMonth);
addInputEventListeners(yearInput, updateYear);
addInputEventListeners(cardCvvInput, updateCvv);

submitButton.addEventListener("click", () => {
  console.log("Card Number:", cardNumberInput.value);
  console.log("Card Holder:", cardHolderInput.value);
  console.log("Expiration Month:", monthInput.value);
  console.log("Expiration Year:", yearInput.value);
  console.log("CVV:", cardCvvInput.value);
});

// border animation :(
