import React, { Component } from "react";
import "./App.scss";
import Board from "./components/board/board.component";
import SelectBox from "./components/select-box/select-box-component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [
        {
          name: "small",
          cols: 3,
          rows: 3
        },
        {
          name: "medium",
          cols: 4,
          rows: 4
        },
        {
          name: "large",
          cols: 6,
          rows: 6
        }
      ],
      selectedBoard: {},
      cards: []
    };
  }

  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  handleSelectBox = selected => {
    this.initGame(selected);
  };

  initGame = name => {
    this.setState(
      { selectedBoard: this.state.boards.find(board => board.name === name) },
      () => {
        let cats = [];
        for (
          let i = 0;
          i <
          Math.floor(
            (this.state.selectedBoard.cols * this.state.selectedBoard.rows) / 2
          );
          i++
        ) {
          cats.push({
            hash: Math.random()
              .toString(36)
              .substr(2, 5)
          });
        }
        const cards = this.shuffle([...cats, ...cats]).map((cat, index) => ({
          id: index,
          hash: cat.hash,
          flipped: false,
          locked: false
        }));
        this.setState({ cards: cards });
      }
    );
  };

  componentDidMount() {
    this.initGame(this.state.boards[0].name);
  }

  handleClick = card => {
    console.log(card.id);
    const cards = this.state.cards.slice();
    cards[card.id].flipped = !cards[card.id].flipped;
    this.setState({ cards: cards });
  };

  render() {
    return (
      <div className="App">
        <h1>Fluffy Twins</h1>

        <SelectBox
          id="selectbox"
          options={this.state.boards}
          onSelectChange={this.handleSelectBox}
        />
        <Board
          cards={this.state.cards}
          size={Math.ceil(this.state.selectedBoard.cols)}
          onClick={card => this.handleClick(card)}
        />
      </div>
    );
  }
}

export default App;
