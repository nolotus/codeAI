import fs from "fs/promises";
import _ from "lodash";
const mainPath = "G:/airhost_pms_nextjs";
const dirArr = await fs.readdir(mainPath);
// get validArr
//stat start

const getStatResult = async (path, dirArr) => {
  try {
    const StatResult = await dirArr.reduce(async (previousPromise, current) => {
      const acc = await previousPromise;
      const currentPath = path + "/" + current;
      if (!_.startsWith(current, ".")) {
        const filestat = await fs.stat(currentPath);
        console.log("filestat", current, filestat);
        acc[current] = filestat;
        return acc;
      }
      return acc;
    }, Promise.resolve({ less: 0 }));
    console.log("StatResult", StatResult);
    return StatResult;
  } catch (error) {}
};

const result = await getStatResult(mainPath, dirArr);
fs.writeFile("stat.json", JSON.stringify(result, null, 2), (err) => {
  if (err) throw err;
  console.log("文件已被保存");
});
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
