import React, { useState, useMemo } from 'react';
import { Box, Heading, Text, Grid, Flex, Divider, Card, Button, IconButton, Badge } from 'theme-ui';
import { Info, ListTodo, X, CheckCircle2, Clock, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { FurnitureCard } from '../components/FurnitureCard';
import { TagButton } from '../components/Common';
import type { FurnitureItem, Milestone } from '../types';

interface InfoFieldProps {
  label: string;
  value: string | number;
  note?: string;
  valueColor?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, note, valueColor }) => (
  <Box sx={{ textAlign: 'left' }}>
    <Text sx={{ fontSize: '10px', opacity: 0.5, display: 'block', mb: 0, fontWeight: 'bold' }}>{label}</Text>
    <Text sx={{ fontSize: 1, fontWeight: 'bold', display: 'block', color: valueColor || 'inherit' }}>{value}</Text>
    {note && (
      <Text sx={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>{note}</Text>
    )}
  </Box>
);

const MILESTONES: Milestone[] = [
  { name: '簽約訂金', date: '2021/10/29(五)', money: 10, isPaid: true },
  { name: '簽約金10%', date: '2021/11/17(三)', money: 144, isPaid: true },
  { name: '一樓底版', date: '2023/01/03(二)', money: 15, isPaid: true },
  { name: '七樓底版', date: '2023/04/28(五)', money: 15, isPaid: true },
  { name: '上樑', date: '2023/10/26(四)', money: 15, isPaid: true },
  { name: '使照取得', date: '2026/01/22', money: 15, isPaid: true },
  { name: '用印完稅', date: '----', money: 15, isPaid: false },
  { name: '交屋款', date: '----', money: 77, isPaid: false },
  { name: '過戶貸款', date: '----', money: 1231, isPaid: false },
];

const ITEMS: FurnitureItem[] = [
  {
    id: '1',
    name: '升降桌(小)',
    brand: 'FUNTE',
    productName: 'Mini+ 電動升降桌(三節式)',
    price: 12530,
    specs: '寬100 深60cm, 煙草橡木 + 黑腳',
    url: 'https://www.funtetw.com/products/mini-standing-desk-coupled',
    status: 'purchased',
    note: '',
    tags: ['書房', '桌子']
  },
  {
    id: '2',
    name: '升降桌(大)',
    brand: 'FUNTE',
    productName: 'Prime 電動升降桌 三節式',
    price: 16400,
    specs: '寬150 深60cm, 煙草橡木 + 黑腳',
    url: 'https://www.funtetw.com/products/standing-desk-1',
    status: 'planned',
    note: '',
    tags: ['書房', '桌子']
  },
  {
    id: '3',
    name: '床墊',
    brand: '床的世界-美格蘭特',
    productName: 'Villa飯店系列-6*6.2尺',
    price: 46800,
    specs: '寬180 長188cm 厚度約30cm',
    url: 'https://www.beddingworldbed.com.tw/products/villa-6',
    status: 'ordered',
    deposit: 45800,
    note: '剩1000尾款，最後給司機',
    tags: ['臥室', '寢具']
  },
  {
    id: '4',
    name: '後掀床架',
    brand: '日興木業行',
    productName: '唯美繃布掀床',
    price: 22400,
    specs: '寬183 長191cm 高32 深24',
    url: 'https://www.hsinf.com.tw/product/%E5%94%AF%E7%BE%8E%E7%B9%83%E5%B8%83%E6%8E%80%E5%BA%8A/',
    status: 'ordered',
    deposit: 0,
    note: '送貨前6週通知,全額貨到付款或匯款',
    tags: ['臥室', '家具']
  },
  {
    id: '5',
    name: '沙發',
    brand: '拓家家具',
    productName: 'Monroe夢露 可調式頭枕滑動沙發',
    price: 57290,
    specs: '寬205 深100cm 高105 扶手寬12.5 腳高12 座高40cm',
    url: 'https://www.trohome.com/products/%E5%8F%AF%E8%A8%82%E8%A3%BD-the-monet-%E8%8E%AB%E5%85%A7',
    status: 'ordered',
    deposit: 47400,
    note: '',
    tags: ['客廳', '家具']
  },
  {
    id: '6',
    name: '餐桌',
    brand: 'Hoi! 好好生活',
    productName: 'WH喜日橡膠木實木岩板餐桌1.1M原木色WSJ54R09',
    price: 7180,
    specs: '寬70 長110 高75',
    status: 'ordered',
    deposit: 7180,
    url: 'https://www.hoihome.tw/SalePage/Index/10773928',
    tags: ['餐廳', '桌子'],
  },
  {
    id: '7',
    name: '餐椅',
    brand: 'Hoi! 好好生活',
    productName: 'YW富士山橡木實木仿皮扶手椅2入組 原木色+奶茶色',
    price: 7980,
    specs: '寬55 長53 高78',
    status: 'ordered',
    deposit: 7980,
    url: 'https://www.hoihome.tw/SalePage/Index/11293232',
    tags: ['餐廳', '椅子']
  },
  {
    id: '8',
    name: '廚下淨水',
    brand: 'EVERPOLL 愛科濾淨 EP-168+RO-600',
    productName: '廚下型雙溫無壓飲水機+直出RO淨水器',
    price: 27455,
    specs: 'RO: 長40 x 寬14 x 高33\n飲水: 長41 x 寬19.2 x 高30.5',
    status: 'ordered',
    deposit: 27455,
    url: 'https://24h.pchome.com.tw/prod/DMAWFI-A900GCG6I',
    tags: ['廚房', '設備']
  },
  {
    id: '9',
    name: '全戶淨水',
    brand: 'EVERPOLL 愛科濾淨 FH-200',
    productName: '傳家寶全戶濾淨200噸',
    price: 20000,
    specs: '高 35.2 x 直徑15.9',
    status: 'ordered',
    deposit: 20000,
    url: 'https://www.everpoll.com.tw/product_detail?id=431',
    tags: ['廚房', '設備']
  },
  {
    id: '10',
    name: '冰箱',
    brand: 'SHARP 夏普 SJ-MW51KT-H',
    productName: ' 504公升左右開任意門變頻五門冰箱(尊爵灰)',
    price: 47900,
    specs: '寬65 深 68.4 高 183.8cm\n安裝: 寬66~69 深69.1 高189',
    status: 'planned',
    url: 'https://24h.pchome.com.tw/prod/DPAC6X-A900GYX7E',
    tags: ['廚房', '設備']
  },
  {
    id: '11',
    name: '熱水器',
    brand: 'SAKURA 櫻花 DH1605A',
    productName: '屋內型智能恆溫熱水器DH1605A(天然瓦斯)',
    price: 15840,
    specs: '寬345ｘ深158ｘ高493mm',
    status: 'planned',
    url: 'https://24h.pchome.com.tw/prod/DPAL03-A900AVIKJ',
    tags: ['陽台', '設備']
  },
  // {
  //   id: '12',
  //   name: '洗烘衣機',
  //   brand: 'Panasonic 國際牌 NA-VS120RW-B+NH-VS100HP-B',
  //   productName: '12公斤洗脫滾筒洗衣機+10公斤熱泵式乾衣機',
  //   price: 56520,
  //   specs: '洗衣: 寬59.6 深66 高84.5\n烘衣: 寬59.6 深66.7 高84.5\n安裝: 寬64 深71 高180',
  //   status: 'planned',
  //   url: 'https://24h.pchome.com.tw/prod/DPAI1H-1900HIGGT',
  //   tags: ['陽台', '設備']
  // },
  // {
  //   id: '13',
  //   name: '洗烘衣機',
  //   brand: 'Panasonic 國際牌 NA-V120HDH-G',
  //   productName: '12公斤溫水洗脫烘滾筒洗衣機(乾衣8公斤)',
  //   price: 21912,
  //   specs: '寬59.5 深59.5 高85',
  //   status: 'planned',
  //   url: 'https://24h.pchome.com.tw/prod/DPAI1H-A900AMJJK',
  //   tags: ['陽台', '設備']
  // },
  {
    id: '14',
    name: '洗烘衣機',
    brand: 'LG WD-S1310B',
    productName: '13公斤+10公斤WashTower AI智控熱泵除濕式洗乾衣機',
    price: 65900,
    specs: '寬60 深66 高165.5',
    status: 'planned',
    url: 'https://24h.pchome.com.tw/prod/DPAI1L-A900GL45J',
    note: '洗衣 1000W 乾衣 960W',
    tags: ['陽台', '設備']
  }
];

export const HomeJourney: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
  const [activeFurnitureTag, setActiveFurnitureTag] = useState<string>('全部');

  const totalPaid = MILESTONES.filter(m => m.isPaid).reduce((acc, curr) => acc + curr.money, 0);
  const totalPrice = 1537;

  const furnitureTags = useMemo(() => {
    const tags = new Set<string>(['全部']);
    ITEMS.forEach(item => item.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFurnitureTag === '全部') return ITEMS;
    return ITEMS.filter(item => item.tags.includes(activeFurnitureTag));
  }, [activeFurnitureTag]);

  const totalFilteredPrice = useMemo(() => {
    return filteredItems.reduce((acc, curr) => acc + curr.price, 0);
  }, [filteredItems]);

  const purchaseDuration = useMemo(() => {
    const start = new Date('2021/10/29');
    const today = new Date();

    let years = today.getFullYear() - start.getFullYear();
    const startMonth = start.getMonth();
    const todayMonth = today.getMonth();
    const startDate = start.getDate();
    const todayDate = today.getDate();

    // 如果還沒到當年的月份，或到了月份但還沒到當天，則年數減 1
    if (todayMonth < startMonth || (todayMonth === startMonth && todayDate < startDate)) {
      years--;
    }

    // 計算剩下的天數
    const lastAnniversary = new Date(start);
    lastAnniversary.setFullYear(start.getFullYear() + years);
    const diffTime = today.getTime() - lastAnniversary.getTime();
    const remainingDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (years === 0) return `${remainingDays} 天`;
    return `${years} 年又 ${remainingDays} 天`;
  }, []);

  const moveInCountdown = useMemo(() => {
    const target = new Date('2026/09/20');
    const today = new Date();

    if (today >= target) return '已到達入住日';

    let months = (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth());
    const tempDate = new Date(today);
    tempDate.setMonth(today.getMonth() + months);

    if (tempDate > target) {
      months--;
      tempDate.setMonth(today.getMonth() + months);
    }

    const diffTime = target.getTime() - tempDate.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (months === 0) return `剩餘 ${days} 天`;
    return `還有 ${months} 個月又 ${days} 天`;
  }, []);

  // 分配家具到不同的列中以實現真正的 Masonry 佈局 (桌機 4 欄, 寬度平均分配)
  const columns = useMemo(() => {
    const cols: FurnitureItem[][] = [[], [], [], []]
    filteredItems.forEach((item, index) => {
      cols[index % 4].push(item)
    })
    return cols
  }, [filteredItems]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Heading as="h2" sx={{ fontSize: 6, color: 'primary', textAlign: 'left', mb: 1 }}>永恆之新</Heading>
          <Text sx={{ opacity: 0.7, fontSize: 1 }}>我的新家置產筆記與設備清單</Text>
        </Box>
        <Button
          onClick={() => setShowModal(true)}
          sx={{
            bg: 'primary',
            px: 3,
            py: 2,
            borderRadius: 8,
            fontSize: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer'
          }}
        >
          <ListTodo size={16} /> 付款進度表
        </Button>
      </Flex>

      {/* 基本資訊 Accordion */}
      <Card variant="primary" sx={{ p: 0, width: '100%', mb: 5, overflow: 'hidden', border: '1px solid', borderColor: 'borderColor' }}>
        <Flex
          onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
          sx={{
            p: 3,
            bg: 'muted',
            cursor: 'pointer',
            justifyContent: 'space-between',
            alignItems: 'center',
            '&:hover': { bg: 'borderColor', opacity: 0.9 }
          }}
        >
          <Heading as="h3" sx={{ fontSize: 2, display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left', m: 0 }}>
            <Info size={18} /> 基本資訊
          </Heading>
          {isBasicInfoOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Flex>

        {isBasicInfoOpen && (
          <Box sx={{ p: 3, bg: 'cardBg' }}>
            <Grid columns={[1, 2, 3, 5]} gap={3} sx={{ textAlign: 'left', mb: 3 }}>
              <InfoField label="建案名稱" value="永恆之新" />
              <InfoField
                label="總價 (不含車位)"
                value="1,537 萬"
                valueColor="accent"
                note={`單價：${(1537 / 27.99).toFixed(1)} 萬/坪`}
              />
              <InfoField label="下定日期" value="2021 / 10 / 29 (五)" note={`距今已過 ${purchaseDuration}`} />
              <InfoField label="詳細地址" value="新莊頭前重劃區" note="新北市新莊區福美街267號9樓" />
              <InfoField label="交通資訊" value="新北產業園區站" note="機捷 / 環狀線雙捷交會" />
            </Grid>

            <Divider sx={{ my: 3, borderColor: 'borderColor', opacity: 0.1 }} />

            <Grid columns={[1, 3, 3]} gap={3} sx={{ textAlign: 'left' }}>
              <InfoField
                label="坪數組成 (共 27.99 坪)"
                value="主 16.57 + 附 2.18 + 公 9.23"
                note="公設比：33%"
              />
              <InfoField
                label="貸款資訊"
                value="1231萬, 30年, 2.4%"
                note="月付額 48002"
              />
              <InfoField
                label="預計入住日期"
                value="2026 / 09 / 20 (日)"
                note={moveInCountdown}
              />
            </Grid>
            </Box>
            )}      </Card>

      {/* 家電家具區塊 - Portfolio 樣式 */}
      <Box sx={{ mb: 5 }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Heading as="h3" sx={{ fontSize: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ShoppingCart size={24} /> 家電家具清單
          </Heading>
          <Flex sx={{ alignItems: 'center', gap: 3 }}>
            <Badge sx={{ bg: 'primary', px: 2, py: 1, fontSize: 0 }}>共 {filteredItems.length} 品項</Badge>
            <Text sx={{ fontSize: 1, fontWeight: 'bold', color: 'accent' }}>
              {activeFurnitureTag === '全部' ? '總預算：' : `${activeFurnitureTag}預算：`}$ {totalFilteredPrice.toLocaleString()}
            </Text>
          </Flex>
        </Flex>

        {/* Tag Filters for Furniture */}
        <Flex sx={{ gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {furnitureTags.map(tag => (
            <TagButton
              key={tag}
              label={tag}
              isActive={activeFurnitureTag === tag}
              onClick={() => setActiveFurnitureTag(tag)}
              sx={{
                py: 1,
                px: 2,
                fontSize: '11px',
                height: '24px' // 縮小高度
              }}
            />
          ))}
        </Flex>

        {/* 修正為固定 25% 寬度的 Masonry 佈局 */}
        <Flex sx={{ gap: 4, alignItems: 'start', flexWrap: ['wrap', null, 'nowrap'] }}>
          {columns.map((column, colIdx) => (
            <Flex
              key={colIdx}
              sx={{
                flexDirection: 'column',
                gap: 4,
                flex: 1,
                minWidth: ['100%', 'calc(50% - 16px)', 'calc(25% - 24px)'],
                flexShrink: 0,
                flexGrow: 0,
                display: column.length > 0 ? 'flex' : ['none', null, 'flex']
              }}
            >
              {column.map(item => (
                <FurnitureCard key={item.id} item={item} />
              ))}
            </Flex>
          ))}
        </Flex>

        {filteredItems.length === 0 && (
          <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 5, opacity: 0.3 }}>
            <ShoppingCart size={48} />
            <Text sx={{ mt: 3, fontSize: 2 }}>此類別目前沒有品項</Text>
          </Flex>
        )}
      </Box>

      {/* Timeline Modal */}
      {showModal && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bg: 'rgba(0,0,0,0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3
        }}>
          <Box sx={{
            bg: 'cardBg',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '85vh',
            borderRadius: 20,
            p: [3, 4],
            position: 'relative',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid',
            borderColor: 'borderColor'
          }}>
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Heading as="h3">付款進度與里程碑</Heading>
              <IconButton onClick={() => setShowModal(false)} sx={{ cursor: 'pointer' }}>
                <X size={24} />
              </IconButton>
            </Flex>

            <Box sx={{ mb: 4, p: 3, bg: 'muted', borderRadius: 12, border: '1px solid', borderColor: 'borderColor' }}>
              <Grid columns={3} gap={2}>
                <Box sx={{ textAlign: 'left' }}>
                  <Text sx={{ fontSize: 0, opacity: 0.6 }}>總價</Text>
                  <Text sx={{ fontWeight: 'bold', fontSize: 2 }}>1,537 萬</Text>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Text sx={{ fontSize: 0, opacity: 0.6 }}>已繳金額</Text>
                  <Text sx={{ fontWeight: 'bold', fontSize: 2, color: 'green' }}>{totalPaid} 萬</Text>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Text sx={{ fontSize: 0, opacity: 0.6 }}>剩餘貸款</Text>
                  <Text sx={{ fontWeight: 'bold', fontSize: 2, color: 'primary' }}>{totalPrice - totalPaid} 萬</Text>
                </Box>
              </Grid>
            </Box>

            <Box sx={{ position: 'relative', pl: 4 }}>
              <Box sx={{
                position: 'absolute',
                left: '7px',
                top: 0,
                bottom: 0,
                width: '2px',
                bg: 'borderColor',
                opacity: 0.5
              }} />

              {MILESTONES.map((m, idx) => {
                let accumulated = 0;
                for(let i=0; i<=idx; i++) accumulated += MILESTONES[i].money;

                return (
                  <Box key={idx} sx={{ position: 'relative', mb: 4 }}>
                    <Box sx={{
                      position: 'absolute',
                      left: '-21px',
                      top: '4px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      bg: m.isPaid ? 'green' : 'muted',
                      border: '3px solid',
                      borderColor: 'cardBg',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {m.isPaid ? <CheckCircle2 size={10} color="white" /> : <Clock size={10} />}
                    </Box>

                    <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ textAlign: 'left' }}>
                        <Text sx={{
                          fontWeight: 'bold',
                          fontSize: 1,
                          opacity: m.isPaid ? 1 : 0.5,
                          textAlign: 'left'
                        }}>
                          {m.name}
                        </Text>
                        <Text sx={{ fontSize: 0, opacity: 0.5, display: 'block', textAlign: 'left' }}>{m.date}</Text>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Text sx={{ fontWeight: 'bold', fontSize: 1, color: m.isPaid ? 'green' : 'text', opacity: m.isPaid ? 1 : 0.5 }}>
                          {m.money} 萬
                        </Text>
                        <Text sx={{ fontSize: '10px', opacity: 0.3, display: 'block' }}>
                          累計：{accumulated} 萬
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </Box>

            <Button
              onClick={() => setShowModal(false)}
              sx={{ width: '100%', mt: 2, py: 2, bg: 'muted', color: 'text', border: '1px solid', borderColor: 'borderColor', cursor: 'pointer' }}
            >
              關閉
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
