import { card } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";

function getColor(count) {

    if (count === 0) return colors.heat0;
    if (count < 3) return colors.heat1;
    if (count < 6) return colors.heat2;
    return colors.heat3;
}

export function heatmap(calendar) {

    let boxes = "";

    calendar.weeks.forEach((week, weekIndex) => {

        week.contributionDays.forEach((day, dayIndex) => {

            const x = 470 + weekIndex * 18;
            const y = 820 + dayIndex * 18;

            boxes += `
<rect
x="${x}"
y="${y}"
width="14"
height="14"
rx="3"
fill="${getColor(day.contributionCount)}"/>
`;

        });

    });

    return `

${card(430,770,1130,220)}

${text(
470,
805,
"Contribution Heatmap",
26,
colors.white,
"bold"
)}

${text(440,840,"Mon",14,colors.gray)}
${text(440,876,"Wed",14,colors.gray)}
${text(440,912,"Fri",14,colors.gray)}

${boxes}

`;

}