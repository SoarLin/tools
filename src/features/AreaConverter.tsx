import React, { useState } from 'react';
import { Box, Label, Input, Text, Grid, Button } from 'theme-ui';
import { RotateCcw } from 'lucide-react';
import { convertFromPing, convertFromSqm, convertFromTatami } from '../utils/converters';

export const AreaConverter: React.FC = () => {
  const [ping, setPing] = useState<string>('1');
  const [sqm, setSqm] = useState<string>('3.31');
  const [tatami, setTatami] = useState<string>('2');
  const [beds, setBeds] = useState<number>(1.2);

  const handlePingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPing(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const results = convertFromPing(num);
      setSqm(results.sqm.toString());
      setTatami(results.tatami.toString());
      setBeds(results.beds);
    }
  };

  const handleSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSqm(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const results = convertFromSqm(num);
      setPing(results.ping.toString());
      setTatami(results.tatami.toString());
      setBeds(results.beds);
    }
  };

  const handleTatamiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTatami(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const results = convertFromTatami(num);
      setPing(results.ping.toString());
      setSqm(results.sqm.toString());
      setBeds(results.beds);
    }
  };

  const handleReset = () => {
    setPing('1');
    setSqm('3.31');
    setTatami('2');
    setBeds(1.2);
  };

  return (
    <Box>
      <Grid columns={2} gap={2} mb={3}>
        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>坪</Label>
          <Input 
            type="number" 
            value={ping} 
            onChange={handlePingChange} 
            sx={{ py: 2, bg: 'muted', borderColor: 'borderColor' }} 
          />
        </Box>
        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>平方公尺 (m²)</Label>
          <Input 
            type="number" 
            value={sqm} 
            onChange={handleSqmChange} 
            sx={{ py: 2, bg: 'muted', borderColor: 'borderColor' }} 
          />
        </Box>
        <Box>
          <Label mb={1} sx={{ fontSize: 0, opacity: 0.7 }}>榻榻米 (疊)</Label>
          <Input 
            type="number" 
            value={tatami} 
            onChange={handleTatamiChange} 
            sx={{ py: 2, bg: 'muted', borderColor: 'borderColor' }} 
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button 
            onClick={handleReset} 
            variant="secondary"
            sx={{ 
              width: '100%', 
              py: 2, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              fontSize: 0
            }}
          >
            <RotateCcw size={14} /> 重置
          </Button>
        </Box>
      </Grid>

      <Box sx={{ p: 3, bg: 'muted', borderRadius: 8, textAlign: 'center', border: '1px dashed', borderColor: 'primary' }}>
        <Text sx={{ display: 'block', fontSize: 0, opacity: 0.7, mb: 1 }}>空間體感參照</Text>
        <Text sx={{ fontSize: 2, fontWeight: 'bold' }}>
          約等於 <Text sx={{ color: 'secondary', fontSize: 4 }}>{beds}</Text> 張標準雙人床
        </Text>
        <Text sx={{ display: 'block', fontSize: '10px', mt: 2, opacity: 0.5 }}>
          * 以台灣規格 152cm x 188cm 為基準計算
        </Text>
      </Box>
    </Box>
  );
};
