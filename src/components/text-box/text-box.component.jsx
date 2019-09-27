import React from "react";
import "./text-box.styles.scss";

export const TextBox = props => (
  <div className="text-box">
    <img
      alt="cat"
      src={`https://robohash.org/${props.image}?set=set4&size=180x180`}
    />
    <div>{props.text}</div>
  </div>
);
