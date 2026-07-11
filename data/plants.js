// Plant Green Thumb v2.0 data module. Loaded before app.js.
(function () {
function getEaseLevelByName(name, legacyLevel = '中') {
  const groups = {
    '入門收藏': ['黃金葛', '虎尾蘭', '金錢樹', '吊蘭', '心葉蔓綠絨', '合果芋', '粗肋草', '圓葉椒草', '豆瓣綠', '酒瓶蘭'],
    '低維護': ['蘆薈', '仙人掌', '蔥', '萬年青', '白網紋草', '椒草類', '仙人球', '開運竹', '富貴竹'],
    '基礎管理': ['龜背芋', '發財樹', '白鶴芋', '橡皮樹', '羅勒', '薄荷', '小精靈空氣鳳梨', '蔓綠絨', '黑金剛橡皮樹', '冷水花', '長壽花', '日日春', '袖珍椰子', '鏡面草'],
    '普通': ['多肉植物', '鹿角蕨', '波士頓腎蕨', '非洲菫', '蝴蝶蘭', '九層塔', '香菜', '龜背竹', '姑婆芋', '鳥巢蕨', '常春藤', '觀音蓮', '玉露', '熊童子', '石蓮花', '文心蘭', '茉莉花', '矮牽牛', '天竺葵', '聖誕紅', '天堂鳥', '散尾葵', '馬拉巴栗', '空氣鳳梨', '松蘿空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚'],
    '稍難': ['琴葉榕', '鐵線蕨', '竹芋類', '竹芋', '孔雀竹芋', '青蘋果竹芋', '迷迭香', '薰衣草', '海芋', '女王頭空氣鳳梨', '空氣鳳梨霸王', '粉紅公主蔓綠絨', '彩葉芋', '玫瑰', '梔子花', '繡球花'],
    '高難度': ['捕蠅草', '豬籠草', '腎蕨高濕品種', '特殊斑葉品種']
  };
  for (const [level, names] of Object.entries(groups)) {
    if (names.includes(name)) return level;
  }
  const legacyMap = { '低': '低維護', '低到中': '基礎管理', '中': '普通', '中高': '稍難', '高': '高難度' };
  return legacyMap[legacyLevel] || '普通';
}

function buildPlantKnowledgeFields(plant) {
  const airPlantNames = ['空氣鳳梨', '小精靈空氣鳳梨', '松蘿空氣鳳梨', '女王頭空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚', '空氣鳳梨霸王'];
  const isAir = airPlantNames.includes(plant.name);
  const ease = getEaseLevelByName(plant.name, plant.legacyDifficulty);
  const fallbackByCategory = {
    '室內觀葉': {
      personality: '穩定、耐看、適合室內陪伴',
      originStory: '這類植物多來自溫暖、濕潤或林下環境，因此通常喜歡明亮散射光，不適合長時間強烈直曬。',
      funFact: '很多室內觀葉植物在原生環境中會攀附樹木或在林下生長，室內盆栽只是它們較小型的一面。',
      beginnerTip: '先學會觀察土壤乾濕與葉片狀態，不要固定照日期澆水。',
      expertNote: '觀察新葉大小、節間距離與葉色變化，可以判斷光照是否足夠。'
    },
    '多肉仙人掌': {
      personality: '獨立、耐旱、怕被過度照顧',
      originStory: '這類植物多適應乾燥或排水快速的環境，因此能儲存水分，但不耐長期潮濕。',
      funFact: '多肉植物肥厚的葉片或莖，其實就是它們儲水的方式。',
      beginnerTip: '寧可少澆，也不要讓介質長期潮濕。',
      expertNote: '觀察徒長、葉片變薄或失去緊實感，可以判斷光照與水分是否失衡。'
    },
    '香草蔬菜': {
      personality: '生長快、反應明顯、需要穩定照顧',
      originStory: '許多香草植物需要較充足光照與通風，適合陽台或窗邊明亮處。',
      funFact: '香草植物的香氣常來自揮發性物質，這些氣味也可能幫助植物抵禦昆蟲或環境壓力。',
      beginnerTip: '香草植物通常比觀葉植物更需要光照，室內太暗容易長不好。',
      expertNote: '觀察節間是否拉長、葉色是否變淡，可以判斷光照是否不足。'
    },
    '蕨類竹芋': {
      personality: '細膩、喜濕、對環境變化敏感',
      originStory: '這類植物常來自林下或濕度較高的環境，因此喜歡散射光與穩定濕度。',
      funFact: '許多竹芋類植物晚上葉片角度會改變，看起來像在休息。',
      beginnerTip: '不要讓環境太乾，也不要讓盆土長期積水。',
      expertNote: '葉緣焦枯常與空氣乾燥、水質或根系壓力有關。'
    },
    '開花植物': {
      personality: '有季節感、需要能量、開花時很有成就感',
      originStory: '開花植物通常需要足夠光照與養分，才能支持花芽形成與開花。',
      funFact: '植物開花是繁殖策略的一部分，花色、香氣與形狀常與授粉者有關。',
      beginnerTip: '不要只看花漂亮，買回家後要確認它需要多少光照。',
      expertNote: '花後修剪、光週期、溫度變化與養分管理都會影響下一次開花。'
    },
    '特殊植物': {
      personality: '自由、特殊、需要通風與正確水分管理',
      originStory: '空氣鳳梨多為附生植物，不靠土壤生長，而是附著在樹枝或岩石等表面。',
      funFact: '空氣鳳梨不是靠空氣就能活，它仍然需要水、光線與通風。',
      beginnerTip: '泡水或噴水後，一定要讓植株完全晾乾，尤其是葉心不能長時間積水。',
      expertNote: '銀葉型通常較耐乾、綠葉型通常較需要水分，但都需要良好通風。'
    }
  };
  if (!plant.light) plant.light = '明亮散射光';
  if (!plant.interval) plant.interval = 7;
  const inferKnowledgeCategory = () => {
    if (isAir) return '特殊植物';
    if (['蘆薈', '多肉植物', '觀音蓮', '仙人掌', '仙人球', '玉露', '熊童子', '石蓮花', '酒瓶蘭'].includes(plant.name)) return '多肉仙人掌';
    if (['薄荷', '羅勒', '迷迭香', '薰衣草', '九層塔', '香菜', '蔥'].includes(plant.name)) return '香草蔬菜';
    if (['竹芋', '孔雀竹芋', '青蘋果竹芋', '鹿角蕨', '波士頓腎蕨', '鳥巢蕨', '鐵線蕨', '腎蕨高濕品種'].includes(plant.name)) return '蕨類竹芋';
    if (['長壽花', '非洲菫', '蝴蝶蘭', '文心蘭', '玫瑰', '茉莉花', '梔子花', '日日春', '矮牽牛', '天竺葵', '繡球花', '聖誕紅'].includes(plant.name)) return '開花植物';
    if (['捕蠅草', '豬籠草', '特殊斑葉品種'].includes(plant.name)) return '特殊植物';
    return '室內觀葉';
  };
  const defaults = fallbackByCategory[inferKnowledgeCategory()] || fallbackByCategory['室內觀葉'];
  const byName = {
    '黃金葛': {
      personality: '隨和、耐陰、低維護',
      originStory: '黃金葛原生於熱帶森林，常攀附樹幹往有光的地方生長；在室內也保留了耐陰與攀爬的個性。',
      funFact: '黃金葛在野外成熟後葉片可能變得很大，室內常見的小葉只是它年輕、低調的一面。',
      beginnerTip: '土壤偏乾再澆，寧可少一點水，也不要讓盆土長期濕答答。',
      expertNote: '觀察節間是否拉長；如果藤蔓越長越稀疏，通常是在提醒你光線不足。'
    },
    '虎尾蘭': {
      personality: '耐旱、慢熟、怕太熱情的澆水',
      originStory: '虎尾蘭來自非洲乾燥地帶，厚實葉片能儲水，因此比起頻繁照顧，它更喜歡被安靜放著。',
      funFact: '虎尾蘭常被叫作「懶人植物」，但真正的關鍵不是不用照顧，而是不要照顧過頭。',
      beginnerTip: '乾透後再澆，盆底排水一定要順。',
      expertNote: '若葉片變軟或基部發黑，多半和過濕有關；健康葉片應挺直、有支撐感。'
    },
    '金錢樹': {
      personality: '耐陰、耐旱、慢慢來也很好',
      originStory: '金錢樹原生於東非，地下塊莖能儲存水分，讓它能熬過乾燥時期。',
      funFact: '金錢樹看起來像一片片亮亮的葉子，其實它的地下塊莖才是抗旱秘密基地。',
      beginnerTip: '不要因為葉子亮就一直澆水；等介質乾了再澆最安全。',
      expertNote: '新芽通常整支冒出，若長期無新芽可檢查光線是否過暗或根系是否過濕。'
    },
    '龜背芋': {
      personality: '熱帶感、愛明亮、會往上探索',
      originStory: '龜背芋原生於中南美洲熱帶雨林，會攀附樹木向上尋找光線。',
      funFact: '龜背芋葉片上的裂孔可能有助於在雨林中分散風雨壓力，也讓光能穿透到下層葉片。',
      beginnerTip: '給明亮散射光，避免烈日直曬；表土乾後再澆透。',
      expertNote: '若新葉裂孔變少，常見原因是光線不足、植株太幼或支撐不足。'
    },
    '薄荷': {
      personality: '生長快、愛喝水、香氣外向',
      originStory: '薄荷常生長在較濕潤、日照充足的環境，地下莖擴張力強，很容易長成一片。',
      funFact: '薄荷的清涼感來自薄荷醇，它會刺激皮膚與口腔的冷覺受器。',
      beginnerTip: '陽台種植時要注意水分，缺水會很快垂頭，但也不要讓盆底積水。',
      expertNote: '定期修剪可促進分枝；若枝條細長、香氣弱，通常需要更多光。'
    },
    '空氣鳳梨': {
      personality: '不靠土、愛通風、外星感',
      originStory: '空氣鳳梨多生長在中南美洲樹枝、岩石或電線般的附著位置，靠葉片吸收水分與空氣中的微量養分。',
      funFact: '空氣鳳梨不需要土，但不是不需要水；它只是把「根吸水」的工作改成主要由葉片完成。',
      beginnerTip: '泡水或噴水後必須完全晾乾，尤其葉心不能長時間積水。',
      expertNote: '觀察葉片捲曲、銀色鱗片與葉心乾燥速度；通風比多數展示環境想像中更重要。'
    },
    '小精靈空氣鳳梨': {
      personality: '小巧、低維護、適合入門收藏',
      originStory: '小型空氣鳳梨常附生在明亮通風的枝條或岩面，體型小但很會利用空氣中的水氣。',
      funFact: '小精靈體型迷你，很適合觀察空氣鳳梨「泡水後變飽、乾燥後變輕」的變化。',
      beginnerTip: '泡水 10–20 分鐘後倒放晾乾，不要放進密閉玻璃瓶長期悶住。',
      expertNote: '看葉尖是否乾枯、葉心是否積水；小型植株乾得快，但悶住也爛得快。'
    },
    '松蘿空氣鳳梨': {
      personality: '垂墜、飄逸、很吃通風',
      originStory: '松蘿空氣鳳梨常像銀灰色鬍鬚一樣掛在樹上，靠空氣流動帶來水氣與微量養分。',
      funFact: '它看起來像簾子，其實是一串串細長植株互相纏在一起。',
      beginnerTip: '乾燥環境可增加噴水頻率，但每次給水後都要讓整束充分通風。',
      expertNote: '觀察內層是否悶黑腐爛；密集吊掛時要特別注意中間是否乾得掉。'
    },
    '女王頭空氣鳳梨': {
      personality: '造型強烈、稍敏感、怕葉心積水',
      originStory: '女王頭類型的空氣鳳梨常在明亮、通風良好的附生環境中形成漂亮放射葉型。',
      funFact: '它的觀賞重點在葉形與中心結構，但也正因葉心明顯，積水時更容易出問題。',
      beginnerTip: '泡水後要徹底倒放晾乾葉心，不要急著放回裝飾容器。',
      expertNote: '觀察中心葉是否保持硬挺；若葉心變軟、變黑，要立刻改善通風與給水方式。'
    },
    '電捲燙空氣鳳梨': {
      personality: '捲曲、有戲、缺水會更明顯',
      originStory: '電捲燙空氣鳳梨以捲曲葉片聞名，在自然環境中依靠葉面鱗片吸收水分。',
      funFact: '葉片捲曲程度常會隨水分狀態改變，像植物版的濕度提示器。',
      beginnerTip: '泡水後輕甩水分並通風晾乾，不要讓水卡在葉縫裡。',
      expertNote: '比較泡水前後葉片彈性與捲曲度，可判斷給水週期是否合適。'
    },
    '老人鬚': {
      personality: '吊掛、空靈、通風控',
      originStory: '老人鬚常垂掛在樹枝上，靠空氣流動與霧氣維持水分，是很典型的附生生活者。',
      funFact: '老人鬚沒有你想像中那種明顯盆栽根系，整串都在和空氣交換水分。',
      beginnerTip: '不要長期塞在瓶子或密閉容器裡；噴水後要讓整串都乾得掉。',
      expertNote: '檢查內層是否變黑、變黏或掉段；這通常比外層葉尖乾更需要警覺。'
    },
    '空氣鳳梨霸王': {
      personality: '大型、霸氣、需要穩定水分管理',
      originStory: '大型空氣鳳梨在自然中需要明亮光線與良好空氣流動，葉片越大，葉心乾燥管理越重要。',
      funFact: '體型大的空氣鳳梨很有存在感，但越大越要注意泡水後中心是否真的乾了。',
      beginnerTip: '泡水 20–30 分鐘後完全晾乾，再放回展示位置。',
      expertNote: '觀察葉心、外葉基部與整株重量變化；大型植株水分進出速度比小型更值得記錄。'
    }
  };
  const merged = isAir ? { ...defaults, ...byName[plant.name] } : { ...defaults, ...(byName[plant.name] || {}) };
  return {
    personality: merged.personality || defaults.personality,
    originStory: merged.originStory || defaults.originStory,
    funFact: merged.funFact || defaults.funFact,
    beginnerTip: merged.beginnerTip || defaults.beginnerTip,
    expertNote: merged.expertNote || defaults.expertNote
  };
}

  function inferCategory(plant) {
    if (plant.category) return plant.category;
    const groups = {
      '香草蔬菜': ['薄荷', '羅勒', '迷迭香', '薰衣草', '九層塔', '香菜', '蔥'],
      '多肉仙人掌': ['蘆薈', '多肉植物', '觀音蓮', '仙人掌', '仙人球', '玉露', '熊童子', '石蓮花', '酒瓶蘭'],
      '蕨類竹芋': ['竹芋', '孔雀竹芋', '青蘋果竹芋', '鹿角蕨', '波士頓腎蕨', '鳥巢蕨', '鐵線蕨', '腎蕨高濕品種'],
      '開花植物': ['長壽花', '非洲菫', '蝴蝶蘭', '文心蘭', '玫瑰', '茉莉花', '梔子花', '日日春', '矮牽牛', '天竺葵', '繡球花', '聖誕紅'],
      '特殊植物': ['空氣鳳梨', '小精靈空氣鳳梨', '松蘿空氣鳳梨', '女王頭空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚', '空氣鳳梨霸王', '捕蠅草', '豬籠草', '特殊斑葉品種']
    };
    for (const [category, names] of Object.entries(groups)) {
      if (names.includes(plant.name)) return category;
    }
    return '室內觀葉';
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

  function managementTypeFor(plant) {
    const category = inferCategory(plant);
    const ease = normalizeEaseLevel(plant.easeLevel || getEaseLevelByName(plant.name, plant.legacyDifficulty));
    if (['空氣鳳梨', '小精靈空氣鳳梨', '松蘿空氣鳳梨', '女王頭空氣鳳梨', '電捲燙空氣鳳梨', '老人鬚', '空氣鳳梨霸王'].includes(plant.name)) return '附生型';
    if (category === '特殊植物') return '特殊收藏';
    if (category === '開花植物') return '開花觀賞';
    if (category === '多肉仙人掌' || (plant.light || '').includes('強光')) return '強光耐旱';
    if (category === '蕨類竹芋' || ['稍難', '高難度'].includes(ease)) return '高濕敏感';
    if (['入門收藏', '低維護', '基礎管理'].includes(ease)) return '低維護';
    return '中等維護';
  }

  const rawPlants = [
      { name: '黃金葛', legacyDifficulty: '低', interval: 6, light: '明亮散射光', watering: '土壤偏乾再澆透', note: '耐陰、好照顧，怕長期積水。' },
      { name: '虎尾蘭', legacyDifficulty: '低', interval: 12, light: '明亮散射光到半日照', watering: '乾透後再澆', note: '非常耐旱，最怕太常澆水。' },
      { name: '龜背芋', legacyDifficulty: '中', interval: 6, light: '明亮散射光', watering: '表土乾後澆透', note: '喜歡明亮環境，避免烈日直曬。' },
      { name: '發財樹', legacyDifficulty: '中', interval: 9, light: '明亮散射光', watering: '寧乾勿濕', note: '根系怕悶濕，盆土不要長期潮濕。' },
      { name: '白鶴芋', legacyDifficulty: '中', interval: 4, light: '明亮散射光', watering: '土表乾就檢查', note: '缺水會垂葉，但也怕積水。' },
      { name: '吊蘭', legacyDifficulty: '低', interval: 5, light: '明亮散射光', watering: '土表乾後澆透', note: '適應力強，適合低維護收藏。' },
      { name: '蘆薈', legacyDifficulty: '低', interval: 12, light: '半日照到強光', watering: '乾透再澆', note: '多肉質植物，怕過濕。' },
      { name: '多肉植物', legacyDifficulty: '中', interval: 12, light: '明亮光到半日照', watering: '乾透再澆', note: '光線不足容易徒長。' },
      { name: '琴葉榕', legacyDifficulty: '中高', interval: 6, light: '明亮散射光', watering: '表土乾後澆透', note: '對環境變動敏感，避免頻繁移動。' },
      { name: '薄荷', legacyDifficulty: '中', interval: 3, light: '半日照到強光', watering: '保持微濕但不積水', note: '生長快，需水量較高。' },
      { name: '羅勒', legacyDifficulty: '中', interval: 3, light: '半日照到強光', watering: '土表乾後澆透', note: '喜歡充足光照與穩定水分，適合陽台。' },
      { name: '迷迭香', legacyDifficulty: '中高', interval: 7, light: '強光到半日照', watering: '偏乾再澆，避免悶濕', note: '喜歡通風與排水佳的介質，怕潮濕悶根。' },
      { name: '薰衣草', legacyDifficulty: '中高', interval: 7, light: '強光', watering: '乾透再澆', note: '需要充足日照與良好通風，台灣潮濕環境要控水。' },
      { name: '九層塔', legacyDifficulty: '中', interval: 3, light: '半日照到強光', watering: '土表乾後澆透', note: '生長快、需光多，缺水容易萎垂。' },
      { name: '香菜', legacyDifficulty: '中', interval: 3, light: '半日照', watering: '保持微濕但不積水', note: '怕高溫，炎熱環境容易抽苔或衰弱。' },
      { name: '蔥', legacyDifficulty: '低', interval: 4, light: '半日照到強光', watering: '土表乾後澆透', note: '適合陽台栽培，保持通風與排水即可。' },
      { name: '龜背竹', legacyDifficulty: '中', interval: 6, light: '明亮散射光', watering: '表土乾後澆透', note: '大型觀葉植物，喜歡高濕與明亮環境。' },
      { name: '合果芋', legacyDifficulty: '低', interval: 5, light: '明亮散射光', watering: '土表微乾再澆', note: '適應力強，但斑葉品種需要較明亮光線。' },
      { name: '粗肋草', legacyDifficulty: '低', interval: 6, light: '明亮散射光', watering: '土表乾後澆透', note: '耐陰但怕冷，適合室內明亮處。' },
      { name: '蔓綠絨', legacyDifficulty: '低到中', interval: 6, light: '明亮散射光', watering: '表土乾後澆透', note: '多數品種好照顧，避免長期積水。' },
      { name: '心葉蔓綠絨', legacyDifficulty: '低', interval: 6, light: '明亮散射光', watering: '土壤偏乾再澆透', note: '耐陰、垂吊好看，適合室內低維護配置。' },
      { name: '粉紅公主蔓綠絨', legacyDifficulty: '中高', interval: 6, light: '明亮散射光', watering: '表土乾後澆透', note: '斑葉品種需明亮光線，但避免烈日。' },
      { name: '海芋', legacyDifficulty: '中高', interval: 5, light: '明亮散射光', watering: '保持微濕但不積水', note: '喜歡濕度，但塊莖與根系怕爛。' },
      { name: '姑婆芋', legacyDifficulty: '中', interval: 5, light: '明亮散射光到半日照', watering: '表土乾後澆透', note: '葉片大、蒸散快，需注意通風與水分。' },
      { name: '彩葉芋', legacyDifficulty: '中高', interval: 4, light: '明亮散射光', watering: '保持微濕但不積水', note: '葉色鮮豔但怕乾、怕冷，休眠期需少水。' },
      { name: '竹芋', legacyDifficulty: '中高', interval: 4, light: '明亮散射光', watering: '保持微濕', note: '喜歡高濕，水分忽乾忽濕容易焦邊。' },
      { name: '孔雀竹芋', legacyDifficulty: '中高', interval: 4, light: '明亮散射光', watering: '保持微濕但不積水', note: '怕乾燥與強光，葉緣焦枯常見。' },
      { name: '青蘋果竹芋', legacyDifficulty: '中高', interval: 4, light: '明亮散射光', watering: '保持微濕', note: '需要穩定濕度與柔和光線。' },
      { name: '鹿角蕨', legacyDifficulty: '中高', interval: 5, light: '明亮散射光', watering: '介質乾一半再給水', note: '喜歡通風、高濕，避免中心積水。' },
      { name: '波士頓腎蕨', legacyDifficulty: '中高', interval: 3, light: '明亮散射光', watering: '保持微濕', note: '喜歡高濕，乾燥會掉葉與焦邊。' },
      { name: '鳥巢蕨', legacyDifficulty: '中', interval: 5, light: '明亮散射光', watering: '土表微乾再澆', note: '澆水避免長期積在葉心。' },
      { name: '鐵線蕨', legacyDifficulty: '高', interval: 3, light: '明亮散射光', watering: '保持濕潤但不積水', note: '對乾燥敏感，不適合常忘記澆水的人。' },
      { name: '常春藤', legacyDifficulty: '中', interval: 5, light: '明亮散射光到半日照', watering: '土表乾後澆透', note: '喜歡涼爽通風，悶熱環境易有蟲害。' },
      { name: '橡皮樹', legacyDifficulty: '低到中', interval: 7, light: '明亮散射光', watering: '表土乾後澆透', note: '耐陰但明亮環境長得更好，怕積水。' },
      { name: '黑金剛橡皮樹', legacyDifficulty: '低到中', interval: 7, light: '明亮散射光', watering: '表土乾後澆透', note: '葉厚耐旱，澆水過多容易落葉。' },
      { name: '圓葉椒草', legacyDifficulty: '低', interval: 7, light: '明亮散射光', watering: '偏乾再澆', note: '葉片儲水，適合室內，怕過度澆水。' },
      { name: '豆瓣綠', legacyDifficulty: '低', interval: 7, light: '明亮散射光', watering: '土壤偏乾再澆', note: '小型室內植物，水太多容易爛莖。' },
      { name: '冷水花', legacyDifficulty: '低到中', interval: 4, light: '明亮散射光', watering: '土表乾後澆透', note: '生長快，需修剪維持株型。' },
      { name: '觀音蓮', legacyDifficulty: '中', interval: 10, light: '明亮光到半日照', watering: '乾透再澆', note: '多肉型態，怕悶濕與光線不足。' },
      { name: '仙人掌', legacyDifficulty: '低', interval: 14, light: '強光', watering: '完全乾透再澆', note: '非常耐旱，室內光線不足時要更少澆水。' },
      { name: '仙人球', legacyDifficulty: '低', interval: 14, light: '強光', watering: '完全乾透再澆', note: '需充足光照，冬季或陰雨天要控水。' },
      { name: '玉露', legacyDifficulty: '中', interval: 12, light: '明亮散射光', watering: '乾透再澆', note: '避免烈日直曬，水多易徒長或爛根。' },
      { name: '熊童子', legacyDifficulty: '中', interval: 10, light: '明亮光', watering: '乾透再澆', note: '葉片肥厚怕悶濕，夏季高溫需小心。' },
      { name: '石蓮花', legacyDifficulty: '中', interval: 12, light: '半日照到強光', watering: '乾透再澆', note: '光不足易徒長，葉心避免積水。' },
      { name: '長壽花', legacyDifficulty: '低到中', interval: 7, light: '明亮光到半日照', watering: '土表乾後澆透', note: '開花植物，花期需明亮光線。' },
      { name: '非洲菫', legacyDifficulty: '中', interval: 5, light: '明亮散射光', watering: '土表微乾再澆', note: '避免葉面積水，適合室內窗邊。' },
      {
        name: '蝴蝶蘭',
        category: '開花植物',
        managementType: '開花觀賞',
        easeLevel: '中等維護',
        difficulty: '中',
        legacyDifficulty: '中',
        interval: 7,
        light: '明亮散射光，避免烈日直曬',
        watering: '介質接近乾燥後再澆透，避免葉心積水',
        note: '常見蘭花，適合室內明亮處。開花期觀賞性高，但根系怕悶濕。',
        personality: '優雅、耐看、適合長期觀察花期變化',
        originStory: '蝴蝶蘭多為附生型蘭花，原生環境常附著在樹幹或枝條上，根系需要空氣流通。',
        funFact: '蝴蝶蘭的花期很長，養護得當時可以維持數週到數月。',
        beginnerTip: '澆水時避免水積在葉心，若葉心長期潮濕，容易腐爛。',
        expertNote: '根色與根部飽滿度是判斷水分狀態的重要指標，健康根通常飽滿有彈性。',
        nativeHabitat: '熱帶至亞熱帶林地附生環境',
        substratePreference: '水苔、樹皮、蘭石或透氣性佳的蘭花介質',
        wateringStrategy: '依介質乾濕與根色判斷，乾濕循環明確比固定天數更重要',
        lightStrategy: '明亮散射光，光線不足會影響復花',
        commonMistakes: '葉心積水、介質長期悶濕、光線不足、花後完全不管理',
        advancedCare: '花後可觀察花梗狀態、根系活力與新葉生長，再決定修剪與換盆時機'
      },
      {
        name: '文心蘭',
        category: '開花植物',
        managementType: '開花觀賞',
        easeLevel: '中等維護',
        difficulty: '中',
        legacyDifficulty: '中',
        interval: 5,
        light: '明亮散射光到半日照',
        watering: '介質表層偏乾後澆透，避免假球莖長期皺縮',
        note: '文心蘭有假球莖，可儲存水分，但仍需要穩定乾濕循環。',
        personality: '活潑、花量多、有節奏感',
        originStory: '文心蘭多來自美洲熱帶至亞熱帶環境，許多品種具有附生或半附生習性。',
        funFact: '文心蘭常被稱為跳舞蘭，花型像穿裙子跳舞的小人。',
        beginnerTip: '假球莖輕微皺縮不一定是缺水，但若持續皺縮且新芽弱，需檢查根系。',
        expertNote: '觀察新芽、假球莖飽滿度與花芽形成，可判斷植株是否進入良好生長週期。',
        nativeHabitat: '熱帶與亞熱帶林地、附生或半附生環境',
        substratePreference: '樹皮、蘭石、少量水苔混合的透氣介質',
        wateringStrategy: '生長期保持穩定水分，休緩期降低頻率',
        lightStrategy: '比蝴蝶蘭略能接受更明亮的光，但需避免強烈正午直曬',
        commonMistakes: '介質太悶、光照不足、長期忽略假球莖皺縮',
        advancedCare: '新芽成熟後常是花芽形成關鍵期，需穩定光照與水分管理'
      },
      {
        name: '石斛蘭',
        category: '開花植物',
        managementType: '開花觀賞',
        easeLevel: '中高維護',
        difficulty: '中高',
        legacyDifficulty: '中高',
        interval: 6,
        light: '明亮光到半日照，依品種調整',
        watering: '生長期澆透並通風，休眠或低溫期減少澆水',
        note: '石斛蘭品系很多，有些需要明顯季節節律才能開花。',
        personality: '有韌性、節律明顯、適合進階收藏',
        originStory: '石斛蘭多為附生蘭，常生長在樹幹或岩壁上，根系習慣快速乾濕循環。',
        funFact: '石斛屬種類繁多，從觀花品種到藥用石斛都有。',
        beginnerTip: '不同石斛品種習性差異很大，購買時要確認品種與是否需要休眠管理。',
        expertNote: '莖節、假球莖成熟度與季節溫差常影響開花表現。',
        nativeHabitat: '亞洲與大洋洲多地的附生或岩生環境',
        substratePreference: '樹皮、蛇木、蘭石、透氣籃植或板植',
        wateringStrategy: '生長期水分較充足，休眠期依品種控水',
        lightStrategy: '多數需要比蝴蝶蘭更明亮的光線',
        commonMistakes: '全年同樣澆水、不分品種管理、通風不足',
        advancedCare: '依品種區分暖性、冷涼性與是否落葉型，再調整水分與溫差策略'
      },
      {
        name: '嘉德麗雅蘭',
        category: '開花植物',
        managementType: '特殊收藏',
        easeLevel: '中高維護',
        difficulty: '中高',
        legacyDifficulty: '中高',
        interval: 6,
        light: '明亮光到半日照',
        watering: '介質乾後澆透，根部需快速透氣',
        note: '嘉德麗雅蘭花大且華麗，但需要較強光與良好通風。',
        personality: '華麗、強光派、收藏感高',
        originStory: '嘉德麗雅蘭多來自中南美洲附生環境，常在樹上接受明亮但流動的光線。',
        funFact: '嘉德麗雅蘭常被稱為蘭花之后，花型與香氣都很具代表性。',
        beginnerTip: '若長期不開花，常見原因是光照不足。',
        expertNote: '假球莖成熟、新芽節律與光照強度，是影響開花的重要因素。',
        nativeHabitat: '中南美洲熱帶與亞熱帶附生環境',
        substratePreference: '粗樹皮、蘭石、透氣顆粒介質',
        wateringStrategy: '乾濕循環明確，乾後再澆透',
        lightStrategy: '需要較明亮光線，葉色過深可能代表光不足',
        commonMistakes: '光照太弱、介質太細、澆水過頻',
        advancedCare: '可依假球莖成熟度與新根生長時機安排換盆'
      },
      {
        name: '萬代蘭',
        category: '特殊植物',
        managementType: '附生型',
        easeLevel: '高階收藏',
        difficulty: '高',
        legacyDifficulty: '高',
        interval: 2,
        light: '明亮光到半日照，需依環境遮光',
        watering: '高通風環境下可頻繁噴水或浸根，根部需快速乾燥',
        note: '萬代蘭常裸根或籃植，需要高光、高濕與強通風平衡。',
        personality: '強烈、外向、需要環境條件到位',
        originStory: '萬代蘭多為熱帶附生蘭，根系裸露在空氣中，依靠濕度、雨水與通風維持生長。',
        funFact: '萬代蘭的粗壯氣根可以吸收水分，也需要大量空氣。',
        beginnerTip: '若環境乾燥又通風強，需提高補水頻率；若悶濕，根部容易出問題。',
        expertNote: '根尖活性、葉片硬度與根色是判斷水分與環境狀態的關鍵。',
        nativeHabitat: '熱帶高光、高濕、通風良好的附生環境',
        substratePreference: '裸根、籃植、粗顆粒或極透氣栽培方式',
        wateringStrategy: '依濕度與通風調整，常需高頻補水但不能悶根',
        lightStrategy: '需要高光，但盆栽環境需避免灼傷',
        commonMistakes: '光線不足、濕度不足、通風不足或補水節奏錯誤',
        advancedCare: '適合有穩定高濕、強通風與充足光線條件的收藏者'
      },
      { name: '玫瑰', legacyDifficulty: '中高', interval: 3, light: '強光', watering: '土表乾後澆透', note: '需要充足日照與通風，病蟲害需常檢查。' },
      { name: '茉莉花', legacyDifficulty: '中', interval: 3, light: '強光到半日照', watering: '土表乾後澆透', note: '喜歡光照，缺光不易開花。' },
      { name: '梔子花', legacyDifficulty: '中高', interval: 3, light: '半日照', watering: '保持微濕但不積水', note: '喜歡酸性介質與穩定水分。' },
      { name: '日日春', legacyDifficulty: '低到中', interval: 3, light: '強光', watering: '土表乾後澆透', note: '耐熱開花，需通風避免病害。' },
      { name: '矮牽牛', legacyDifficulty: '中', interval: 2, light: '強光', watering: '保持微濕但不積水', note: '花多需水多，炎熱天可能每天檢查。' },
      { name: '天竺葵', legacyDifficulty: '中', interval: 4, light: '半日照到強光', watering: '土表乾後澆透', note: '怕悶濕，通風很重要。' },
      { name: '繡球花', legacyDifficulty: '中高', interval: 2, light: '半日照', watering: '保持濕潤但不積水', note: '缺水會快速垂葉，夏季需遮蔭。' },
      { name: '聖誕紅', legacyDifficulty: '中', interval: 5, light: '明亮散射光', watering: '土表乾後澆透', note: '怕冷與積水，環境變動易落葉。' },
      { name: '開運竹', legacyDifficulty: '低', interval: 7, light: '明亮散射光', watering: '水耕每週換水或土耕偏乾再澆', note: '水耕要保持水質乾淨，避免烈日。' },
      { name: '富貴竹', legacyDifficulty: '低', interval: 7, light: '明亮散射光', watering: '水耕每週換水或土耕偏乾再澆', note: '耐陰但需要乾淨水質與適度光線。' },
      { name: '天堂鳥', legacyDifficulty: '中', interval: 7, light: '明亮散射光到半日照', watering: '表土乾後澆透', note: '大型植物，喜歡明亮環境與穩定水分。' },
      { name: '散尾葵', legacyDifficulty: '中', interval: 5, light: '明亮散射光', watering: '土表乾後澆透', note: '喜歡濕度與通風，葉尖焦常和乾燥相關。' },
      { name: '袖珍椰子', legacyDifficulty: '低到中', interval: 6, light: '明亮散射光', watering: '土表乾後澆透', note: '適合室內，避免強光直曬與長期積水。' },
      { name: '酒瓶蘭', legacyDifficulty: '低', interval: 14, light: '明亮光到半日照', watering: '乾透再澆', note: '基部可儲水，非常怕太常澆。' },
      { name: '馬拉巴栗', legacyDifficulty: '中', interval: 9, light: '明亮散射光', watering: '寧乾勿濕', note: '常被稱為發財樹，根系怕悶濕。' },
      { name: '金錢樹', legacyDifficulty: '低', interval: 14, light: '明亮散射光', watering: '乾透再澆', note: '耐陰耐旱，過度澆水最容易出問題。' },
      { name: '鏡面草', legacyDifficulty: '低到中', interval: 5, light: '明亮散射光', watering: '土表乾後澆透', note: '葉片圓亮，避免強光與長期乾旱。' },
      { name: '空氣鳳梨', category: '特殊植物', legacyDifficulty: '中', interval: 5, light: '明亮散射光，避免強烈直曬', watering: '每 5–7 天泡水或噴水一次，泡水後必須完全晾乾', note: '不需要土壤，但需要通風。最怕泡水後葉心積水、環境悶濕。' },
      { name: '小精靈空氣鳳梨', category: '特殊植物', legacyDifficulty: '低到中', interval: 5, light: '明亮散射光', watering: '每 5–7 天泡水 10–20 分鐘，之後倒放晾乾', note: '體型小、適合入門收藏，但不能長期放在潮濕不通風處。' },
      { name: '松蘿空氣鳳梨', category: '特殊植物', legacyDifficulty: '中', interval: 3, light: '明亮散射光', watering: '每 2–4 天噴水或短時間泡水，環境乾燥時增加頻率', note: '像銀灰色簾子，適合吊掛；需要通風，悶濕容易腐爛。' },
      { name: '女王頭空氣鳳梨', category: '特殊植物', legacyDifficulty: '中高', interval: 6, light: '明亮散射光到半日照', watering: '每 5–7 天泡水，泡水後要徹底晾乾葉心', note: '造型漂亮，但葉心積水容易出問題，需要確實晾乾。' },
      { name: '電捲燙空氣鳳梨', category: '特殊植物', legacyDifficulty: '中', interval: 6, light: '明亮散射光', watering: '每 5–7 天泡水，之後輕甩水分並通風晾乾', note: '葉片捲曲有特色，缺水會更捲，但過濕會爛心。' },
      { name: '老人鬚', category: '特殊植物', legacyDifficulty: '中', interval: 3, light: '明亮散射光', watering: '每 2–4 天噴水，乾燥環境可短時間泡水', note: '適合吊掛，最重要是通風。不要長期塞在瓶子或密閉容器裡。' },
      { name: '空氣鳳梨霸王', category: '特殊植物', legacyDifficulty: '中高', interval: 6, light: '明亮散射光到半日照', watering: '每 5–7 天泡水 20–30 分鐘，之後完全晾乾', note: '體型較大，水分管理要穩定。葉心積水或通風不足容易腐爛。' },
      { name: '捕蠅草', legacyDifficulty: '中高', interval: 3, light: '強光', watering: '使用純水保持介質濕潤', note: '食蟲植物，需純水與強光，不可用一般肥料。' },
      { name: '豬籠草', legacyDifficulty: '中高', interval: 3, light: '明亮散射光到半日照', watering: '保持介質微濕', note: '喜歡濕度與乾淨水源，避免濃肥。' },
      { name: '白網紋草', legacyDifficulty: '低', interval: 4, light: '明亮散射光', watering: '土表微乾再澆，避免完全乾透', note: '葉片會明顯表現缺水，適合練習觀察，但要避免烈日與積水。' },
      { name: '椒草類', legacyDifficulty: '低', interval: 7, light: '明亮散射光', watering: '偏乾再澆', note: '多數椒草葉片可儲水，室內好照顧，重點是不要太常澆水。' },
      { name: '腎蕨高濕品種', legacyDifficulty: '高', interval: 2, light: '明亮散射光', watering: '保持穩定濕潤與高濕', note: '對乾燥非常敏感，需要穩定濕度與通風，適合高濕環境管理者。' },
      { name: '特殊斑葉品種', legacyDifficulty: '高', interval: 5, light: '明亮散射光', watering: '依品種調整，避免過乾或積水', note: '斑葉品種常需要更穩定的光線與照護，購買前要先確認品種需求。' },
    ];

  window.PLANT_DATABASE = rawPlants.map((plant) => {
    const knowledge = buildPlantKnowledgeFields(plant);
    const originStory = plant.originStory || knowledge.originStory;
    const expertNote = plant.expertNote || knowledge.expertNote;
    return {
      ...plant,
      category: plant.category || inferCategory(plant),
      easeLevel: normalizeEaseLevel(plant.easeLevel || getEaseLevelByName(plant.name, plant.legacyDifficulty)),
      managementType: plant.managementType || managementTypeFor(plant),
      difficulty: plant.difficulty || plant.legacyDifficulty || '中',
      legacyDifficulty: plant.legacyDifficulty || plant.difficulty || '中',
      personality: plant.personality || knowledge.personality,
      originStory,
      funFact: plant.funFact || knowledge.funFact,
      beginnerTip: plant.beginnerTip || knowledge.beginnerTip,
      expertNote,
      nativeHabitat: plant.nativeHabitat || originStory,
      substratePreference: plant.substratePreference || '依管理難度調整排水、保水與根系通氣。',
      wateringStrategy: plant.wateringStrategy || plant.watering,
      lightStrategy: plant.lightStrategy || plant.light,
      commonMistakes: plant.commonMistakes || '固定照日期澆水、忽略通風與盆器排水，或未追蹤新葉與根系反應。',
      advancedCare: plant.advancedCare || expertNote
    };
  });
})();
