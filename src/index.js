import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
const minimax = require('./minimax');

const countObj = {
    count: 0
};

let playFirst = false;


const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

const Buttons = (props) => {
        return (
            <div className="selectPlay">
                <button onClick={props.buttonPlayerHandle}>
                    Switch to: {(props.player === 'X')?'O':'X'}
                </button>
                <button onClick={props.buttonFirstHandle}>
                    {(props.playFirst)?'Play Second':'Play First'}
                </button>
                <button onClick={props.buttonPlayAgainHandle}>
                    Play Again
                </button>
            </div>
        )
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board: Array(9).fill(null),
            player: 'X',
            playFirst: false
        }

        this.renderSquare = this.renderSquare.bind(this);
        this.minmaxHandle = this.minmaxHandle.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton(){
        this.setState({
            player: (this.state.player === 'X')?'O':'X',
            board: Array(9).fill(null)
        });
        countObj.count = 0; 
    }

    handlePlayButton(){
        this.setState({
            playFirst: !this.state.playFirst,
            board: Array(9).fill(null)
        });
        countObj.count = 0;
    }

    handlePlayAgainButton(){
        this.setState({
            board: Array(9).fill(null)
        });
        countObj.count = 0;
    }

    minmaxHandle(i){
        countObj.count = 0;
        let temp = this.state.board.slice();
        if(minimax.findWinner(temp) || temp[i]){
            return;
        }
        temp[i] = this.state.player;
        let index = minimax.minimax(temp,0,true,countObj,this.state.player);
        if(minimax.emptySpaces(temp) != 0){
            temp[index] = (this.state.player === 'X')?'O':'X';
            console.log(countObj);
        }
        this.setState({
            board: temp
        });
    }

    renderSquare(i){
        return (    
            <Square value={this.state.board[i]} 
            onClick={() => this.minmaxHandle(i)
            } />
        )
    }
    
//TODO add footer with games computed, equally good moves (with value?). Alpha-beta pruning, posistion-json
//TODO fix stalemate jump, remove public foler
    render() {  
        let winner = minimax.findWinner(this.state.board);
        let status = <h2>Next move: <h1>{(this.state.player === 'X')?"X":"O"}</h1></h2>;
        if(winner) status = <h2>Winner: <h1>{winner}</h1></h2>;
        else if(minimax.emptySpaces(this.state.board) === 0) status = <h1>Stalemate</h1>;

        let gamesCalculated = <h3>Games computed: {countObj.count}</h3>

        if(!this.state.playFirst && minimax.emptySpaces(this.state.board) === 9){
            let temp = this.state.board.slice();
            let index = minimax.minimax(temp,0,true,countObj,this.state.player);
            temp[index] = (this.state.player === 'X')?'O':'X';
            this.setState({
                board: temp
            });
        }

        return(
            <div className="container">
                <Buttons 
                    player={this.state.player} 
                    playFirst={this.state.playFirst}
                    buttonPlayerHandle={() => this.handleButton()} 
                    buttonFirstHandle={() => this.handlePlayButton()}
                    buttonPlayAgainHandle={() => this.handlePlayAgainButton()}
                    />
                <div className="board">
                    {status}
                    <div className="row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                    <div className="gc">{gamesCalculated}</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));












