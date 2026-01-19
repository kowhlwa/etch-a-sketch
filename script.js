// Initial code for generating a 16 x 16 canvas
generateCanvas(16);

// Event Listener for mouse hovering over the grid boxes
const boxList = document.querySelectorAll(".zone");
boxList.forEach((box) => {
    box.addEventListener("mouseenter", () => box.classList.add("zone-colored"));
})

// Event Listener for modal window button
const modalButton = document.querySelector("#canvas-option");
modalButton.addEventListener("click", () => modal.classList.toggle("hidden"));

// Event Listener for color randomizer button
const randColorButton = document.querySelector("#color-randomizer");
randColorButton.textContent = "Random coloring: Off";
randColorButton.addEventListener("click", toggleRandomColoring);

/** 
 * Function does the following:
 *    1. Checks if the button is On or Off and splits logic from there.
 *    2. If On, All uncolored boxes in the canvas get an event listener that sets background color randomly once.
 *    3. If Off, All boxes are stripped of that same event listener.
 * 
*/
function toggleRandomColoring() {
    const randColorButton = document.querySelector("#color-randomizer");
    const newState = (randColorButton.textContent === "Random coloring: Off") ? 1 : 0; // 1 means turn on, 0 means turn off.
    if (newState === 1) { // If toggle on, enable random coloring for the rest of the uncolored boxes.
        const boxList = document.querySelectorAll(".zone:not(.zone-colored)");
        boxList.forEach((box) => {
            box.addEventListener("mouseenter", setRandomBackgroundColor, {once : true});
        });
        randColorButton.textContent = "Random coloring: On";
    } else { // If toggle off, disable random coloring.
        const boxList = document.querySelectorAll(".zone");
        boxList.forEach((box) => {
            box.removeEventListener("mouseenter", setRandomBackgroundColor);
        })
        randColorButton.textContent = "Random coloring: Off";
    }
}

// I declared this because toggling with anonymous arrow functions (in above function) is impossible.
function setRandomBackgroundColor(e) {
    e.target.style.backgroundColor = getRandomRGB();
}

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

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

// Function generates new canvas based on (N = squares), (NxN) grid of squares
function generateCanvas(squares) {
    const canvas = document.querySelector(".container");

    // First empty out the old canvas
    if (canvas.firstChild) {
        canvas.replaceChildren();
    }

    // Determines how many squares (N) to create within the canvas
    let numberOfSquares;
    if (squares <= 100) {
        numberOfSquares = squares**2;
    } else {
        alert("You can only create a canvas with 0 or 100 squares height by width.");
        numberOfSquares = 256; // Fallback behavior is 16x16 canvas
    }

    /** 
     * Determines the flex-basis for each square
     * The formula for flex basis of each square is how much width each one should take up according
     * to the percentage of the screen.
     * 
    */
    let newFlexbasis = 100 / squares;

    // Generates N x N grid of blocks within the canvas
    for (let idx = 0; idx < numberOfSquares; idx++) {
            const block = document.createElement("div");
            block.classList.add("zone");
            block.addEventListener("mouseenter", () => block.classList.add("zone-colored")); // Interactivity
            block.style.flexBasis = `${newFlexbasis}%`;
            canvas.appendChild(block);
        }
}