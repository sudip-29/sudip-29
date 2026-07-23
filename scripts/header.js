import { colors } from "./colors.js";

export function header() {

return `

<!-- Dashboard Title -->

<text
x="70"
y="70"
font-size="42"
font-family="Inter,Segoe UI,Arial"
font-weight="700"
fill="url(#titleGradient)">
GitHub Dashboard
</text>

<!-- Live Indicator -->

<circle
cx="1360"
cy="58"
r="6"
fill="${colors.green}">

<animate
attributeName="r"
values="5;7;5"
dur="1.8s"
repeatCount="indefinite"/>

</circle>

<text
x="1375"
y="64"
font-size="18"
font-family="Inter,Segoe UI,Arial"
fill="${colors.green}">
Live from GitHub API
</text>

`;

}