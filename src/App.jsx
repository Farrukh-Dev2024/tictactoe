import React from 'react';
import './App.css'
import { useState } from 'react';

function AppTitle(){

    return(
        <div className='title w-full'>Tac-Tak-Toe Game</div>
        
    );
}
function Button( {value, onClick}){
    return (
        <button className="square" onClick={onClick}>
        {value}
        </button>
    );
}
function Board({squares,handlePlay,isXnext}){
    function handleClick(id){
        //alert(id);
        const newsquares = squares.slice();
        
        if (newsquares[id]!==null){return;}
        if (calculateWinner(squares)){return;}
        if (isXnext){
            newsquares[id] = "X";
        }else{
            newsquares[id] = "O";
        }
        handlePlay(newsquares,isXnext);
    }
    return(
        <div className='board min-w-60 m-2'>
            <div className="board-row">
                <Button onClick={()=>{handleClick(0);}} value={squares[0]} />
                <Button onClick={()=>{handleClick(1);}} value={squares[1]} />
                <Button onClick={()=>{handleClick(2);}} value={squares[2]} />
            </div>
            <div className="board-row">
                <Button onClick={()=>{handleClick(3);}} value={squares[3]} />
                <Button onClick={()=>{handleClick(4);}} value={squares[4]} />
                <Button onClick={()=>{handleClick(5);}} value={squares[5]} />                
            </div>
            <div className="board-row">
                <Button onClick={()=>{handleClick(6);}} value={squares[6]} />
                <Button onClick={()=>{handleClick(7);}} value={squares[7]} />
                <Button onClick={()=>{handleClick(8);}} value={squares[8]} />                  
            </div>                        



          
        </div>
    );
}

function InfoPanel({moves ,squares}){
    let winner = calculateWinner(squares);
    return(
        <>
        <div className='infopanel m-1 ml-4'>
            {winner && 
                <p>Winner is {winner}</p>
            }            
            <ol className="list-decimal">{moves}</ol>
        </div>
        </>
    );    
}
function App() {
    // const [squares,setSquares] = useState(Array(9).fill(null));
     const [isXnext,setisXnext] = useState(true);

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    
    function handlePlay(newsquares,isXnext){
        setisXnext(!isXnext);
        //setSquares(newsquares);

        const nextHistory = [...history.slice(0, currentMove + 1), newsquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);    
    }

    function jumpTo(nextMove) {
        setisXnext(nextMove % 2 === 0);
        setCurrentMove(nextMove);
      }
    
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button className='historybutton' onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });    
    return (
        <>
            <div className='app flex flex-wrap'>
            <AppTitle  />
            <Board squares={currentSquares} handlePlay={handlePlay} isXnext={isXnext}/>
            <InfoPanel moves={moves} squares={currentSquares}/>
            </div>
        </>
    );
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
export default App;