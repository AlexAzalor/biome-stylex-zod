import stylex from "@stylexjs/stylex";

export const formStyles = stylex.create({
  text: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "bold",
    color: "orange",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  error: {
    color: "tomato",
  },
  form: {
    backgroundColor: "#15172b",
    borderRadius: "20px",
    boxSizing: "border-box",
    height: "max-content",
    padding: "20px",
    width: "320px",
  },
  title: {
    color: "#eee",
    fontFamily: "sans-serif",
    fontSize: "36px",
    fontWeight: 600,
  },
  subtitle: {
    color: "#eee",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "10px",
  },

  submit: {
    backgroundColor: "#08d",
    borderRadius: "12px",
    border: 0,
    boxSizing: "border-box",
    color: "#eee",
    cursor: "pointer",
    fontSize: "18px",
    height: "50px",
    marginTop: "28px",
    textAlign: "center",
    width: "100%",
    transition: "all 0.3s ease-in-out",
    ":active": {
      backgroundColor: "#06b",
    },
    ":hover": {
      background: "#03e9f4",
      color: "#fff",
      borderRadius: "5px",
      boxShadow:
        "0 0 5px #47aeee,0 0 6px #47aeee,0 0 26px #47aeee,0 0 28px #47aeee",
    },
  },
  terms: {
    textAlign: "left",
    marginTop: "20px",
  },
  termsLabel: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    padding: "4px",
  },
});
