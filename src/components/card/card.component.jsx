import React from "react";
import "./card.styles.scss";
import pawprint from "../../assets/pawprint.svg";

export const Card = props => (
  <div
    onClick={props.locked ? null : () => props.onClick()}
    className={props.flipped ? "flip-card flipped" : "flip-card"}
    style={{
      width: `calc(98vw / ${props.size})`,
      height: `calc(98vw / ${props.size})`
    }}
  >
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img
          alt="cat"
          src={`https://robohash.org/${props.image}?set=set4&bgset=bg1&size=180x180`}
        />
      </div>
      <div className="flip-card-back">
        <img alt="paw print" src={pawprint}></img>
      </div>
    </div>
  </div>
);
