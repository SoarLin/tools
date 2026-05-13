import { useState, useMemo } from 'react'
import { ThemeProvider, Box, Flex, Heading, Text, Grid, Container } from 'theme-ui'
import { Calculator, LayoutGrid, Scale, TrendingUp } from 'lucide-react'
import { Card, TagButton } from './components/Common'
import { MortgageCalculator } from './features/MortgageCalculator'
import { DeveloperPenaltyCalculator } from './features/DeveloperPenaltyCalculator'
import { InvestmentCalculator } from './features/InvestmentCalculator'
import { theme } from './theme'
import type { Tool } from './types'

function App() {
  const [activeTag, setActiveTag] = useState<string>('全部')

  const tools: Tool[] = useMemo(() => [
    {
      id: 'mortgage',
      title: '房貸試算',
      tags: ['金融', '計算機'],
      icon: <Calculator size={20} />,
      component: <MortgageCalculator />
    },
    {
      id: 'developer-penalty',
      title: '建商違約金試算',
      tags: ['金融', '法律', '房地產'],
      icon: <Scale size={20} />,
      component: <DeveloperPenaltyCalculator />
    },
    {
      id: 'investment',
      title: '定期定額投資計算',
      tags: ['金融', '投資'],
      icon: <TrendingUp size={20} />,
      component: <InvestmentCalculator />
    }
  ], [])

  const allTags = useMemo(() => {
    const tags = new Set<string>(['全部'])
    tools.forEach(tool => tool.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags)
  }, [tools])

  const filteredTools = useMemo(() => {
    if (activeTag === '全部') return tools
    return tools.filter(tool => tool.tags.includes(activeTag))
  }, [activeTag, tools])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bg: 'background', color: 'text', py: 5 }}>
        <Container sx={{ maxWidth: 1200 }}>
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Heading as="h1" sx={{ fontSize: [5, 6], mb: 2, background: 'linear-gradient(to right, #646cff, #61dafb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Soar's Tools
            </Heading>
            <Text as="p" sx={{ fontSize: 2, opacity: 0.8 }}>一個集合各式實用小工具的 Portfolio</Text>
          </header>

          <Flex as="nav" sx={{ justifyContent: 'center', gap: 2, mb: 5, flexWrap: 'wrap' }}>
            {allTags.map(tag => (
              <TagButton
                key={tag}
                label={tag}
                isActive={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </Flex>

          <Grid gap={4} columns={[1, null, 2, 3]}>
            {filteredTools.map(tool => (
              <Card
                key={tool.id}
                title={tool.title}
                icon={tool.icon}
                tags={tool.tags}
              >
                {tool.component}
              </Card>
            ))}
          </Grid>

          {filteredTools.length === 0 && (
            <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, opacity: 0.3 }}>
              <LayoutGrid size={64} />
              <Text sx={{ mt: 3, fontSize: 3 }}>目前沒有相關工具</Text>
            </Flex>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
