export {findWinner, emptySpaces, minimax, minimaxPruned}

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

function minimax(board, depth, isMaximizer, dataObj, player){
    let winner = findWinner(board);
    let emptySpacesVar = emptySpaces(board);

    if(emptySpacesVar === 0 || winner){
        dataObj.count++;
        
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
            let evaluation = minimax(temp, depth+1, false, dataObj, player);
            if(evaluation === maxEval && depth === 0){
                dataObj.bestMoves.push({
                    index: i,
                    evaluation: evaluation
                });
            }
            if(evaluation > maxEval){
                maxEval = evaluation;
                if(depth === 0){
                    dataObj.bestMoves = [];
                    dataObj.bestMoves.push({
                        index: i,
                        evaluation: evaluation
                    });
                }
            }
        }
        if(depth === 0) {
            let randomInt = Math.floor(Math.random() * dataObj.bestMoves.length);
            let indexObj = dataObj.bestMoves.splice(randomInt,1);
            return indexObj[0].index;
        };
        return maxEval;
    }
    else{
        let minEval = Infinity;
        for(let i = 0; i<board.length; i++){
            if(board[i]) continue;
            let temp = board.slice();
            temp[i] = (player === 'X')?'X':'O';
            let evaluation = minimax(temp, depth+1, true, dataObj, player);
            if(evaluation < minEval){
                minEval = evaluation;
            }
        }
        return minEval;
    }
}

function minimaxPruned(board, depth, alpha, beta, isMaximizer, counter, player){
    let winner = findWinner(board);
    let emptySpacesVar = emptySpaces(board);

    if(emptySpacesVar === 0 || winner){
        counter.count++;
        
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
            let evaluation = minimaxPruned(temp, depth+1, alpha, beta, false, counter, player);
            if(evaluation === maxEval && depth === 0){
                counter.bestMoves.push({
                    index: i,
                    evaluation: evaluation
                });
            }
            if(evaluation > maxEval){
                maxEval = evaluation;
                if(depth === 0){
                    counter.bestMoves = [];
                    counter.bestMoves.push({
                        index: i,
                        evaluation: evaluation
                    });
                }
            }
            alpha = Math.max(alpha, evaluation);
            if(beta <= alpha) break;
        }
        return maxEval;
    }
    else{
        let minEval = Infinity;
        for(let i = 0; i<board.length; i++){
            if(board[i]) continue;
            let temp = board.slice();
            temp[i] = (player === 'X')?'X':'O';
            let evaluation = minimaxPruned(temp, depth+1, alpha, beta, true, counter, player);
            if(evaluation < minEval){
                minEval = evaluation;
            }
            beta = Math.min(beta, evaluation)
            if(beta <= alpha) break;
        }
        return minEval;
    }
}