import React, { Component } from "react";
import "./App.scss";
import { Tween, Timeline, SplitLetters } from "react-gsap";
import { Board } from "./components/board/board.component";
import { TextBox } from "./components/text-box/text-box.component";
import { Modal } from "./components/modal/modal.component";

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
      currentLevel: 0,
      showModal: false,
      responseStart: [
        "<span>😺</span> can you find a match?",
        "<span>😸</span> but can you also solve this?",
        "<span>😼</span> here's the final challenge!"
      ],
      responseWin: [
        "<span>😻</span> well done!",
        "<span>😻</span> very good! one more, ok?",
        "<span>😻</span> you did them all!!!"
      ],
      responseFoundMe: [
        "<span>👇🏻</span>hey, that's me <span>❤️</span>",
        "hee <span>❤️</span>",
        "hello again <span>❤️</span>",
        "i love you too! <span>❤️</span>",
        "<span>❤️</span>"
      ],
      responseSeenBefore: [
        "<span>😺</span> 3rd try on this card",
        "<span>😾</span> 5th try on this card!",
        "<span>🙀</span> no match after 9 tries!!!"
      ],
      responseMatch: [
        "yup <span>👍🏻</span>",
        "<span>💅🏻</span> and that's a match!",
        "<span>😎😎😎</span>",
        "<span>🤘🏻🤘🏻</span>rock'n'roll <span>🤘🏻🤘🏻</span>",
        "<span>😲</span> you are so gooood!",
        "<span>🥳</span> got it just right! <span>🥳</span>",
        "you knew it <span>😜</span>",
        "jawoll! <span>✊🏻</span>"
      ],
      responseLuckyMatch: [
        "️️<span>🍀</span> lucky match!!! <span>🍀</span>",
        "<span>🍻</span> cheerio!!!",
        "<span>🦄</span> You are so lucky!!! <span>🌈</span>",
        "⭐<span>⭐</span>⭐<span>⭐</span>⭐<span>⭐</span>⭐",
        "<span>🔔</span> BINGO <span>🔔</span>",
        "<span>💁🏼</span> exactly!!!",
        "<span>💁🏼</span> tadaa!!!"
      ],
      responseNoMatch: [
        "<span>☝🏼</span> fun fact: that was a cat.",
        "<span>🤷🏼‍</span> no we don't look alike.",
        "<span>👬</span> no were not twins.",
        "<span>🐯</span> a cat, but wrong one.",
        "<span>🌧</span> sorry, no match.",
        "<span>🙇🏻‍</span> no match this time."
      ],
      responseFlopMatch: [
        "<span>🥺</span> close - but wrong",
        "<span>🧐</span> seen that before.",
        "<span>🙄</span> well keep on guessing...",
        "<span>😓</span> no look somewhere else.",
        "<span>🤞🏼</span> better luck next time."
      ],
      responseStupidMatch: [
        "<span>😂</span> hahaha... no.",
        "<span>🤢</span>",
        "<span>🤯</span>",
        "<span>🤦🏻‍</span>OMG",
        "🧟‍<span>🧟‍</span> NOOooo! <span>🧟‍</span>🧟‍",
        "<span>🙈</span>emm... no."
      ]
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

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
      textBoxText: this.state.responseStart[currentLevel],
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

      let match = cards.filter(otherMe => card.hash === otherMe.hash);

      //found me/other me
      if (card.id === 0 || cards[0].hash === match[1].hash) {
        this.setState({
          textBoxText:
            card.flipCount < this.state.responseFoundMe.length
              ? this.state.responseFoundMe[card.flipCount - 1]
              : this.state.responseFoundMe[
                  this.state.responseFoundMe.length - 1
                ]
        });
      }
      // seen before
      switch (card.flipCount) {
        case 3:
          this.setState({
            textBoxText: this.state.responseSeenBefore[0]
          });
          break;
        case 5:
          this.setState({
            textBoxText: this.state.responseSeenBefore[1]
          });
          break;
        case 10:
          this.setState({
            textBoxText: this.state.responseSeenBefore[2]
          });
          break;
        default:
      }

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
        textBoxText: this.state.responseWin[this.state.currentLevel]
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

  textResponse = responseObject => {
    const response = this.shuffle(responseObject);
    return response[0];
  };

  checkMatch = selectedCards => {
    const cards = this.state.cards.slice();
    let matchCount = this.state.matchCount;
    let textBoxText = "";
    if (selectedCards[0].hash === selectedCards[1].hash) {
      matchCount += 2;
      //lucky match?
      if (selectedCards[1].flipCount === 1) {
        textBoxText = this.textResponse(this.state.responseLuckyMatch);
      } else {
        textBoxText = this.textResponse(this.state.responseMatch);
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
        textBoxText = this.textResponse(this.state.responseStupidMatch);
      } else if (match[0].flipCount > 0) {
        textBoxText = this.textResponse(this.state.responseFlopMatch);
      } else {
        textBoxText = this.textResponse(this.state.responseNoMatch);
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
        <Modal show={this.state.showModal} />
      </div>
    );
  }
}

export default App;
