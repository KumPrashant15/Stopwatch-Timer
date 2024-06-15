let stopwatchInterval;
let stopwatchStartTime;
let stopwatchPausedTime = 0;
let lapCount = 0;

function startStopwatch() {
  const now = Date.now();
  stopwatchStartTime = now - stopwatchPausedTime;

  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(() => {
    const elapsed = Date.now() - stopwatchStartTime;
    displayStopwatch(elapsed);
  }, 10); // update every 10 milliseconds for millisecond accuracy
}

function lapStopwatch() {
  const lapTime = Date.now() - stopwatchStartTime;
  const formattedTime = formatStopwatchTime(lapTime);
  lapCount++;

  const lapTimesContainer = document.getElementById('lapTimes');
  const lapEntry = document.createElement('p');
  lapEntry.textContent = `Lap ${lapCount}: ${formattedTime}`;
  lapTimesContainer.appendChild(lapEntry);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchPausedTime = Date.now() - stopwatchStartTime;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchPausedTime = 0;
  lapCount = 0;
  stopwatchStartTime = null;
  document.getElementById('lapTimes').innerHTML = '';
  displayStopwatch(0);
}

function displayStopwatch(elapsedTime) {
  const formattedTime = formatStopwatchTime(elapsedTime);
  document.getElementById('stopwatchDisplay').textContent = formattedTime;
}

function formatStopwatchTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const millis = Math.floor((milliseconds % 1000));
  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMillis(millis)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMillis(millis) {
  if (millis < 10) {
    return `00${millis}`;
  } else if (millis < 100) {
    return `0${millis}`;
  } else {
    return millis;
  }
}

let timerInterval;
let timerSeconds = 0;

function startTimer() {
  clearInterval(timerInterval);
  const hours = parseInt(document.getElementById('timerHours').value) || 0;
  const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
  timerSeconds = hours * 3600 + minutes * 60;
  displayTimer();
  timerInterval = setInterval(() => {
    timerSeconds--;
    if (timerSeconds < 0) {
      clearInterval(timerInterval);
      alert('Timer has finished!');
    } else {
      displayTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('timerHours').value = '';
  document.getElementById('timerMinutes').value = '';
  timerSeconds = 0;
  displayTimer();
}

function displayTimer() {
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;
  document.getElementById('timerDisplay').textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
