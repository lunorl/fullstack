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
const calculateExercises = (hours: number[], target: number): resultInfo => {
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
  if (average < target - 1 || average > target + 1) {
    rating = 1;
    ratingDescription =
      "you are terrible you did not at all achieve what you needed to";
  } else if (average < target - 0.5 || average > target + 0.5) {
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
