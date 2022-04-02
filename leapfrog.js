// // program to count vowel in the given word
// const vowel = (word) => {
//   let count = 0;
//   let vowel = ["a", "e", "i", "o", "u"];
//   for (let i = 0; i < word.length; i++) {
//     if (vowel.includes(word[i])) {
//       count++;
//     }
//   }
//   return count;
// };
// console.log(vowel("hello this is just a sentence hai"));

// // program to find pirate langugage in the given sentence

// const sentence = "this is pirate language";
// const pirate = (sentence) => {
//   let pirateArray = sentence.split(" ");
//   let pirateLang = [];
//   for (let i = 0; i < pirateArray.length; i++) {
//     let firstIndex = pirateArray[i].split("").splice(0, 1);

//     let result = pirateArray[i].unshift().concat(firstIndex.join(""));
//     pirateLang.push(result);
//   }
//   return pirateLang.join(" ");
// };
// console.log(pirate(sentence));
