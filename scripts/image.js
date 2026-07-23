import fs from "fs";

export function imageToBase64(path) {

    const image = fs.readFileSync(path);

    const ext = path.split(".").pop().toLowerCase();

    const mime =
        ext === "png"
            ? "image/png"
            : "image/jpeg";

    return `data:${mime};base64,${image.toString("base64")}`;
}