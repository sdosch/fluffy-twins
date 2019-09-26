import React, { Component } from "react";
import Card from "../card/card.component";
import "./board.styles.scss";

class Board extends Component {
  render() {
    return (
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${this.props.size}, 1fr)` }}
      >
        {this.props.cards.map(card => (
          <Card
            key={card.id}
            image={card.hash}
            flipped={card.flipped}
            locked={card.locked}
            size={this.props.size}
            onClick={() => this.props.onClick(card)}
          />
        ))}
      </div>
    );
  }
}

export default Board;
