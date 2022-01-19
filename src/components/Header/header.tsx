import classes from "./header.module.css";

export const Header = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>
        <a href="/">Machine Status</a>
      </h1>
    </header>
  );
};
