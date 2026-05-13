import type { Theme } from 'theme-ui'
import { system } from '@theme-ui/presets'

export const theme: Theme = {
  ...system,
  colors: {
    ...system.colors,
    primary: '#646cff',
    secondary: '#61dafb',
    background: '#242424',
    text: 'rgba(255, 255, 255, 0.87)',
    muted: '#1a1a1a',
    cardBg: '#1f1f1f',
    borderColor: '#333',
    modes: {
      light: {
        text: '#213547',
        background: '#ffffff',
        primary: '#646cff',
        muted: '#f9f9f9',
        cardBg: '#f3f4f6',
        borderColor: '#e5e7eb',
      },
    },
  },
  fonts: {
    body: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  styles: {
    ...system.styles,
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 16,
      bg: 'cardBg',
      border: '1px solid',
      borderColor: 'borderColor',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    },
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
      cursor: 'pointer',
      '&:hover': {
        bg: '#535bf2',
      },
    },
    tag: {
      borderRadius: 9999,
      bg: 'muted',
      color: 'text',
      border: '1px solid transparent',
      cursor: 'pointer',
      px: 3,
      py: 2,
      transition: 'all 0.25s',
      '&:hover': {
        borderColor: 'primary',
      },
      '&.active': {
        bg: 'primary',
        color: 'white',
      },
    },
  },
}
