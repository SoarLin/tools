import React from 'react';
import { Box, Flex, Text, Badge, IconButton } from 'theme-ui';
import { PackageCheck, Wallet, ExternalLink } from 'lucide-react';
import type { FurnitureItem, PurchaseStatus } from '../types';

interface FurnitureCardProps {
  item: FurnitureItem;
}

const getStatusLabel = (status: PurchaseStatus) => {
  switch (status) {
    case 'purchased': return '已購買';
    case 'ordered': return '已下訂';
    case 'planned': return '還沒買';
    default: return '';
  }
};

export const FurnitureCard: React.FC<FurnitureCardProps> = ({ item }) => {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderRadius: 16,
        bg: 'cardBg',
        border: '1px solid',
        borderColor: 'borderColor',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'relative',
        textAlign: 'left',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      {/* Header: Tags & Link Icon */}
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
        {/* Tags */}
        <Flex sx={{ gap: 1, flexWrap: 'wrap', flex: 1 }}>
          {item.tags.map(tag => (
            <Badge 
              key={tag} 
              sx={{ 
                bg: 'rgba(100, 108, 255, 0.1)', 
                color: 'primary', 
                fontSize: '9px', 
                px: 2, 
                py: 0, 
                height: '18px', 
                display: 'inline-flex', 
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'rgba(100, 108, 255, 0.3)'
              }}
            >
              {tag}
            </Badge>
          ))}        </Flex>

        {/* Link Icon */}
        {item.url && (
          <Box sx={{ flexShrink: 0 }}>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              <IconButton 
                sx={{ 
                  cursor: 'pointer', 
                  p: 0, 
                  width: '18px',
                  height: '18px',
                  color: 'text', 
                  opacity: 0.3, 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': { opacity: 1, color: 'primary' } 
                }}
              >
                <ExternalLink size={14} />
              </IconButton>
            </a>
          </Box>
        )}
      </Flex>

      <Box sx={{ mb: 2, textAlign: 'left' }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Text sx={{ fontSize: '10px', lineHeight: '16px', opacity: 0.5, display: 'block', fontWeight: 'bold', textAlign: 'left' }}>品項名稱</Text>
            <Text sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: 'bold', textAlign: 'left', display: 'block' }}>{item.name}</Text>
          </Box>
          <Badge sx={{
            bg: item.status === 'purchased' ? 'green' : item.status === 'ordered' ? 'primary' : 'muted',
            color: item.status === 'planned' ? 'text' : 'white',
            fontSize: '9px',
            height: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0,
            border: item.status === 'planned' ? '1px solid' : 'none',
            borderColor: 'borderColor'
          }}>
            {item.status === 'purchased' && <PackageCheck size={10} style={{ marginRight: '2px' }} />}
            {item.status === 'ordered' && <Wallet size={10} style={{ marginRight: '2px' }} />}
            {getStatusLabel(item.status)}
          </Badge>
        </Flex>
      </Box>

      <Box sx={{ mb: 2, textAlign: 'left' }}>
        <Text sx={{ fontSize: '10px', lineHeight: '16px', opacity: 0.5, display: 'block', fontWeight: 'bold', textAlign: 'left' }}>產品型號</Text>
        <Text sx={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left', display: 'block' }}>{item.productName || '----'}</Text>
      </Box>

      <Box sx={{ mb: 2, textAlign: 'left' }}>
        <Text sx={{ fontSize: '10px', lineHeight: '16px', opacity: 0.5, display: 'block', fontWeight: 'bold', textAlign: 'left' }}>規格尺寸</Text>
        <Text sx={{ fontSize: '14px', lineHeight: '20px', textAlign: 'left', display: 'block', whiteSpace: 'pre-wrap' }}>{item.specs || '----'}</Text>
      </Box>

      <Box sx={{ mb: 2, textAlign: 'left' }}>
        <Text sx={{ fontSize: '10px', lineHeight: '16px', opacity: 0.5, display: 'block', fontWeight: 'bold', textAlign: 'left' }}>價格</Text>
        <Text sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: 'bold', color: 'accent', textAlign: 'left', display: 'block' }}>$ {item.price.toLocaleString()}</Text>
        {item.status === 'ordered' && typeof item.deposit === 'number' && (
          <Box sx={{ mt: 1 }}>
            <Text sx={{ fontSize: '10px', lineHeight: '14px', color: 'primary', fontWeight: 'bold', display: 'block' }}>
              已付訂金: $ {item.deposit.toLocaleString()}
            </Text>
            <Text sx={{ fontSize: '10px', lineHeight: '14px', opacity: 0.6, display: 'block' }}>
              剩餘尾款: $ {(item.price - item.deposit).toLocaleString()}
            </Text>
          </Box>
        )}
      </Box>

      {item.note && (
        <Box sx={{ mb: 1, textAlign: 'left', p: 2, bg: 'cardBg', borderRadius: 8, borderLeft: '3px solid', borderColor: 'secondary' }}>
          <Text sx={{ fontSize: '10px', lineHeight: '16px', opacity: 0.5, display: 'block', mb: 0, fontWeight: 'bold', textAlign: 'left' }}>備註</Text>
          <Text sx={{ fontSize: '13px', lineHeight: '18px', opacity: 0.8, textAlign: 'left', display: 'block', fontStyle: 'italic' }}>{item.note}</Text>
        </Box>
      )}
    </Box>
  );
};
