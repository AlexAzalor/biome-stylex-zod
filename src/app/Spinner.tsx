import stylex from "@stylexjs/stylex";

export const Spinner = () => {
  return <div {...stylex.props(spinner.icon)} />;
};

export const rotate = stylex.keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const spinner = stylex.create({
  icon: {
    display: "inline-block",
    width: "80px",
    height: "80px",
    "::after": {
      content: '""',
      display: "block",
      width: "64px",
      height: "64px",
      margin: "8px",
      borderRadius: "50%",
      border: "6px solid #fff",
      borderColor: "#fff transparent #fff transparent",
      animation: `${rotate} 1.2s linear infinite`,
    },
  },
});
