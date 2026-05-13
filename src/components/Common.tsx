import React from 'react';
import { Box, Flex, Button, Text } from 'theme-ui';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  tags: string[];
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, tags, children }) => {
  return (
    <Box variant="cards.primary">
      <Flex sx={{ alignItems: 'center', gap: 2, fontSize: 3, fontWeight: 'bold', mb: 3, color: 'text' }}>
        {icon}
        <Text>{title}</Text>
      </Flex>
      <Flex sx={{ gap: 2, mb: 4 }}>
        {tags.map(tag => (
          <Box
            key={tag}
            sx={{
              fontSize: 0,
              px: 2,
              py: 1,
              borderRadius: 4,
              bg: 'borderColor',
              color: 'text',
              opacity: 0.8
            }}
          >
            {tag}
          </Box>
        ))}
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};

interface TagButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TagButton: React.FC<TagButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <Button
      variant="tag"
      className={isActive ? 'active' : ''}
      onClick={onClick}
      sx={{
        backgroundColor: isActive ? 'primary' : 'muted',
        color: isActive ? 'white' : 'text',
      }}
    >
      {label}
    </Button>
  );
};
