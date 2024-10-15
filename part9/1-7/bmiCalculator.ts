type twoNumbers = {
  num1: number
  num2: number
}
const extractArgs = (): twoNumbers => {
  if (process.argv.length > 4) throw new Error('Too many args')
  else if (process.argv.length < 4) throw new Error('Not enough args')
  const num1 = Number(process.argv[2])
  const num2 = Number(process.argv[3])
  if (!isNaN(num1) && !isNaN(num2)) {
    return {num1, num2}
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight/((height/100)^2) 
  if ( bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range'
  }
  return 'abnormal range'
}
const {num1, num2} = extractArgs()
console.log(calculateBmi(num1, num2))