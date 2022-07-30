const Square = ({ id, player, newState }) => {
//const Square = ({ id, newState }) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null);
  const xo = ["O","X"];

  const palet = ["red", "blue", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];
  
  React.useEffect(() => {
    console.log (`Render ${id}`);
    return () => console.log (`unmounting Square ${id}`);
  });

  return (
    <button 
    onClick = {e => {
      //setColor(getRandomColor());
      let col = getRandomColor();
      setColor(col); 
      let nextPlayer = newState(id);
      setStatus(nextPlayer);
      //newState({id:id, color:col});
      e.target.style.background = col;
    }}
    >
      <h1>{xo[status]}</h1>
    </button>
  );
};

const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [state, setState] = React.useState(Array(9).fill(null));
    //const [mounted, setMounted] = React.useState(true);
    //const [random, setRandom] = React.useState(0);
    let status = `Player ${player}`;
    function checkWinner (state) {
      const win = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
      for (let i = 0; i < win.length; i++) {
          const [a, b, c] = win[i];
          if (state [a] == state [b] && state [a] == state [c] && state [a])
              return state[a];
      };
      return null;
  };
    let winner = checkWinner(state);
    if(winner != null) status = `Player ${winner} wins`
    //const toggle = ()=> setMounted(!mounted);
    //const reRender = ()=> setRandom(Math.random());

    const newState = idOfSquare => {
      //let nextplayer = (player +1) % 2;
      //setPlayer(nextplayer);
      let thePlayer = player;
      state[idOfSquare] = player;
      //setState([...state, ob]);
      setState(state);
      let nextplayer = (player +1) % 2;
      setPlayer(nextplayer);
      //console.log(`adding state ${JSON.stringify(state)}`);
      //status = `Player ${nextplayer}`;
      return thePlayer; 
    };
    
    function renderSquare(i) {
      return <Square id={i} player={player} newState={newState}></Square>;
    }
    return (
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
          <button>Show/Hide Rowb</button>
          <button>Re-render</button>
          <h1> {status} </h1>
        </div>
      </div>
    );
  };
  
  // ========================================
  
  ReactDOM.render(<Board />, document.getElementById("root"));