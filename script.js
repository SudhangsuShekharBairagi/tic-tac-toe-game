
let box1 = document.querySelectorAll(".mybutton");
let reset = document.querySelector("#mybutton1");
let re = document.querySelector("#hi");
let hide1 = document.querySelector(".msg_container");
let new_g = document.querySelector("#new_g");

let playerx = 'Computer';
let playery = 'User';

let count = 0;
let true0 = true;

const winpattan = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// function for New Game & Reset button 
const reset1 = () => {
    true0 = true;
    aval();
    hide1.classList.add("hide");
    count = 0;
}

// user click function
box1.forEach((box) => {
    box.addEventListener("click", () => {
        if (true0) {
            box.innerText = "0";
            true0 = false;
            box.disabled = true;
        }


        if (!checkWin()) {

            computerPlay();
        }


    });

});

// computer play function
const computerPlay = () => {

    let posBlank = 0;
    const array = [];

    box1.forEach((box) => {
        const blank = box.innerText === "";

        if (blank === true) {
            posBlank++;
            array.push(box.value);
        }

    });

    // const randomIndex = Math.floor(Math.random() * array.length);
    // const randomElement = array[randomIndex];
    // // computer move
    // box1.forEach((box) => {
    //     if (true0 === false) {
    //         document.getElementById(`${randomElement}`).innerText = "X";

    //         true0 = true;
    //         document.getElementById(`${randomElement}`).disabled = true;

    //     }
    // });

    // check the win patttern for computer next move
    for (let pattern of winpattan) {
        let pos1 = box1[pattern[0]].innerText;
        let pos2 = box1[pattern[1]].innerText;
        let pos3 = box1[pattern[2]].innerText;
        //   console.log(pattern[0]);


        if ((pos1 != "" && pos2 != "" && pos3 == "") || (pos1 == "" && pos2 != "" && pos3 != "") || (pos1 != "" && pos2 == "" && pos3 != "")) {
            if (pos1 === pos2 && pos3 == "") {
                randomElement = box1[pattern[2]].value;
                computerPlay2(randomElement);
            } else if (pos1 === pos3 && pos2 == "") {
                randomElement = box1[pattern[1]].value;
                computerPlay2(randomElement);
            } else if (pos2 === pos3 && pos1 == "") {
                randomElement = box1[pattern[0]].value;
                computerPlay2(randomElement);
            } else {
                comPlay = true;
            }
        } else {
            comPlay = true;
        }
    }

    if (comPlay) {
        randomIndex = Math.floor(Math.random() * array.length);
        // console.log(array.length);
        comPlay = false;
        randomElement = array[randomIndex];
        computerPlay2(randomElement);

    }

}
// function for computer move in the box
const computerPlay2 = (randomElement) => {
    // const randomElement2 = randomElement;
    box1.forEach((box) => {
        if (true0 === false) {
            document.getElementById(`${randomElement}`).innerText = "X";
            // box.innerText = "X";
            true0 = true;
            document.getElementById(`${randomElement}`).disabled = true;

        }
    });
    checkWin(); //calling the checkWin function for the the win pattern
}

// function for disable the all button box 
const dis = () => {
    for (let box of box1) {
        box.disabled = true;
    }
}
// able the all button box 
const aval = () => {
    for (let box of box1) {
        box.disabled = false;
        box.innerText = "";
    }
}
// function for the winner 
const winner = (winner) => {
    var x = "X";
    var y = "0";

    if (winner == 0) {
        re.innerText = "Congratulation, Winner is " + playery;

    } else if (winner == x) {
        re.innerText = "Congratulation, Winner is " + playerx;
    } else {
        re.innerText = "Match Draw";
    }


    hide1.classList.remove("hide");
    dis();
}
// function for check the winner
const checkWin = () => {
    count = 0;
    for (let pattern of winpattan) {
        let pos1 = box1[pattern[0]].innerText;
        let pos2 = box1[pattern[1]].innerText;
        let pos3 = box1[pattern[2]].innerText;



        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winner(pos1);
                return true;
            } else {
                count++;
            }
        }
    }
    // check if the match is draw
    if (count >= 8) {
        let pos = 9;
        winner(pos);
        return true;
    }
    return false;
}

new_g.addEventListener("click", reset1); // Event Listener for new game button
reset.addEventListener("click", reset1); // Event Listener for reset button

