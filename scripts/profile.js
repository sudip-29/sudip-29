import { card, accent } from "./components.js";
import { text, wrappedText } from "./utils.js"; 
import { colors } from "./colors.js";
import { imageToBase64 } from "./image.js";

export function profile(user) {

const bio = user.bio ?? "Code Create Inspire Repeat";
const location = user.location ? user.location : "Unknown";
const avatar = imageToBase64("assets/my-photo.jpg");

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
    href="${avatar}"
    x="125"
    y="155"
    width="210"
    height="210"
    preserveAspectRatio="xMidYMid slice"
    clip-path="url(#avatarClip)"/>


<circle
    cx="230"
    cy="260"
    r="108"
    fill="none"
    stroke="${colors.blue}"
    stroke-width="3"
    stroke-dasharray="8 12">

    <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 230 260"
        to="360 230 260"
        dur="20s"
        repeatCount="indefinite"/>
</circle>

<circle
    cx="230"
    cy="260"
    r="114"
    fill="none"
    stroke="#BC8CFF"
    stroke-width="2"
    stroke-dasharray="4 18"
    opacity="0.7">

    <animateTransform
        attributeName="transform"
        type="rotate"
        from="360 230 260"
        to="0 230 260"
        dur="30s"
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
${text(190,910,"https://sudip-29.github.io/BrowseMe/",12,colors.white)}

${text(85,975,"Company",19,colors.gray)}
${text(190,975,user.company || "Not Provided",19)}

${text(85,1040,"Email",19,colors.gray)}
${text(190,1040,"hey.thisissudip@gmail.com",15,colors.white)}

`;
}