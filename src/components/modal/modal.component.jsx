import React from "react";
import "./modal.styles.scss";
import { Tween, Timeline, SplitLetters } from "react-gsap";
import banner from "../../assets/banner.svg";

export const Modal = props => (
  <div
    onClick={() => props.onClick()}
    className={props.show ? "modal show" : "modal hide"}
  >
    <div className="modal-inner">
      <Timeline
        target={
          <SplitLetters>
            <h1>Congratulations</h1>
          </SplitLetters>
        }
        repeat={-1}
        yoyo={true}
      >
        <Tween
          staggerTo={{ y: "-=0px" }}
          stagger={0.001}
          duration={0.1}
          ease="Quad.easeInOut"
          cycle={{ y: ["-=2px", "+=2px"] }}
        />
      </Timeline>
      <h2>You were awarded the rank</h2>
      <div className="badge-container">
        <div className="icon">🐼</div>
        <div className="badge" style={{ backgroundImage: `url(${banner})` }}>
          Cat Whisperer
        </div>
      </div>
      <p>"You did well for a human"</p>
      <ul>
        <li>
          <span role="img" aria-label="birdie">
            🐥
          </span>
          <h2>Birdies: {props.luckyMatchCount}</h2>
          <small>
            Getting a match without seeing the corresponding card before.
          </small>
        </li>
        <li>
          <span role="img" aria-label="flop">
            🙈
          </span>
          <h2>Flops: {props.flopCount + props.stupidCount}</h2>
          <small>
            Missing a match, although you have seen the corresponding card
            before at least once.
          </small>
        </li>
        <li>
          <span role="img" aria-label="disaster">
            🌋
          </span>
          <h2>Tragedies: {props.stupidCount}</h2>
          <small>
            Missing a match, although you have seen the card as well as the
            corresponding card more than 3 times.
          </small>
        </li>
      </ul>
      <small>Tap to play again!</small>
    </div>
  </div>
);
