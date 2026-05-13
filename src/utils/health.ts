/**
 * 健康指數計算工具
 */

/**
 * 計算 BMI
 * @param height 身高 (cm)
 * @param weight 體重 (kg)
 */
export const calculateBMI = (height: number, weight: number) => {
  if (height <= 0 || weight <= 0) return { value: 0, status: '未知' };
  
  const h = height / 100;
  const bmi = weight / (h * h);
  const value = parseFloat(bmi.toFixed(1));
  
  let status = '正常';
  if (value < 18.5) status = '過輕';
  else if (value >= 18.5 && value < 24) status = '正常';
  else if (value >= 24 && value < 27) status = '過重';
  else if (value >= 27 && value < 30) status = '輕度肥胖';
  else if (value >= 30 && value < 35) status = '中度肥胖';
  else status = '重度肥胖';
  
  return { value, status };
};

/**
 * 計算 BMR (基礎代謝率) - 使用 Mifflin-St Jeor Equation
 * @param gender 性別
 * @param height 身高 (cm)
 * @param weight 體重 (kg)
 * @param age 年齡
 */
export const calculateBMR = (gender: 'male' | 'female', height: number, weight: number, age: number) => {
  // Male: BMR = 10 * weight + 6.25 * height - 5 * age + 5
  // Female: BMR = 10 * weight + 6.25 * height - 5 * age - 161
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'male') bmr += 5;
  else bmr -= 161;
  
  return Math.round(bmr);
};

/**
 * 計算 TDEE (每日總消耗熱量)
 * @param bmr 基礎代謝率
 * @param activityMultiplier 活動係數
 */
export const calculateTDEE = (bmr: number, activityMultiplier: number) => {
  return Math.round(bmr * activityMultiplier);
};
