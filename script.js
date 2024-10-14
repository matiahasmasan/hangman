import { data } from "./data.js";
import { dictionar } from "./dictionar.js";

let tries = 0;
let word = "";
let guess = "";
let alphabet = "IERLAOTNUCSĂMDPGBFȚȘZVHÂÎJXK"; // ordonate dupa frecventa
const rows = data.trim().split("\n"); // newline
const dictionarWords = dictionar
  .trim()
  .split("\n")
  .map((w) => w.toUpperCase()); // capitalize dictionar words

for (let row of rows) {
  let index_alpha = 0; // index alphabet
  const [number, maskedWord, fullWord] = row.split(";"); // split by semi
  word = fullWord;
  guess = maskedWord;

  // filter by length
  let possibleWords = dictionarWords.filter((w) => w.length === word.length);
  possibleWords = possibleWords.filter((w) => {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== "*" && guess[i] !== w[i]) {
        return false; // if revealed letters dont match, filter out
      }
    }
    return true;
  });

  while (word !== guess) {
    console.log(
      `Cuvant ${guess}, litera ${alphabet[index_alpha]} si incercari ${tries}`
    );
    possibleWords = possibleWords.filter((w) => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== "*" && guess[i] !== w[i]) {
          return false; // if revealed letters dont match, filter out
        }
      }
      return true;
    });
    // daca mai am doar o posibila varianta de cuvant, acela este
    if (possibleWords.length === 1) {
      guess = possibleWords[0];
      tries++;
      console.log(`Am ghicit cuvantul: ${guess} din ${tries} incercari!`);
      break;
    }

    // already "in" letters
    if (guess.includes(alphabet[index_alpha])) {
      console.log(`Am deja aceasta litera ${alphabet[index_alpha]}`);
      index_alpha++; // Skip
      continue;
    }

    // update possible words
    possibleWords = possibleWords.filter((w) => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== "*" && guess[i] !== w[i]) {
          return false; // if revealed letters dont match, filter out
        }
      }
      return true;
    });

    // letters frequency in possible words
    let found = false;
    for (let i = 0; i < possibleWords.length; i++) {
      if (possibleWords[i].includes(alphabet[index_alpha])) {
        found = true;
        break;
      }
    }

    if (!found) {
      tries++;
      console.log(`NU e in cuvant ${alphabet[index_alpha]}, creste ${tries}`);
    }

    // Step 6: Try to match letters based on the current alphabet letter
    for (let i = 0; i < word.length; i++) {
      if (guess[i] === "*") {
        if (word[i] === alphabet[index_alpha]) {
          tries++;
          guess =
            guess.slice(0, i) + alphabet[index_alpha] + guess.slice(i + 1);
          console.log(
            `Am adaugat litera: ${alphabet[index_alpha]}, dar creste incercarea ${tries}`
          );
        }
      }
    }

    // next letter
    index_alpha++;
  }
  console.log(`____________________`);
}

document.getElementById("tries").innerHTML = tries; // example output
