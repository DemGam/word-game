"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  root.style.setProperty("--letter-color", letterColor);
  root.style.setProperty("--letter-color-wrong", letterColorWrong);
  root.style.setProperty("--letter-color-correct", letterColorCorrect);

  const clickSound = document.getElementById("click-sound");
  const winSound = document.getElementById("win-sound");
  const looseSound = document.getElementById("loose-sound");

  let alphabetArray = alphabet.toLowerCase().split("");
  let space; // Number of spaces in word '-'
  let letterItem; // Letter in the alphabet
  let counter; // Count correct guesses
  let answerCharArray = []; // Stored guesses

  let showClue = document.getElementById("clue-word");
  let finalMessageBlock = document.querySelector(".final-message-game");
  let finalMessageText = document.querySelector(".final-message-game__text");

  const timerElement = document.getElementById("timer");

  let remainingTime = startTime;

  updateTimer();
  function updateTimer() {
    // Prevent negative values of timer
    if (remainingTime < 0) {
      remainingTime = 0;
    }

    const minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (remainingTime % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
    const sectorAngle = (360 / startTime) * remainingTime;
    document.querySelector(
      ".wg-timer__dial"
    ).style.background = `conic-gradient(from 0deg, #E5E2FD 0%, #E5E2FD ${sectorAngle}deg, transparent ${sectorAngle}deg)`;

    if (remainingTime === 0) {
      loose();
    }
  }

  function decrementTimer() {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimer();
    }
  }

  // Start the timer
  let timerInterval = setInterval(decrementTimer, 1000);

  function loose() {
    finalMessageText.textContent = failureText;
    finalMessageBlock.classList.add("_active");

    if (looseSound) {
      // Play the loose sound
      looseSound.play();
    }
    // Redirection with delay
    setTimeout(() => {
      window.location.href = `${forwardURL}?sessionid=${sessionID}&word=${word}`;
    }, redirectionDelay * 1000);
  }

  function win() {
    finalMessageText.textContent = successText;
    finalMessageBlock.classList.add("_active");
    // Stop the decrementTimer
    clearInterval(timerInterval);

    if (winSound) {
      // Play the loose sound
      winSound.play();
    }

    // Redirection with delay
    setTimeout(() => {
      window.location.href = `${forwardURL}?sessionid=${sessionID}&word=${word}`;
    }, redirectionDelay * 1000);
  }

  // create alphabet
  function createAlphabetButtons() {
    let wgAlphabet = document.getElementById("wg-alphabet");

    for (let i = 0; i < alphabetArray.length; i++) {
      letterItem = document.createElement("div");
      letterItem.className = "letter-item";
      const letterItemCharacter = document.createElement("div");
      letterItemCharacter.className = "letter-item__character";
      letterItemCharacter.innerHTML = alphabetArray[i];
      checkLetter();
      letterItem.appendChild(letterItemCharacter);
      wgAlphabet.appendChild(letterItem);
    }
  }

  // Create guesses blocks
  function result() {
    let wordHolder = document.getElementById("wg-body__word");
    let answerChar; // Guess block
    for (let i = 0; i < word.length; i++) {
      answerChar = document.createElement("div");
      answerChar.setAttribute("class", "word-item");
      if (word[i] === "-") {
        answerChar.innerHTML = "";
        answerChar.setAttribute("class", "word-item word-item_space");
        space += 1;
      } else {
        answerChar.innerHTML = "";
      }
      answerCharArray.push(answerChar);
      wordHolder.appendChild(answerChar);
    }
  }

  // Check victory
  function checkWin() {
    if (counter + space === answerCharArray.length) {
      win();
    }
  }

  // checking the clicked letter
  function checkLetter() {
    letterItem.onclick = function () {
      let letter = this.querySelector(".letter-item__character").innerHTML;
      this.classList.add("error");
      this.onclick = null;

      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          answerCharArray[i].innerHTML = letter;
          counter += 1;
          this.classList.remove("error");
          this.classList.add("success");
        }
      }
      // processGuess
      // wrong letter
      if (word.indexOf(letter) === -1) {
        checkWin();
        remainingTime = remainingTime - 10;
        updateTimer();
      }
      //right letter
      else {
        checkWin();
      }

      if (clickSound) {
        // Play the loose sound
        clickSound.play();
      }
    };
  }

  function playWordGame() {
    createAlphabetButtons();
    word = word.replace(/\s/g, "-").toLowerCase();

    answerCharArray = [];
    counter = 0;
    showClue.innerHTML = clueWord;
    space = 0;
    result();
    checkWin();
  }

  playWordGame();
});
