import React, { Component } from "react";
import "./card.styles.scss";
import pawprint from "../../assets/pawprint.svg";

class Card extends Component {
  render() {
    return (
      <div
        onClick={this.props.locked ? null : () => this.props.onClick()}
        className={this.props.flipped ? "flip-card flipped" : "flip-card"}
        style={{
          width: `calc(98vw / ${this.props.size})`,
          height: `calc(98vw / ${this.props.size})`
        }}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              alt="cat"
              src={`https://robohash.org/${this.props.image}?set=set4&bgset=bg1&size=180x180`}
            />
          </div>
          <div className="flip-card-back">
            <img alt="paw print" src={pawprint}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
