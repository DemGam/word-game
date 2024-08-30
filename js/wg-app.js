"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  root.style.setProperty("--letter-color", letterColor);
  root.style.setProperty("--letter-color-wrong", letterColorWrong);
  root.style.setProperty("--letter-color-correct", letterColorCorrect);

  const successClickSound = document.getElementById("success-click-sound");
  const failClickSound = document.getElementById("fail-click-sound");
  const winSound = document.getElementById("win-sound");
  const looseSound = document.getElementById("loose-sound");

  let space; // Number of spaces in word '-'
  let letterItem; // Letter in the alphabet
  let counter; // Count correct guesses
  let answerCharArray = []; // Stored guesses
  let wordValue = "";
  let guessCounter = 0;

  let showClue = document.getElementById("clue-word");
  let finalMessageBlock = document.querySelector(".final-message-game");
  let finalMessageText = document.querySelector(".final-message-game__text");

  const timerElement = document.getElementById("timer-count");

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

    wordCheck();

    if (looseSound) {
      // Play the loose sound
      looseSound.play();
    }
    // Redirection with delay
    setTimeout(() => {
      window.location.href = `${forwardURL}?sessionid=${sessionID}&word=${word}&wordvalue=${wordValue}&guesscounter=${guessCounter}`;
    }, redirectionDelay * 1000);
  }

  function win() {
    finalMessageText.textContent = successText;
    finalMessageBlock.classList.add("_active");

    wordCheck();

    // Stop the decrementTimer
    clearInterval(timerInterval);

    if (winSound) {
      // Play the loose sound
      winSound.play();
    }

    // Redirection with delay
    setTimeout(() => {
      window.location.href = `${forwardURL}?sessionid=${sessionID}&word=${word}&wordvalue=${wordValue}&guesscounter=${guessCounter}`;
    }, redirectionDelay * 1000);
  }

  function wordCheck() {
    let answerWordChars = document.querySelectorAll(".word-item");
    if (answerWordChars) {
      answerWordChars.forEach(function (answerWordChar) {
        if (answerWordChar.textContent.trim() === "") {
          wordValue += "*";
        } else {
          wordValue += answerWordChar.textContent;
        }
      });
    }
  }

  // create alphabet
  function createAlphabetButtons() {
    let wgAlphabet = document.getElementById("wg-alphabet");

    let alphabetLines = [alphabet1, alphabet2, alphabet3];

    alphabetLines.forEach((line) => {
      let row = document.createElement("div");
      row.classList.add("wg-body__alphabet-line");

      for (let char of line) {
        letterItem = document.createElement("div");
        letterItem.className = "letter-item";
        const letterItemCharacter = document.createElement("div");
        letterItemCharacter.classList.add("letter-item__character");
        letterItemCharacter.textContent = char;
        checkLetter();
        letterItem.appendChild(letterItemCharacter);
        row.appendChild(letterItem);
      }

      wgAlphabet.appendChild(row);
    });
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
      guessCounter += 1;
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
        if (failClickSound) {
          // Play the fail click sound
          failClickSound.pause();
          failClickSound.currentTime = 0;
          failClickSound.play();
        }

        checkWin();
        remainingTime = remainingTime - failDeductTime;
        updateTimer();
      }
      //right letter
      else {
        if (successClickSound) {
          // Play the success click sound
          successClickSound.pause();
          successClickSound.currentTime = 0;
          successClickSound.play();
        }
        checkWin();
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
