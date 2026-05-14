import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider, Box, Flex, Heading, Text, Container } from 'theme-ui'
import { Calculator, LayoutGrid, Scale, TrendingUp, Activity, Maximize, Package, Home } from 'lucide-react'
import { Card, TagButton } from './components/Common'
import { MortgageCalculator } from './features/MortgageCalculator'
import { DeveloperPenaltyCalculator } from './features/DeveloperPenaltyCalculator'
import { InvestmentCalculator } from './features/InvestmentCalculator'
import { HealthCalculator } from './features/HealthCalculator'
import { AreaConverter } from './features/AreaConverter'
import { HomeJourney } from './features/HomeJourney'
import { theme } from './theme'
import type { Tool } from './types'

function App() {
  const [activeTab, setActiveTab] = useState<'tools' | 'data'>(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    return tab === 'data' ? 'data' : 'tools';
  })
  const [activeTag, setActiveTag] = useState<string>('全部')

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    window.history.replaceState({}, '', url.toString());
  }, [activeTab]);

  const tools: Tool[] = useMemo(() => [
    {
      id: 'mortgage',
      title: '房貸試算',
      tags: ['金融', '房地產', '計算機'],
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
      title: '投資計算',
      tags: ['金融', '投資', '計算機'],
      icon: <TrendingUp size={20} />,
      component: <InvestmentCalculator />
    },
    {
      id: 'area-converter',
      title: '坪數換算器',
      tags: ['房地產', '計算機'],
      icon: <Maximize size={20} />,
      component: <AreaConverter />
    },
    {
      id: 'health',
      title: '健康數值計算 (BMI/BMR/TDEE)',
      tags: ['健康', '計算機'],
      icon: <Activity size={20} />,
      component: <HealthCalculator />
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

  // 將工具分配到不同的列中以實現 Masonry 佈局
  const columns = useMemo(() => {
    const cols: Tool[][] = [[], [], []]
    filteredTools.forEach((tool, index) => {
      cols[index % 3].push(tool)
    })
    return cols
  }, [filteredTools])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bg: 'background', color: 'text', py: [3, 4] }}>
        <Container sx={{ maxWidth: 1200, px: [3, 4] }}>
          
          {/* Navigation Tabs at the very top */}
          <Flex sx={{ 
            mb: 5, 
            gap: [3, 4], 
            justifyContent: 'center', 
            borderBottom: '1px solid', 
            borderColor: 'borderColor' 
          }}>
            <Box 
              variant="buttons.nav" 
              className={activeTab === 'tools' ? 'active' : ''}
              onClick={() => setActiveTab('tools')}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Package size={20} /> 實用工具
            </Box>
            <Box 
              variant="buttons.nav" 
              className={activeTab === 'data' ? 'active' : ''}
              onClick={() => setActiveTab('data')}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Home size={20} /> 新屋筆記
            </Box>
          </Flex>

          {activeTab === 'tools' ? (
            <>
              {/* Header inside Tools tab */}
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

              <Flex sx={{ gap: 4, alignItems: 'start', flexWrap: ['wrap', null, 'nowrap'] }}>
                {columns.map((column, colIdx) => (
                  <Flex 
                    key={colIdx} 
                    sx={{ 
                      flexDirection: 'column', 
                      gap: 4, 
                      flex: 1, 
                      minWidth: ['100%', null, '300px'],
                      display: colIdx >= 2 && filteredTools.length < 3 ? ['none', null, 'flex'] : 'flex'
                    }}
                  >
                    {column.map(tool => (
                      <Card
                        key={tool.id}
                        title={tool.title}
                        icon={tool.icon}
                        tags={tool.tags}
                      >
                        {tool.component}
                      </Card>
                    ))}
                  </Flex>
                ))}
              </Flex>

              {filteredTools.length === 0 && (
                <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, opacity: 0.3 }}>
                  <LayoutGrid size={64} />
                  <Text sx={{ mt: 3, fontSize: 3 }}>目前沒有相關工具</Text>
                </Flex>
              )}
            </>
          ) : (
            <HomeJourney />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
