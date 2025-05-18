const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let isOn = true;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("power")) {
      isOn = !isOn;
      display.value = isOn ? "" : "";
      buttons.forEach((b) => {
        if (!b.classList.contains("power")) {
          b.disabled = !isOn;
        }
      });
      return;
    }

    if (!isOn) return;

    if (btn.classList.contains("clear")) {
      display.value = "";
    } else if (btn.classList.contains("equal")) {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += btn.textContent;
    }
  });
});
