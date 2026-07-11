const STORAGE_KEY = 'plantGreenThumb.v1';





    const plantDatabase = (window.PLANT_DATABASE || []).map(ensurePlantKnowledge);

    const plantCategories = ['全部', '入門收藏', '低維護', '室內觀葉', '香草蔬菜', '多肉仙人掌', '蕨類竹芋', '開花植物', '大型植物', '特殊植物'];
    const easeCategories = ['全部', '入門收藏', '低維護', '基礎管理', '普通', '稍難', '高難度'];
    const easeFilterButtons = easeCategories.filter(c => c !== '全部');
    const easeRank = Object.fromEntries(easeCategories.map((level, index) => [level, index]));
    const maintenanceCategories = ['低維護', '中等維護', '高濕敏感', '強光耐旱', '附生型', '開花觀賞', '特殊收藏'];

    const easeLevelGroups = {
      '入門收藏': ['黃金葛', '虎尾蘭', '金錢樹', '吊蘭', '心葉蔓綠絨', '合果芋', '粗肋草', '圓葉椒草', '豆瓣綠', '酒瓶蘭'],
      '低維護': ['蘆薈', '仙人掌', '蔥', '萬年青', '白網紋草', '椒草類', '仙人球', '開運竹', '富貴竹'],
      '基礎管理': ['龜背芋', '發財樹', '白鶴芋', '橡皮樹', '羅勒', '薄荷', '小精靈空氣鳳梨', '蔓綠絨', '黑金剛橡皮樹', '冷水花', '長壽花', '日日春', '袖珍椰子', '鏡面草'],
      '普通': ['多肉植物', '鹿角蕨', '波士頓腎蕨', '非洲菫', '蝴蝶蘭', '九層塔', '香菜', '龜背竹', '姑婆芋', '鳥巢蕨', '常春藤', '觀音蓮', '玉露', '熊童子', '石蓮花', '文心蘭', '茉莉花', '矮牽牛', '天竺葵', '聖誕紅', '天堂鳥', '散尾葵', '馬拉巴栗', '空氣鳳梨', '松蘿空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚'],
      '稍難': ['琴葉榕', '鐵線蕨', '竹芋類', '竹芋', '孔雀竹芋', '青蘋果竹芋', '迷迭香', '薰衣草', '海芋', '女王頭空氣鳳梨', '空氣鳳梨霸王', '粉紅公主蔓綠絨', '彩葉芋', '玫瑰', '梔子花', '繡球花'],
      '高難度': ['捕蠅草', '豬籠草', '腎蕨高濕品種', '特殊斑葉品種']
    };

    const buyingGuideGroups = [
      { level: '入門收藏', title: '🌱 入門收藏', desc: '容錯率高、適合作為收藏系統的穩定基準植物。', picks: ['黃金葛', '虎尾蘭', '金錢樹', '吊蘭', '心葉蔓綠絨', '合果芋', '粗肋草', '圓葉椒草', '豆瓣綠', '酒瓶蘭'] },
      { level: '低維護', title: '🪴 低維護', desc: '容錯高，重點是避免過度澆水，適合作為穩定收藏擴充。', picks: ['蘆薈', '仙人掌', '蔥', '萬年青', '白網紋草', '椒草類'] },
      { level: '基礎管理', title: '🌿 基礎管理', desc: '需要固定觀察光照、排水與水分節奏，適合作為收藏進階基礎。', picks: ['龜背芋', '發財樹', '白鶴芋', '橡皮樹', '羅勒', '薄荷'] },
      { level: '普通', title: '☀️ 普通', desc: '需要比較穩定的光線、水分與通風。建議先養活 2–3 盆再挑戰。', picks: ['多肉植物', '空氣鳳梨', '鹿角蕨', '波士頓腎蕨', '非洲菫', '蝴蝶蘭'] },
      { level: '稍難', title: '🧪 稍難', desc: '對濕度、光照或環境變動較敏感。適合已有照護經驗的人。', picks: ['琴葉榕', '鐵線蕨', '竹芋類', '迷迭香', '薰衣草', '海芋'] },
      { level: '高難度', title: '🏔 高難度', desc: '需要更細緻的環境控制、介質策略與長期觀察能力。', picks: ['捕蠅草', '豬籠草', '腎蕨高濕品種', '特殊斑葉品種'] }
    ];

    const categoryRules = {
      '香草蔬菜': ['薄荷', '羅勒', '迷迭香', '薰衣草', '九層塔', '香菜', '蔥'],
      '多肉仙人掌': ['蘆薈', '多肉植物', '觀音蓮', '仙人掌', '仙人球', '玉露', '熊童子', '石蓮花', '酒瓶蘭'],
      '蕨類竹芋': ['竹芋', '孔雀竹芋', '青蘋果竹芋', '鹿角蕨', '波士頓腎蕨', '鳥巢蕨', '鐵線蕨'],
      '開花植物': ['長壽花', '非洲菫', '蝴蝶蘭', '文心蘭', '玫瑰', '茉莉花', '梔子花', '日日春', '矮牽牛', '天竺葵', '繡球花', '聖誕紅'],
      '大型植物': ['琴葉榕', '龜背芋', '龜背竹', '發財樹', '馬拉巴栗', '天堂鳥', '散尾葵', '姑婆芋'],
      '特殊植物': ['空氣鳳梨', '小精靈空氣鳳梨', '松蘿空氣鳳梨', '女王頭空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚', '空氣鳳梨霸王', '捕蠅草', '豬籠草']
    };

    const firstPlantPicks = ['黃金葛', '虎尾蘭', '金錢樹', '吊蘭', '心葉蔓綠絨', '合果芋', '粗肋草', '圓葉椒草', '豆瓣綠', '酒瓶蘭'];
    const beginnerPlants = ['黃金葛', '虎尾蘭', '吊蘭', '蘆薈', '合果芋', '粗肋草', '心葉蔓綠絨', '圓葉椒草', '豆瓣綠', '仙人掌', '仙人球', '開運竹', '富貴竹', '金錢樹', '酒瓶蘭'];

    function getPlantCategory(plant) {
      if (firstPlantPicks.includes(plant.name)) return '入門收藏';
      if (beginnerPlants.includes(plant.name)) return '低維護';
      if (plant.category) return plant.category;
      for (const [category, names] of Object.entries(categoryRules)) {
        if (names.includes(plant.name)) return category;
      }
      return '室內觀葉';
    }

    function ensurePlantKnowledge(plant) {
      const originStory = plant.originStory || plant.nativeHabitat || '此植物的原生棲地資料尚未細分，建議以管理難度、光照與介質狀態建立個別觀察紀錄。';
      const expertNote = plant.expertNote || plant.advancedCare || '觀察新葉、根系、介質乾濕與環境變動，建立長期照護判斷。';
      return {
        ...plant,
        category: plant.category || '室內觀葉',
        easeLevel: plant.easeLevel || plant.managementType || '普通',
        legacyDifficulty: plant.legacyDifficulty || plant.difficulty || '中',
        difficulty: plant.difficulty || plant.legacyDifficulty || '中',
        personality: plant.personality || '穩定、耐看、適合室內收藏',
        originStory,
        funFact: plant.funFact || '植物的葉形、根系與生長節奏，常會記錄它對環境的適應方式。',
        beginnerTip: plant.beginnerTip || plant.commonMistakes || '先觀察介質乾濕、盆重與葉片狀態，再決定是否澆水或移位。',
        expertNote,
        nativeHabitat: plant.nativeHabitat || originStory,
        substratePreference: plant.substratePreference || '依管理難度調整排水、保水與根系通氣。',
        wateringStrategy: plant.wateringStrategy || plant.watering || '依介質乾濕、盆重與葉片張力判斷。',
        lightStrategy: plant.lightStrategy || plant.light || '明亮散射光，依葉色與節間調整。',
        commonMistakes: plant.commonMistakes || '固定照日期澆水、忽略通風與盆器排水。',
        advancedCare: plant.advancedCare || expertNote
      };
    }

    function getEaseLevel(plant) {
      return plant.easeLevel || getEaseLevelByName(plant.name, plant.legacyDifficulty);
    }

    function normalizeEaseLevel(ease) {
      const legacyFirst = '\u7b2c\u4e00\u76c6\u9996\u9078';
      const legacyVeryEasy = '\u5f88\u597d\u990a';
      const legacyEasy = '\u597d\u990a';
      if (ease === legacyFirst) return '入門收藏';
      if (ease === legacyVeryEasy) return '低維護';
      if (ease === legacyEasy) return '基礎管理';
      return ease;
    }

    function getEaseAdvice(plant) {
      const ease = normalizeEaseLevel(getEaseLevel(plant));
      const advice = {
        '入門收藏': '低維護、容錯率高，可作為收藏管理的穩定基準。',
        '低維護': '照護負荷低，重點是避免過度澆水與長期悶濕。',
        '基礎管理': '適合已建立觀察節奏的收藏者，需注意光照、排水與通風。',
        '中等維護': '需要穩定觀察光照、介質乾濕與生長節律。',
        '中高維護': '需要更細緻的環境判斷、通風與乾濕循環管理。',
        '高階收藏': '適合具備環境控制與長期追蹤能力的收藏者。',
        '普通': '需要比較穩定的光照、水分與通風，適合第二階段挑戰。',
        '稍難': '對環境變化、水分或濕度較敏感，建議有經驗後再買。',
        '高難度': '需要較精準的環境管理、介質策略與長期狀態追蹤。'
      };
      return advice[ease] || advice['普通'];
    }

    function getSuitableFor(plant) {
      const ease = normalizeEaseLevel(getEaseLevel(plant));
      const suitable = {
        '入門收藏': '想建立穩定收藏基準、偏好低維護管理的人。',
        '低維護': '想降低照護負擔、穩定擴充植物數量的人。',
        '基礎管理': '已有固定照護節奏，願意每週觀察光照、土壤與通風的人。',
        '中等維護': '能定期觀察根系、介質狀態與生長節律的收藏者。',
        '中高維護': '願意依品種差異調整光照、水分、通風與季節節律的人。',
        '高階收藏': '具備高光、高濕、強通風或特殊栽培條件管理能力的人。',
        '普通': '已養過幾盆植物，能穩定觀察水分、光照與通風的人。',
        '稍難': '有照護經驗，能調整濕度、光線與環境穩定度的人。',
        '高難度': '進階玩家，願意研究介質、水質、濕度與品種需求的人。'
      };
      return suitable[ease] || suitable['普通'];
    }

    function getBuyingAdvice(plant) {
      const ease = normalizeEaseLevel(getEaseLevel(plant));
      const advice = {
        '入門收藏': '購買時挑葉片飽滿、盆土不發臭、莖葉沒有軟爛的植株，適合建立低維護收藏基準。',
        '低維護': '先確認環境光線足夠，再選健康、無蟲、盆土不積水的植株。',
        '基礎管理': '購買後先放在穩定明亮處觀察適應狀態，不要急著換盆施肥。',
        '中等維護': '購買時確認根系狀態、介質新舊與花後管理需求。',
        '中高維護': '購買前先確認品種習性、光照需求、休眠或復花條件。',
        '高階收藏': '購買前請先確認環境能提供足夠光線、濕度、通風與補水節奏。',
        '普通': '不要只看外型下手。先確認家中環境是否能提供穩定光線、通風與照護頻率。',
        '稍難': '建議有經驗後再買，並先查清楚濕度、光照與介質需求；剛帶回家先不要頻繁移動。',
        '高難度': '購買前請確認水質、濕度、光照、介質或品種條件都能配合。'
      };
      return advice[ease] || advice['普通'];
    }

    function isAirPlant(plant) {
      return ['空氣鳳梨', '小精靈空氣鳳梨', '松蘿空氣鳳梨', '女王頭空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚', '空氣鳳梨霸王'].includes(plant.name);
    }

    function renderAirPlantReminder(plant) {
      if (!isAirPlant(plant)) return '';
      return `<div class="soft-card">
        <h3>空氣鳳梨照護提醒</h3>
        <p>🪴 不需要土壤栽種。</p>
        <p>☀️ 需要明亮散射光，避免長時間強烈直曬。</p>
        <p>💧 泡水或噴水後，必須完全晾乾，尤其不要讓葉心積水。</p>
        <p>🌬️ 不適合長期放在密閉玻璃瓶或悶濕容器中，通風比裝飾感更重要。</p>
      </div>`;
    }

    function sortPlantsByEase(list) {
      return [...list].sort((a, b) => {
        const easeDiff = (easeRank[getEaseLevel(a)] || 99) - (easeRank[getEaseLevel(b)] || 99);
        if (easeDiff !== 0) return easeDiff;
        return a.name.localeCompare(b.name, 'zh-Hant');
      });
    }

    function filterPlantDatabase(category = '全部', keyword = '') {
      const q = keyword.trim().toLowerCase();
      return sortPlantsByEase(plantDatabase.map(ensurePlantKnowledge).filter(p => {
        const matchCategory = category === '全部' || getEaseLevel(p) === category || getPlantCategory(p) === category || maintenanceProfile(p) === category;
        const haystack = `${p.name} ${p.easeLevel} ${maintenanceProfile(p)} ${getPlantCategory(p)} ${p.light} ${p.watering} ${p.note} ${p.personality} ${p.originStory} ${p.funFact} ${p.beginnerTip} ${p.expertNote}`.toLowerCase();
        const matchKeyword = !q || haystack.includes(q);
        return matchCategory && matchKeyword;
      }));
    }

    const symptomDatabase = window.SYMPTOM_DATABASE || {};


    const titleStages = window.TITLE_STAGES || [];

    const quizBank = window.QUIZZES || [];

    const knowledgeCards = window.KNOWLEDGE_CARDS || [];

    const knowledgeCardCategories = ['澆水觀念', '光照知識', '土壤與根系', '植物趣事', '原生地故事', '病蟲害觀察', '基礎管理誤區', '空氣鳳梨專區'];

    const skillDefs = window.SKILL_DEFS || [];

    let appData = loadData();
    let selectedPlantId = null;
    let selectedKnowledge = null;
    let selectedSymptom = null;
    let selectedAddPlantName = '黃金葛';
    let selectedAddCategory = '低維護';
    let addPlantSearch = '';
    let selectedKnowledgeCategory = '低維護';
    let knowledgeSearch = '';

    function blankData() {
      return {
        appName: '植物綠手指',
        version: '2.0.0',
        plants: [],
        careLogs: [],
        settings: { theme: 'light', reminderPreference: 'basic', onboardingCompleted: false, academy: { answeredQuizDates: {}, readCards: {}, plantFunFactDates: {} } }
      };
    }

    function loadData() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return blankData();
      try {
        const parsed = JSON.parse(raw);
        return { ...blankData(), ...parsed, plants: parsed.plants || [], careLogs: parsed.careLogs || [], settings: { ...blankData().settings, ...(parsed.settings || {}), academy: { ...blankData().settings.academy, ...((parsed.settings || {}).academy || {}) } } };
      } catch {
        return blankData();
      }
    }

    function saveData() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }

    function uid(prefix) {
      return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
    }

    function todayISO() {
      return new Date().toISOString().slice(0, 10);
    }

    function formatDate(dateString) {
      if (!dateString) return '尚未記錄';
      const d = new Date(dateString + 'T00:00:00');
      return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
    }

    function addDays(dateString, days) {
      const d = new Date(dateString + 'T00:00:00');
      d.setDate(d.getDate() + Number(days || 0));
      return d.toISOString().slice(0, 10);
    }

    function daysBetween(a, b) {
      const da = new Date(a + 'T00:00:00');
      const db = new Date(b + 'T00:00:00');
      return Math.floor((da - db) / 86400000);
    }

    function getPlantInfo(name) {
      return ensurePlantKnowledge(plantDatabase.find(p => p.name === name) || plantDatabase[0]);
    }

    function nextWaterDate(plant) {
      return addDays(plant.lastWateredAt || todayISO(), plant.waterIntervalDays || getPlantInfo(plant.name).interval);
    }

    function plantNeedsWater(plant) {
      return todayISO() >= nextWaterDate(plant);
    }

    function maintenanceProfile(plant) {
      const info = getPlantInfo(plant.name || plant);
      if (info.managementType) return info.managementType;
      const category = getPlantCategory(info);
      const ease = normalizeEaseLevel(getEaseLevel(info));
      if (isAirPlant(info)) return '附生型';
      if (category === '特殊植物') return '特殊收藏';
      if (category === '開花植物') return '開花觀賞';
      if (category === '多肉仙人掌' || info.light.includes('強光')) return '強光耐旱';
      if (category === '蕨類竹芋' || ['稍難', '高難度'].includes(ease)) return '高濕敏感';
      if (['入門收藏', '低維護', '基礎管理'].includes(ease)) return '低維護';
      return '中等維護';
    }

    function environmentValue(plant, key, fallback) {
      return plant[key] || fallback;
    }

    function logsWithinDays(days, plantId = null) {
      const cutoff = new Date(todayISO() + 'T00:00:00');
      cutoff.setDate(cutoff.getDate() - Number(days || 0));
      return appData.careLogs.filter(log => {
        if (plantId && log.plantId !== plantId) return false;
        if (!log.date) return false;
        return new Date(log.date + 'T00:00:00') >= cutoff;
      });
    }

    function mostCommonCareType(logs) {
      const counts = logs.reduce((map, log) => {
        map[log.type] = (map[log.type] || 0) + 1;
        return map;
      }, {});
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      return top ? `${top[0]}（${top[1]} 次）` : '尚無紀錄';
    }

    function averageWaterInterval(logs) {
      const dates = [...new Set(logs.filter(l => l.type === '澆水' && l.date).map(l => l.date))].sort();
      if (dates.length < 2) return '資料不足';
      const gaps = dates.slice(1).map((date, i) => daysBetween(date, dates[i]));
      const avg = gaps.reduce((sum, n) => sum + n, 0) / gaps.length;
      return `${avg.toFixed(1)} 天`;
    }

    function careSummary30Days(plantId = null) {
      const logs = logsWithinDays(30, plantId);
      return {
        logs,
        waters: logs.filter(l => l.type === '澆水').length,
        observations: logs.filter(l => l.type === '觀察').length,
        fertilizers: logs.filter(l => l.type === '施肥').length,
        abnormal: logs.filter(l => /葉黃|下垂|蟲害|爛|焦|異常|診斷|不確定/.test(l.note || '')).length,
        avgWaterInterval: averageWaterInterval(logs),
        topType: mostCommonCareType(logs)
      };
    }

    const LEGACY_KNOWLEDGE_TEST_TYPE = '\u5c0f\u6e2c\u9a57';

    function carePoints(type) {
      const pointMap = { '觀察': 5, '澆水': 10, '施肥': 12, '修剪': 12, '換盆': 20, '除蟲': 18, '知識測驗': 8, [LEGACY_KNOWLEDGE_TEST_TYPE]: 8, '知識卡': 4, '植物趣事': 4, '學習': 2 };
      return pointMap[type] || 5;
    }

    function samePlantTypeDateKey(log) {
      return `${log.plantId || 'global'}::${log.type}::${log.date}`;
    }

    function alreadyClaimedCarePoints(plantId, type, date) {
      return appData.careLogs.some(log => log.plantId === plantId && log.type === type && log.date === date);
    }

    function calculateCareLogPoints() {
      const awardedKeys = new Set();
      return appData.careLogs.reduce((sum, log) => {
        if (log.xpAwarded === false) return sum;
        if (log.plantId) {
          const key = samePlantTypeDateKey(log);
          if (awardedKeys.has(key)) return sum;
          awardedKeys.add(key);
        }
        return sum + carePoints(log.type);
      }, 0);
    }

    function logHappenedWithin24Hours(log, now = new Date()) {
      const happenedAt = log.createdAt ? new Date(log.createdAt) : new Date(`${log.date}T00:00:00`);
      if (Number.isNaN(happenedAt.getTime())) return false;
      const hours = (now.getTime() - happenedAt.getTime()) / 3600000;
      return hours >= 0 && hours < 24;
    }

    function hasWateredWithin24Hours(plantId) {
      return appData.careLogs.some(log => log.plantId === plantId && log.type === '澆水' && logHappenedWithin24Hours(log));
    }

    function confirmRepeatWateringIfNeeded(plantId) {
      if (!hasWateredWithin24Hours(plantId)) return true;
      return confirm('這盆植物 24 小時內已經記錄過澆水。多數植物不需要短時間內重複澆水。請確認你不是重複操作。');
    }

    function recordCareLog({ plantId, type, date, note, forceNoPoints = false }) {
      const sameDateCarePointsAlreadyClaimed = Boolean(plantId) && alreadyClaimedCarePoints(plantId, type, date);
      const xpAwarded = !forceNoPoints && !sameDateCarePointsAlreadyClaimed;
      const log = { id: uid('log'), plantId, type, date, note, xpAwarded, createdAt: new Date().toISOString() };
      appData.careLogs.push(log);
      return { log, xpAwarded, points: xpAwarded ? carePoints(type) : 0, sameDateCarePointsAlreadyClaimed };
    }

    function toastCareLogResult(result) {
      if (result.xpAwarded) {
        showToast(`已記錄，熟練度 +${result.points}`);
      } else {
        showToast('已記錄，但今天這盆植物的同類照護熟練度已領取過。');
      }
    }

    function gameStats() {
      const xp = calculateCareLogPoints() + appData.plants.length * 15;
      const level = Math.floor(xp / 100) + 1;
      const currentXp = xp % 100;
      const nextXp = 100 - currentXp;
      const uniqueDates = [...new Set(appData.careLogs.map(l => l.date).filter(Boolean))].sort().reverse();
      let streak = 0;
      let cursor = new Date(todayISO() + 'T00:00:00');
      const dateSet = new Set(uniqueDates);
      if (!dateSet.has(todayISO())) cursor.setDate(cursor.getDate() - 1);
      while (dateSet.has(cursor.toISOString().slice(0, 10))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
      const readCount = Object.values(academySettings().readCards || {}).filter(Boolean).length;
      const quizCount = appData.careLogs.filter(l => ['知識測驗', LEGACY_KNOWLEDGE_TEST_TYPE].includes(l.type)).length;
      const badges = [
        { name: '收藏建檔', icon: '🌱', unlocked: appData.plants.length >= 1 },
        { name: '紀錄啟動', icon: '💧', unlocked: appData.careLogs.length >= 1 },
        { name: '不亂澆水的人', icon: '🖐️', unlocked: appData.careLogs.filter(l => l.type === '觀察').length >= 5 },
        { name: '葉片觀察者', icon: '👀', unlocked: appData.careLogs.filter(l => l.type === '觀察').length >= 10 },
        { name: '植物小隊', icon: '🪴', unlocked: appData.plants.length >= 3 },
        { name: '七日園丁', icon: '🏅', unlocked: streak >= 7 },
        { name: '知識收藏家', icon: '📚', unlocked: readCount >= 5 },
        { name: '知識判讀者', icon: '🧠', unlocked: quizCount >= 5 },
        { name: '紀錄專家', icon: '📓', unlocked: appData.careLogs.length >= 20 }
      ];
      const title = titleForLevel(level);
      return { xp, level, currentXp, nextXp, streak, badges, unlockedBadges: badges.filter(b => b.unlocked), title };
    }

    function alreadyObservedToday(id) {
      return appData.careLogs.some(l => l.plantId === id && l.type === '觀察' && l.date === todayISO());
    }



    function academySettings() {
      if (!appData.settings) appData.settings = blankData().settings;
      if (!appData.settings.academy) appData.settings.academy = blankData().settings.academy;
      if (!appData.settings.academy.answeredQuizDates) appData.settings.academy.answeredQuizDates = {};
      if (!appData.settings.academy.readCards) appData.settings.academy.readCards = {};
      if (!appData.settings.academy.plantFunFactDates) appData.settings.academy.plantFunFactDates = {};
      return appData.settings.academy;
    }

    function titleForLevel(level) {
      return titleStages.find(s => level >= s.min && level <= s.max) || titleStages[titleStages.length - 1];
    }

    function dailyIndex(length, salt = 0) {
      const digits = todayISO().replaceAll('-', '');
      return (Number(digits) + salt) % length;
    }

    function dailyQuiz() {
      return quizBank[dailyIndex(quizBank.length, 3)];
    }

    function dailyKnowledgeCard() {
      return knowledgeCards[dailyIndex(knowledgeCards.length, 7)];
    }

    function dailyPlantFunFact() {
      const candidates = plantDatabase.map(ensurePlantKnowledge).filter(plant => plant.funFact);
      return candidates[dailyIndex(candidates.length, 11)] || ensurePlantKnowledge(plantDatabase[0]);
    }

    function answeredQuizToday() {
      return academySettings().answeredQuizDates[todayISO()];
    }

    function skillProgress(skillKey) {
      const logs = appData.careLogs;
      const observations = logs.filter(l => l.type === '觀察').length;
      const waters = logs.filter(l => l.type === '澆水').length;
      const diagnostics = logs.filter(l => (l.note || '').includes('診斷') || l.type === '除蟲').length;
      const quizzes = logs.filter(l => ['知識測驗', LEGACY_KNOWLEDGE_TEST_TYPE].includes(l.type)).length;
      const reads = Object.values(academySettings().readCards || {}).filter(Boolean).length;
      const plants = appData.plants.length;
      const map = {
        water: Math.min(100, observations * 10 + waters * 8),
        light: Math.min(100, observations * 8 + reads * 6),
        soil: Math.min(100, waters * 6 + plants * 8 + reads * 5),
        growth: Math.min(100, logs.filter(l => ['施肥','修剪','換盆'].includes(l.type)).length * 18 + reads * 5),
        diagnosis: Math.min(100, diagnostics * 18 + quizzes * 10),
        record: Math.min(100, logs.length * 5)
      };
      return map[skillKey] || 0;
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2400);
    }

    function escapeHTML(str) {
      return String(str ?? '').replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
    }

    function selectedAttr(value, expected) {
      return value === expected ? 'selected' : '';
    }

    function setScreen(name) {
      document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
      document.getElementById(`screen-${name}`).classList.add('active');
      document.querySelectorAll('.nav button').forEach(btn => btn.classList.remove('active'));
      const navMap = { today: 'today', plants: 'plants', add: 'plants', detail: 'plants', log: 'plants', diagnosis: 'diagnosis', 'diagnosis-result': 'diagnosis', knowledge: 'knowledge', 'knowledge-detail': 'knowledge', academy: 'analysis', analysis: 'analysis', settings: 'settings' };
      const activeNav = document.querySelector(`[data-nav="${navMap[name]}"]`);
      if (activeNav) activeNav.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderAll() {
      renderToday();
      renderPlants();
      renderAdd();
      renderDiagnosis();
      renderKnowledge();
      renderAcademy();
      renderAnalysis();
      renderSettings();
      renderOnboarding();
      if (selectedPlantId) renderDetail(selectedPlantId);
      if (selectedPlantId) renderLog(selectedPlantId);
      if (selectedKnowledge) renderKnowledgeDetail(selectedKnowledge);
      if (selectedSymptom) renderDiagnosisResult(selectedSymptom);
    }




    function starterQuestStatus() {
      const quizDone = Boolean(answeredQuizToday());
      const card = dailyKnowledgeCard();
      const readDone = Boolean(academySettings().readCards[card.id]);
      const observeDone = appData.careLogs.some(l => l.type === '觀察');
      return [
        { icon: '🪴', title: '建立收藏資料', desc: '建立植物收藏與環境參數。', done: appData.plants.length > 0, action: "setScreen('add')", button: '建立收藏' },
        { icon: '👀', title: '完成狀態觀察', desc: '用紀錄支持照護判斷。', done: observeDone, action: appData.plants[0] ? `quickObserve('${appData.plants[0].id}')` : "setScreen('add')", button: appData.plants[0] ? '記錄觀察' : '建立收藏' },
        { icon: '🧠', title: '完成今日判讀題', desc: '用情境題練習鑑別診斷。', done: quizDone, action: "setScreen('academy')", button: '去判讀' },
        { icon: '📗', title: '閱讀今日知識卡', desc: '補強照護觀念與植物知識。', done: readDone, action: "setScreen('academy')", button: '看知識卡' }
      ];
    }

    function renderStarterQuest() {
      const quests = starterQuestStatus();
      const done = quests.filter(q => q.done).length;
      return `
        <div class="card top-quest">
          <div class="row">
            <div>
              <h3>收藏系統建立</h3>
              <p class="hint">建立資料、觀察紀錄與知識基準，讓後續分析更可靠。</p>
            </div>
            <span class="level-pill">${done}/4</span>
          </div>
          <div class="mini-bar"><div class="mini-fill" style="--value:${done * 25}%"></div></div>
          ${quests.map(q => `<div class="quest-item ${q.done ? 'done' : ''}">
            <div class="quest-check">${q.done ? '✅' : q.icon}</div>
            <div style="flex:1"><strong>${q.title}</strong><p class="hint">${q.desc}</p></div>
            ${q.done ? '' : `<button class="small secondary" onclick="${q.action}">${q.button}</button>`}
          </div>`).join('')}
        </div>`;
    }

    function renderOnboarding() {
      const el = document.getElementById('onboarding');
      const completed = appData.settings && appData.settings.onboardingCompleted;
      if (completed) { el.classList.remove('show'); el.innerHTML = ''; return; }
      el.innerHTML = `
        <div class="onboarding-panel">
          <h2>植物收藏管理系統</h2>
          <p class="subtitle">追蹤環境參數、照護紀錄與診斷判斷，建立自己的收藏管理資料庫。</p>
          <div class="onboarding-step"><div class="step-icon">🪴</div><div><strong>1. 建立收藏資料</strong><p class="hint">記錄介質、盆器、光照、通風、濕度與栽培環境。</p></div></div>
          <div class="onboarding-step"><div class="step-icon">👀</div><div><strong>2. 追蹤狀態變化</strong><p class="hint">用觀察紀錄建立照護判斷，而不是只靠固定週期。</p></div></div>
          <div class="onboarding-step"><div class="step-icon">📊</div><div><strong>3. 查看分析與能力系統</strong><p class="hint">用紀錄、知識卡與判讀題累積照護熟練度。</p></div></div>
          <button class="full" onclick="finishOnboarding()">開始使用</button>
        </div>`;
      el.classList.add('show');
    }

    function finishOnboarding() {
      appData.settings.onboardingCompleted = true;
      saveData();
      renderAll();
      setScreen('add');
      showToast('先建立一筆植物收藏資料。');
    }

    function resetOnboarding() {
      appData.settings.onboardingCompleted = false;
      saveData();
      renderOnboarding();
    }

    function renderDailyTraining() {
      const quiz = dailyQuiz();
      const card = dailyKnowledgeCard();
      const plantFact = dailyPlantFunFact();
      const answered = answeredQuizToday();
      const read = academySettings().readCards[card.id];
      const factRead = academySettings().plantFunFactDates[todayISO()];
      return `
        <div class="card game-card">
          <h3>今日照護判斷</h3>
          <p class="hint">以狀態追蹤、環境參數與紀錄分析做照護決策。</p>
          <div class="divider"></div>
          <p>🧠 今日知識測驗：${answered ? '已完成' : quiz.q}</p>
          <p class="hint">📗 今日知識卡：${card.category}｜${escapeHTML(card.title)} ${read ? '（已閱讀）' : ''}</p>
          <p class="hint">🌿 今日植物趣事：${escapeHTML(plantFact.name)} ${factRead ? '（已閱讀）' : ''}</p>
          <div class="actions">
            <button class="small" onclick="setScreen('academy')">進入能力系統</button>
          </div>
        </div>`;
    }

    function renderDailyPlantFunFactCard() {
      const plantFact = dailyPlantFunFact();
      const factRead = academySettings().plantFunFactDates[todayISO()];
      return `<div class="card">
          <h3>今日植物趣事</h3>
          <p class="subtitle">${escapeHTML(plantFact.name)}｜${escapeHTML(maintenanceProfile(plantFact))}</p>
          <p>${escapeHTML(plantFact.funFact)}</p>
          <div class="divider"></div>
          <p class="hint">個性：${escapeHTML(plantFact.personality)}</p>
          <p class="hint">原生棲地：${escapeHTML(plantFact.originStory)}</p>
          <button class="full ${factRead ? 'secondary' : ''}" onclick="readDailyPlantFunFact()">${factRead ? '今天已閱讀今日植物趣事' : '閱讀今日趣事｜熟練度 +4'}</button>
        </div>`;
    }

    function renderAcademy() {
      const g = gameStats();
      const quiz = dailyQuiz();
      const answered = answeredQuizToday();
      const card = dailyKnowledgeCard();
      const read = academySettings().readCards[card.id];
      document.getElementById('screen-academy').innerHTML = `
        <h2>能力系統</h2>
        <p class="subtitle">以觀察、診斷、介質理解與紀錄完整度建立照護能力。</p>
        <div class="card game-card">
          <div class="level-row">
            <div>
              <h3>Lv.${g.level}｜${g.title.title}</h3>
              <p class="hint">目前能力：${g.title.ability}</p>
            </div>
            <span class="level-pill">能力點數 ${g.xp}</span>
          </div>
          <div class="xp-bar"><div class="xp-fill" style="--xp:${g.currentXp}%"></div></div>
          <p class="hint">距離下一級還差 ${g.nextXp} 熟練度點數。</p>
        </div>

        <div class="card">
          <h3>今日照護判讀題</h3>
          ${answered ? `<p>今天已完成知識測驗。</p><p class="hint">${escapeHTML(answered.explain || '')}</p>` : `
            <p>${escapeHTML(quiz.q)}</p>
            ${quiz.options.map((o, i) => `<button class="quiz-option" onclick="answerQuiz(${i})">${String.fromCharCode(65+i)}. ${escapeHTML(o)}</button>`).join('')}
          `}
        </div>

        <div class="card">
          <span class="card-number">${card.id.replace('K','')}</span>
          <p class="hint">${escapeHTML(card.category)}</p>
          <h3>${escapeHTML(card.title)}</h3>
          <p>${escapeHTML(card.text)}</p>
          <button class="full ${read ? 'secondary' : ''}" onclick="readKnowledgeCard('${card.id}')">${read ? '已收藏這張知識卡' : '閱讀並收藏｜熟練度 +4'}</button>
        </div>

        <div class="card">
          <h3>知識卡分類</h3>
          <p class="hint">從照護觀念、原生棲地到病蟲害觀察，建立可追蹤的知識熟練度。</p>
          <div class="recommend-list">${knowledgeCardCategories.map(category => `<span class="recommend-chip">${escapeHTML(category)}</span>`).join('')}</div>
        </div>

        ${renderDailyPlantFunFactCard()}

        <div class="card">
          <h3>照護能力熟練度</h3>
          <p class="hint">熟練度來自觀察、紀錄、測驗、診斷與正確照護決策。</p>
          <div class="academy-grid">
            ${skillDefs.map(skill => {
              const value = skillProgress(skill.key);
              const lv = Math.floor(value / 20) + 1;
              return `<div class="skill-card">
                <div class="skill-head"><strong>${skill.icon} ${skill.name}</strong><span class="level-pill">Lv.${Math.min(lv,5)}</span></div>
                <p class="hint">${skill.desc}</p>
                <div class="mini-bar"><div class="mini-fill" style="--value:${value}%"></div></div>
              </div>`;
            }).join('')}
          </div>
        </div>

        <div class="card">
          <h3>照護能力標記</h3>
          <div class="badge-grid">${g.badges.map(b => `<span class="badge-pill ${b.unlocked ? '' : 'locked'}">${b.icon} ${b.name}</span>`).join('')}</div>
        </div>`;
    }

    function answerQuiz(choiceIndex) {
      const academy = academySettings();
      if (academy.answeredQuizDates[todayISO()]) {
        showToast('今天已經完成知識測驗。');
        return;
      }
      const quiz = dailyQuiz();
      const correct = choiceIndex === quiz.answer;
      academy.answeredQuizDates[todayISO()] = { correct, choiceIndex, explain: quiz.explain };
      appData.careLogs.push({ id: uid('log'), plantId: null, type: correct ? '知識測驗' : '學習', date: todayISO(), note: `今日知識測驗：${correct ? '答對' : '答錯'}。${quiz.explain}`, createdAt: new Date().toISOString() });
      saveData();
      renderAll();
      setScreen('academy');
      showToast(correct ? '答對了，熟練度 +8。' : '答錯沒關係，已記錄判讀練習，熟練度 +2。');
    }

    function readKnowledgeCard(cardId) {
      const academy = academySettings();
      if (academy.readCards[cardId]) {
        showToast('這張知識卡已經收藏。');
        return;
      }
      const card = knowledgeCards.find(c => c.id === cardId);
      academy.readCards[cardId] = true;
      appData.careLogs.push({ id: uid('log'), plantId: null, type: '知識卡', date: todayISO(), note: `收藏知識卡：${card ? card.title : cardId}`, createdAt: new Date().toISOString() });
      saveData();
      renderAll();
      setScreen('academy');
      showToast('已收藏知識卡，熟練度 +4。');
    }

    function readDailyPlantFunFact() {
      const academy = academySettings();
      if (academy.plantFunFactDates[todayISO()]) {
        showToast('今天已經閱讀過植物趣事。');
        return;
      }
      const plant = dailyPlantFunFact();
      academy.plantFunFactDates[todayISO()] = plant.name;
      appData.careLogs.push({ id: uid('log'), plantId: null, type: '植物趣事', date: todayISO(), note: `今日植物趣事：${plant.name}。${plant.funFact}`, createdAt: new Date().toISOString() });
      saveData();
      renderAll();
      setScreen('academy');
      showToast('已閱讀今日植物趣事，熟練度 +4。');
    }

    function renderToday() {
      const plants = appData.plants;
      const needs = plants.filter(plantNeedsWater);
      const watch = plants.filter(p => p.healthStatus && p.healthStatus !== '健康');
      const stable = plants.filter(p => !plantNeedsWater(p) && (!p.healthStatus || p.healthStatus === '健康'));
      const summary7 = logsWithinDays(7);
      const html = `
        <h2>植物收藏總覽</h2>
        <p class="subtitle">今天是 ${formatDate(todayISO())}｜以環境參數與狀態追蹤做照護判斷。</p>
        ${renderGameSummary()}
        ${renderDailyTraining()}
        <div class="soft-card">
          <h3>收藏狀態摘要</h3>
          <div class="grid-3">
            <div class="stat"><strong>${plants.length}</strong><span>收藏植物數</span></div>
            <div class="stat"><strong>${needs.length}</strong><span>今日需檢查水分</span></div>
            <div class="stat"><strong>${watch.length}</strong><span>異常觀察數</span></div>
            <div class="stat"><strong>${summary7.length}</strong><span>近 7 天紀錄</span></div>
            <div class="stat"><strong>Lv.${gameStats().level}</strong><span>熟練度等級</span></div>
            <div class="stat"><strong>${stable.length}</strong><span>狀態穩定</span></div>
          </div>
        </div>
        ${plants.length === 0 ? `
          <div class="card empty">
            <h3>尚未建立收藏</h3>
            <p>建立植物收藏後，可追蹤介質、盆器、光照、通風、濕度與照護紀錄。</p>
            <button class="full" onclick="setScreen('add')">+ 建立收藏</button>
          </div>` : ''}
        ${plants.map(p => todayPlantCard(p)).join('')}
        <div class="card">
          <h3>今日照護判斷</h3>
          <p>先確認介質乾濕、盆重、葉片張力與近期環境變化，再決定是否澆水、移位或進一步診斷。</p>
        </div>`;
      document.getElementById('screen-today').innerHTML = html;
    }

    function renderGameSummary() {
      const g = gameStats();
      const badges = g.unlockedBadges.length ? g.unlockedBadges.slice(0, 3).map(b => `<span class="badge-pill">${b.icon} ${b.name}</span>`).join('') : '<span class="badge-pill locked">尚未獲得能力成就</span>';
      return `
        <div class="card game-card">
          <div class="level-row">
            <div>
              <h3>目前能力熟練度｜Lv.${g.level}</h3>
              <p class="hint">${g.title.ability}。以觀察紀錄、診斷判斷與知識卡建立照護能力。</p>
            </div>
            <span class="level-pill">熟練度 ${g.currentXp}%</span>
          </div>
          <div class="xp-bar"><div class="xp-fill" style="--xp:${g.currentXp}%"></div></div>
          <p class="hint">能力點數 ${g.xp}｜距離下一級還差 ${g.nextXp}｜連續追蹤 ${g.streak} 天</p>
          <div class="badge-grid">${badges}</div>
        </div>`;
    }

    function todayPlantCard(p) {
      const info = getPlantInfo(p.name);
      const next = nextWaterDate(p);
      const needsWater = plantNeedsWater(p);
      const abnormal = p.healthStatus && p.healthStatus !== '健康';
      const advice = abnormal ? `目前狀態是「${escapeHTML(p.healthStatus)}」，建議進行鑑別診斷。` : needsWater ? '今日列入水分檢查清單；請確認介質 2 公分以下偏乾、盆重變輕再澆。' : `目前不需急著澆水。建議 ${formatDate(next)} 再檢查。`;
      return `
        <div class="card">
          <div class="row">
            <div>
              <div class="plant-title">🪴 ${escapeHTML(p.name)}「${escapeHTML(p.nickname || '未命名')}」</div>
              <div class="meta">${escapeHTML(p.location || '未設定位置')}｜${escapeHTML(p.light || info.light)}</div>
            </div>
            <span>${abnormal ? '👀' : needsWater ? '💧' : '🌿'}</span>
          </div>
          <p class="hint">管理難度：${escapeHTML(maintenanceProfile(p))}｜介質：${escapeHTML(environmentValue(p, 'substrateType', '未記錄'))}｜通風：${escapeHTML(environmentValue(p, 'ventilation', '未記錄'))}</p>
          <p class="hint">上次澆水：${formatDate(p.lastWateredAt)}｜下次建議：${formatDate(next)}</p>
          <p style="margin-top:10px;">${advice}</p>
          <div class="actions">
            <button class="small secondary" onclick="quickObserve('${p.id}')">記錄觀察</button>
            <button class="small" onclick="quickWater('${p.id}')">記錄澆水</button>
            <button class="small secondary" onclick="openDetail('${p.id}')">查看</button>
          </div>
        </div>`;
    }

    function renderPlants() {
      const html = `
        <div class="row">
          <div>
            <h2>植物收藏</h2>
            <p class="subtitle">目前管理 ${appData.plants.length} 筆植物收藏與環境參數</p>
          </div>
          <button class="small" onclick="setScreen('add')">+ 建立收藏</button>
        </div>
        ${appData.plants.length === 0 ? `<div class="card empty"><h3>尚未建立植物收藏</h3><p>建立收藏後可追蹤介質、盆器、光照、通風、濕度與狀態。</p><button class="full" onclick="setScreen('add')">建立收藏</button></div>` : ''}
        ${appData.plants.map(p => {
          const info = getPlantInfo(p.name);
          return `
          <div class="card">
            <div class="plant-title">🪴 ${escapeHTML(p.name)}</div>
            <p class="meta">暱稱：${escapeHTML(p.nickname || '未命名')}</p>
            <p class="meta">位置：${escapeHTML(p.location || '未設定')}</p>
            <div class="divider"></div>
            <p>管理難度 / 養護型態：${escapeHTML(maintenanceProfile(p))}</p>
            <p>介質：${escapeHTML(environmentValue(p, 'substrateType', '未記錄'))}｜盆器：${escapeHTML(environmentValue(p, 'potMaterial', p.potSize || '未記錄'))}</p>
            <p>光照：${escapeHTML(p.light || info.light)}｜通風：${escapeHTML(environmentValue(p, 'ventilation', '未記錄'))}｜濕度：${escapeHTML(environmentValue(p, 'humidity', '未記錄'))}</p>
            <p>上次澆水：${formatDate(p.lastWateredAt)}</p>
            <p>狀態：${escapeHTML(p.healthStatus || '健康')}</p>
            <div class="actions"><button class="secondary" onclick="openDetail('${p.id}')">查看詳情</button></div>
          </div>`;
        }).join('')}`;
      document.getElementById('screen-plants').innerHTML = html;
    }

    function renderAdd() {
      if (!getPlantInfo(selectedAddPlantName)) selectedAddPlantName = plantDatabase[0].name;
      document.getElementById('screen-add').innerHTML = `
        <h2>新增收藏植物</h2>
        <p class="subtitle">建立收藏資料，記錄環境參數、介質策略與照護基準。</p>
        <div class="card">
          <label>搜尋植物</label>
          <div class="finder-tools">
            <input id="add-plant-search" placeholder="搜尋植物，例如：黃金葛、蘭、薄荷、仙人掌" value="${escapeHTML(addPlantSearch)}" oninput="setAddPlantSearch(this.value)" />
            <label style="margin:0;">管理難度 / 養護型態</label>
            <div class="category-row">
              ${maintenanceCategories.map(c => `<button type="button" class="small ${selectedAddCategory === c ? '' : 'light'}" onclick="setAddPlantCategory('${c}')">${c}</button>`).join('')}
            </div>
            <div id="add-selected-plant" class="selected-plant"></div>
            <p id="add-result-count" class="result-count"></p>
            <div id="add-plant-picker" class="plant-picker"></div>
          </div>
          <label>植物暱稱</label>
          <input id="add-nickname" placeholder="例如：小綠" />
          <label>放置位置</label>
          <input id="add-location" placeholder="例如：客廳窗邊" />
          <label>光照程度</label>
          <select id="add-light"><option>強光</option><option selected>明亮散射光</option><option>半日照</option><option>陰暗</option></select>
          <label>盆器大小</label>
          <select id="add-pot"><option>小盆</option><option selected>中盆</option><option>大盆</option></select>
          <label>盆器</label>
          <select id="add-pot-material"><option>塑膠盆</option><option>陶盆</option><option>素燒盆</option><option>控根盆</option><option>水耕容器</option><option>其他</option></select>
          <label>土壤排水狀況</label>
          <select id="add-soil"><option selected>良好</option><option>普通</option><option>容易積水</option></select>
          <label>介質</label>
          <select id="add-substrate"><option>培養土</option><option>多肉土</option><option>顆粒介質</option><option>水苔</option><option>樹皮混合</option><option>無介質</option><option>其他</option></select>
          <label>通風</label>
          <select id="add-ventilation"><option selected>良好</option><option>普通</option><option>悶</option></select>
          <label>濕度</label>
          <select id="add-humidity"><option>乾燥</option><option selected>普通</option><option>潮濕</option><option>高濕</option></select>
          <label>栽培環境</label>
          <select id="add-growing-setup"><option selected>室內</option><option>陽台</option><option>戶外</option><option>高濕箱</option><option>溫室</option><option>水耕</option></select>
          <label>上次澆水日期</label>
          <input id="add-watered" type="date" value="${todayISO()}" />
          <label>目前狀態</label>
          <select id="add-health"><option selected>健康</option><option>葉黃</option><option>下垂</option><option>蟲害</option><option>不確定</option></select>
          <label>備註</label>
          <textarea id="add-notes" placeholder="例如：最近長新葉"></textarea>
          <button class="full" onclick="createPlant()">建立植物</button>
        </div>`;
      renderAddPlantPicker();
    }

    function setAddPlantCategory(category) {
      selectedAddCategory = category;
      renderAdd();
    }

    function setAddPlantSearch(value) {
      addPlantSearch = value;
      renderAddPlantPicker();
    }

    function chooseAddPlant(name) {
      selectedAddPlantName = name;
      renderAddPlantPicker();
    }

    function renderAddPlantPicker() {
      const picker = document.getElementById('add-plant-picker');
      const selectedBox = document.getElementById('add-selected-plant');
      const count = document.getElementById('add-result-count');
      if (!picker || !selectedBox || !count) return;
      const selected = getPlantInfo(selectedAddPlantName);
      const list = filterPlantDatabase(selectedAddCategory, addPlantSearch);
      selectedBox.innerHTML = `
        <strong>目前選擇：${escapeHTML(selected.name)}</strong>
        <p class="hint">管理難度：${escapeHTML(maintenanceProfile(selected))}｜約 ${selected.interval} 天檢查水分</p>`;
      count.textContent = `找到 ${list.length} 種植物`;
      picker.innerHTML = list.length ? list.map(p => `
        <button type="button" class="plant-option ${p.name === selectedAddPlantName ? 'active' : ''}" onclick='chooseAddPlant(${JSON.stringify(p.name)})'>
          <span><strong>${escapeHTML(p.name)}</strong><small>養護型態：${escapeHTML(maintenanceProfile(p))}｜${escapeHTML(p.light)}</small></span>
          <span>${p.name === selectedAddPlantName ? '✓' : '›'}</span>
        </button>`).join('') : `<div class="empty"><h3>找不到植物</h3><p>可以換個關鍵字，例如「蘭」「蕨」「多肉」「薄荷」。</p></div>`;
    }

    function createPlant() {
      const name = selectedAddPlantName || plantDatabase[0].name;
      const info = getPlantInfo(name);
      const now = new Date().toISOString();
      const plant = {
        id: uid('plant'),
        name,
        nickname: document.getElementById('add-nickname').value.trim(),
        location: document.getElementById('add-location').value.trim(),
        light: document.getElementById('add-light').value,
        potSize: document.getElementById('add-pot').value,
        potMaterial: document.getElementById('add-pot-material').value,
        soilDrainage: document.getElementById('add-soil').value,
        substrateType: document.getElementById('add-substrate').value,
        ventilation: document.getElementById('add-ventilation').value,
        humidity: document.getElementById('add-humidity').value,
        growingSetup: document.getElementById('add-growing-setup').value,
        lastWateredAt: document.getElementById('add-watered').value || todayISO(),
        waterIntervalDays: info.interval,
        easeLevel: getEaseLevel(info),
        healthStatus: document.getElementById('add-health').value,
        notes: document.getElementById('add-notes').value.trim(),
        createdAt: now,
        updatedAt: now
      };
      appData.plants.push(plant);
      saveData();
      renderAll();
      showToast(`已新增 ${plant.name}「${plant.nickname || '未命名'}」，資料已自動儲存。`);
      selectedPlantId = plant.id;
      renderDetail(plant.id);
      setScreen('detail');
    }

    function openDetail(id) {
      selectedPlantId = id;
      renderDetail(id);
      setScreen('detail');
    }

    function renderDetail(id) {
      const p = appData.plants.find(x => x.id === id);
      if (!p) return;
      const info = getPlantInfo(p.name);
      const logs = appData.careLogs.filter(l => l.plantId === id).sort((a,b) => b.date.localeCompare(a.date));
      const summary30 = careSummary30Days(id);
      document.getElementById('screen-detail').innerHTML = `
        <button class="light small" onclick="setScreen('plants')">← 返回</button>
        <div class="card">
          <h2>${escapeHTML(p.name)}「${escapeHTML(p.nickname || '未命名')}」</h2>
          <p class="subtitle">${escapeHTML(p.location || '未設定位置')}｜${escapeHTML(p.light || info.light)}</p>
          <div class="divider"></div>
          <h3>目前狀態</h3>
          <p>🌿 ${escapeHTML(p.healthStatus || '健康')}</p>
          <p>⭐ 管理難度：${escapeHTML(maintenanceProfile(p))}｜水分檢查基準：約 ${p.waterIntervalDays || info.interval} 天</p>
          <p>上次澆水：${formatDate(p.lastWateredAt)}</p>
          <p>建議下次檢查：${formatDate(nextWaterDate(p))}</p>
          <div class="actions">
            <button onclick="quickWater('${p.id}')">記錄澆水</button>
            <button class="secondary" onclick="openLog('${p.id}')">新增紀錄</button>
          </div>
        </div>
        <div class="card">
          <h3>目前環境參數</h3>
          <p>栽培環境：${escapeHTML(environmentValue(p, 'growingSetup', '未記錄'))}</p>
          <p>介質：${escapeHTML(environmentValue(p, 'substrateType', '未記錄'))}｜盆器：${escapeHTML(environmentValue(p, 'potMaterial', p.potSize || '未記錄'))}</p>
          <p>光照：${escapeHTML(p.light || info.light)}｜通風：${escapeHTML(environmentValue(p, 'ventilation', '未記錄'))}｜濕度：${escapeHTML(environmentValue(p, 'humidity', '未記錄'))}</p>
        </div>
        <div class="card">
          <h3>編輯環境參數</h3>
          <label>通風</label>
          <select id="edit-ventilation"><option ${selectedAttr(p.ventilation, '良好')}>良好</option><option ${selectedAttr(p.ventilation, '普通')}>普通</option><option ${selectedAttr(p.ventilation, '悶')}>悶</option></select>
          <label>濕度</label>
          <select id="edit-humidity"><option ${selectedAttr(p.humidity, '乾燥')}>乾燥</option><option ${selectedAttr(p.humidity || '普通', '普通')}>普通</option><option ${selectedAttr(p.humidity, '潮濕')}>潮濕</option><option ${selectedAttr(p.humidity, '高濕')}>高濕</option></select>
          <label>盆器</label>
          <select id="edit-pot-material"><option ${selectedAttr(p.potMaterial, '塑膠盆')}>塑膠盆</option><option ${selectedAttr(p.potMaterial, '陶盆')}>陶盆</option><option ${selectedAttr(p.potMaterial, '素燒盆')}>素燒盆</option><option ${selectedAttr(p.potMaterial, '控根盆')}>控根盆</option><option ${selectedAttr(p.potMaterial, '水耕容器')}>水耕容器</option><option ${selectedAttr(p.potMaterial, '其他')}>其他</option></select>
          <label>介質</label>
          <select id="edit-substrate"><option ${selectedAttr(p.substrateType, '培養土')}>培養土</option><option ${selectedAttr(p.substrateType, '多肉土')}>多肉土</option><option ${selectedAttr(p.substrateType, '顆粒介質')}>顆粒介質</option><option ${selectedAttr(p.substrateType, '水苔')}>水苔</option><option ${selectedAttr(p.substrateType, '樹皮混合')}>樹皮混合</option><option ${selectedAttr(p.substrateType, '無介質')}>無介質</option><option ${selectedAttr(p.substrateType, '其他')}>其他</option></select>
          <label>栽培環境</label>
          <select id="edit-growing-setup"><option ${selectedAttr(p.growingSetup, '室內')}>室內</option><option ${selectedAttr(p.growingSetup, '陽台')}>陽台</option><option ${selectedAttr(p.growingSetup, '戶外')}>戶外</option><option ${selectedAttr(p.growingSetup, '高濕箱')}>高濕箱</option><option ${selectedAttr(p.growingSetup, '溫室')}>溫室</option><option ${selectedAttr(p.growingSetup, '水耕')}>水耕</option></select>
          <button class="full secondary" onclick="savePlantEnvironment('${p.id}')">更新環境參數</button>
        </div>
        <div class="card">
          <h3>專業照護資訊</h3>
          <p>🌏 原生棲地：${escapeHTML(info.nativeHabitat || info.originStory)}</p>
          <p>🪴 介質偏好：${escapeHTML(info.substratePreference || `依 ${maintenanceProfile(p)} 管理，確保排水、保水與根系通氣平衡。`)}</p>
          <p>💧 澆水策略：${escapeHTML(info.wateringStrategy || info.watering)}</p>
          <p>☀️ 光照策略：${escapeHTML(info.lightStrategy || info.light)}</p>
          <p>⚠️ 常見錯誤：${escapeHTML(info.commonMistakes || '固定照日期澆水、忽略通風與盆器排水、未追蹤新葉與根系反應。')}</p>
          <p>🔬 進階照護：${escapeHTML(info.advancedCare || info.expertNote)}</p>
        </div>
        <div class="card">
          <h3>最近 30 天照護摘要</h3>
          <p>澆水：${summary30.waters} 次｜觀察：${summary30.observations} 次｜施肥：${summary30.fertilizers} 次</p>
          <p>異常紀錄：${summary30.abnormal} 筆｜平均澆水間隔：${summary30.avgWaterInterval}</p>
          <p>最常照護類型：${escapeHTML(summary30.topType)}</p>
        </div>
        <div class="card">
          <h3>植物知識與趣事</h3>
          <p>🏷️ 個性：${escapeHTML(info.personality)}</p>
          <p>🌏 原生地故事：${escapeHTML(info.originStory)}</p>
          <p>✨ 植物趣事：${escapeHTML(info.funFact)}</p>
          <p>🌱 照護提醒：${escapeHTML(info.beginnerTip)}</p>
          <p>🔎 進階觀察：${escapeHTML(info.expertNote)}</p>
        </div>
        ${renderAirPlantReminder(info)}
        <div class="card">
          <h3>照護紀錄</h3>
          ${logs.length === 0 ? '<p class="hint">尚無照護紀錄。</p>' : logs.map(l => `<div class="list-log"><strong>${formatDate(l.date)}｜${escapeHTML(l.type)}</strong><p class="hint">${escapeHTML(l.note || '無備註')}</p></div>`).join('')}
          <button class="full secondary" onclick="openLog('${p.id}')">+ 新增紀錄</button>
        </div>
        <button class="full danger" onclick="deletePlant('${p.id}')">刪除此植物</button>`;
    }

    function openLog(id) {
      selectedPlantId = id;
      renderLog(id);
      setScreen('log');
    }

    function savePlantEnvironment(id) {
      const p = appData.plants.find(x => x.id === id);
      if (!p) return;
      p.ventilation = document.getElementById('edit-ventilation').value;
      p.humidity = document.getElementById('edit-humidity').value;
      p.potMaterial = document.getElementById('edit-pot-material').value;
      p.substrateType = document.getElementById('edit-substrate').value;
      p.growingSetup = document.getElementById('edit-growing-setup').value;
      p.updatedAt = new Date().toISOString();
      saveData();
      renderAll();
      renderDetail(id);
      showToast('環境參數已更新。');
    }

    function renderLog(id) {
      const p = appData.plants.find(x => x.id === id);
      if (!p) return;
      document.getElementById('screen-log').innerHTML = `
        <button class="light small" onclick="openDetail('${id}')">← 返回</button>
        <h2>新增照護紀錄</h2>
        <p class="subtitle">${escapeHTML(p.name)}「${escapeHTML(p.nickname || '未命名')}」</p>
        <div class="card">
          <label>照護類型</label>
          <select id="log-type"><option>澆水</option><option>施肥</option><option>修剪</option><option>換盆</option><option>除蟲</option><option>觀察</option></select>
          <label>日期</label>
          <input id="log-date" type="date" value="${todayISO()}" />
          <label>備註</label>
          <textarea id="log-note" placeholder="例如：土壤變乾，澆到盆底出水"></textarea>
          <p class="hint">記錄澆水前，請先摸土，確認土壤 2 公分以下偏乾再澆。</p>
          <button class="full" onclick="saveLog('${id}')">儲存紀錄</button>
        </div>`;
    }

    function saveLog(id) {
      const type = document.getElementById('log-type').value;
      const date = document.getElementById('log-date').value || todayISO();
      const note = document.getElementById('log-note').value.trim();
      const repeatWatering = type === '澆水' && hasWateredWithin24Hours(id);
      if (repeatWatering && !confirmRepeatWateringIfNeeded(id)) return;
      const result = recordCareLog({ plantId: id, type, date, note, forceNoPoints: repeatWatering });
      if (type === '澆水') {
        const p = appData.plants.find(x => x.id === id);
        if (p) { p.lastWateredAt = date; p.updatedAt = new Date().toISOString(); }
      }
      saveData();
      renderAll();
      openDetail(id);
      toastCareLogResult(result);
    }

    function quickObserve(id) {
      const p = appData.plants.find(x => x.id === id);
      const result = recordCareLog({ plantId: id, type: '觀察', date: todayISO(), note: '今日任務：完成植物觀察。' });
      if (p) p.updatedAt = new Date().toISOString();
      saveData();
      renderAll();
      if (selectedPlantId === id) renderDetail(id);
      toastCareLogResult(result);
    }

    function quickWater(id) {
      const repeatWatering = hasWateredWithin24Hours(id);
      if (repeatWatering && !confirmRepeatWateringIfNeeded(id)) return;
      const result = recordCareLog({ plantId: id, type: '澆水', date: todayISO(), note: '快速記錄澆水。', forceNoPoints: repeatWatering });
      const p = appData.plants.find(x => x.id === id);
      if (p) { p.lastWateredAt = todayISO(); p.updatedAt = new Date().toISOString(); }
      saveData();
      renderAll();
      if (selectedPlantId === id) renderDetail(id);
      toastCareLogResult(result);
    }

    function deletePlant(id) {
      if (!confirm('確定要刪除此植物嗎？相關照護紀錄也會刪除。')) return;
      appData.plants = appData.plants.filter(p => p.id !== id);
      appData.careLogs = appData.careLogs.filter(l => l.plantId !== id);
      saveData();
      selectedPlantId = null;
      renderAll();
      showToast('植物已刪除。');
      setScreen('plants');
    }

    function renderDiagnosis() {
      document.getElementById('screen-diagnosis').innerHTML = `
        <h2>鑑別診斷</h2>
        <p class="subtitle">以症狀、環境參數與近期照護紀錄進行判讀。</p>
        <div class="card">
          ${Object.keys(symptomDatabase).map(s => `<div class="symptom-item" onclick="openDiagnosisResult('${s}')"><span>${escapeHTML(s)}</span><span>›</span></div>`).join('')}
        </div>
        <div class="soft-card">
          <h3>判讀原則</h3>
          <p>先排除水分、根系、光照與通風，再考慮肥料或病蟲害處置。</p>
        </div>`;
    }

    function openDiagnosisResult(symptom) {
      selectedSymptom = symptom;
      renderDiagnosisResult(symptom);
      setScreen('diagnosis-result');
    }

    function renderDiagnosisResult(symptom) {
      const s = symptomDatabase[symptom];
      if (!s) return;
      document.getElementById('screen-diagnosis-result').innerHTML = `
        <button class="light small" onclick="setScreen('diagnosis')">← 返回診斷</button>
        <div class="card">
          <h2>鑑別診斷：${escapeHTML(symptom)}</h2>
          <h3>鑑別診斷</h3>
          <p>${s.causes.map((c, i) => `${i + 1}. ${escapeHTML(c)}`).join('<br>')}</p>
          <div class="divider"></div>
          <h3>追問清單</h3>
          <p>1. 最近 7 天是否澆水或換位置？<br>2. 介質是否長期潮濕或完全乾透？<br>3. 光照、通風、濕度是否近期改變？<br>4. 葉背、莖節與盆土表面是否有蟲害或霉味？</p>
          <div class="divider"></div>
          <h3>優先排除項目</h3>
          <p>水分失衡 → 根系缺氧 → 光照不符 → 通風不足 → 病蟲害。</p>
          <div class="divider"></div>
          <h3>今日處置</h3>
          <p>${s.today.map((c, i) => `${i + 1}. ${escapeHTML(c)}`).join('<br>')}</p>
          <div class="divider"></div>
          <h3>7 天觀察指標</h3>
          <p>${escapeHTML(s.plan)}</p>
          <div class="divider"></div>
          <h3>風險等級與警訊</h3>
          <p>${escapeHTML(s.severity)}</p>
          <p class="warning">${escapeHTML(s.warning)}</p>
        </div>`;
    }

    function renderBuyingGuide() {
      return `<div class="card">
        <h3>尚未建立收藏？可從低維護品種開始</h3>
        <p class="hint">若要建立穩定的收藏基準，可先選擇黃金葛、虎尾蘭、金錢樹、吊蘭等容錯率高的品種。</p>
      </div>`;
    }

    function renderKnowledge() {
      document.getElementById('screen-knowledge').innerHTML = `
        <h2>植物資料庫</h2>
        <p class="subtitle">以管理難度、養護型態、原生棲地與照護策略查詢植物資料。</p>
        ${appData.plants.length === 0 ? renderBuyingGuide() : ''}
        <div class="card">
          <h3>搜尋植物</h3>
          <input id="knowledge-search" placeholder="搜尋植物，例如：蘭、蕨、多肉、香草" value="${escapeHTML(knowledgeSearch)}" oninput="setKnowledgeSearch(this.value)" />
          <label style="margin-bottom:0;">管理難度 / 養護型態</label>
          <div class="category-row" style="margin-top:10px;">
            ${maintenanceCategories.map(c => `<button type="button" class="small ${selectedKnowledgeCategory === c ? '' : 'light'}" onclick="setKnowledgeCategory('${c}')">${c}</button>`).join('')}
          </div>
          <p id="knowledge-result-count" class="result-count"></p>
          <div id="knowledge-list"></div>
        </div>`;
      renderKnowledgeList();
    }

    function setKnowledgeCategory(category) {
      selectedKnowledgeCategory = category;
      renderKnowledge();
    }

    function setKnowledgeSearch(value) {
      knowledgeSearch = value;
      renderKnowledgeList();
    }

    function renderKnowledgeList() {
      const listEl = document.getElementById('knowledge-list');
      const countEl = document.getElementById('knowledge-result-count');
      if (!listEl || !countEl) return;
      const list = filterPlantDatabase(selectedKnowledgeCategory, knowledgeSearch);
      countEl.textContent = `找到 ${list.length} 種植物`;
      listEl.innerHTML = list.length ? list.map(p => `<div class="knowledge-item" onclick='openKnowledge(${JSON.stringify(p.name)})'><div><strong>${p.name}</strong><span class="ease-pill">${escapeHTML(maintenanceProfile(p))}</span><p class="hint">${escapeHTML(getPlantCategory(p))}｜約 ${p.interval} 天檢查水分</p></div><span>›</span></div>`).join('') : `<div class="empty"><h3>找不到植物</h3><p>可以換管理難度，或搜尋「蘭」「竹芋」「仙人掌」「香草」。</p></div>`;
    }

    function openKnowledge(name) {
      selectedKnowledge = name;
      renderKnowledgeDetail(name);
      setScreen('knowledge-detail');
    }

    function renderKnowledgeDetail(name) {
      const p = getPlantInfo(name);
      document.getElementById('screen-knowledge-detail').innerHTML = `
        <button class="light small" onclick="setScreen('knowledge')">← 返回植物資料庫</button>
        <div class="card">
          <h2>${escapeHTML(p.name)}</h2>
          <p class="subtitle">管理難度：${escapeHTML(maintenanceProfile(p))}</p><span class="ease-pill">${escapeHTML(getEaseAdvice(p))}</span>
          <div class="divider"></div>
          <h3>適合誰</h3>
          <p>${escapeHTML(getSuitableFor(p))}</p>
          <div class="divider"></div>
          <h3>個性標籤</h3>
          <p>${escapeHTML(p.personality)}</p>
          <div class="divider"></div>
          <h3>入手與配置建議</h3>
          <p>${escapeHTML(getBuyingAdvice(p))}</p>
          <div class="divider"></div>
          <h3>照護重點</h3>
          <p>${escapeHTML(p.note)}</p>
          <div class="divider"></div>
          <h3>原生棲地</h3>
          <p>${escapeHTML(p.originStory)}</p>
          <div class="divider"></div>
          <h3>介質偏好</h3>
          <p>${escapeHTML(p.substratePreference || `依 ${maintenanceProfile(p)} 管理，優先確認排水、保水與根系通氣平衡。`)}</p>
          <div class="divider"></div>
          <h3>澆水策略</h3>
          <p>${escapeHTML(p.wateringStrategy || `${p.watering}；實際操作仍以介質乾濕、盆重與葉片張力判斷。`)}</p>
          <div class="divider"></div>
          <h3>光照策略</h3>
          <p>${escapeHTML(p.lightStrategy || `${p.light}；觀察新葉大小、節間距離與葉色變化調整位置。`)}</p>
          <div class="divider"></div>
          <h3>常見錯誤</h3>
          <p>${escapeHTML(p.commonMistakes || '固定照日期澆水、忽略通風與盆器排水，或未追蹤新葉與根系反應。')}</p>
          <div class="divider"></div>
          <h3>植物趣事</h3>
          <p>${escapeHTML(p.funFact)}</p>
          <div class="divider"></div>
          <h3>配置與照護提醒</h3>
          <p>${escapeHTML(p.beginnerTip)}</p>
          <div class="divider"></div>
          <h3>進階照護</h3>
          <p>${escapeHTML(p.advancedCare || p.expertNote)}</p>
          <div class="divider"></div>
          <p>🪴 建議：大約 ${p.interval} 天檢查一次土壤，不要照天數盲目澆水。</p>
          ${renderAirPlantReminder(p)}
          <button class="full" onclick='startAddPlant(${JSON.stringify(p.name)})'>加入植物收藏</button>
        </div>`;
    }

    function startAddPlant(name) {
      const info = getPlantInfo(name);
      selectedAddPlantName = info.name;
      selectedAddCategory = maintenanceProfile(info);
      addPlantSearch = '';
      setScreen('add');
    }

    function renderAnalysis() {
      const summary = careSummary30Days();
      const abnormalPlants = appData.plants.filter(p => p.healthStatus && p.healthStatus !== '健康').length;
      const profiles = appData.plants.reduce((map, plant) => {
        const key = maintenanceProfile(plant);
        map[key] = (map[key] || 0) + 1;
        return map;
      }, {});
      document.getElementById('screen-analysis').innerHTML = `
        <h2>照護分析</h2>
        <p class="subtitle">以最近 30 天紀錄檢視收藏狀態、照護節奏與風險訊號。</p>
        <div class="card">
          <h3>近 30 天照護統計</h3>
          <div class="grid-3">
            <div class="stat"><strong>${summary.waters}</strong><span>澆水次數</span></div>
            <div class="stat"><strong>${summary.observations}</strong><span>觀察次數</span></div>
            <div class="stat"><strong>${summary.fertilizers}</strong><span>施肥次數</span></div>
            <div class="stat"><strong>${summary.abnormal}</strong><span>異常紀錄數</span></div>
            <div class="stat"><strong>${summary.avgWaterInterval}</strong><span>平均澆水間隔</span></div>
            <div class="stat"><strong>${escapeHTML(summary.topType)}</strong><span>最常照護類型</span></div>
          </div>
        </div>
        <div class="card">
          <h3>收藏狀態摘要</h3>
          <p>收藏植物：${appData.plants.length} 筆｜異常狀態：${abnormalPlants} 筆</p>
          <p>養護型態分布：${Object.entries(profiles).map(([k, v]) => `${escapeHTML(k)} ${v}`).join('｜') || '尚無資料'}</p>
          <button class="full secondary" onclick="setScreen('academy')">查看能力系統</button>
        </div>`;
    }

    function renderSettings() {
      const g = gameStats();
      document.getElementById('screen-settings').innerHTML = `
        <h2>設定</h2>
        <div class="card game-card">
          <h3>能力系統摘要</h3>
          <p>熟練度等級：Lv.${g.level}｜${g.title.title}</p>
          <div class="xp-bar"><div class="xp-fill" style="--xp:${g.currentXp}%"></div></div>
          <p class="hint">能力點數：${g.xp}｜連續追蹤：${g.streak} 天</p>
          <div class="badge-grid">${g.badges.map(b => `<span class="badge-pill ${b.unlocked ? '' : 'locked'}">${b.icon} ${b.name}</span>`).join('')}</div>
          <button class="full secondary" onclick="setScreen('academy')">查看能力系統</button>
        </div>
        <div class="card">
          <h3>資料備份</h3>
          <p>目前資料儲存在這台裝置的瀏覽器中。若更換手機或清除瀏覽器資料，資料可能會消失。</p>
          <div class="divider"></div>
          <p>植物：${appData.plants.length} 盆</p>
          <p>照護紀錄：${appData.careLogs.length} 筆</p>
          <div class="actions">
            <button onclick="exportData()">匯出植物收藏資料</button>
            <button class="secondary" onclick="document.getElementById('import-file').click()">匯入備份檔</button>
          </div>
        </div>
        <div class="card">
          <h3>版本資訊</h3>
          <p>產品名稱：植物綠手指</p>
          <p>版本：v2.0 專案結構整理版</p>
          <p>目標使用者：植物玩家、園藝愛好者、植物達人</p>
          <p>資料儲存：本機瀏覽器 localStorage</p>
          <p>部署方式：GitHub Pages</p>
        </div>
        <div class="soft-card">
          <h3>儲存方式說明</h3>
          <p>此版本維持純前端架構，不需要登入、後端或資料庫。資料會自動保存在這台裝置，建議定期匯出備份。</p>
        </div>
        <div class="card">
          <h3>加入手機主畫面</h3>
          <p>如果之後把這個檔案部署成網站，就可以像 App 一樣加入手機主畫面。</p>
          <ol class="install-steps">
            <li>用 Safari 或 Chrome 打開網站。</li>
            <li>點分享按鈕。</li>
            <li>選擇「加入主畫面」。</li>
            <li>桌面會出現「植物綠手指」。</li>
          </ol>
          <button class="full secondary" onclick="resetOnboarding()">重新觀看系統導覽</button>
        </div>
        <div class="card">
          <h3 class="danger-text">危險操作</h3>
          <p>清除後無法復原。請先匯出備份。</p>
          <button class="full danger" onclick="clearAllData()">清除全部資料</button>
        </div>`;
    }

    function exportData() {
      const payload = { ...appData, exportedAt: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plant-green-thumb-backup-${todayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('備份檔已匯出。');
    }

    document.getElementById('import-file').addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      if (!confirm('匯入備份會覆蓋目前資料，確定要繼續嗎？')) { event.target.value = ''; return; }
      try {
        const text = await file.text();
        const imported = JSON.parse(text);
        if (!Array.isArray(imported.plants) || !Array.isArray(imported.careLogs)) throw new Error('格式錯誤');
        appData = { ...blankData(), ...imported };
        saveData();
        renderAll();
        setScreen('today');
        showToast('備份已匯入。');
      } catch (error) {
        showToast('匯入失敗：檔案格式不正確。');
      } finally {
        event.target.value = '';
      }
    });

    function clearAllData() {
      if (!confirm('確定要清除全部資料嗎？這個動作無法復原。')) return;
      appData = blankData();
      saveData();
      selectedPlantId = null;
      renderAll();
      setScreen('today');
      showToast('全部資料已清除。');
    }

    document.querySelectorAll('.nav button').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.nav;
        setScreen(target);
      });
    });

    appData.version = '2.0.0';
    saveData();
    renderAll();
