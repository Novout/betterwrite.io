module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
     'raleway': ['Raleway', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      height: theme => ({
        "editor": "75vh",
      }),
      maxHeight: theme => ({
        "editor": "75vh"
      }),
      minHeight: theme => ({
        "editor": "75vh"
      })
    },
  },
  variants: ["hover", "focus", "active", "dark", "responsive"],
  plugins: [],
};
