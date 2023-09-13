import { Global, css } from "@emotion/react";

const reallySans = css`
  @font-face {
    font-family: "Really Sans Small";
    src: url("./fonts/ReallySansSmall-Regular.woff2") format("woff2"),
      url("./fonts/ReallySansSmall-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Really Sans Small";
    src: url("./fonts/ReallySansSmall-Bold.woff2") format("woff2"),
      url("./fonts/ReallySansSmall-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Really Sans Large";
    src: url("./fonts/ReallySansLarge-Regular.woff2") format("woff2"),
      url("./fonts/ReallySansLarge-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Really Sans Large";
    src: url("./fonts/ReallySansLarge-Bold.woff2") format("woff2"),
      url("./fonts/ReallySansLarge-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`;

export default function CustomFonts() {
  return <Global styles={reallySans} />;
}
