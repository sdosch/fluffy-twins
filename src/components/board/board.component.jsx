import React, { Component } from "react";
import Card from "../card/card.component";
import "./board.styles.scss";

class Board extends Component {
  getBorderTranslate = (id, size) => {
    let borderTranslate = [];
    if (id < size) borderTranslate.push("border-top");
    if (id % size === 0) borderTranslate.push("border-left");
    if (id % size === size - 1) borderTranslate.push("border-right");
    if (id >= size * (size - 1)) borderTranslate.push("border-bottom");
    return borderTranslate;
  };

  render() {
    return (
      <div
        className={`board level-${this.props.level}`}
        style={{ gridTemplateColumns: `repeat(${this.props.size}, 1fr)` }}
      >
        {this.props.cards.map(card => (
          <Card
            key={card.id}
            image={card.hash}
            flipped={card.flipped}
            zoomed={card.zoomed}
            locked={card.locked}
            size={this.props.size}
            borderTranslate={this.getBorderTranslate(card.id, this.props.size)}
            onClick={() => this.props.onClick(card)}
          />
        ))}
      </div>
    );
  }
}

export default Board;
