const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const undoBtn = document.getElementById("undoBtn");
const playText = document.getElementById("playText");
const spaces = [];
const history = [];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = (Math.floor((Math.random()) * 14)% 2 === 1)? O_TEXT: X_TEXT;

const drawBoard = () => {
    document.getElementById('player').innerText = currentPlayer;
    boxes.forEach((box, index) => {
        box.addEventListener('click', boxClicked);
    });
};

function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        history.push(id);
        e.target.innerText = currentPlayer;
        if (calculateWinner(spaces)) {
            playText.innerHTML = `${currentPlayer} has won!!`;
            boxes.forEach((box, index) => {
                box.removeEventListener('click', boxClicked);
            });
            return;
        }
        currentPlayer = (currentPlayer === O_TEXT)? X_TEXT: O_TEXT;
        document.getElementById('player').innerText = currentPlayer;
    }
}



function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}



const emptyAll = ()=> {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    boxes.forEach((box) => {
        box.innerText = '';
        box.addEventListener('click', boxClicked);
    });
    playText.innerHTML = `Let's Play!!`;
    currentPlayer = (Math.floor((Math.random()) * 14)% 2 === 1)? O_TEXT: X_TEXT;
    document.getElementById('player').innerText = currentPlayer;
}

const undoFunct = () => {
    if(history.length > 0){
        let removeID = history.pop();
        console.log(removeID);
        boxes[removeID].innerHTML = '';
        spaces[removeID] = null;
    }
}

restartBtn.addEventListener("click", emptyAll);
undoBtn.addEventListener('click',undoFunct);
emptyAll();
drawBoard();
