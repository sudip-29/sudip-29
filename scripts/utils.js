export function svg(width, height, content) {
    return `
<svg
xmlns="http://www.w3.org/2000/svg"
width="${width}"
height="${height}"
viewBox="0 0 ${width} ${height}">

${filters()}

${content}

</svg>`;
}


export function text(
    x,
    y,
    value,
    size = 18,
    color = "#F0F6FC",
    weight = "normal",
    anchor = "start"
) {
    return `
<text
x="${x}"
y="${y}"
fill="${color}"
font-size="${size}"
font-family="Inter,Segoe UI,Arial"
font-weight="${weight}"
text-anchor="${anchor}">
${value}
</text>`;
}

export function line(x1, y1, x2, y2, color = "#30363D") {
  return `
<line
x1="${x1}"
y1="${y1}"
x2="${x2}"
y2="${y2}"
stroke="${color}"
stroke-width="2"/>`;
}



export function filters() {
    return `
    <defs>


    <style>
    .repo:hover{
    opacity:0.8;
    cursor:pointer;
    }
    </style>

        <filter id="shadow">
            <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="12"
                flood-opacity="0.25"/>
        </filter>

        <linearGradient id="titleGradient">
            <stop offset="0%" stop-color="#58A6FF"/>
            <stop offset="100%" stop-color="#BC8CFF"/>
        </linearGradient>

        <linearGradient id="graphGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">

            <stop
                offset="0%"
                stop-color="#39D353"
                stop-opacity="0.35"/>

            <stop
                offset="100%"
                stop-color="#39D353"
                stop-opacity="0"/>

        </linearGradient>

    </defs>
    `;
}


export function wrappedText(
    x,
    y,
    content,
    maxChars = 28,
    lineHeight = 24,
    size = 18,
    color = "#F0F6FC",
    weight = "normal"
) {

    if (!content) content = "";

    const words = content.split(" ");

    let lines = [];
    let line = "";

    words.forEach(word => {

        if ((line + word).length > maxChars) {
            lines.push(line.trim());
            line = word + " ";
        } else {
            line += word + " ";
        }

    });

    if (line.trim())
        lines.push(line.trim());

    const tspans = lines.map((text, index) => `
<tspan
x="${x}"
dy="${index === 0 ? 0 : lineHeight}">
${text}
</tspan>`).join("");

    return `
<text
x="${x}"
y="${y}"
font-size="${size}"
fill="${color}"
font-family="Inter,Segoe UI,Arial"
font-weight="${weight}">
${tspans}
</text>
`;
}