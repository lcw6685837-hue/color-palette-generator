const generateBtn = document.getElementById("generate-btn");
const colorBoxes = document.querySelectorAll(".color-box");
const colorGrid = document.getElementById("color-grid");
const toast = document.getElementById("toast");

const baseColors = [
  "#FF5252",
  "#FF4081",
  "#E040FB",
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
  "#B2FF59",
  "#EEFF41",
  "#FFFF00",
  "#FFD740",
  "#FFAB40",
  "#FF6E40",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#006064",
  "#1B5E20",
  "#33691E",
  "#827717",
  "#F57F17",
  "#E65100",
];

const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase();

const showToast = (msg) => {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
};

const updateBox = (box, color) => {
  if (box.classList.contains("locked")) return;
  box.querySelector(".color").style.backgroundColor = color;
  box.querySelector(".hex-value").innerText = color;
};

// 자물쇠 클릭 이벤트
colorBoxes.forEach((box) => {
  const lockBtn = box.querySelector(".lock-btn");
  lockBtn.addEventListener("click", () => {
    box.classList.toggle("locked");
    lockBtn.classList.toggle("fa-unlock");
    lockBtn.classList.toggle("fa-lock");
  });
});

const initGrid = () => {
  colorGrid.innerHTML = "";
  baseColors.forEach((color) => {
    const item = document.createElement("div");
    item.className = "grid-item";
    item.style.backgroundColor = color;
    item.addEventListener("click", () => {
      updateBox(colorBoxes[0], color);
      for (let i = 1; i < colorBoxes.length; i++)
        updateBox(colorBoxes[i], getRandomColor());
      showToast(`${color} 계열 팔레트 생성! 🌈`);
    });
    colorGrid.appendChild(item);
  });
};

generateBtn.addEventListener("click", () => {
  colorBoxes.forEach((box) => updateBox(box, getRandomColor()));
});

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const hexText =
      e.target.parentElement.querySelector(".hex-value").innerText;
    navigator.clipboard.writeText(hexText).then(() => {
      showToast(`${hexText} 복사 완료! 🍒`);
    });
  });
});

initGrid();
generateBtn.click();
