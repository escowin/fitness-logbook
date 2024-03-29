// common functions
function currentYear() {
  let year = new Date().getFullYear();
  console.log(`
   \u00A9 ${year} Edwin M. Escobar
   https://github.com/escowin/fitness-logbook
   `);

  const yearEl = document.getElementById("year");
  yearEl.innerText = year;

  return yearEl;
}

function activeLink() {
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    if (link.id === "logout") {
      return;
    }

    if (link.href === currentUrl) {
      // Adds the 'active' class to the matching link
      link.classList.add("active");
    }
  });
}

// - char count | takes in the user-input value, and the input field's char limit
function characterLimit(inputEl, charMax) {
  const charCountEl = document.getElementById("char-count");
  const charLength = inputEl.value.length;
  charCountEl.innerText = charLength;

  if (charLength === charMax) {
    charCountEl.className = "char-limit";
  } else {
    charCountEl.className = "";
  }
}

// - regex | inputEl is defined in entry scripts
function weightRegex(inputEl) {
  // limits user input to 3 digits & one decimal
  const regex = /^\d{0,3}(\.\d{0,1})?$/;
  const inputValid = regex.test(inputEl.value);
  if (!inputValid) {
    // removes last input character
    inputEl.value = inputEl.value.slice(0, -1);
  } else if (parseFloat(inputEl.value) > 500) {
    inputEl.value = "500";
  }
}

// calls
currentYear();
activeLink();
