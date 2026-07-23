import { card } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";
import {
    CONTENT_X,
    GRAPH_Y
} from "./layout.js";

export function contributionGraph(calendar) {

    const weeks = calendar.weeks;

    // Grid
    let grid = "";

    for (let i = 0; i < 5; i++) {
        grid += `
<line
x1="${CONTENT_X + 20}"
y1="${GRAPH_Y + 50 + i * 45}"
x2="${CONTENT_X + 1060}"
y2="${GRAPH_Y + 50 + i * 45}"
stroke="#30363D"
stroke-width="1"/>
`;
    }

    const graphWidth = 1020;
    const spacing = graphWidth / (weeks.length - 1);

    let linePath = "";
    let areaPath = "";

    weeks.forEach((week, i) => {

        const total = week.contributionDays.reduce(
            (sum, day) => sum + day.contributionCount,
            0
        );

        const x = CONTENT_X + 30 + i * spacing;
        const y = GRAPH_Y + 210 - total * 0.4;

        if (i === 0) {
            linePath += `M ${x} ${y}`;
            areaPath += `M ${x} ${GRAPH_Y + 230} L ${x} ${y}`;
        } else {
            linePath += ` L ${x} ${y}`;
            areaPath += ` L ${x} ${y}`;
        }
    });

    const lastX = CONTENT_X + 30 + (weeks.length - 1) * spacing;

    areaPath += ` L ${lastX} ${GRAPH_Y + 230} Z`;

    return `

${card(CONTENT_X, GRAPH_Y, 1080, 260)}

${grid}

${text(470, 560, "Contribution Activity", 28, colors.white, "bold")}

<!-- Filled Area -->
<path
d="${areaPath}"
fill="url(#graphGradient)"
opacity="0.5"/>

<!-- Animated Line -->
<path
d="${linePath}"
fill="none"
stroke="${colors.green}"
stroke-width="4"
stroke-linejoin="round"
stroke-linecap="round"
stroke-dasharray="1200"
stroke-dashoffset="1200">

<animate
attributeName="stroke-dashoffset"
from="1200"
to="0"
dur="2s"
fill="freeze"/>

</path>

`;
}