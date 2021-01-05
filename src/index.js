import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
const minimax = require('./minimax');

const dataObj = {
    count: 0,
    bestMoves: []
};

const MoveList = (props) => {
    return (
        <div className="moveList">
            <p>Other moves {'({Index:Evaluation})'}: </p>
            <ul>
                {dataObj.bestMoves.map(obj => 
                <li key={obj.index}>
                    {`{${obj.index}: ${obj.evaluation}}, `}
                </li>)}
            </ul>
        </div>
    )
}


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
            playFirst: false,
            counter: {
                count: 0,
                bestMoves: []
            }
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
        dataObj.count = 0; 
    }

    handlePlayButton(){
        this.setState({
            playFirst: !this.state.playFirst,
            board: Array(9).fill(null)
        });
        dataObj.count = 0;
    }

    handlePlayAgainButton(){
        this.setState({
            board: Array(9).fill(null)
        });
        dataObj.count = 0;
    }

    minmaxHandle(i){
        dataObj.count = 0;
        this.setState((state) => {
            let c = Object.assign({},state.counter);
            c.count = 0;
            return {c};
        })
        let temp = this.state.board.slice();
        if(minimax.findWinner(temp) || temp[i]){
            return;
        }
        temp[i] = this.state.player;
        let index = minimax.minimax(temp,0,true,dataObj,this.state.player);
        minimax.minimaxPruned(temp,0,-Infinity, Infinity,true,this.state.counter,this.state.player)
        if(minimax.emptySpaces(temp) !== 0){
            temp[index] = (this.state.player === 'X')?'O':'X';
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
    
    render() {  
        let winner = minimax.findWinner(this.state.board);
        let status = <h2>Next move: <h1>{(this.state.player === 'X')?"X":"O"}</h1></h2>;
        if(winner) status = <h2>Winner: <h1>{winner}</h1></h2>;
        else if(minimax.emptySpaces(this.state.board) === 0) status = <h1>Stalemate</h1>;

        let gamesCalculated = <p>Games computed: {dataObj.count} &nbsp; &nbsp; Games computed (pruned): {this.state.counter.count}</p>

        if(!this.state.playFirst && minimax.emptySpaces(this.state.board) === 9){
            let temp = this.state.board.slice();
            let index = minimax.minimax(temp,0,true,dataObj,this.state.player);
            minimax.minimaxPruned(temp,0,-Infinity, Infinity,true,this.state.counter,this.state.player)
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
                    <div className="status">{status}</div>
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
                    <footer>
                        <hr />
                        <div className="footerContainer">
                            <div className="gc">
                                {gamesCalculated}
                            </div>
                            <MoveList />
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Board />, document.getElementById('root'));












