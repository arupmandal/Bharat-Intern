// script.js
const celsiusField = document.querySelector("#celsius");
const degree = document.querySelector("#degree");
const convertBtn = document.querySelector("#convert-btn");
const tempType = document.querySelector("#temp-type");

window.addEventListener("load", () => {
  degree.value = "";
  celsiusField.innerHTML = "";
});

if (degree.value === "") {
  convertBtn.setAttribute("disabled", "");
  setTimeout(() => {
    convertBtn.removeAttribute("disabled");
  }, 4000);
}

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  convertToCelsius();
  convertBtn.innerHTML =
    "<span class='icon'><i class='fa fa-spinner fa-spin'></i> Converting...</span>";
  setTimeout(() => {
    convertBtn.innerHTML = "<span>Convert</span>";
  }, 1000);
});

function convertToCelsius() {
  let inputValue = degree.value;

  setTimeout(() => {
    if (tempType.value === "fahrenheit") {
      const FahrenheitToCelsius = (inputValue - 32) * (5 / 9);
      celsiusField.innerHTML = `${FahrenheitToCelsius.toFixed(3)} &deg;C`;
    } else if (tempType.value === "kelvin") {
      const KelvinToCelsius = inputValue - 273.15;
      celsiusField.innerHTML = `${KelvinToCelsius.toFixed(3)} &deg;C`;
    } else if (tempType.value === "rankine") {
      const RankineToCelsius = (inputValue - 491.67) * (5 / 9);
      celsiusField.innerHTML = `${RankineToCelsius.toFixed(3)} &deg;C`;
    }
  }, 1200);
}

// Time Show Funcation
function updateRealTime() {
    const timeElement = document.querySelector(".time");
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
  
    const timeString = `${formattedHours}:${String(minutes).padStart(
      2,
      "0"
    )} ${ampm}`;
    timeElement.textContent = timeString;
  }
  
  // Update the time immediately
  updateRealTime();
  
  // Update the time every second (real-time)
  setInterval(updateRealTime, 1000);
  
  const batteryIcon = document.getElementById("battery-icon");
  
  // Check if the Battery Status API is available
  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      // Update the battery percentage
      updateBatteryPercentage(battery);
  
      // Listen for changes in the battery status
      battery.addEventListener("levelchange", () => {
        updateBatteryPercentage(battery);
      });
    });
  } else {
    batteryIcon.innerHTML = "Battery API not supported";
  }
  
  function updateBatteryPercentage(battery) {
    const percentage = (battery.level * 100).toFixed(2);
    batteryIcon.innerHTML = ` ${percentage}%`;
  }
  
  
  const iconContainer = document.getElementById("icon-container");

  function updateConnectionStatus() {
    if (navigator.onLine) {
      // User is connected to the internet
      iconContainer.innerHTML = "<i class='bx bx-wifi'></i>";
    } else {
      // User is not connected to the internet
      iconContainer.innerHTML = "<i class='bx bx-signal-4'></i>";
    }
  }

  // Update the connection status initially
  updateConnectionStatus();

  // Listen for changes in the online/offline status
  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);