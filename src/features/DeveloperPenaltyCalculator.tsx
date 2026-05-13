import React, { useState } from 'react';
import { Box, Label, Input, Button, Text, Grid } from 'theme-ui';
import { calculatePenalty } from '../utils/finance';

export const DeveloperPenaltyCalculator: React.FC = () => {
  const [estimatedDate, setEstimatedDate] = useState<string>('2023-10-20');
  const [actualDate, setActualDate] = useState<string>('2026-02-06');
  const [paidAmount, setPaidAmount] = useState<string>('199');
  const [result, setResult] = useState<{ penalty: number; days: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculation = calculatePenalty(
      parseFloat(paidAmount),
      estimatedDate,
      actualDate
    );
    setResult(calculation);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Grid gap={3}>
        <Box>
          <Label mb={2} sx={{ fontSize: 1, color: 'text', opacity: 0.7 }}>預計使照申請日期</Label>
          <Input 
            type="date" 
            value={estimatedDate} 
            onChange={(e) => setEstimatedDate(e.target.value)} 
            required
            sx={{ bg: 'muted', borderColor: 'borderColor' }}
          />
        </Box>

        <Box>
          <Label mb={2} sx={{ fontSize: 1, color: 'text', opacity: 0.7 }}>實際申請到使用執照日期</Label>
          <Input 
            type="date" 
            value={actualDate} 
            onChange={(e) => setActualDate(e.target.value)} 
            required
            sx={{ bg: 'muted', borderColor: 'borderColor' }}
          />
        </Box>

        <Box>
          <Label mb={2} sx={{ fontSize: 1, color: 'text', opacity: 0.7 }}>已繳房地價金</Label>
          <Box sx={{ position: 'relative' }}>
            <Input 
              type="number" 
              value={paidAmount} 
              onChange={(e) => setPaidAmount(e.target.value)} 
              placeholder="例如: 199"
              step="any"
              required
              sx={{ pr: 5, bg: 'muted', borderColor: 'borderColor' }}
            />
            <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 1, color: 'text', opacity: 0.5 }}>萬元</Text>
          </Box>
        </Box>

        <Button type="submit" sx={{ mt: 2 }}>計算</Button>
      </Grid>

      {result !== null && (
        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'borderColor', textAlign: 'center' }}>
          <Box mb={3}>
            <Text sx={{ display: 'block', fontSize: 1, color: 'text', opacity: 0.7, mb: 1 }}>延遲天數</Text>
            <Text sx={{ fontSize: 4, fontWeight: 'bold', color: 'text' }}>
              {result.days} <Text as="span" sx={{ fontSize: 1, fontWeight: 'normal' }}>天</Text>
            </Text>
          </Box>
          
          <Box>
            <Text sx={{ display: 'block', fontSize: 1, color: 'text', opacity: 0.7, mb: 1 }}>違約金金額 (萬分之五/日)</Text>
            <Text sx={{ fontSize: 5, fontWeight: 'bold', color: 'secondary' }}>
              {result.penalty.toLocaleString()} <Text as="span" sx={{ fontSize: 2, fontWeight: 'normal' }}>元</Text>
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
