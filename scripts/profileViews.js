import { card } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";

export function profileViews(count){

return `

${card(
1115,
1120,
330,
120
)}

${text(
1280,
1155,
"Profile Views",
18,
colors.white,
"bold",
"middle"
)}

${text(
1280,
1205,
count.toLocaleString(),
34,
colors.blue,
"bold",
"middle"
)}

`;

}