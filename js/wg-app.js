"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  root.style.setProperty("--letter-color", letterColor);
  root.style.setProperty("--letter-color-wrong", letterColorWrong);
  root.style.setProperty("--letter-color-correct", letterColorCorrect);

  // const configDiv = document.getElementById("wg-config");

  // if (configDiv) {
  // 	const timeLeft = configDiv.dataset.timeLeft;
  // 	const word = configDiv.dataset.word;
  // 	const clueWord = configDiv.dataset.clueWord;
  // 	const letterColor = configDiv.dataset.letterColor;
  // 	const letterColorWrong = configDiv.dataset.letterColorWrong;
  // 	const letterColorCorrect = configDiv.dataset.letterColorCorrect;
  // 	const successText = configDiv.dataset.successText;
  // 	const forwardURL = configDiv.dataset.forwardURL;

  // 	root.style.setProperty("--letter-color", letterColor);
  // 	root.style.setProperty("--letter-color-wrong", letterColorWrong);
  // 	root.style.setProperty("--letter-color-correct", letterColorCorrect);
  // }

  const timerElement = document.getElementById("timer");
  const startTime = 100; // Initial time in seconds
  let remainingTime = startTime;
  updateTimer();
  function updateTimer() {
    const minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (remainingTime % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
    const sectorAngle = (360 / startTime) * remainingTime;
    document.querySelector(
      ".wg-timer__dial"
    ).style.background = `conic-gradient(from 0deg, #E5E2FD 0%, #E5E2FD ${sectorAngle}deg, transparent ${sectorAngle}deg)`;
  }

  function decrementTimer() {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimer();
    }
    if (remainingTime === 0) {
      // Redirect to google.com when timer reaches 00:00
      // window.location.href = 'https://www.google.com';
    }
  }

  // Start the timer
  setInterval(decrementTimer, 1000);
});
