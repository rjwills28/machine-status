import React from "react";

export const Footer = (): JSX.Element => {
  return (
    <footer
      style={{
        height: "5vh",
        color: "var(--diamond-blue)",
        fontSize: "1.3rem"
      }}
    >
      <p>
        Machine Status version {process.env.VITE_VERSION}{" "}
        {process.env.VITE_BUILD_TIME}
      </p>
      <p>Copyright © Diamond Light Source Ltd.</p>
      <p>
        <a href="https://www.diamond.ac.uk">www.diamond.ac.uk</a>
      </p>
    </footer>
  );
};
