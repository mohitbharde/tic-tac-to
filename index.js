const allboxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("#currentplayer");
const newGameBtn = document.querySelector("#btn");


let currentPlayer;
let gameGrid;
const winningPosition = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];
let fillCount=0;

function intialGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", "", ""];
    allboxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player is ${currentPlayer}`;
    fillCount=0;

}

intialGame();

function swap() {
    if (currentPlayer === "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";

    gameInfo.innerText = `Current player is ${currentPlayer}`;
}

function winningPlayer() {
    let ans = "";
    if(fillCount==8){
        gameInfo.innerText ="Tied";
        newGameBtn.classList.add("active");
    }

    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[0]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] == "X")
                ans = "X";
            else
                ans = "O";

            allboxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
        

        allboxes[position[0]].classList.add("win");
        allboxes[position[1]].classList.add("win");
        allboxes[position[2]].classList.add("win");
        gameInfo.innerText = `Winner is ${ans}`;
        newGameBtn.classList.add("active");
        }
    });

    
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        allboxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        allboxes[index].style.pointerEvents = "none";
        swap();
        winningPlayer();
    }

}

allboxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
        fillCount++;
        console.log("fill count"+ fillCount);
    })

});

newGameBtn.addEventListener("click", intialGame);