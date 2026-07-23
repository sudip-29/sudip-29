import { card, accent } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";
import {
    star,
    repo,
    users,
    user,
    fork,
    fire
} from "./icons.js";

export function statCard(
    x,
    y,
    title,
    value,
    icon,
    color
) {

return `

${card(x,y,330,170)}

${accent(x,y,170,color)}

${
    icon === "star" ? star(x + 35, y + 45, color) :
    icon === "repo" ? repo(x + 35, y + 45, color) :
    icon === "users" ? users(x + 35, y + 45, color) :
    icon === "user" ? user(x + 35, y + 45, color) :
    icon === "fork" ? fork(x + 35, y + 45, color) :
    icon === "fire" ? fire(x + 35, y + 45, color) :
    ""
}

${text(x+90,y+52,title,22,colors.gray)}

${text(x+35,y+125,value,48,color,"bold")}

<rect
x="${x+35}"
y="${y+145}"
width="250"
height="8"
rx="4"
fill="#21262D"/>

<rect
x="${x+35}"
y="${y+145}"
width="0"
height="8"
rx="4"
fill="${color}">

<animate
attributeName="width"
from="0"
to="180"
dur="1.2s"
fill="freeze"/>

</rect>

`;

}