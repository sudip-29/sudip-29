import { card } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";
import {
    CONTENT_X,
    LEFT_PANEL_WIDTH,
    RIGHT_PANEL_WIDTH,
    GAP,
    BOTTOM_Y,
    CARD_HEIGHT
} from "./layout.js";

const palette = [
    colors.blue,
    colors.green,
    colors.orange,
    colors.purple,
    colors.pink,
    colors.cyan,
    colors.yellow
];

export function languagesChart(languages) {

    const entries = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

    const cx = 1185;
    const cy = 965;
    const r = 78;
    const strokeWidth = 22;
    const circumference = 2 * Math.PI * r;

    let arcs = "";
    let legend = "";
    let offset = 0;

    entries.forEach(([lang, bytes], index) => {

        const percent = bytes / total;
        const dash = circumference * percent;

        arcs += `
<circle
cx="${cx}"
cy="${cy}"
r="${r}"
fill="none"
stroke="${palette[index % palette.length]}"
stroke-width="${strokeWidth}"
stroke-linecap="round"
transform="rotate(-90 ${cx} ${cy})"
stroke-dasharray="${dash} ${circumference}"
stroke-dashoffset="${-offset}">

<animate
attributeName="stroke-dashoffset"
from="${circumference}"
to="${-offset}"
dur="1.5s"
fill="freeze"/>

</circle>
`;

        legend += `
<circle
cx="1295"
cy="${890 + index * 30}"
r="7"
fill="${palette[index % palette.length]}"/>

${text(
    1310,
    895 + index * 30,
    `${lang} (${(percent * 100).toFixed(1)}%)`,
    14,
    colors.white
)}
`;

        offset += dash;

    });

    return `

${card(
    CONTENT_X + LEFT_PANEL_WIDTH + GAP,
    BOTTOM_Y,
    RIGHT_PANEL_WIDTH,
    CARD_HEIGHT
)}

${text(
    1270,
    860,
    "Languages",
    20,
    colors.white,
    "bold",
    "middle"
)}

${arcs}

<circle
cx="${cx}"
cy="${cy}"
r="55"
fill="${colors.card}"/>

${text(
    cx,
    cy - 8,
    "Top",
    16,
    colors.gray,
    "bold",
    "middle"
)}

${text(
    cx,
    cy + 16,
    "Languages",
    16,
    colors.white,
    "bold",
    "middle"
)}

${legend}

`;
}