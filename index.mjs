import fs from "fs/promises";
import _ from "lodash";
const mainPath = "G:/airhost_pms_nextjs";
const dirArr = await fs.readdir(mainPath);
const validArr = dirArr.filter((current) => !_.startsWith(current, "."));
console.log("validArr", validArr);
// get validArr
//stat start
const result = validArr.reduce((acc, current) => {
  acc[current] = {};
  return acc;
}, {});
console.log("result", result);
// async function print(path) {
//   const result = dirArr.reduce(async (acc, current) => {
//     const currentPath = path + "/" + current;
//     if () {
//       const filestat = await fs.stat(currentPath);

//       await Promise.all(
//         files.map(async (file) => {
//           const contents = await fs.readFile(file, "utf8");
//           console.log(contents);
//         })
//       );

//       if (filestat.isFile()) {
//         return acc[current];
//         // if (_.endsWith(current, ".less")) {
//         // }
//       }
//     }
//   }, {});
// }
