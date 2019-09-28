import React from "react";
import "./modal.styles.scss";
import { Tween, Timeline, SplitLetters } from "react-gsap";

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
      <h2>You finished</h2>
      <p>here the stats</p>
    </div>
  </div>
);
