
let box1 = Array.from(document.querySelectorAll(".mybutton"));
let reset = document.querySelector("#mybutton1");
let re = document.querySelector("#hi");
let hide1 = document.querySelector(".msg_container");
let new_g = document.querySelector("#new_g");

let playerX = "Computer";
let playerY = "User";
let isUserTurn = true; // Tracks turn (true = User, false = Computer)
let count = 0; // Counts moves

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Reset Function: Clears board and state
const resetGame = () => {
    box1.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    hide1.classList.add("hide");
    re.innerText = "";
    isUserTurn = true;
    count = 0;
};

// Check for Winner or Draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let values = [box1[a].innerText, box1[b].innerText, box1[c].innerText];

        if (values[0] && values[0] === values[1] && values[1] === values[2]) {
            declareWinner(values[0]); // "X" or "0"
            return true;
        }
    }

    // Check Draw Condition
    if (box1.every(box => box.innerText !== "")) {
        declareWinner(null); // Draw
        return true;
    }
    return false;
};

// Declare Winner or Draw
const declareWinner = (winner) => {
    if (winner === "X") {
        re.innerText = `Congratulations! Winner is ${playerX}`;
    } else if (winner === "0") {
        re.innerText = `Congratulations! Winner is ${playerY}`;
    } else {
        re.innerText = "It's a Draw!";
    }
    hide1.classList.remove("hide");
    box1.forEach(box => (box.disabled = true)); // Disable all boxes
};

// User Play
box1.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (isUserTurn && box.innerText === "") {
            box.innerText = "0";
            box.disabled = true;
            count++;
            isUserTurn = false;

            if (!checkWinner()) {
                setTimeout(computerPlay, 300); // Allow computer to play after a slight delay
            }
        }
    });
});

// Computer Play
const computerPlay = () => {
    // Priority: Winning Move > Blocking Move > Center > Random Move
    let moveMade = false;

    // Step 1: Check for Winning Move
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let values = [box1[a].innerText, box1[b].innerText, box1[c].innerText];

        if (values.filter(v => v === "X").length === 2 && values.includes("")) {
            makeMove([a, b, c].find(idx => box1[idx].innerText === ""), "X");
            moveMade = true;
            break;
        }
    }

    // Step 2: Block User's Winning Move
    if (!moveMade) {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            let values = [box1[a].innerText, box1[b].innerText, box1[c].innerText];

            if (values.filter(v => v === "0").length === 2 && values.includes("")) {
                makeMove([a, b, c].find(idx => box1[idx].innerText === ""), "X");
                moveMade = true;
                break;
            }
        }
    }

    // Step 3: Take Center if Available
    if (!moveMade && box1[4].innerText === "") {
        makeMove(4, "X");
        moveMade = true;
    }

    // Step 4: Make a Random Move
    if (!moveMade) {
        let emptyBoxes = box1.filter(box => box.innerText === "");
        if (emptyBoxes.length > 0) {
            let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            makeMove(box1.indexOf(randomBox), "X");
        }
    }

    if (!checkWinner()) isUserTurn = true; // Switch turn to User
};

// Make a Move
const makeMove = (index, symbol) => {
    box1[index].innerText = symbol;
    box1[index].disabled = true;
    count++;
};

// Event Listeners for Reset and New Game
reset.addEventListener("click", resetGame);
new_g.addEventListener("click", resetGame);
