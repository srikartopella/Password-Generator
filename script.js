// password display
const passwordDisplay = document.querySelector("#passwordDisplay");
// inputs - 5
const passwordLengthElement = document.querySelector("#passwordLengthElement");
const numbersElement = document.querySelector("#numbersElement");
const lowercaseElement = document.querySelector("#lowercaseElement");
const uppercaseElement = document.querySelector("#uppercaseElement");
const charactersElement = document.querySelector("#charactersElement");
// msg section
const msgSection = document.querySelector("#msg");
// button
const generateBtn = document.querySelector("#generateBtn");
// clipboard btn
const clipboard = document.querySelector("#clipboard");
// Store
const characters = ["/", ".", ",", "(", ")", "!", "@", "%", "*", "&", "$", "#"];
let password = "";
let userInput = {
  length: 10,
  numbers: false,
  lowercase: true,
  uppercase: false,
  characters: false,
};
const keys = {
  n: function () {
    return Math.floor(Math.random() * 9);
  },
  l: function () {
    // Refer asciichart.com for better understanding
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  },
  u: function () {
    // Refer asciichart.com for better understanding
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  },
  c: function () {
    return characters[Math.floor(Math.random() * characters.length)];
  },
};

// Funtions
// Error Messages Handler
function showMessage(msg, type) {
  let list = msgSection.classList;
  type === "error" ? list.add("red") : list.add("green");
  msgSection.textContent = msg;
  list.remove("hide");
  let timeout = setTimeout(() => {
    clearTimeout(timeout);
    list.add("hide");
    msgSection.textContent = "";
    type === "error" ? list.remove("red") : list.remove("green");
  }, 3000);
}

function getLetters() {
  let letters = [];
  for ([entry, value] of Object.entries(userInput)) {
    value === true ? letters.push(entry[0]) : "";
  }
  return letters;
}

function generatePassword() {
  let generatedPassword = "";
  let letters = getLetters();
  if (letters.length === 0) {
    showMessage("Please toggle atleast one input", "error");
  } else {
    for (let i = 0; i < userInput.length; i++) {
      /* 
      gets random letter from letters arr and finds letter in keys object and runs it and assigns it to password.
      */
      generatedPassword +=
        keys[letters[Math.floor(Math.random() * letters.length)]]();
    }
  }
  passwordDisplay.textContent = generatedPassword;
  password = generatedPassword;
}

async function copyText(text) {
  if (text.length >= 1) {
    try {
      await navigator.clipboard.writeText(text);
      showMessage("Password copied to clipboard", "success");
    } catch (err) {
      showMessage("Error!, Please try again after 5 seconds", "error");
    }
  } else {
    showMessage("No Password to copy, Try generate button", "error");
  }
}

// Logic
// limiting input only to numbers
passwordLengthElement.addEventListener("input", () => {
  let value = passwordLengthElement.value;
  if (value >= 21) {
    passwordLengthElement.value = 20;
    showMessage("Can't be greater than 20", "error");
  } else if (value <= 0 || value === null || value === undefined) {
    passwordLengthElement.value = 10;
    showMessage("Can't be less than 0 - Default 10", "error");
  }
  userInput.length = parseInt(passwordLengthElement.value);
});

[lowercaseElement, uppercaseElement, charactersElement, numbersElement].forEach(
  (btn) => {
    btn.addEventListener("click", () => {
      let keys = Object.keys(userInput);
      let index = keys.indexOf(btn.name);
      if (keys.includes(btn.name)) {
        userInput[keys[index]] = btn.checked;
      }
    });
  }
);

generateBtn.addEventListener("click", generatePassword);
clipboard.addEventListener("click", () => {
  copyText(password);
});
