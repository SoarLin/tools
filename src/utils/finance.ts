/**
 * 本息平均攤還法計算公式
 * @param amount 貸款金額 (萬元)
 * @param years 貸款年限 (年)
 * @param annualRate 年利率 (%)
 * @returns 每月還款額 (元)
 */
export const calculateMortgage = (amount: number, years: number, annualRate: number): number => {
  const p = amount * 10000; // 萬元轉元
  const r = annualRate / 100 / 12; // 年利率轉月利率
  const n = years * 12; // 年轉月

  if (p <= 0 || n <= 0) return 0;
  if (r === 0) return Math.round(p / n);

  // 公式: [P * r * (1+r)^n] / [(1+r)^n - 1]
  const x = Math.pow(1 + r, n);
  const monthly = (p * x * r) / (x - 1);
  return Math.round(monthly);
};

/**
 * 建商延遲交屋違約金計算 (萬分之五/每日)
 * @param paidAmount 已繳價金 (萬元)
 * @param estimatedDate 預計日期
 * @param actualDate 實際日期
 * @returns 違約金金額 (元) 和 延遲天數
 */
export const calculatePenalty = (paidAmount: number, estimatedDate: string, actualDate: string) => {
  const start = new Date(estimatedDate);
  const end = new Date(actualDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return { penalty: 0, days: 0 };
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) return { penalty: 0, days: 0 };
  
  // 違約金 = 已繳價金 * 萬分之五 * 延遲天數
  const p = paidAmount * 10000;
  const penalty = p * 0.0005 * diffDays;
  
  return {
    penalty: Math.round(penalty),
    days: diffDays
  };
};
