import React, { Component } from "react";
import "./App.scss";
import { Board } from "./components/board/board.component";
import SelectBox from "./components/select-box/select-box-component";
import { Tween, Timeline, SplitLetters } from "react-gsap";

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

  rainbow = colorSet => {
    // 30 random hues with step of 12 degrees
    const colors = {
      rainbow: ["red", "orange", "yellow", "green", "blue", "purple"],
      qual: [
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
      quant: [
        "#fff7ec",
        "#fee8c8",
        "#fdd49e",
        "#fdbb84",
        "#fc8d59",
        "#ef6548",
        "#d7301f",
        "#b30000",
        "#7f0000"
      ],
      div: [
        "#67001f",
        "#b2182b",
        "#d6604d",
        "#f4a582",
        "#fddbc7",
        "#f7f7f7",
        "#d1e5f0",
        "#92c5de",
        "#4393c3",
        "#2166ac",
        "#053061"
      ]
    };

    const color = colors[colorSet];

    return color[(Math.random() * color.length) | 0];
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
              color: ["red", "orange", "yellow", "green", "blue", "purple"]
            }}
          />
        </Timeline>

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
