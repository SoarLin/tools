/**
 * 面積換算工具
 */

// 1 坪 = 3.305785 平方公尺
export const PING_TO_SQM = 3.305785;
// 1 疊 (榻榻米) = 0.5 坪
export const TATAMI_TO_PING = 0.5;
// 標準雙人床面積 (150cm x 188cm = 2.82 m²)
export const DOUBLE_BED_SQM = 2.82;

export const convertFromPing = (ping: number) => {
  const sqm = ping * PING_TO_SQM;
  return {
    ping,
    sqm: parseFloat(sqm.toFixed(2)),
    tatami: parseFloat((ping / TATAMI_TO_PING).toFixed(1)),
    beds: parseFloat((sqm / DOUBLE_BED_SQM).toFixed(1))
  };
};

export const convertFromSqm = (sqm: number) => {
  const ping = sqm / PING_TO_SQM;
  return {
    ping: parseFloat(ping.toFixed(2)),
    sqm,
    tatami: parseFloat((ping / TATAMI_TO_PING).toFixed(1)),
    beds: parseFloat((sqm / DOUBLE_BED_SQM).toFixed(1))
  };
};

export const convertFromTatami = (tatami: number) => {
  const ping = tatami * TATAMI_TO_PING;
  const sqm = ping * PING_TO_SQM;
  return {
    ping: parseFloat(ping.toFixed(2)),
    sqm: parseFloat(sqm.toFixed(2)),
    tatami,
    beds: parseFloat((sqm / DOUBLE_BED_SQM).toFixed(1))
  };
};
