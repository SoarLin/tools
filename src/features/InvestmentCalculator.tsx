import React, { useState } from 'react';
import { Box, Label, Input, Button, Text, Grid, Flex, Radio } from 'theme-ui';
import { RotateCcw } from 'lucide-react';
import { calculateInvestment } from '../utils/finance';

export const InvestmentCalculator: React.FC = () => {
  const [paymentMode, setPaymentMode] = useState<'monthly' | 'lumpSum'>('monthly');
  const [amount, setAmount] = useState<string>('3000');
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
        if (totalMonths <= 0) totalMonths = 1;
      }
    }

    if (totalMonths > 0) {
      const calculation = calculateInvestment(
        parseFloat(amount),
        parseFloat(annualReturn),
        totalMonths,
        paymentMode === 'monthly'
      );
      setResult(calculation);
    }
  };

  const handleReset = () => {
    setPaymentMode('monthly');
    setAmount('3000');
    setStartDate(new Date().toISOString().split('T')[0]);
    setDurationMode('years');
    setEndDate(() => {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      return d.toISOString().split('T')[0];
    });
    setYears('3');
    setAnnualReturn('8.5');
    setResult(null);
  };

  return (
    <Box as="form" onSubmit={handleCalculate}>
      <Grid gap={2}>
        {/* 投資方式 */}
        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>投資方式</Label>
          <Flex sx={{ gap: 3, mb: 1 }}>
            <Label sx={{ alignItems: 'center', fontSize: 0, cursor: 'pointer' }}>
              <Radio 
                name="paymentMode" 
                checked={paymentMode === 'monthly'} 
                onChange={() => {
                  setPaymentMode('monthly');
                  if (amount === '100000') setAmount('3000');
                }}
              /> 
              定期定額
            </Label>
            <Label sx={{ alignItems: 'center', fontSize: 0, cursor: 'pointer' }}>
              <Radio 
                name="paymentMode" 
                checked={paymentMode === 'lumpSum'} 
                onChange={() => {
                  setPaymentMode('lumpSum');
                  if (amount === '3000') setAmount('100000');
                }}
              /> 
              單筆投資
            </Label>
          </Flex>
        </Box>

        {/* 投入金額 */}
        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>
            {paymentMode === 'monthly' ? '每月投入金額' : '單筆投入金額'}
          </Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }}
              required
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, color: 'text', opacity: 0.5 }}>元</Text>
          </Box>
        </Box>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>開始日期</Label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ py: 2, bg: 'muted', borderColor: 'borderColor' }}
            required
          />
        </Box>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>投資期間</Label>
          <Flex sx={{ gap: 3, mb: 1 }}>
            <Label sx={{ alignItems: 'center', fontSize: 0, cursor: 'pointer' }}>
              <Radio 
                name="durationMode" 
                checked={durationMode === 'date'} 
                onChange={() => setDurationMode('date')}
              /> 
              截止日
            </Label>
            <Label sx={{ alignItems: 'center', fontSize: 0, cursor: 'pointer' }}>
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
              sx={{ py: 2, bg: 'muted', borderColor: 'borderColor' }}
              required
            />
          ) : (
            <Box sx={{ position: 'relative' }}>
              <Input 
                type="number" 
                value={years} 
                onChange={(e) => setYears(e.target.value)}
                sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }}
                required
              />
              <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, opacity: 0.5 }}>年</Text>
            </Box>
          )}
        </Box>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>預估年化報酬率</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={annualReturn} 
              onChange={(e) => setAnnualReturn(e.target.value)}
              step="0.1"
              sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }}
              required
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, opacity: 0.5 }}>%</Text>
          </Box>
        </Box>

        <Flex sx={{ gap: 2, mt: 1 }}>
          <Button type="submit" sx={{ flex: 1, py: 2 }}>計算報酬</Button>
          <Button 
            type="button" 
            onClick={handleReset} 
            variant="secondary"
            sx={{ 
              px: 3, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RotateCcw size={16} />
          </Button>
        </Flex>
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
