import { card, accent } from "./components.js";
import { text, wrappedText } from "./utils.js"; 
import { colors } from "./colors.js";

export function profile(user) {

const bio = user.bio ?? "No bio available";
const website = user.blog ? user.blog : "Not Provided";
const location = user.location ? user.location : "Unknown";

return `

${card(40,120,360,760)}

${accent(40,120,760,colors.blue)}

<!-- Avatar Background -->

<circle
cx="220"
cy="250"
r="92"
fill="#0D1117"
stroke="${colors.blue}"
stroke-width="5"/>

<!-- Avatar -->

<image
href="${user.avatar_url}"
x="130"
y="160"
width="180"
height="180"
clip-path="circle(90px at 90px 90px)"/>

<!-- Rotating Ring -->

<circle
cx="220"
cy="250"
r="100"
fill="none"
stroke="${colors.blue}"
stroke-width="3"
stroke-dasharray="8 12">

<animateTransform
attributeName="transform"
attributeType="XML"
type="rotate"
from="0 220 250"
to="360 220 250"
dur="20s"
repeatCount="indefinite"/>

</circle>

<!-- Name -->

${text(90,405,user.name ?? user.login,34,colors.white,"bold")}

<!-- Username -->

${text(90,440,"@"+user.login,20,colors.gray)}

<!-- Verified Badge -->

<circle
cx="315"
cy="397"
r="10"
fill="${colors.blue}"/>

<text
x="311"
y="402"
font-size="12"
fill="white"
font-weight="bold">✓</text>

<!-- Bio -->

${wrappedText(
90,
490,
bio,
28,
24,
18,
colors.white
)}

<!-- Divider -->

<line
x1="80"
y1="525"
x2="340"
y2="525"
stroke="${colors.border}"/>

<!-- Information -->

${text(90,570,"Joined",18,colors.gray)}
${text(190,570,new Date(user.created_at).toLocaleDateString(),18)}

${text(90,620,"Followers",18,colors.gray)}
${text(190,620,user.followers.toString(),18)}

${text(90,670,"Following",18,colors.gray)}
${text(190,670,user.following.toString(),18)}

${text(90,720,"Location",18,colors.gray)}
${text(190,720,location,18)}

${text(90,770,"Website",18,colors.gray)}
${text(190,770,website,18,colors.blue)}

`;
}