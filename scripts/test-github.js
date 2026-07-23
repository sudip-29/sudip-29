import { rest } from "./github.js";

async function test() {
  const user = await rest("/users/sudip-29");

  console.log(user.login);
  console.log(user.public_repos);
  console.log(user.followers);
  console.log(user.following);
}

test();