// Initial code for generating a 16 x 16 canvas
generateCanvas(16);

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

// Handle cancel
const cancelModal = document.querySelector(".option-modal-cancel");
cancelModal.addEventListener("click", () => modal.classList.toggle("hidden"));

// Handle confirm dimension changes
const confirmModal = document.querySelector(".option-modal-confirm");
confirmModal.addEventListener("click", () => {
    const checkInput = document.querySelector(".option-modal-response");
    generateCanvas(checkInput.value);
    modal.classList.toggle("hidden");
});

// Function generates new canvas based on (N = squares), (NxN) grid of squares.
function generateCanvas(squares) {
    const canvas = document.querySelector(".container");

    // First empty out the old canvas
    if (canvas.firstChild) {
        canvas.replaceChildren();
    }

    // Generate N x N grid of blocks within the canvas
    let numberOfSquares;
    if (squares <= 100) {
        numberOfSquares = squares**2;
    } else {
        alert("You can only create a canvas with 0 or 100 squares height by width.");
        numberOfSquares = 16; // Fallback behavior
    }
    for (let idx = 0; idx < numberOfSquares; idx++) {
            const block = document.createElement("div");
            block.classList.add("zone");
            block.addEventListener("mouseenter", () => block.classList.add("zone-colored"));
            canvas.appendChild(block);
        }
}