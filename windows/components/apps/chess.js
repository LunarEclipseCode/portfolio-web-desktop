import React, { Component } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export class ChessGame extends Component {
  constructor() {
    super();
    this.state = {
      game: new Chess(),
      playerVsPlayerGameState: null,
      playerVsAIGameState: null,
      moveFrom: "",
      moveTo: null,
      rightClickedSquares: {},
      moveSquares: {},
      optionSquares: {},
      gameOver: false,
      gameOverMessage: "",
      isPlayerVsAI: null,
      isAITurn: false,
      boardWidth: 400,
      isResizing: false,
      history1v1: [],
      historyAI: [],
    };
    this.chessboardContainerRef = React.createRef();
    this.resizeObserver = null;
    this.resizeTimeout = null;

    this.stockfish = new Worker(`./stockfish.js`);
    this.stockfish.onmessage = this.onStockfishMessage;
  }

  componentDidMount() {
    this.initResizeObserver();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPlayerVsAI === null && this.state.isPlayerVsAI !== null) {
      this.initResizeObserver();
    }
  }

  componentWillUnmount() {
    this.cleanupResizeObserver();
    window.removeEventListener("resize", this.handleWindowResize);

    this.stockfish.terminate();
  }

  handleWindowResize = () => {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      this.updateBoardSize();
    }, 300);
  };

  initResizeObserver = () => {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateBoardSize();
    });

    if (this.chessboardContainerRef.current) {
      this.resizeObserver.observe(this.chessboardContainerRef.current);
    }
    this.updateBoardSize();
  };

  cleanupResizeObserver = () => {
    if (this.resizeObserver && this.chessboardContainerRef.current) {
      this.resizeObserver.unobserve(this.chessboardContainerRef.current);
    }
  };

  updateBoardSize = () => {
    if (this.chessboardContainerRef.current) {
      const containerWidth = this.chessboardContainerRef.current.offsetWidth;
      const containerHeight = this.chessboardContainerRef.current.offsetHeight;
      const boardSize = Math.min(containerWidth, containerHeight); // Set the board size to the smaller of the two dimensions
      this.setState({ boardWidth: boardSize });
    }
  };

  onStockfishMessage = (event) => {
    const message = event.data;

    if (message.startsWith("bestmove")) {
      const bestMove = message.split(" ")[1];
      if (bestMove) {
        const from = bestMove.substring(0, 2);
        const to = bestMove.substring(2, 4);
        this.executeMove(from, to);
      }
    }
  };

  getStockfishMove = () => {
    const currentFEN = this.state.game.fen();
    this.stockfish.postMessage(`position fen ${currentFEN}`);
    this.stockfish.postMessage("go depth 12");
  };

  safeGameMutate = (modify) => {
    this.setState((state) => {
      const update = new Chess(state.game.fen());
      modify(update);
      const isGameOver = update.isGameOver();
      let gameOverMessage = "";
      if (isGameOver) {
        gameOverMessage = this.getGameOverMessage(update);
      }
      return { game: update, gameOver: isGameOver, gameOverMessage };
    });
  };

  getGameOverMessage = (game) => {
    if (game.isCheckmate()) {
      return "Checkmate!";
    }
    if (game.isStalemate()) {
      return "Stalemate!";
    }
    if (game.isDraw()) {
      return "Draw!";
    }
    if (game.isThreefoldRepetition()) {
      return "Threefold Repetition!";
    }
    if (game.isInsufficientMaterial()) {
      return "Insufficient Material!";
    }
    return "Game Over!";
  };

  getMoveOptions = (square) => {
    const moves = this.state.game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      this.setState({ optionSquares: {} });
      return false;
    }
    const newSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background: this.state.game.get(move.to) && this.state.game.get(move.to).color !== this.state.game.get(square).color ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    this.setState({ optionSquares: newSquares });
    return true;
  };

  makeAIMove = () => {
    if (this.state.game.turn() === "b") {
      this.getStockfishMove();
    }
  };

  pushHistory = (fen) => {
    this.setState((state) => {
      const newHistory = [...(state.isPlayerVsAI ? state.historyAI : state.history1v1), fen];
      return state.isPlayerVsAI ? { historyAI: newHistory } : { history1v1: newHistory };
    });
  };

  undoMove = () => {
    const { history1v1, historyAI, isPlayerVsAI } = this.state;
    const history = isPlayerVsAI ? historyAI : history1v1;

    // If Player vs Player mode, undo only one move (either for white or black)
    if (!isPlayerVsAI && history.length > 0) {
      const previousFen = history[history.length - 1];
      this.setState((state) => ({
        game: new Chess(previousFen),
        history1v1: state.history1v1.slice(0, -1),
        moveFrom: "",
        moveTo: null,
        optionSquares: {},
        rightClickedSquares: {},
      }));
    }

    // If Player vs AI mode, undo both the player's move and the AI's move together
    if (isPlayerVsAI && history.length > 0) {
      const previousFen = history[history.length - 2];
      this.setState((state) => ({
        game: new Chess(previousFen),
        historyAI: state.historyAI.slice(0, -2),
        moveFrom: "",
        moveTo: null,
        optionSquares: {},
        rightClickedSquares: {},
      }));
    }
  };

  onSquareClick = (square) => {
    // If it's the AI's turn, prevent the player from moving
    if (this.state.isPlayerVsAI && this.state.isAITurn) return;

    this.setState({ rightClickedSquares: {} });

    if (!this.state.moveFrom) {
      const hasMoveOptions = this.getMoveOptions(square);
      if (hasMoveOptions) this.setState({ moveFrom: square });
      return;
    }

    if (!this.state.moveTo) {
      const moves = this.state.game.moves({ moveFrom: this.state.moveFrom, verbose: true });
      const foundMove = moves.find((m) => m.from === this.state.moveFrom && m.to === square);
      if (!foundMove) {
        const hasMoveOptions = this.getMoveOptions(square);
        this.setState({ moveFrom: hasMoveOptions ? square : "" });
        return;
      }

      const promotionRow = foundMove.color === "w" ? "8" : "1";
      if (foundMove.piece === "p" && square[1] === promotionRow) {
        this.executeMove(this.state.moveFrom, square, "q");
      } else {
        this.executeMove(this.state.moveFrom, square);
      }
    }
  };

  executeMove = (from, to, promotion = "q") => {
    this.safeGameMutate((game) => {
      this.pushHistory(game.fen());
      game.move({ from, to, promotion });
    });
    this.setState({ moveFrom: "", moveTo: null, optionSquares: {} }, () => {
      if (this.state.isPlayerVsAI && this.state.game.turn() === "b") {
        this.setState({ isAITurn: true });
        setTimeout(() => {
          this.makeAIMove();
          this.setState({ isAITurn: false });
        }, 300);
      }
    });
  };

  onSquareRightClick = (square) => {
    const colour = "rgba(0, 0, 255, 0.4)";
    this.setState((state) => ({
      rightClickedSquares: {
        ...state.rightClickedSquares,
        [square]: state.rightClickedSquares[square] && state.rightClickedSquares[square].backgroundColor === colour ? undefined : { backgroundColor: colour },
      },
    }));
  };

  resetGame = () => {
    this.safeGameMutate((game) => {
      game.reset();
    });

    this.setState((state) => ({
      moveSquares: {},
      optionSquares: {},
      rightClickedSquares: {},
      gameOver: false,
      gameOverMessage: "",
      // Reset only the history for the current game mode
      history1v1: !state.isPlayerVsAI ? [] : state.history1v1,
      historyAI: state.isPlayerVsAI ? [] : state.historyAI,
    }));
  };

  saveCurrentGameState = () => {
    const currentState = {
      fen: this.state.game.fen(),
      moveSquares: this.state.moveSquares,
      optionSquares: this.state.optionSquares,
      rightClickedSquares: this.state.rightClickedSquares,
      gameOver: this.state.gameOver,
      gameOverMessage: this.state.gameOverMessage,
    };
    if (this.state.isPlayerVsAI) {
      this.setState({ playerVsAIGameState: currentState });
    } else {
      this.setState({ playerVsPlayerGameState: currentState });
    }
  };

  selectMode = (isPlayerVsAI) => {
    this.saveCurrentGameState();

    let newGameState = null;
    if (isPlayerVsAI) {
      newGameState = this.state.playerVsAIGameState;
    } else {
      newGameState = this.state.playerVsPlayerGameState;
    }

    if (newGameState) {
      // Restore the saved game state
      this.setState(
        {
          game: new Chess(newGameState.fen),
          moveSquares: newGameState.moveSquares,
          optionSquares: newGameState.optionSquares,
          rightClickedSquares: newGameState.rightClickedSquares,
          gameOver: newGameState.gameOver,
          gameOverMessage: newGameState.gameOverMessage,
          isPlayerVsAI,
        },
        this.updateBoardSize
      );
    } else {
      this.setState(
        {
          game: new Chess(),
          moveSquares: {},
          optionSquares: {},
          rightClickedSquares: {},
          gameOver: false,
          gameOverMessage: "",
          isPlayerVsAI,
        },
        this.updateBoardSize
      );
    }
  };

  goBackToModeSelection = () => {
    this.saveCurrentGameState();
    this.setState({ isPlayerVsAI: null });
  };

  render() {
    if (this.state.isPlayerVsAI === null) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
          <h1 className="text-2xl font-semibold mb-6">Select Game Mode</h1>
          <div className="flex space-x-6">
            <button onClick={() => this.selectMode(false)} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-105">
              1v1
            </button>
            <button onClick={() => this.selectMode(true)} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105">
              Player vs AI
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white select-none">
        <div className="flex items-center justify-between w-full p-3 bg-gray-700 bg-opacity-50 shadow-md">
          <div className="flex items-center">
            <button onClick={this.goBackToModeSelection} className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition">
              Back
            </button>
          </div>
          <div className="flex space-x-3">
            <button onClick={this.undoMove} className="px-4 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition">
              Undo
            </button>
            <button onClick={this.resetGame} className="px-4 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition">
              Reset
            </button>
          </div>
        </div>
        <div className="flex-grow flex justify-center items-center" ref={this.chessboardContainerRef} style={{ overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {this.state.gameOver ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">{this.state.gameOverMessage}</h1>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg">
              <Chessboard
                id="ClickToMove"
                animationDuration={200}
                arePiecesDraggable={false}
                position={this.state.game.fen()}
                onSquareClick={this.onSquareClick}
                onSquareRightClick={this.onSquareRightClick}
                boardWidth={this.state.boardWidth}
                customBoardStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  margin: "0 auto",
                }}
                customSquareStyles={{
                  ...this.state.moveSquares,
                  ...this.state.optionSquares,
                  ...this.state.rightClickedSquares,
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ChessGame;

export const displayChess = () => {
  return <ChessGame />;
};
