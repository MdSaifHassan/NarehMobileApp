var dateFormat = require("dateformat");

// const v1 = new Date("Aug 15 2020");
// const v = new Date(20200808);
// console.log(v);

// // console.log(
// //   new Date("Aug 15 2020").getTime() >= new Date("Aug 15 2020").getTime()
// // );

// // if (v1 >= v) {
// //   console.log("true");
// // } else {
// //   console.log("false");
// // }

// const a = "2020-08-22 03:26:26";

// console.log(dateFormat("2020-08-21 03:26:26", "dd mmm yyyy"));
// console.log(a.slice(0, 11).split(" ").reverse().join("-"));

const obj = {
  cart: false,
  claim: false,
  contactus: false,
  faq: true,
  members: true,
  pointsearn: false,
  profile: false,
  redemption: false,
  refer: true,
  returns: false,
  rewards: false,
  sales: true,
  salesorder: true,
};

// const newObj = Object.entries(obj);
// console.log(newObj);

const Array = new Map();
let data = [];
const newArray = Array.set("permissions", obj);
for (let [key, val] of newArray) {
  data.push(val);
}
console.log(Object.entries(data));
// const anotherArr = Object.entries(newArray.get("permissions"));
// console.log(anotherArr);
// console.log(newArray);
// let newArr = [];
// let rowArr = [];
// Object.keys(obj).map((data, index) => {
//   if (obj[data]) {
//     rowArr.push(data);
//     rowArr.push(obj[data]);
//     newArr.push(rowArr);
//     rowArr = [];
//   }
// });

// console.log("Here is index", newArr);

// const filteredArray = Array.filter((each) => each[1] === true);
// const mappedArray = filteredArray.map((each) => each[0]);
// const newArray = mappedArray.filter(
//   (each) => each !== "profile" && each !== "cart"
// );
// //   .filter((each) => each[1] === true)
// //   .map((each) => each[0])
// //   .filter((each) => each !== "profile" && each !== "cart");
// console.log(newArray);
//console.log(Array);

// const drawer = filteredArray.map((each) => each[0]);
// console.log(drawer);
// let i = 0;
// let temp = [];
// while (i < filteredArray.length) {
//   if (filteredArray[i] === "claim") {
//     temp.push({
//       label: "Claim Points",
//       route: "claims",
//       iconImage: "img",
//     });
//   }
//   if (filteredArray[i] === "refer") {
//     temp.push({
//       label: "Refer Retailer",
//       route: "refer",
//       iconImage: "img",
//     });
//   }
//   if (filteredArray[i] === "returns") {
//     temp.push({
//       label: "Return Management",
//       route: "Return",
//       iconImage: "img",
//     });
//   }
//   i++;
// }
//console.log(temp);
