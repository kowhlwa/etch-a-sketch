// Code for generating 16x16 grid canvas
const canvas = document.querySelector(".container");
for (let idx = 0; idx < 256; idx++) {
    const block = document.createElement("div");
    block.classList.add("zone");
    canvas.appendChild(block);
}

// Event Listener for mouse hovering over the grid boxes
const boxList = document.querySelectorAll(".zone");
boxList.forEach((box) => {
    box.addEventListener("mouseenter", () => box.classList.add("zone-colored"));
})

// Default hidden setting for modal window
const modal = document.querySelector(".option-modal");
modal.classList.toggle("hidden");

// Event Listener for modal window button
const modalButton = document.querySelector("#canvas-option");
modalButton.addEventListener("click", () => modal.classList.toggle("hidden"));