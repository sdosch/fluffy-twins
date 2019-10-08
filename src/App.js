import React, { Component } from "react";
import "./App.scss";
import { Tween, Timeline, SplitLetters } from "react-gsap";
import Board from "./components/board/board.component";
import { TextBox } from "./components/text-box/text-box.component";
import { Modal } from "./components/modal/modal.component";

import COLOR_DATA from "./data/color.data";
import BOARD_DATA from "./data/board.data";
import RESPONSE_DATA from "./data/response.data";
import RANK_DATA from "./data/rank.data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: COLOR_DATA,
      boards: BOARD_DATA,
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
      responseFoundMe: RESPONSE_DATA.responseFoundMe,
      responseSeenBefore: RESPONSE_DATA.responseSeenBefore,
      responseMatch: RESPONSE_DATA.responseMatch,
      responseLuckyMatch: RESPONSE_DATA.responseLuckyMatch,
      responseNoMatch: RESPONSE_DATA.responseNoMatch,
      responseFlopMatch: RESPONSE_DATA.responseFlopMatch,
      responseStupidMatch: RESPONSE_DATA.responseStupidMatch,
      ranks: RANK_DATA,
      currentRank: {}
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ currentLevel: 0 });
    this.initGame(0);
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
      zoomed: false,
      locked: false,
      flipCount: 0
    }));
    this.setState({
      currentLevel: currentLevel,
      cards: cards,
      textBoxImage: cards[0].hash,
      textBoxText: this.state.boards[currentLevel].responseStart,
      matchCount: 0,
      lockedBoard: false,
      selectedCards: [],
      showModal: false
    });
  };

  componentDidMount() {
    this.initGame(this.state.currentLevel);
  }

  handleClick = card => {
    if (!this.state.lockedBoard) {
      const cards = this.state.cards.slice();
      cards[card.id].flipped = true;
      cards[card.id].zoomed = true;
      cards[card.id].locked = true;
      cards[card.id].flipCount++;
      this.setState({ cards: cards, currentRank: this.getRank() });

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
        cards[selectedCards[0].id].zoomed = false;
        this.setState({ lockedBoard: true, cards: cards });

        this.checkWin(cards);
      }
    }
  };

  checkWin = cards => {
    const matchCount = this.state.matchCount + 2;
    if (matchCount === cards.length) {
      this.setState({
        textBoxText: this.state.boards[this.state.currentLevel].responseWin
      });
      setTimeout(() => {
        const currentLevel = this.state.currentLevel + 1;
        if (currentLevel > this.state.boards.length - 1) {
          this.showModal();
        } else {
          this.initGame(currentLevel);
        }
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
        const luckyMatchCount = this.state.luckyMatchCount + 1;
        this.setState({ luckyMatchCount: luckyMatchCount });
      } else {
        textBoxText = this.textResponse(this.state.responseMatch);
      }
    } else {
      cards[selectedCards[0].id].flipped = false;
      cards[selectedCards[1].id].flipped = false;
      cards[selectedCards[0].id].locked = false;
      cards[selectedCards[1].id].locked = false;
      cards[selectedCards[1].id].zoomed = false;

      let match = cards.filter(card => card.hash === selectedCards[0].hash);
      match.splice(
        selectedCards.findIndex(card => card.id === selectedCards[0].id),
        1
      );

      if (selectedCards[0].flipCount > 3 && selectedCards[1].flipCount > 3) {
        //stupid? player has seen the card as well as the corresponding card more than three times
        textBoxText = this.textResponse(this.state.responseStupidMatch);

        const stupidCount = this.state.stupidCount + 1;
        this.setState({ stupidCount: stupidCount });
      } else if (match[0].flipCount > 0) {
        //flop? player has seen the corresponing card before...
        textBoxText = this.textResponse(this.state.responseFlopMatch);

        const flopCount = this.state.flopCount + 1;
        this.setState({ flopCount: flopCount });
      } else {
        textBoxText = this.textResponse(this.state.responseNoMatch);
      }
    }
    cards[selectedCards[1].id].zoomed = false;
    selectedCards = [];
    this.setState({
      textBoxText: textBoxText,
      selectedCards: selectedCards,
      matchCount: matchCount,
      lockedBoard: false
    });
  };

  getRank = () => {
    const mistakes =
      this.state.flopCount +
      this.state.stupidCount * 2 -
      this.state.luckyMatchCount * 2;
    const handycap = 100;
    let rank = Math.floor((mistakes / handycap) * this.state.ranks.length);
    rank = rank < 0 ? 0 : rank;
    rank = rank > this.state.ranks.length ? this.state.ranks.length - 1 : rank;
    return this.state.ranks[rank];
  };

  render() {
    return (
      <div className="App">
        <div className="title-container">
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
        </div>

        <TextBox
          text={this.state.textBoxText}
          image={this.state.textBoxImage}
        />
        <Board
          size={this.state.boards[this.state.currentLevel].cols}
          cards={this.state.cards}
          level={this.state.currentLevel}
          onClick={card => this.handleClick(card)}
        />
        <Modal
          show={this.state.showModal}
          luckyMatchCount={this.state.luckyMatchCount}
          flopCount={this.state.flopCount}
          stupidCount={this.state.stupidCount}
          rank={this.state.currentRank}
          rankIndicator={
            this.state.ranks.findIndex(
              rank => rank.title === this.state.currentRank.title
            ) + 1
          }
          onClick={() => this.hideModal()}
        />
      </div>
    );
  }
}

export default App;
