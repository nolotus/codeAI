import fs from "fs/promises";
import _ from "lodash";
import { initStat, mainPath } from "./init.mjs";
const dirArr = await fs.readdir(mainPath);
// get validArr
//stat start

const getStatResult = async (path, dirArr, level = 0) => {
  try {
    const StatResult = await dirArr.reduce(async (previousPromise, current) => {
      const acc = await previousPromise;
      const currentPath = path + "/" + current;
      acc.level = level;
      if (!_.startsWith(current, ".") && current !== "node_modules") {
        const filestat = await fs.stat(currentPath);
        if (filestat.isFile() && _.endsWith(current, ".less")) {
          const data = await fs.readFile(currentPath);
          const count = data.toString().split("\n").length - 1;
          acc.max = count > acc.max ? count : acc.max;
          acc.average = (acc.average + count) / 2;
          acc.leaf = [...acc.leaf, `${current} ${count} line`];
          //need refactor
          if (_.endsWith(current, ".less")) {
            acc.currentLess++;
          }
          if (_.endsWith(current, ".js")) {
            acc.js++;
          }
          if (_.endsWith(current, ".sh")) {
            acc.sh++;
          }
          if (_.endsWith(current, ".json")) {
            acc.json++;
          }
          if (_.endsWith(current, ".ts")) {
            acc.ts++;
          }
          if (_.endsWith(current, ".yml")) {
            acc.yml++;
          }
        }
        if (filestat.isDirectory()) {
          const dirArr = await fs.readdir(currentPath);
          const result = await getStatResult(currentPath, dirArr, level + 1);
          acc.childrenLess =
            acc.childrenLess + result.currentLess + result.childrenLess;
          acc.children = [...acc.children, { name: current, ...result }];
        }
        acc.totalLess = acc.currentLess + acc.childrenLess;
      }
      return acc;
    }, Promise.resolve(initStat()));
    return StatResult;
  } catch (error) {}
};

const result = await getStatResult(mainPath, dirArr);

// write stat.json
fs.writeFile("stat.json", JSON.stringify(result, null, 2), (err) => {
  if (err) throw err;
  console.log("文件已被保存");
});

const lessStat = result.children.filter((item) => item.totalLess !== 0);
console.log("lessStat", lessStat);
fs.writeFile("stat.json", JSON.stringify(result, null, 2), (err) => {
  if (err) throw err;
  console.log("文件已被保存");
});
fs.writeFile("lessStat.json", JSON.stringify(lessStat, null, 2), (err) => {
  if (err) throw err;
  console.log("文件已被保存");
});
// console.log("result", result);
