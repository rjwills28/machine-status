import classes from "./header.module.css";

export const Header = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <div >
        <img src="/img/Diamond_logo_col.jpg" className={classes.img}/>
      </div>
      <h1 className={classes.h1}>
        <a href="/">Machine Status</a>
      </h1>
    </header>
  );
};
