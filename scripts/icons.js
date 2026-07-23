export function star(x, y, color) {
return `
<polygon
points="
${x},${y-10}
${x+3},${y-3}
${x+11},${y-3}
${x+5},${y+2}
${x+8},${y+10}
${x},${y+5}
${x-8},${y+10}
${x-5},${y+2}
${x-11},${y-3}
${x-3},${y-3}"
fill="${color}"/>
`;
}

export function circle(x,y,r,color){
return `
<circle
cx="${x}"
cy="${y}"
r="${r}"
fill="${color}"/>
`;
}


export function repo(x, y, color) {
return `
<rect
x="${x-8}"
y="${y-10}"
width="16"
height="20"
rx="2"
fill="none"
stroke="${color}"
stroke-width="2"/>

<line
x1="${x-5}"
y1="${y-4}"
x2="${x+5}"
y2="${y-4}"
stroke="${color}"
stroke-width="2"/>

<line
x1="${x-5}"
y1="${y+2}"
x2="${x+5}"
y2="${y+2}"
stroke="${color}"
stroke-width="2"/>
`;
}


export function users(x, y, color) {
return `
<circle
cx="${x}"
cy="${y-5}"
r="4"
fill="${color}"/>

<path
d="
M ${x-8} ${y+8}
Q ${x} ${y}
${x+8} ${y+8}"
fill="none"
stroke="${color}"
stroke-width="2"/>
`;
}

export function user(x, y, color) {
return `
<circle
cx="${x}"
cy="${y-5}"
r="4"
fill="${color}"/>

<path
d="
M ${x-7} ${y+8}
Q ${x} ${y}
${x+7} ${y+8}"
fill="none"
stroke="${color}"
stroke-width="2"/>
`;
}

export function fork(x, y, color) {
return `
<circle cx="${x}" cy="${y-10}" r="3" fill="${color}"/>
<circle cx="${x-8}" cy="${y+8}" r="3" fill="${color}"/>
<circle cx="${x+8}" cy="${y+8}" r="3" fill="${color}"/>

<line
x1="${x}"
y1="${y-7}"
x2="${x}"
y2="${y+2}"
stroke="${color}"
stroke-width="2"/>

<line
x1="${x}"
y1="${y+2}"
x2="${x-8}"
y2="${y+5}"
stroke="${color}"
stroke-width="2"/>

<line
x1="${x}"
y1="${y+2}"
x2="${x+8}"
y2="${y+5}"
stroke="${color}"
stroke-width="2"/>
`;
}


export function fire(x, y, color) {
return `
<path
d="
M ${x} ${y-12}
Q ${x+10} ${y}
${x} ${y+12}
Q ${x-10} ${y}
${x} ${y-12}"
fill="${color}"/>
`;
}


export function calendar(x, y, color) {
return `
<rect
x="${x-8}"
y="${y-8}"
width="16"
height="16"
rx="2"
fill="none"
stroke="${color}"
stroke-width="2"/>

<line
x1="${x-8}"
y1="${y-2}"
x2="${x+8}"
y2="${y-2}"
stroke="${color}"
stroke-width="2"/>
`;
}

