import React, { Component } from "react";
import "./App.scss";
import { Tween, Timeline, SplitLetters } from "react-gsap";
import { Board } from "./components/board/board.component";
import { TextBox } from "./components/text-box/text-box.component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [
        "#8dd3c7",
        "#ffffb3",
        "#bebada",
        "#fb8072",
        "#80b1d3",
        "#fdb462",
        "#b3de69",
        "#fccde5",
        "#d9d9d9",
        "#bc80bd",
        "#ccebc5",
        "#ffed6f"
      ],
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
      lockedBoard: false,
      textBoxText: "",
      textBoxImage: "",
      cards: [],
      selectedCards: [],
      matchCount: 0,
      luckyMatchCount: 0,
      flopCount: 0,
      stupidCount: 0,
      currentLevel: 0
    };
  }

  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  initGame = currentLevel => {
    let cats = [];
    let board = this.state.boards[currentLevel];
    for (let i = 0; i < Math.floor((board.cols * board.rows) / 2); i++) {
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
    this.setState({
      currentLevel: currentLevel,
      cards: cards,
      textBoxImage: cards[0].hash,
      textBoxText: "Ready? Find a match!",
      matchCount: 0,
      lockedBoard: false,
      selectedCards: []
    });
  };

  componentDidMount() {
    this.initGame(0);
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
      this.setState({ selectedCards: selectedCards });
      if (selectedCards.length === 2) {
        this.setState({ lockedBoard: true });
        this.checkWin(cards);
      }
    }
  };

  checkWin = cards => {
    const matchCount = this.state.matchCount + 2;
    if (matchCount === cards.length) {
      this.setState({
        textBoxText: "You did it hey!"
      });
      setTimeout(() => {
        this.initGame(this.state.currentLevel + 1);
      }, 3000);
    } else {
      setTimeout(() => {
        this.checkMatch(this.state.selectedCards);
      }, 1000);
    }
  };

  checkMatch = selectedCards => {
    const cards = this.state.cards.slice();
    let matchCount = this.state.matchCount;
    let textBoxText = "";
    if (selectedCards[0].hash === selectedCards[1].hash) {
      matchCount += 2;
      //lucky match?
      if (selectedCards[1].flipCount === 1) {
        textBoxText = "lucky match!";
      } else {
        textBoxText = "Yay! a match!";
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
        textBoxText = "now that was pretty stupid!";
      } else if (match[0].flipCount > 0) {
        textBoxText = "you should have known!";
      } else {
        textBoxText = "go on explore...";
      }
    }
    selectedCards = [];
    this.setState({
      textBoxText: textBoxText,
      selectedCards: selectedCards,
      matchCount: matchCount,
      lockedBoard: false
    });
  };

  render() {
    return (
      <div className="App">
        <Timeline
          target={
            <SplitLetters>
              <h1>Fluffy Twins</h1>
            </SplitLetters>
          }
        >
          <Tween
            staggerFrom={{ y: "-=200px", scale: 1, color: "#0ccac4" }}
            staggerTo={{ y: "0px", scale: 1, color: "#0ccac4" }}
            stagger={0.1}
            duration={2}
            ease="Bounce.easeOut"
          />
          <Tween
            staggerFrom={{ scale: 1.5, color: "white" }}
            staggerTo={{ scale: 1 }}
            stagger={0.1}
            duration={0.2}
            cycle={{
              color: this.state.colors
            }}
          />
        </Timeline>

        <TextBox
          text={this.state.textBoxText}
          image={this.state.textBoxImage}
        />
        <Board
          size={this.state.boards[this.state.currentLevel].cols}
          cards={this.state.cards}
          onClick={card => this.handleClick(card)}
        />
      </div>
    );
  }
}

export default App;
