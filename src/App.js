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
          cols: 2,
          rows: 2
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
      lockedBoard: false,
      cards: [],
      selectedCards: [],
      matchCount: 0,
      luckyMatchCount: 0,
      flopCount: 0,
      stupidCount: 0
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
          locked: false,
          flipCount: 0
        }));
        this.setState({ cards: cards });
        console.log("Ready? Choose a card and find a match!");
      }
    );
  };

  componentDidMount() {
    this.initGame(this.state.boards[0].name);
  }

  handleClick = card => {
    if (!this.state.lockedBoard) {
      const cards = this.state.cards.slice();
      cards[card.id].flipped = true;
      cards[card.id].locked = true;
      cards[card.id].flipCount++;
      this.setState({ cards: cards });

      const selectedCards = this.state.selectedCards.slice();
      selectedCards.push(card);
      if (selectedCards.length === 2) {
        this.setState({ lockedBoard: true });
        setTimeout(() => {
          this.checkMatch(selectedCards);
        }, 1000);
      } else {
        this.setState({ selectedCards: selectedCards });
      }
    }
  };

  checkMatch = selectedCards => {
    const cards = this.state.cards.slice();
    if (selectedCards[0].hash === selectedCards[1].hash) {
      const matchCount = this.state.matchCount + 2;
      if (matchCount === cards.length) {
        console.log("You did it hey!");
        this.setState({ matchCount: 0 });
      } else {
        this.setState({ matchCount: matchCount });
        //lucky match?
        if (selectedCards[1].flipCount === 1) {
          console.log("lucky match!");
        } else {
          console.log("Yay! a match!");
        }
      }
    } else {
      cards[selectedCards[0].id].flipped = false;
      cards[selectedCards[1].id].flipped = false;
      cards[selectedCards[0].id].locked = false;
      cards[selectedCards[1].id].locked = false;
      //flop? player has seen the corresponing card before...
      let match = cards.filter(card => card.hash === selectedCards[0].hash);
      match.splice(
        selectedCards.findIndex(card => card.id === selectedCards[0].id),
        1
      );
      if (selectedCards[0].flipCount > 1 && selectedCards[1].flipCount > 1) {
        console.log("now that was pretty stupid!");
      } else if (match[0].flipCount > 0) {
        console.log("you should have known!");
      } else {
        console.log("go on explore...");
      }
    }
    selectedCards = [];
    this.setState({
      cards: cards,
      selectedCards: selectedCards,
      lockedBoard: false
    });
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
