import { colors } from "./colors.js";

export function card(x, y, w, h) {
  return `
<g>

<rect
x="${x}"
y="${y}"
rx="24"
ry="24"
width="${w}"
height="${h}"
fill="${colors.card}"
stroke="${colors.border}"
stroke-width="1.5"
filter="url(#shadow)"/>

</g>
`;
}

export function accent(x, y, h, color) {
  return `
<rect
x="${x}"
y="${y}"
width="5"
height="${h}"
rx="3"
fill="#161B22"
filter="url(#shadow)"/>
`;
}