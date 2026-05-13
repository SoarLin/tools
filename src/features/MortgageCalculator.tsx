import React, { useState } from 'react';
import { Box, Label, Input, Button, Text, Grid, Flex } from 'theme-ui';
import { RotateCcw } from 'lucide-react';
import { calculateMortgage } from '../utils/finance';

export const MortgageCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [years, setYears] = useState<string>('30');
  const [rate, setRate] = useState<string>('2.5');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateMortgage(
      parseFloat(amount),
      parseFloat(years),
      parseFloat(rate)
    );
    setMonthlyPayment(result);
  };

  const handleReset = () => {
    setAmount('1000');
    setYears('30');
    setRate('2.5');
    setMonthlyPayment(null);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Grid gap={2}>
        <Box>
          <Label mb={1} sx={{ fontSize: 0, color: 'text', opacity: 0.7 }}>貸款金額</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="例如: 1000"
              step="any"
              required
              sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }}
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, color: 'text', opacity: 0.5 }}>萬元</Text>
          </Box>
        </Box>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, color: 'text', opacity: 0.7 }}>貸款年限</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={years} 
              onChange={(e) => setYears(e.target.value)} 
              placeholder="例如: 30"
              required
              sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }}
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, color: 'text', opacity: 0.5 }}>年</Text>
          </Box>
        </Box>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, color: 'text', opacity: 0.7 }}>貸款利率</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={rate} 
              onChange={(e) => setRate(e.target.value)} 
              placeholder="例如: 2.1"
              step="0.01"
              required
              sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }}
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, color: 'text', opacity: 0.5 }}>%</Text>
          </Box>
        </Box>

        <Flex sx={{ gap: 2, mt: 1 }}>
          <Button type="submit" sx={{ flex: 1, py: 2 }}>計算</Button>
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
      
      {monthlyPayment !== null && (
        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'borderColor', textAlign: 'center' }}>
          <Text sx={{ display: 'block', fontSize: 1, color: 'text', opacity: 0.7, mb: 1 }}>預估每月還款額 (本息)</Text>
          <Text sx={{ fontSize: 5, fontWeight: 'bold', color: 'secondary' }}>
            {monthlyPayment.toLocaleString()} <Text as="span" sx={{ fontSize: 2, fontWeight: 'normal' }}>元</Text>
          </Text>
        </Box>
      )}
    </Box>
  );
};
