import { text } from "./utils.js";
import { colors } from "./colors.js";

export function footer() {

    const now = new Date().toLocaleString();

    return `

<line
x1="40"
y1="1120"
x2="1560"
y2="1120"
stroke="${colors.border}"/>

${text(
60,
1160,
`Updated: ${now}`,
16,
colors.gray
)}

${text(
1320,
1160,
"Built by Sudip Pal",
16,
colors.blue
)}

`;

}