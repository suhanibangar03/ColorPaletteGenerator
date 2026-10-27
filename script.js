
const generateButton = document.getElementById("generate-btn");
const colorCards = document.querySelectorAll(".color-card");
const message = document.getElementById("message");

// Generate a random HEX color
function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
}

// Generate a new palette
function generatePalette() {
    colorCards.forEach(function(card) {
        const colorBox = card.querySelector(".color-box");
        const colorCode = card.querySelector("h2");

        const newColor = randomColor();

        colorBox.style.backgroundColor = newColor;
        colorCode.textContent = newColor;
    });

    message.textContent = "✨ Your new palette is ready!";
}

// Copy HEX color code
async function copyColor(button) {
    const card = button.closest(".color-card");
    const colorCode = card.querySelector("h2").textContent;

    try {
        await navigator.clipboard.writeText(colorCode);

        message.textContent = "✅ " + colorCode + " copied!";
        button.textContent = "✓";

        setTimeout(function() {
            button.textContent = "▢";
        }, 1000);

    } catch (error) {
        message.textContent =
            "Copy unavailable. Please run using Live Server.";
    }
}

// Generate button click
generateButton.addEventListener("click", generatePalette);

// Copy button clicks
document.querySelectorAll(".copy-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        copyColor(button);
    });
});

// Click color code to copy it
document.querySelectorAll(".color-info h2").forEach(function(code) {
    code.addEventListener("click", async function() {
        const card = code.closest(".color-card");
        const button = card.querySelector(".copy-btn");

        await copyColor(button);
    });
});

// Spacebar shortcut
document.addEventListener("keydown", function(event) {
    if (
        event.code === "Space" &&
        !["BUTTON", "INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )
    ) {
        event.preventDefault();
        generatePalette();
    }
});
