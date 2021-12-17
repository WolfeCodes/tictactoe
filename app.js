window.addEventListener('DOMContentLoaded', () => {
    alert('Welcome to Hogwarts TicTacToe')
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameOn = true;

    const GryffindorX_WON = 'GryffindorX_WON';
    const SlytherinO_WON = 'SlytherinO_WON';
    const TIE = 'TIE';


    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //Checking for game over or not
    function results() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? GryffindorX_WON : SlytherinO_WON);
            gameOn = false;
            return;
        }

    if (board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case SlytherinO_WON:
                announcer.innerHTML = 'Slytherin <span class="playerO">O</span> Won Mischief Managed!';
                break;
            case GryffindorX_WON:
                announcer.innerHTML = 'Gryffindor <span class="playerX">X</span> Won Mischief Managed!';
                break;
            case TIE:
                announcer.innerText = 'We should be fighting voldemort!!';
        }
        announcer.classList.remove('hide');
    };
    //Checking for valid moves
    const legalMove = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    //changing to other players turn
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const playerMove = (tile, index) => {
        if(legalMove(tile) && gameOn) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            results();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameOn = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => playerMove(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
