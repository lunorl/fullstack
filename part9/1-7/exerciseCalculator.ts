type ratingType = 1 | 2 | 3;
interface resultInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: ratingType;
  ratingDescription: string;
  target: number;
  average: number;
}
type oneTwo = {
  nume1: number;
  numArray: number[];
};
const extractArgs2 = (): oneTwo => {
  if (process.argv.length < 4) throw new Error("Not enough args");
  const nume1 = Number(process.argv[2]);
  let numArray: number[];
  numArray = [];
  let i = process.argv.length - 1;
  while (i > 2) {
    const n = process.argv[i];
    if (isNaN(Number(n))) {
      throw new Error("ok you literally just did not put a number");
    }
    numArray = numArray.concat(Number(n));
    i--;
  }
  if (!isNaN(nume1)) {
    return { nume1, numArray };
  }
};
export const calculateExercises = (target: number, hours: number[]): resultInfo => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour !== 0).length;
  let average = 0;
  hours.forEach((s) => (average += s));
  average /= hours.length;
  let success: boolean;
  if (average >= target) {
    success = true;
  } else {
    success = false;
  }
  let rating: ratingType;
  let ratingDescription: string;
  if (average < target - 0.4 || average > target + 0.4) {
    rating = 1;
    ratingDescription =
      "you are terrible you did not at all achieve what you needed to";
  } else if (average < target - 0.2 || average > target + 0.2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "ok thats fine you area fine you did fine";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
if (require.main === module) {
const { nume1, numArray } = extractArgs2();
console.log(calculateExercises(nume1, numArray));
}