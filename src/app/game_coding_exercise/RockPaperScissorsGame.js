const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
const draw = 'draw';

const validArgs = [rock, paper, scissors];

// Return the wining argument
// If argumnents are the same, return 'draw'
function play(arg1, arg2) {
  let result;

  // return undefined for invalid argumnents
  if (!checkForValidArgs(arg1, arg2)) {
    return undefined;
  }

  // check for arguments equality and return draw
  if (checkForEqualArgs(arg1, arg2)) {
    return draw;
  }

  // paper covers rock
  if (checkForPaperWins(arg1, arg2)) {
    return paper;
  }

  // rock breaks scissors
  if (checkForRockWins(arg1, arg2)) {
    return rock;
  }

  // scissors cuts paper
  if (checkForScissorsWins(arg1, arg2)) {
    return scissors;
  }

  return result;
}

const checkForEqualArgs = (arg1, arg2) => {
  if (arg1 === arg2) {
    return draw;
  }
};

const checkForPaperWins = (arg1, arg2) => {
  const therIsPaper = [arg1, arg2].includes(paper);
  const therIsRock = [arg1, arg2].includes(rock);
  if (therIsPaper && therIsRock) {
    return true;
  }
};

const checkForRockWins = (arg1, arg2) => {
  const therIsRock = [arg1, arg2].includes(rock);
  const therIsScissors = [arg1, arg2].includes(scissors);
  if (therIsRock && therIsScissors) {
    return true;
  }
};

const checkForScissorsWins = (arg1, arg2) => {
  const therIsScissors = [arg1, arg2].includes(scissors);
  const therIsPaper = [arg1, arg2].includes(paper);
  if (therIsScissors && therIsPaper) {
    return true;
  }
};

const checkForValidArgs = (arg1, arg2) => {
  if (validArgs.includes(arg1) && validArgs.includes(arg2)) {
    return true;
  }
};

console.log('Rock Draw Rock:', play(rock, rock));
console.log('Paper Draw Paper:', play(paper, paper));
console.log('Scissors Draw Scissors:', play(scissors, scissors));
console.log('Paper Covers Rock:', play(paper, rock));
console.log('Rock Breaks Scissors:', play(rock, scissors));
console.log('Scissors Cuts Paper:', play(scissors, paper));
console.log('Undefined For Invalid Argumnents:', play('asd', 'asd'));
