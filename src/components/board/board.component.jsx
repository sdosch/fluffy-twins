import React from "react";
import { Card } from "../card/card.component";
import "./board.styles.scss";

export const Board = props => (
  <div
    className="board"
    style={{ gridTemplateColumns: `repeat(${props.size}, 1fr)` }}
  >
    {props.cards.map(card => (
      <Card
        key={card.id}
        image={card.hash}
        flipped={card.flipped}
        locked={card.locked}
        size={props.size}
        onClick={() => props.onClick(card)}
      />
    ))}
  </div>
);
