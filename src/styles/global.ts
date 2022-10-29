import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    background-color: red;
  }
  html, body {
    height: 100%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  html,
body {
  font-size: 62.5%;
  background-color: #121212;
  font-family: 'Lato', sans-serif;
}


h1,
h2,
h3,
p {
  color: #ffffff;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


  &::before,
  &::after {
    box-sizing: inherit;
  }
}
`

export default GlobalStyles
