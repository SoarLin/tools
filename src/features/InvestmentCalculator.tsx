import React, { useState } from 'react';
import { Box, Label, Input, Button, Text, Grid, Flex, Radio } from 'theme-ui';
import { calculateInvestment } from '../utils/finance';

export const InvestmentCalculator: React.FC = () => {
  const [monthlyAmount, setMonthlyAmount] = useState<string>('3000');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const [durationMode, setDurationMode] = useState<'date' | 'years'>('years');
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  });
  const [years, setYears] = useState<string>('3');
  
  const [annualReturn, setAnnualReturn] = useState<string>('8.5');
  const [result, setResult] = useState<{
    totalInvestment: number;
    expectedValue: number;
    profit: number;
    profitRate: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    let totalMonths = 0;
    if (durationMode === 'years') {
      totalMonths = Math.floor(parseFloat(years) * 12);
    } else {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end > start) {
        totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        // 如果天數也有差異，至少算一個月
        if (totalMonths <= 0) totalMonths = 1;
      }
    }

    if (totalMonths > 0) {
      const calculation = calculateInvestment(
        parseFloat(monthlyAmount),
        parseFloat(annualReturn),
        totalMonths
      );
      setResult(calculation);
    }
  };

  return (
    <Box as="form" onSubmit={handleCalculate}>
      <Grid gap={3}>
        <Box>
          <Label mb={2} sx={{ fontSize: 1, opacity: 0.7 }}>每月投入金額</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={monthlyAmount} 
              onChange={(e) => setMonthlyAmount(e.target.value)}
              sx={{ pr: 5, bg: 'muted', borderColor: 'borderColor' }}
              required
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 1, opacity: 0.5 }}>元</Text>
          </Box>
        </Box>

        <Box>
          <Label mb={2} sx={{ fontSize: 1, opacity: 0.7 }}>開始日期</Label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ bg: 'muted', borderColor: 'borderColor' }}
            required
          />
        </Box>

        <Box>
          <Label mb={2} sx={{ fontSize: 1, opacity: 0.7 }}>投資期間</Label>
          <Flex sx={{ gap: 3, mb: 2 }}>
            <Label sx={{ alignItems: 'center', fontSize: 1, cursor: 'pointer' }}>
              <Radio 
                name="durationMode" 
                checked={durationMode === 'date'} 
                onChange={() => setDurationMode('date')}
              /> 
              指定截止日
            </Label>
            <Label sx={{ alignItems: 'center', fontSize: 1, cursor: 'pointer' }}>
              <Radio 
                name="durationMode" 
                checked={durationMode === 'years'} 
                onChange={() => setDurationMode('years')}
              /> 
              維持 N 年
            </Label>
          </Flex>
          
          {durationMode === 'date' ? (
            <Input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ bg: 'muted', borderColor: 'borderColor' }}
              required
            />
          ) : (
            <Box sx={{ position: 'relative' }}>
              <Input 
                type="number" 
                value={years} 
                onChange={(e) => setYears(e.target.value)}
                sx={{ pr: 5, bg: 'muted', borderColor: 'borderColor' }}
                required
              />
              <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 1, opacity: 0.5 }}>年</Text>
            </Box>
          )}
        </Box>

        <Box>
          <Label mb={2} sx={{ fontSize: 1, opacity: 0.7 }}>預估年化報酬率 (0050平均約 8.5%)</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={annualReturn} 
              onChange={(e) => setAnnualReturn(e.target.value)}
              step="0.1"
              sx={{ pr: 5, bg: 'muted', borderColor: 'borderColor' }}
              required
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 1, opacity: 0.5 }}>%</Text>
          </Box>
        </Box>

        <Button type="submit" sx={{ mt: 2 }}>計算報酬</Button>
      </Grid>

      {result && (
        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'borderColor' }}>
          <Grid columns={2} gap={3}>
            <Box>
              <Text sx={{ display: 'block', fontSize: 0, opacity: 0.7, mb: 1 }}>累積投入金額</Text>
              <Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{result.totalInvestment.toLocaleString()} <Text as="span" sx={{ fontSize: 1, fontWeight: 'normal' }}>元</Text></Text>
            </Box>
            <Box>
              <Text sx={{ display: 'block', fontSize: 0, opacity: 0.7, mb: 1 }}>獲利報酬率</Text>
              <Text sx={{ fontSize: 3, fontWeight: 'bold', color: 'secondary' }}>{result.profitRate}%</Text>
            </Box>
          </Grid>
          
          <Box sx={{ mt: 3, p: 3, bg: 'muted', borderRadius: 8, textAlign: 'center' }}>
            <Text sx={{ display: 'block', fontSize: 1, opacity: 0.7, mb: 1 }}>預期總價值 (含本金)</Text>
            <Text sx={{ fontSize: 5, fontWeight: 'bold', color: 'primary' }}>
              {result.expectedValue.toLocaleString()} <Text as="span" sx={{ fontSize: 2, fontWeight: 'normal' }}>元</Text>
            </Text>
            <Text sx={{ display: 'block', fontSize: 1, mt: 2, color: 'text', opacity: 0.6 }}>
              獲利金額: {result.profit.toLocaleString()} 元
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
