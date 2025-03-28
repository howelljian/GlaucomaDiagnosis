const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const grid = [];
for (let i = 1; i < 21; i++) {
    for (let j = 0; j < 10; j++) {
        grid.push(alphabet[j] + i.toString());
    }
}

let currentIndex = 0;
let confirmedSquares = [];
let clickCount = 0; 
let clickTimer = null; 

const canvas = document.getElementById("mcanvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "Screenshot 2025-03-18 141507.png";
backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

window.onload = function () {
    startGridCheck();
};

function startGridCheck() {
    if (currentIndex >= grid.length) {
        console.log("Grid scanning complete. Confirmed squares:", confirmedSquares.join(", "));
        document.getElementById("area").value = confirmedSquares.join(", ");
        return;
    }

    const currentSquare = grid[currentIndex];
    updateQuestionaire(currentSquare);
}

function updateQuestionaire(square) {
    const questionaireDiv = document.querySelector('.questionaire');
    questionaireDiv.innerHTML = `<p>Can you see ${square}? Click "Yes" if you can.</p>`;

    document.getElementById('yesButton').style.display = 'inline-block';
}

function handleYes() {
    clickCount++; 

    if (clickCount === 1) {
       
        clickTimer = setTimeout(() => {

            const square = grid[currentIndex];
            confirmedSquares.push(square);
            updateTextarea();

            currentIndex++;
            setTimeout(() => startGridCheck(), 2000);

            clickCount = 0;
            clickTimer = null;
        }, 300);
    } else if (clickCount === 2) {
       
        clearTimeout(clickTimer);
        skipCoordinate();

        clickCount = 0;
        clickTimer = null;
    }
}

function skipCoordinate() {
    console.log("Skipping coordinate:", grid[currentIndex]);
    currentIndex++;
    setTimeout(() => startGridCheck(), 500);
}

function updateTextarea() {
    const area = document.getElementById("area");
    area.value = confirmedSquares.join(", ");
}

function submit() {
    var copyText = document.getElementById("area");
    navigator.clipboard.writeText(copyText.value);
}
