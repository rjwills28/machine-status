import React from "react";
import classes from "./header.module.css";

export const Header = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <div>
        <img
          src="/img/Diamond_logo_col.jpg"
          className={classes.img}
          alt="Diamond Logo"
        />
      </div>
    </header>
  );
};
