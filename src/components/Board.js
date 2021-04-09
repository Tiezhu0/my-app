import React, {Fragment} from "react";
import "./style.css";
import Square from "./Square";

// function Board() {
//     return (
//         <div className="board">
//             <h1>井字棋游戏--React</h1>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//             <button className="btn"></button>
//         </div>
//     );
// }
//
//不同于Vue的模板语法，react的这种写法叫做jsx语法，可以在js中直接编写dom标签。在渲染时，这种写法会被编译成 React.createElement('div',{className: 'board'})。
// 现在Board.js只有一个function Board，这种组件被称之为函数组件。


class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(""),
            player:"x",
            winner:"",
            history:[
                {
                    squares: Array(9).fill(""),
                    player: "X"
                },
            ],
            step:1,
            winnerArr:[],
        };
    }

    render() {
        let { player, squares, winner, history} = this.state;
        let title = "";
        if (!winner) {
            title = <p>开局是：{player}</p>;
        } else {
            title = <p>大吉大利：{winner}</p>;
        }
        return (
            <Fragment>
                <h1>井字棋游戏</h1>
                {title}
                <div className="flex">
                    <div className="board">
                        {squares.map((el, index) => {
                            return(
                                <Square changePlayer={() => this.changePlayer(index)} key={index} player={el} index={index} winnerClass={this.getClassName(index)}/>
                            );
                        })}
                    </div>
                    <div className="back_step">
                        {/*这个功能只要将每一步的数据保存在一个数组当中，点击悔棋列表，将数据切换回去即可。*/}
                        <p>重来</p>
                        {history.map((el,i) => {
                            return(
                                <button key={i} onClick={() => {this.backTo(i);}}>{i === 0 ? "Back to game start" : "Back to No:" + i + " step"}</button>
                            );
                        })}
                    </div>
                </div>
            </Fragment>
        );
    }

    //判定赢家
    //判定获胜者函数：该函数将所有获胜可能的index值组合穷举出来，再从棋盘上取index组合中的三个值，三值相等即为胜者，游戏gai术。
    calculateWinner(squares){
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
        for(let i = 0; i < lines.length; i++){
            const[a, b, c] = lines[i];
            if (
                squares[a] && squares[a] === squares [b] && squares[a] === squares[c]
            )
            {
                return{
                    squares:squares[a],
                    winnerArr: lines[i],
                };
            }
        }
        return null;
    }

    //一
    // 子组件在初始化时，拿空数据，每次点击时，修改当前节点的数据，并切换下一个玩家。
    //在react中是不允许直接修改state中的值的，必须通过setState来实现赋值，这个函数是异步的。
    //在react中，当数据改变时会触发render函数重新执行，生成虚拟dom，然后对比虚拟dom是否有改变，若有则重新渲染dom节点。
    //以下函数在每次下棋动作都应被调用：
    changePlayer(i){
        if (this.state.winner){
            return;
        }
        let squares = [...this.state.squares];
        let history = this.state.history.slice(0,this.state.step);
        if (squares[i]){
            return;
        }
        let player = this.state.player === "X" ? "O" : "X";
        squares[i] = this.state.player;
        history.push(
            {
                squares,
                player,
            }
        );
        this.setState({
            player,
            squares,
            history,
            step:history.length,
        });
        let winner = this.calculateWinner(squares);
        if (winner){
            this.setState({
                winner:winner.squares,
                winnerArr:winner.winnerArr,
            });
        }
    }

    getClassName(index){
        let {winner, winnerArr } = this.state;
        if (winner) {
            for (let i = 0; i < 3; i++){
                if (winnerArr[i] === index){
                    return"winner-square";
                }
            }
            return"";
        }
        else {
            return "";
        }
    }

    backTo(i) {
        this.setState((state) => {
            return{
                winner:"",
                squares:state.history[i].squares,
                player:state.history[i].player,
                step: i+1,
            };
        });
    }
}

export default Board;

