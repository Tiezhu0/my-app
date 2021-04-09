import React from "react";
import "./style.css";

function Square(props) {
    console.log(props);
    return (
        //以下为ES6写法,当然还有其他的表达方式
        <button className={`btn ${props.winnerClass}`} onClick={props.changePlayer}>
            {props.player}
        </button>
    );
}

export default Square;

