export {findWinner, emptySpaces, minimax as minimax}

function findWinner(board){
    //Rows and columns
    
    for(let i = 0; i<3; i++){
        if((board[i] === board[i+3] && board[i] === board[i+6]) && board[i]){return board[i];}
        if((board[(i*3)] === board[(i*3)+1] && board[(i*3)] === board[(i*3)+2]) && board[i*3])return board[i*3];
    }
    //Diagonals
    if((board[0] === board[4] && board[0] === board[8]) && board[0]) return board[0];
    if((board[2] === board[4] && board[2] === board[6]) && board[2]) return board[2];

    return null;
}

function emptySpaces(board){
    let count = 0; 
    for(let i = 0; i<board.length; i++){
        if(!board[i]) count++;
    }
    return count;
}

function minimax(board, depth, isMaximizer, count, player){
    let bestIndex = null;
    let winner = findWinner(board);
    let emptySpacesVar = emptySpaces(board);

    if(emptySpacesVar === 0 || winner){
        count.count++;
        if(winner === player){
            return -10 + depth;
        }
        else if(winner){
            return 10 - depth;
        }
        else{
            return 0;
        }

    }

    if(isMaximizer){
        let maxEval = -Infinity;
        for(let i = 0; i<board.length; i++){
            if(board[i]) continue;
            let temp = board.slice();
            temp[i] = (player === 'X')?'O':'X';
            let evaluation = minimax(temp, depth+1, false, count, player);
            if(evaluation > maxEval){
                maxEval = evaluation;
                bestIndex = i;
            }
        }
        if(depth === 0) return bestIndex;
        return maxEval;
    }
    else{
        let minEval = Infinity;
        for(let i = 0; i<board.length; i++){
            if(board[i]) continue;
            let temp = board.slice();
            temp[i] = (player === 'X')?'X':'O';
            let evaluation = minimax(temp, depth+1, true, count, player);
            if(evaluation < minEval){
                minEval = evaluation;
                bestIndex = i;
            }
        }
        if(depth === 0) return bestIndex;
        return minEval;
    }
    return bestIndex;
}