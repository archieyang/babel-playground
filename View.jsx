import React from "react";

export const TagItem = (props) => {
  return (
    <div>
      <h1>{props.tag.text}</h1>
      <p>{props.tag.text}</p>
    </div>
  );
};
