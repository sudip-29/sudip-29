import { card } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";
import { selectedYear } from "./years.js";

const CELL = 14;
const GAP = 4;

function getColor(count) {

    if (count === 0) return "#161B22";
    if (count < 3) return "#0E4429";
    if (count < 6) return "#006D32";
    if (count < 10) return "#26A641";

    return "#39D353";
}

export function contributionCalendar(calendar) {

    const weeks = calendar.weeks;
    const currentYear = selectedYear;

    let svg = `

${card(
145,
1300,
1300,
280
)}

${text(
175,
1335,
"Contribution Calendar",
26,
colors.white,
"bold"
)}

${text(
1310,
1385,
currentYear.toString(),
18,
colors.gray,
"bold",
"end"
)}

${text(
180,
1355,
`${calendar.totalContributions.toLocaleString()} contributions in the last year`,
15,
colors.gray
)}

`;

    const startX = 275;
    const startY = 1390;
    const dayLabels = [
        { label: "Sun", row: 0 },
        { label: "Mon", row: 1 },
        { label: "Tue", row: 2 },
        { label: "Wed", row: 3 },
        { label: "Thu", row: 4 },
        { label: "Fri", row: 5 },
        { label: "Sat", row: 6 }
    ];


    dayLabels.forEach(day => {

        svg += text(
            startX - 15,
            startY + day.row * (CELL + GAP) + 11,
            day.label,
            12,
            colors.gray,
            "normal",
            "end"
        );

    });


    let previousMonth = "";

    weeks.forEach((week, weekIndex) => {

        const month = new Date(
            week.contributionDays[0].date
        ).toLocaleString("en-US", {
            month: "short"
        });

        if (month !== previousMonth) {

            svg += text(
                startX + weekIndex * (CELL + GAP),
                startY - 8,
                month,
                14,
                colors.gray
            );

            previousMonth = month;
        }

        week.contributionDays.forEach((day, dayIndex) => {

            svg += `

<rect
x="${startX + weekIndex * (CELL + GAP)}"
y="${startY + dayIndex * (CELL + GAP)}"
width="${CELL}"
height="${CELL}"
rx="3"
fill="${getColor(day.contributionCount)}"
/>

`;

        });

    });

    const legendY = startY + (7 * (CELL + GAP)) + 18;

    svg += text(
        1250,
        legendY + 10,
        "Less",
        12,
        colors.gray
    );

    const legendColors = [
        "#161B22",
        "#0E4429",
        "#006D32",
        "#26A641",
        "#39D353"
    ];

    legendColors.forEach((color, index) => {

        svg += `
    <rect
    x="${1280 + index * 20}"
    y="${legendY}"
    width="12"
    height="12"
    rx="3"
    fill="${color}"
    stroke="#30363D"
    stroke-width="1"
    />
    `;

    });

    svg += text(
        1380,
        legendY + 10,
        "More",
        12,
        colors.gray
    );


    return svg;

}