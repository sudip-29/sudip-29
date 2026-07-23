import { card, accent } from "./components.js";
import { text, wrappedText } from "./utils.js"; 
import { colors } from "./colors.js";

export function profile(user) {

const bio = user.bio ?? "Code Create Inspire Repeat";
const location = user.location ? user.location : "Unknown";

return `

${card(40,120,360,1155)}

${accent(40,120,820,colors.blue)}

<!-- Avatar Background -->

<circle
cx="230"
cy="260"
r="105"
fill="#0D1117"
stroke="${colors.blue}"
stroke-width="5"/>

<!-- Avatar -->

<image
<image
    href="https://raw.githubusercontent.com/sudip-29/sudip-29/main/assets/my-photo.jpg"
    x="125"
    y="155"
    width="210"
    height="210"
    clip-path="circle(105px at 105px 105px)"/>
x="125"
y="155"
width="210"
height="210"
clip-path="circle(105px at 105px 105px)"/>

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

${text(85,440,user.name ?? user.login,40,colors.white,"bold")}

<!-- Username -->

${text(85,480,"@"+user.login,22,colors.gray)}

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
85,
540,
bio,
32,
26,
19,
colors.white
)}

<!-- Divider -->

<line
x1="75"
y1="600"
x2="345"
y2="600"
stroke="${colors.border}"/>

<!-- Information -->

${text(90,650,"Joined",18,colors.gray)}
${text(190,650,new Date(user.created_at).toLocaleDateString(),18)}

${text(90,715,"Followers",18,colors.gray)}
${text(190,715,user.followers.toString(),18)}

${text(90,780,"Following",18,colors.gray)}
${text(190,780,user.following.toString(),18)}

${text(90,845,"Location",18,colors.gray)}
${text(190,845,location,18)}

${text(90,910,"Website",18,colors.gray)}
<a href="https://github.com/sudip-29" target="_blank">
    <text
        x="190"
        y="905"
        font-size="18"
        fill="${colors.blue}"
        style="cursor:pointer;text-decoration:underline;">
        sudip-29
    </text>
</a>

${text(85,975,"Company",19,colors.gray)}
${text(190,975,user.company || "Not Provided",19)}

${text(85,1040,"Email",19,colors.gray)}
<a href="mailto:hey.thisissudip@email.com">
    <text
        x="190"
        y="1040"
        font-size="18"
        fill="${colors.blue}"
        style="cursor:pointer;text-decoration:underline;">
        Mail Me
    </text>
</a>

`;
}