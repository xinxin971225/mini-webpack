import { foo } from "./foo.js";
import user from "./user.json";

console.log(user);
foo();
export function main() {
  console.log("main");
}
main();
