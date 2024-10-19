export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);
  if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi > 24.9) {
    return "Overweight";
  } else {
    return "Underweight";
  }
};
