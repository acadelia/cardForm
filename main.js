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
const main = document.querySelector(".main");

cardNumberInput.addEventListener("beforeinput", (e) => {
  if (e.inputType === "insertText" && /\D/.test(e.data)) {
    showPopup();
  }
});

cardNumberInput.addEventListener("input", (e) => {
  const cardNumber = e.target.value.replace(/\D/g, "");
  updateCardNumber(cardNumber);
});

const updateCardNumber = (cardNumber) => {
  cardNumberInput.value = cardNumber.replace(/(\d{4})/g, "$1 ").trim();

  cardNumberDisplay.forEach((element, i) => {
    const removeAnimationClass = () => {
      element.classList.remove("slide");
      element.removeEventListener("animationend", removeAnimationClass);
    };
    const currentDigit = cardNumber[i] || "#";
    if (element.textContent !== currentDigit) {
      element.classList.add("slide");
      element.textContent = currentDigit;
      element.addEventListener("animationend", removeAnimationClass);
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

const showPopup = () => {
  myPopup.classList.add("show");
  myPopup.addEventListener("animationend", () => {
    myPopup.classList.remove("show");
  });
};

const updateCardHolder = (target) => {
  cardHolderName.textContent = target.value || "FULL NAME";
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
  target.value = numericCvv;
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
const completeSelect = (selectElement, values) => {
  const dropdown = document.getElementById(selectElement);
  const option = document.createElement("option");
  option.value = "";
  const textContent = {
    cardMonth: "Month",
    cardYear: "Year",
  };
  option.textContent = textContent[selectElement];
  dropdown.appendChild(option);

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
const years = ["23", "24", "25", "26", "27", "28", "29", "30"];

completeSelect("cardMonth", months);
completeSelect("cardYear", years);

const addInputEventListeners = (inputElement, updateFunction) => {
  // lifehack ) - ceva nu lucreaza :(
  // inputElement.addEventListener("input", updateFunction);
  inputElement.addEventListener("input", (e) => {
    updateFunction(e.target);
  });
};

addInputEventListeners(cardHolderInput, updateCardHolder);
addInputEventListeners(monthInput, updateMonth);
addInputEventListeners(yearInput, updateYear);
addInputEventListeners(cardCvvInput, updateCvv);

// border animation am reusit :)

const cardBorder = document.querySelector(".card-border");
frontCard.appendChild(cardBorder);

const updateBorderPosition = (element) => {
  if (!element) {
    cardBorder.classList.remove("show-border");
    return;
  }
  const elementRect = element.getBoundingClientRect();
  cardBorder.style.width = `${elementRect.width + 13}px`;
  cardBorder.style.height = `${elementRect.height + 5}px`;
  if (element === cardNumberBord) {
    cardBorder.style.transform = `translate(-5px, -100px)`;
  } else if (element === cardNameBord) {
    cardBorder.style.width = `${elementRect.width + 150}px`;
    cardBorder.style.transform = `translate(-5px, -39px)`;
  } else if (element === cardDateBord) {
    cardBorder.style.transform = `translate(255px, -39px)`;
  }
  cardBorder.classList.add("show-border");
};

const addFocusBorder = (inputElement, borderElement) => {
  inputElement.addEventListener("focus", () => {
    updateBorderPosition(borderElement);
  });
};

const removeBorder = () => {
  cardBorder.classList.remove("show-border");
};

const addBlurEvent = (inputElement) => {
  inputElement.addEventListener("blur", removeBorder);
};

addFocusBorder(cardNumberInput, cardNumberBord);
addFocusBorder(cardHolderInput, cardNameBord);
addFocusBorder(monthInput, cardDateBord);
addFocusBorder(yearInput, cardDateBord);

addBlurEvent(cardNumberInput);
addBlurEvent(cardHolderInput);
addBlurEvent(monthInput);
addBlurEvent(yearInput);

//update la submit
const setInitialValues = () => {
  cardNumberInput.value = "";
  cardHolderInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  cardCvvInput.value = "";

  updateCardNumber("");
  updateCardHolder("");
  updateMonth({ value: "MM" });
  updateYear({ value: "YY" });
  updateCvv("");
};

submitButton.addEventListener("click", () => {
  setInitialValues();
});
