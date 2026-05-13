import React, { useState } from 'react';
import { Box, Label, Input, Button, Text, Grid, Flex, Radio, Select } from 'theme-ui';
import { RotateCcw } from 'lucide-react';
import { calculateBMI, calculateBMR, calculateTDEE } from '../utils/health';

export const HealthCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('172');
  const [weight, setWeight] = useState<string>('67.5');
  
  // 1982年出生，到 2026 年是 44 歲
  const [age, setAge] = useState<string>('44');
  const [activity, setActivity] = useState<string>('1.375'); // 預設輕度活動

  const [result, setResult] = useState<{
    bmi: number;
    bmiStatus: string;
    bmr: number;
    tdee: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    const m = parseFloat(activity);

    const bmiRes = calculateBMI(h, w);
    const bmrRes = calculateBMR(gender, h, w, a);
    const tdeeRes = calculateTDEE(bmrRes, m);

    setResult({
      bmi: bmiRes.value,
      bmiStatus: bmiRes.status,
      bmr: bmrRes,
      tdee: tdeeRes
    });
  };

  const handleReset = () => {
    setGender('male');
    setHeight('172');
    setWeight('67.5');
    setAge('44');
    setActivity('1.375');
    setResult(null);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Grid gap={2}>
        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>性別</Label>
          <Flex sx={{ gap: 3, mb: 1 }}>
            <Label sx={{ alignItems: 'center', fontSize: 0, cursor: 'pointer' }}>
              <Radio name="gender" checked={gender === 'male'} onChange={() => setGender('male')} /> 男
            </Label>
            <Label sx={{ alignItems: 'center', fontSize: 0, cursor: 'pointer' }}>
              <Radio name="gender" checked={gender === 'female'} onChange={() => setGender('female')} /> 女
            </Label>
          </Flex>
        </Box>

        <Grid columns={2} gap={2}>
          <Box>
            <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>身高</Label>
            <Box sx={{ position: 'relative' }}>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }} required />
              <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, opacity: 0.5 }}>cm</Text>
            </Box>
          </Box>
          <Box>
            <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>體重</Label>
            <Box sx={{ position: 'relative' }}>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} sx={{ py: 2, pr: 5, bg: 'muted', borderColor: 'borderColor' }} required />
              <Text sx={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', fontSize: 0, opacity: 0.5 }}>kg</Text>
            </Box>
          </Box>
        </Grid>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>年齡</Label>
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} sx={{ py: 2, bg: 'muted', borderColor: 'borderColor' }} required />
        </Box>

        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>日常活動量</Label>
          <Select value={activity} onChange={(e) => setActivity(e.target.value)} sx={{ py: 2, bg: 'muted', borderColor: 'borderColor', fontSize: 0 }}>
            <option value="1.2">久坐 (辦公室工作、無運動)</option>
            <option value="1.375">輕度 (每週運動 1-3 天)</option>
            <option value="1.55">中度 (每週運動 3-5 天)</option>
            <option value="1.725">高度 (每週運動 6-7 天)</option>
            <option value="1.9">極高 (高強度運動、體力勞動者)</option>
          </Select>
        </Box>

        <Flex sx={{ gap: 2, mt: 1 }}>
          <Button type="submit" sx={{ flex: 1, py: 2 }}>計算數值</Button>
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
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'borderColor' }}>
          <Grid columns={2} gap={3}>
            <Box sx={{ textAlign: 'center', p: 2, bg: 'muted', borderRadius: 8 }}>
              <Text sx={{ display: 'block', fontSize: 0, opacity: 0.7, mb: 1 }}>BMI 指數</Text>
              <Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{result.bmi}</Text>
              <Text sx={{ display: 'block', fontSize: '10px', color: 'primary', fontWeight: 'bold', mt: 1 }}>{result.bmiStatus}</Text>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, bg: 'muted', borderRadius: 8 }}>
              <Text sx={{ display: 'block', fontSize: 0, opacity: 0.7, mb: 1 }}>基礎代謝 (BMR)</Text>
              <Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{result.bmr.toLocaleString()} <Text as="span" sx={{ fontSize: 0, fontWeight: 'normal' }}>kcal</Text></Text>
            </Box>
          </Grid>
          
          <Box sx={{ mt: 3, p: 3, bg: 'primary', borderRadius: 8, textAlign: 'center', color: 'white' }}>
            <Text sx={{ display: 'block', fontSize: 1, opacity: 0.9, mb: 1 }}>每日總消耗熱量 (TDEE)</Text>
            <Text sx={{ fontSize: 5, fontWeight: 'bold' }}>{result.tdee.toLocaleString()} <Text as="span" sx={{ fontSize: 2, fontWeight: 'normal' }}>kcal</Text></Text>
            <Text sx={{ display: 'block', fontSize: 0, mt: 1, opacity: 0.8 }}>維持目前體重所需的每日熱量</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
