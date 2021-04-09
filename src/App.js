// import React from "react";
// import "./style.css";
//
// class Board extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: Array(9).fill(""),
//         };
//     }
//     render() {
//         return (
//             <div className="board">
//                 <h1>井字棋游戏--React</h1>
//                 {this.state.squares.map((el, index) => {
//                     return <button className="btn" key={index}></button>;
//                 })}
//             </div>
//         );
//     }
// }
//
// export default Board;

import React from 'react';
import Board from "./components/Board";

function App() {
    return(
        <div className="App">
            <Board />
        </div>
    );
}

export default App;