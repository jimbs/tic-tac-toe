import { useState, useRef, useEffect } from "react";
import handler from "../api/hello";

export default function TicTacToe() {
  // const [value, setValue] = useState("initialValue")

  const bestOf = 3;
  const lines = {
    horizontal: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    vertical: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ],
    diagonal: [
      [0, 4, 8],
      [2, 4, 6],
    ],
  };

  useEffect(() => {
    console.log("useEffect triggered");
  });
  const [turn, setTurn] = useState(false);
  const [hasWinner, setHasWinner] = useState(false);
  var [nextTick, setNextTick] = useState(0);
  var gameData = useRef({
    scores: {
      O: 0,
      X: 0,
    },
    boxValue: [null, null, null, null, null, null, null, null, null],
    roundWinner: null,
    winningLine: null,
  });
  let val = useRef(); // test variables
  let tie = gameData.current.boxValue.filter((val) => val == null).length;

  function populateBoxes() {
    return gameData.current.boxValue.map((val, index) => (
      <button
        className={`h-32 w-32 border border-zinc-800 text-2xl ${
          gameData.current.winningLine
            ? lines[gameData.current.winningLine.pattern][
                gameData.current.winningLine.line
              ].includes(index)
              ? "bg-green-900"
              : ""
            : "bg-green-900"
        } ${
          val != null || gameData.current.roundWinner ? "click-not-allowed" : ""
        }`}
        id="clickableBox"
        accessKey={index}
        key={index}
        onClick={boxClicked}
        disabled={val != null || gameData.current.roundWinner}
      >
        {val != null ? (val ? "X" : "O") : ""}
      </button>
    ));
  }

  async function boxClicked(e) {
    gameData.current.boxValue[e.target.accessKey] = turn;
    // e.target.style.cursor = "not-allowed";

    if (validateWinner()) {
      gameData.current.scores[gameData.current.roundWinner] += 1;
      const { X, O } = gameData.current.scores;

      setTimeout(() => {
        if (X === bestOf) {
          alert(`The winner is the player of X`);
          setHasWinner(true);
        } else if (O === bestOf) {
          alert(`The winner is the player of O`);
          setHasWinner(true);
        }
      }, 0);

      return;
    }
    setTurn(!turn);
  }

  function validateWinner() {
    let rows = [];
    let index = 0;
    let length = 3;

    // divide array by row
    while (length <= 9) {
      rows.push(gameData.current.boxValue.slice(index, length));
      index += 3;
      length += 3;
    }

    // horizontal
    let horizontal = [];
    let vertical = [[], [], []];
    let diagonal = [[], []];

    // filtering per line data (boolean value for x and o)
    function filterWinningLine(data) {
      return data
        .map(
          (line) =>
            line.filter((val) => val == line[0] && val != null).length == 3
        )
        .indexOf(true);
    }

    rows.forEach((row, rowIndex) => {
      //horizontal collection
      horizontal.push(
        row.filter((val) => val == row[0] && val != null).length == 3
      );

      // vertical collection
      row.forEach((r, i) => vertical[i].push(r));

      // diagonal collection
      if (rowIndex == 1) {
        diagonal[0].push(row[rowIndex]);
        diagonal[1].push(row[rowIndex]);
      } else {
        diagonal[0].push(row[0 + rowIndex]);
        diagonal[1].unshift(row[2 - rowIndex]);
      }
    });

    //define the winner and winning line
    try {
      if (filterWinningLine(diagonal) != -1) {
        gameData.current.roundWinner = turn ? "X" : "O";
        // winningLine.current = {
        // pattern: "diagonal",
        //   line: filterWinningLine(diagonal),
        // };
        gameData.current.winningLine = {
          pattern: "diagonal",
          line: filterWinningLine(diagonal),
        };
        setNextTick((nextTick += 1));
        return true;
      } else if (filterWinningLine(vertical) != -1) {
        gameData.current.roundWinner = turn ? "X" : "O";
        // winningLine.current = {
        // pattern: "vertical",
        //   line: filterWinningLine(vertical),
        // };
        gameData.current.winningLine = {
          pattern: "vertical",
          line: filterWinningLine(vertical),
        };
        setNextTick((nextTick += 1));
        return true;
      } else if (horizontal.indexOf(true) != -1) {
        gameData.current.roundWinner = turn ? "X" : "O";
        // winningLine.current = {
        // pattern: "horizontal",
        //   line: horizontal.indexOf(true),
        // };
        gameData.current.winningLine = {
          pattern: "horizontal",
          line: horizontal.indexOf(true),
        };

        setNextTick((nextTick += 1));
        return true;
      } else return false;
    } catch (e) {
      console.log(e, "<---- error occured");
    }
  }

  function nextGame(action = "next") {
    gameData.current = {
      ...gameData.current,
      boxValue: [null, null, null, null, null, null, null, null, null],
      roundWinner: null,
      winningLine: null,
    };

    if (typeof action == "string" && action.toUpperCase() == "RESET") {
      gameData.current.scores = {
        X: 0,
        O: 0,
      };
      setHasWinner(false);
    }
    // document
    //   .querySelectorAll("#clickableBox")
    //   .forEach((dom) => dom.style.cursor = "default");
    setTurn(0);
  }

  function onChange(e) {
    setValue(e.target.value);
    val.current = e.target.value;
  }

  return (
    <>
      <div className="content-center justify-center flex grid w-150 mt-24">
        <h1 className="text-2xl inline">
          Tic Tac Toe-x{" "}
          <sup className="text-sm pl-1 underline decoration-pink-700">
            Best to {bestOf}
          </sup>
        </h1>
        <p className="text-md">
          Contenders standing: X - {gameData.current.scores.X} ; O -{" "}
          {gameData.current.scores.O}
        </p>
        <p className="text-md">Current player turn: {turn ? "X" : "O"}</p>
        <button
          onClick={nextGame} // next game
          className={`mx-1 my-1 border opacity-30 ${
            !gameData.current.roundWinner && tie
              ? "opacity-20 cursor-not-allowed"
              : "opacity-75 border-teal-30"
          }  ${hasWinner ? "hidden" : ""}`}
          disabled={!gameData.current.roundWinner && tie}
        >
          {!tie && !gameData.current.roundWinner ? "Reset Round" : "Next Round"}
          {tie}
        </button>
        <button
          onClick={() => nextGame("reset")} // new game
          className={`mx-1 my-1 border opacity-75 ${hasWinner ? "" : "hidden"}`}
        >
          Reset Game
        </button>
        <div className="tic-tac-toe-container inline-grid grid-cols-3 max-w-sm">
          {populateBoxes()}
        </div>
        <span>
          Round Winner:&nbsp;
          <i>ongiong match...</i>
          {gameData.current.roundWinner}
        </span>
      </div>

      <style src="./styles.css" />
    </>
  );
}
