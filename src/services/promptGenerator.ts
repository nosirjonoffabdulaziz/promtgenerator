import {
  TeacherLessonInput,
  QualityLevel,
  ExerciseType,
} from '../types';
import { TEACHING_METHODS } from '../data/methods';
import { CLASSROOM_GAMES } from '../data/games';

/**
 * Intelligent helper to resolve methods whether user chose them or selected auto AI
 */
function resolveMethods(data: TeacherLessonInput): string[] {
  if (!data.aiAutoSelectMethods && data.selectedMethods && data.selectedMethods.length > 0) {
    return data.selectedMethods.map((id) => {
      const found = TEACHING_METHODS.find((m) => m.id === id);
      return found ? `${found.name.uz} (${found.name.en})` : id;
    });
  }

  // Smart heuristic based on subject & grade
  const subjectLower = (data.subject || '').toLowerCase();
  const grade = data.grade || 7;

  if (subjectLower.includes('matematik') || subjectLower.includes('fizik') || subjectLower.includes('kimyo')) {
    return [
      'Muammoli ta’lim (Problem-Based Learning)',
      'Guruhlararo musobaqa va estafeta',
      'Tezkor viktorina va tahlil (Quiz)',
      'Juftlikda ishlash va o‘zaro tekshirish (Peer Review)',
      'Interaktiv tajriba / formulalar amaliyoti',
    ];
  } else if (subjectLower.includes('informatik') || subjectLower.includes('dastur')) {
    return [
      'Hands-on kod yozish va debag qilish',
      'Juftlikda dasturlash (Pair Programming)',
      'Vaqt poygasi (Speed Coding Sprint)',
      'Boss Battle: Murakkab algoritmik masalani sinf bilan yengish',
    ];
  } else if (subjectLower.includes('til') || subjectLower.includes('ingliz') || subjectLower.includes('adabiyot')) {
    return [
      'Rollarga bo‘linish (Role Play) va jonli muloqot',
      'O‘yla - Juftlashing - Bo‘lishing (Think-Pair-Share)',
      'Flesh-kartalar va tezkor so‘z boyligi (Flashcards)',
      'Munozara va bahs (Debate)',
      'Chiqish chiptasi (Exit Ticket)',
    ];
  }

  return [
    'Geymifikatsiya (Gamification) va ballar tizimi',
    'Aqliy hujum (Brainstorming)',
    'Guruhlarda hamkorlikda ishlash',
    'Interaktiv viktorina (Quiz)',
    'Kontseptual xarita (Mind Map)',
  ];
}

/**
 * Intelligent helper to resolve games
 */
function resolveGames(data: TeacherLessonInput): string[] {
  if (!data.aiAutoSelectGame && data.selectedGames && data.selectedGames.length > 0) {
    return data.selectedGames.map((id) => {
      const found = CLASSROOM_GAMES.find((g) => g.id === id);
      return found ? `${found.name.uz} (${found.name.en})` : id;
    });
  }

  const subjectLower = (data.subject || '').toLowerCase();
  if (subjectLower.includes('matematik') || subjectLower.includes('fizik')) {
    return ['Viktorina Jangi (Quiz Battle)', 'Sinfdan chiqish (Educational Escape Room)', 'Jamoaviy turnir'];
  } else if (subjectLower.includes('informatik')) {
    return ['Boss jangi (Boss Battle)', 'Tezkor raund (Speed Blitz)'];
  } else if (subjectLower.includes('kimyo') || subjectLower.includes('biologiya')) {
    return ['Svoya Igra / Jeopardy uslubi', 'Moslashtirish o‘yini (Matching Pairs)'];
  }
  return ['Viktorina Jangi (Quiz Battle)', 'Millioner shousi (Who Wants to Be a Millionaire)', 'Ta’limiy Bingo'];
}

/**
 * Dynamically computes a minute-by-minute timeline based on the lesson duration
 */
function generateTimeline(duration: number): string {
  if (duration <= 30) {
    return `
- 00:00 - 04:00 (4 min): **Kirish & Warm-up** (Faollashtiruvchi tezkor savol yoki intellektual chaqiriq)
- 04:00 - 12:00 (8 min): **Asosiy tushuncha & Vizual tushuntirish** (Interaktiv ko‘rsatma, misol tahlili)
- 12:00 - 22:00 (10 min): **Amaliy mashg‘ulot & Interaktiv o‘yin** (Guruhlarda/juftlikda topshiriq)
- 22:00 - 27:00 (5 min): **Tezkor tekshirish & Test** (3-5 ta mini-savol)
- 27:00 - 30:00 (3 min): **Refleksiya & Chiqish chiptasi (Exit ticket)**`;
  } else if (duration <= 45) {
    return `
- 00:00 - 05:00 (5 min): **Tashkiliy qism, davomat & Qiziqtirish (Hook/Warm-up)** (Kun jumboqi yoki qiziqarli fakt)
- 05:00 - 10:00 (5 min): **O‘tgan darsni takrorlash & Yangi mavzuga ko‘prik** (Flesh-kartalar yoki blitz-savollar)
- 10:00 - 22:00 (12 min): **Yangi mavzu bayoni & Modellashtirish** (Konseptual tushuntirish, bosqichma-bosqich namunalar)
- 22:00 - 34:00 (12 min): **Interaktiv sinf o‘yini & Jamoaviy mashq** (O‘yin qoidalari, musobaqa raundlari)
- 34:00 - 41:00 (7 min): **Mustaqil mustahkamlash & Formatlashtiruvchi test** (A, B, C darajali mashqlar)
- 41:00 - 45:00 (4 min): **Xulosalash, baholash, uyga vazifa yo‘riqnomasi & Chiqish chiptasi**`;
  } else if (duration <= 60) {
    return `
- 00:00 - 07:00 (7 min): **Kirish, motivatsion chaqiriq va oldingi bilimlarni faollashtirish**
- 07:00 - 20:00 (13 min): **Asosiy nazariy poydevor va jonli namoyish/tajriba**
- 20:00 - 35:00 (15 min): **Guruhlarda amaliy loyiha / Muammoli vaziyat yechimi**
- 35:00 - 48:00 (13 min): **Katta sinf o‘yini / Gamifikatsiyalangan viktorina jangi**
- 48:00 - 55:00 (7 min): **Differensial individual test va o‘zaro tekshirish**
- 55:00 - 60:00 (5 min): **Dars yakuni, refleksiya matritsasi va uy vazifasi tushuntirilishi**`;
  } else {
    // 80 - 90 min (Universitet yoki kollej juftlik darsi)
    return `
- 00:00 - 10:00 (10 min): **Ekspress-kirish, dolzarb keys taqdimoti va aqliy hujum**
- 10:00 - 30:00 (20 min): **Chuqurlashtirilgan interaktiv ma’ruza va tahliliy keyslar**
- 30:00 - 50:00 (20 min): **Laboratoriya / Amaliy topshiriqlar estafetasi (Juftlik va guruhlarda)**
- 50:00 - 68:00 (18 min): **Turnir va Dars O‘yini (Raundlar, ballar jadvali, himoya)**
- 68:00 - 80:00 (12 min): **Nazorat testi va tahlil (Eng keng tarqalgan xatoliklar muhokamasi)**
- 80:00 - 90:00 (10 min): **Kengaytirilgan refleksiya, iqtidorli o‘quvchilar loyihasi va baholash**`;
  }
}

/**
 * Builds the modifier directives if user applied any quick tweaks
 */
function buildModifierDirectives(appliedModifiers?: string[]): string {
  if (!appliedModifiers || appliedModifiers.length === 0) return '';

  const instructions: string[] = [];
  appliedModifiers.forEach((mod) => {
    switch (mod) {
      case 'interactive':
        instructions.push('- **MAXIMAL INTERACTIVITY BOOSTER**: Ushbu darsda passiv tinglash 15% dan oshmasin. Barcha bosqichlarda o‘quvchilarni harakatga keltiruvchi, qo‘l ko‘tarish, doskaga chiqish, ovoz berish yoki kartochka ko‘rsatish faoliyatlarini aniq ko‘rsating.');
        break;
      case 'games':
        instructions.push('- **MULTI-GAME EXPANSION**: Darsga nafaqat bitta, balki kamida 2 xil mini-o‘yin (biri boshida warm-up sifatida, biri o‘rtasida musobaqa sifatida) kiriting. Har bir o‘yin uchun aniq ballar va jamoaviy rollar taqsimlansin.');
        break;
      case 'harder':
        instructions.push('- **COGNITIVE DIFFICULTY SURGE**: Masalalar va test savollarining darajasini oshiring. Standart yodlash emas, chuqur tanqidiy tahlil, sintez va mantiqiy paradokslarni hal qilish talab qilinsin.');
        break;
      case 'exercises':
        instructions.push('- **EXTENDED PRACTICE REPERTOIRE**: Amaliy mashqlar sonini kamida 50% ga oshiring. Har bir mashq uchun yechim algoritmi va o‘quvchi yo‘l qo‘yishi mumkin bo‘lgan odatiy xato qayd etilsin.');
        break;
      case 'tests':
        instructions.push('- **EXHAUSTIVE TEST BANK**: Test savollari sonini ko‘paytiring, chalg‘ituvchi (distractor) javoblar chuqur pedagogik asoslangan bo‘lsin va har bir variant nima uchun xatoligi izohlansin.');
        break;
      case 'competition':
        instructions.push('- **HIGH-STAKES TEAM COMPETITION**: Sinfni 3-4 ta teng kuchli jamoaga bo‘ling. Aniq jamoa rollari (Kapitan, Vaqt nazoratchisi, Spiker, Strateg) berilsin. Jonli hisob-kitob doskasi qoidalari kiritilsin.');
        break;
      case 'simplify':
        instructions.push('- **STUDENT-FRIENDLY SIMPLIFICATION**: Barcha qiyin terminlarni 100% tushunarli hayotiy analogiyalar, vizual metaforalar va oddiy kundalik misollar orqali tushuntiring.');
        break;
      case 'advanced':
        instructions.push('- **OLYMPIAD & DEEP MASTERY TIER**: Dars materialiga fan olimpiadalari, ilg‘or ilmiy tadqiqotlar va xalqaro baholash tizimlari (PISA/TIMSS) darajasidagi topshiriqlarni integratsiya qiling.');
        break;
    }
  });

  return `\n## MAXSUS O‘ZGARTIRISHLAR VA KUCHAYTIRILGAN TALABLAR:\n${instructions.join('\n')}\n`;
}

/**
 * Common payload extractor
 */
function extractLessonContext(data: TeacherLessonInput) {
  const subject = data.subject === 'Boshqa fan' && data.customSubject ? data.customSubject : data.subject;
  const methods = resolveMethods(data);
  const games = resolveGames(data);
  const timeline = generateTimeline(data.duration || 45);
  const studentLevel = data.level || 'Aralash';
  const format = data.lessonFormat || 'Guruh';
  const studentCount = data.studentCount || 25;
  const grade = data.grade || 8;
  const duration = data.duration || 45;
  const topic = data.topic || 'Mavzu';
  const quality = data.qualityLevel || 'expert';

  const objectives = data.objectivesText?.trim() 
    ? data.objectivesText 
    : `${grade}-sinf o‘quvchilariga "${topic}" mavzusini to‘liq o‘zlashtirish, amaliyotda qo‘llash va mustaqil fikrlashni shakllantirish.`;

  const bloomDetails = data.bloomTaxonomy && data.bloomTaxonomy.length > 0 
    ? data.bloomTaxonomy.join(', ')
    : 'Knowledge, Understanding, Application, Analysis';

  const extraIdeas = data.extraIdeas?.trim()
    ? `\n### O‘QITUVCHINING SHAXSIY G‘OYALARI VA TALABLARI:\n"${data.extraIdeas}"\n(AI bu talablarni dars senariysiga 100% to‘liq tatbiq etishi shart!)`
    : '';

  const gradingScaleText = data.test?.gradingScale && data.test.gradingScale.length > 0
    ? data.test.gradingScale.map((item) => `- **${item.range}%**: ${item.grade} (${item.description})`).join('\n')
    : `- **90-100%**: A'lo (5 baho) - Mavzuni to‘liq o‘zlashtirgan, ijodiy yondasha oladi\n- **70-89%**: Yaxshi (4 baho) - Asosiy qoidalarni mustaqil qo‘llay oladi\n- **50-69%**: Qoniqarli (3 baho) - Ko‘rsatma bilan bajara oladi\n- **0-49%**: Qoniqarsiz (2 baho) - Qo‘shimcha dars va qo‘llab-quvvatlash zarur`;

  const exerciseTypesList = data.exerciseTypes && data.exerciseTypes.length > 0
    ? data.exerciseTypes.join(', ')
    : 'Problem solving, Multiple choice, Fill in the blank, Practical task';

  const testTypesList = data.test?.questionTypes && data.test.questionTypes.length > 0
    ? data.test.questionTypes.join(', ')
    : 'MCQ, Short answer, True/False';

  return {
    subject,
    topic,
    grade,
    duration,
    studentCount,
    studentLevel,
    format,
    quality,
    objectives,
    bloomDetails,
    methods,
    games,
    timeline,
    extraIdeas,
    gradingScaleText,
    exerciseTypesList,
    testTypesList,
  };
}

/**
 * =========================================================================
 * 1. CLAUDE OPTIMIZED PROMPT
 * Optimized for Claude's deep pedagogical reasoning, XML tags, structured
 * instructional design, and rigorous adherence to zero-fluff constraints.
 * =========================================================================
 */
export function generateClaudePrompt(data: TeacherLessonInput): string {
  const ctx = extractLessonContext(data);
  const modifierSection = buildModifierDirectives(data.appliedModifiers);

  return `# PROMPT UCHUN VAZIFA: DARS LOYIHALASH VA O‘QUV MATERIALI GENERATORI (CLAUDE UCHUN)

<instruction>
Siz — jahon miqyosidagi yetakchi Ta’lim Dizayneri (Expert Instructional Designer), tajribali metodist va zamonaviy EdTech pedagogikasining yetuk mutaxassisisiz. Sizning vazifangiz — quyida berilgan dars ma’lumotlari asosida o‘qituvchi uchun sinfda darhol chop etib yoki ekranda ochib to‘g‘ridan-to‘g‘ri ishlatishi mumkin bo‘lgan, 100% TAYYOR, BUBBLE-FREE, BETAKROR VA TO‘LIQ dars paketini yaratishdir.

MUHIM QAT’IY TALAB:
1. Umumiy maslahatlar, quruq nazariya yoki "bu yerda savol bering" kabi mavhum ko‘rsatmalar berish MUTLAQO TAQIQLANADI!
2. Har bir savolning o‘z matni, har bir javobning kaliti, har bir o‘yinning to‘liq qoidalari, har bir topshiriqning aniq matni va balli TO‘LIQ YOZILGAN bo‘lishi shart.
3. Til: O‘zbek adabiy tilida, ravon, jozibali, o‘quvchilar yoshiga (${ctx.grade}-sinf) 100% mos va ilmiy jihatdan benuqson bo‘lsin.
</instruction>

${modifierSection}

<lesson_context>
- Fan: ${ctx.subject}
- Dars mavzusi: ${ctx.topic}
- Sinf: ${ctx.grade}-sinf (Taxminan ${ctx.grade + 6} yoshdagi o‘quvchilar)
- Dars davomiyligi: ${ctx.duration} daqiqa
- O‘quvchilar soni: ${ctx.studentCount} nafar
- O‘quvchilarning umumiy darajasi: ${ctx.studentLevel}
- Dars tashkiliy formati: ${ctx.format}
- Kutilayotgan sifat darajasi: ${ctx.quality.toUpperCase()}
- Maqsad va natijalar: ${ctx.objectives}
- Bloom taksonomiyasi qatlamlari: ${ctx.bloomDetails}
- Tanlangan metodologiyalar: ${ctx.methods.join('; ')}
- Dars o‘yini turi: ${ctx.games.join('; ')}
${ctx.extraIdeas}
</lesson_context>

---

# GENERATSIYA QILINISHI SHART BO‘LGAN ANIQ STRUKTURA VA BO‘LIMLAR:

### 1. DARS MAQSADLARI VA SMART KUTILMALAR
- **Kognitiv maqsad (Bilish va tushunish)**: O‘quvchi nimalarni aniq ifodalay oladi?
- **Amaliy maqsad (Qo‘llash va tahlil)**: O‘quvchi qaysi aniq formulani/qoidani hisoblab chiqa oladi?
- **Kompetensiyaviy natija (Ijod va xulosa)**: Dars yakunida o‘quvchida shakllanadigan yangi ko‘nikma.

### 2. MINUTMA-MINUT DARS VAQT TAQSIMOTI (${ctx.duration} DAQIQA)
Quyidagi vaqt jadvaliga tayangan holda, har bir daqiqa uchun o‘qituvchi va o‘quvchi harakatini yozing:
${ctx.timeline}

### 3. O‘QITUVCHI UCHUN "SINFGA KIRISH VA MOTIVATSIYA" NUTQI (HOOK)
- O‘qituvchining birinchi 2 daqiqada aytadigan aniq so‘zlari (aytishga tayyor skript).
- Darsni zerikarli ta’rif bilan emas, hayratlanarli fakt, mantiqiy paradoks yoki hayotiy jumboq orqali boshlash mexanizmi.
- Mavzuning nima uchun hozirgi zamonda (${ctx.grade}-sinf o‘quvchisiga) juda muhimligini ko‘rsatuvchi 1 ta hayotiy misol.

### 4. YANGI MAVZU BAYONI: KONSEPTUAL VA MODULLI TUSHUNTIRISH
- Mavzuni 3 ta asosiy mantiqiy blokga ajratib, tushunarli tilda ifodalash.
- O‘quvchi ongida obraz yaratuvchi 2 ta yorqin vizual metafora / o‘xshatish.
- O‘quvchilar eng ko‘p yo‘l qo‘yadigan 3 ta odatiy xatolik (Misconceptions) va ularni dars paytida darhol tuzatish usuli.

### 5. INTERAKTIV O‘YIN SENARIYSI: "${ctx.games[0] || 'Dars O‘yini'}" (TO‘LIQ QOIDALAR VA SAVOLLARI BILAN)
Quyidagilarni aniq ishlab chiqing:
- **O‘yin nomi va maqsadi**
- **Ishtirokchilar va jamoalar soni** (Masalan: ${ctx.format})
- **O‘yin qoidalari va davomiyligi** (Bosqichma-bosqich)
- **Raundlar tuzilishi**:
  - 1-Raund: Qizdiruvchi tezkor savollar (Aniq savollar va to‘g‘ri javoblar bilan)
  - 2-Raund: Strategik / Murakkab savollar
  - 3-Raund: Final hal qiluvchi bosqich
- **Ballar va jarimalar jadvali**
- **O‘qituvchi uchun o‘yinni boshqarish bo‘yicha aniq yo‘riqnoma**
- **G‘olib jamoani taqdirlash va ijobiy rag‘batlantirish**

### 6. MUSTAHKAMLASH MASHQLARI (${data.exerciseCount || 10} TA ANIQ TOPSHIRIQ VA JAVOBLAR KALITI)
Mashq formatlari: ${ctx.exerciseTypesList}
- Har bir mashqning to‘liq sharti va matni.
- Mashqlarning bosqichma-bosqich yechimi va yakuniy javobi (Answer Key).
- O‘qituvchi doskada tahlil qilishi uchun izoh.

### 7. FORMATLASHTIRUVCHI TEST BANKI (${data.test?.questionCount || 10} TA SAVOL VA METODIKASI)
Formatlar: ${ctx.testTypesList}
Har bir test savoli quyidagi qat’iy shablon bo‘yicha yozilsin:
- **Savol №**
- **Savol matni**
- **Variantlar (A, B, C, D)**
- **To‘g‘ri javob**
- **Ilmiy pedagogik izoh**: Nega to‘g‘ri javob shu va boshqa variantlar nima sababdan chalg‘ituvchi hisoblanadi?
- **Baho mezonlari jadvali**:
${ctx.gradingScaleText}

### 8. TA’LIMNI DIFFERENSIATSIYALASH (DIFFERENTIATED LEARNING - 4 DARAJA)
Har bir darajadagi o‘quvchi uchun alohida 1-2 tadan amaliy topshiriq tuzing:
- **A DARAJA (Qo‘llab-quvvatlash kerak bo‘lgan o‘quvchilar)**: Ko‘rgazmali, sodda, poydevor topshiriq va yordamchi qolip (Scaffolding).
- **B DARAJA (O‘rta o‘zlashtiruvchilar)**: Standart o‘quv dasturi topshirig‘i.
- **C DARAJA (Iqtidorli o‘quvchilar)**: Mustaqil fikrlash va tahlil talab etuvchi nostandart masala.
- **D DARAJA (Olimpiada / Challenge)**: Chuqurlashtirilgan, yuqori mantiqiy yondashuvli masala va to‘liq yechimi.

### 9. UYGA VAZIFA (HOMEWORK BLUEPRINT)
- **Vazifa turi**: ${data.homework?.type || 'Mixed'}
- **Mo‘ljallangan vaqt**: ${data.homework?.estimatedTimeMin || 25} daqiqa
- **Vazifaning to‘liq matni va ko‘rsatmasi**
- **Kutilayotgan natija va baholash mezonlari (Rubrika)**
- **Ixtiyoriy ijodiy kengaytma (Qiziquvchilar uchun mini-loyiha)**

### 10. REFLEKSIYA, DAVOMAT VA CHIQUV CHIPTASI (EXIT TICKET)
- 2 daqiqalik Chiqish Chiptasi uchun 2 ta aniq refleksiya savoli.
- Davomat va faollikni baholash bo‘yicha o‘qituvchiga tezkor monitoring qolipi.

<output_rules>
- Matnni toza, chiroyli Markdown sarlavhalari (#, ##, ###), qalin shriftlar, ro‘yxatlar va jadvallar bilan formatlang.
- Hech qanday "va hokazo", "shunga o‘xshash savollar tuzing" degan chala jumlalar qoldirmang.
- Dars materialini o‘qituvchi o‘qishi bilanoq darsga kirib ketadigan darajada to‘liq yozing.
</output_rules>`;
}

/**
 * =========================================================================
 * 2. GOOGLE AI STUDIO OPTIMIZED PROMPT
 * Structured system role prompt, optimized for Gemini's structured schema,
 * actionable tables, bullet-proof instructions, classroom scripts, and
 * markdown formatting.
 * =========================================================================
 */
export function generateGoogleAIStudioPrompt(data: TeacherLessonInput): string {
  const ctx = extractLessonContext(data);
  const modifierSection = buildModifierDirectives(data.appliedModifiers);

  return `# SYSTEM ROLE & MISSION: EXPERT AI CLASSROOM CONTENT GENERATOR

You are an expert AI Master Educator and Lead Curriculum Developer powering Google AI Studio.
Your mission is to produce a comprehensive, ultra-practical, classroom-ready lesson package in fluent literary Uzbek.

## OPERATIONAL PRINCIPLES:
1. **NO GENERIC ADVICE**: Do not tell the teacher WHAT to do in theory (e.g. "Ask questions", "Explain the concept"). Instead, provide the EXACT verbatim questions, the EXACT explanations, the EXACT step-by-step game rules, and the COMPLETE answer keys.
2. **CLASSROOM-READY ARTIFACTS**: The generated materials must be ready to be printed or displayed on an interactive board immediately.
3. **AGE APPROPRIATENESS**: Content must rigorously match ${ctx.grade}-grade cognitive development (approx. age ${ctx.grade + 6}).
4. **PEDAGOGICAL RIGOR**: Align tightly with Bloom's Taxonomy, formative assessment, and differentiated instruction.

${modifierSection}

---

## LESSON PROFILE:
- **Fan (Subject)**: ${ctx.subject}
- **Dars mavzusi (Topic)**: ${ctx.topic}
- **Sinf (Grade)**: ${ctx.grade}-sinf
- **Davomiyligi (Duration)**: ${ctx.duration} daqiqa
- **O‘quvchilar soni (Class Size)**: ${ctx.studentCount} o‘quvchi
- **Tayyorgarlik darajasi (Level)**: ${ctx.studentLevel}
- **Dars formati (Grouping)**: ${ctx.format}
- **Dars maqsadi (Core Objective)**: ${ctx.objectives}
- **Bloom taksonomiyasi**: ${ctx.bloomDetails}
- **Tavsiya etilgan metodlar**: ${ctx.methods.join(', ')}
- **Interaktiv o‘yin turi**: ${ctx.games.join(', ')}
${ctx.extraIdeas}

---

## REQUIRED OUTPUT SPECIFICATION:

Please generate the lesson plan strictly following these numbered modules in Uzbek:

### MODULE 1: LESSON PASSPORT & OBJECTIVES
- **Dars pasporti jadvali**: Fan, Mavzu, Sinf, Vaqt, Jihozlar, Dars turi.
- **Kutilayotgan o‘quv natijalari (Measurable Learning Outcomes)**:
  1. *Bilish (Remember & Understand)*: 2 ta aniq ta’rif.
  2. *Qo‘llash (Apply & Analyze)*: 2 ta amaliy ko‘nikma.
  3. *Ijod va Baholash (Evaluate & Create)*: 1 ta xulosa yoki amaliy yechim.

### MODULE 2: MINUTE-BY-MINUTE TIMELINE & CHOREOGRAPHY
Detailed breakdown matching ${ctx.duration} minutes:
${ctx.timeline}
*(Har bir bosqich uchun o‘qituvchining aniq harakati va o‘quvchilarning faoliyati jadval yoki tartiblangan ro‘yxatda berilsin).*

### MODULE 3: TEACHER SCRIPT & INTERACTIVE HOOK (5 MIN)
- O‘qituvchining dars boshida aytadigan to‘liq skripti (30-soniyalik qiziqarli hayotiy voqea yoki anomaliya).
- Sinfga beriladigan 2 ta aqliy hujum (Brainstorming) savoli va kutiladigan o‘quvchi javoblari.

### MODULE 4: CORE LESSON CONTENT & MULTI-SENSORY EXPLANATION
- Nazariy qism: 3 ta qisqa, londa va tushunarli qoida.
- O‘quvchilar tushunishi uchun 2 ta hayotiy amaliy analogiya (Masalan, sport, internet yoki tabiat misolida).
- Doskada ko‘rsatiladigan 2 ta namunaviy masala/namuna to‘liq bosqichma-bosqich tahlili bilan.

### MODULE 5: CLASSROOM GAME "${ctx.games[0] || 'Dars O‘yini'}" (FULL TURN-KEY RULES & BANK)
- **O‘yin qoidalari**: Qadam-baqadam yo‘riqnoma.
- **Tashkil etish mexanizmi**: Jamoalar qanday tuziladi (${ctx.format})?
- **O‘yin savollar banki**: Kamida 6-8 ta aniq savol, to‘g‘ri javoblar va har bir savol uchun ball.
- **Boshqaruv maslahati**: O‘qituvchi vaqtni va intizomni qanday saqlashi kerak?

### MODULE 6: COMPREHENSIVE PRACTICE EXERCISES (${data.exerciseCount || 10} TASKS)
Types: ${ctx.exerciseTypesList}
- Har bir mashqning to‘liq matni.
- Yechimlar va Javoblar kaliti (Har bir mashq tagida yashirin yoki alohida blokda).

### MODULE 7: FORMATIVE ASSESSMENT TEST (${data.test?.questionCount || 10} QUESTIONS WITH RUBRIC)
Types: ${ctx.testTypesList}
Format:
- Savol matni
- A), B), C), D) variantlari
- **TO‘G‘RI JAVOB**
- **METODIK IZOH**: Nima uchun ushbu javob to‘g‘ri, boshqalari nega xato?
- **Baholash mezonlari**:
${ctx.gradingScaleText}

### MODULE 8: 4-TIER DIFFERENTIATED INSTRUCTION
- **Level A (Ko‘mak oluvchi)**: Yengillashtirilgan qadamlar bilan 2 ta mashq.
- **Level B (Standart)**: Dastur darajasidagi 2 ta mashq.
- **Level C (Ilg‘or)**: Tahliliy 1 ta masala.
- **Level D (Olimpiada)**: Nostandart, qiziqarli boshqotirma masala va to‘liq isboti.

### MODULE 9: HOMEWORK SPECIFICATION
- Topshiriq matni va aniq ko‘rsatmalar.
- Bajarish vaqti (${data.homework?.estimatedTimeMin || 25} daqiqa).
- Baholash rubrikasi (Qanday topshirsa 5, 4 yoki 3 oladi).
- Qiziquvchanlar uchun ijodiy loyiha g‘oyasi.

### MODULE 10: REFLECTION & ATTENDANCE
- 2 ta Chiqish Chiptasi (Exit Ticket) savoli.
- Dars xulosasi va o‘quvchilarni ruhlantiruvchi yakuniy so‘z.

---
Execute the response now in pristine, elegant Markdown.`;
}

/**
 * =========================================================================
 * 3. COMBINED PROMPTS (BOTH CLAUDE & GOOGLE AI STUDIO)
 * =========================================================================
 */
export function generateCombinedPrompts(data: TeacherLessonInput): {
  claude: string;
  googleAI: string;
  combined: string;
} {
  const claude = generateClaudePrompt(data);
  const googleAI = generateGoogleAIStudioPrompt(data);

  const combined = `================================================================================
# EDU PROMPT ENGINE - IKKALA AI PLATFORMASI UCHUN MAXSUS OPTIMALLASHTIRILGAN PROMPTLAR
# Fan: ${data.subject} | Mavzu: ${data.topic} | Sinf: ${data.grade}-sinf
================================================================================

Quyida siz tanlagan ikkala yetakchi AI modeli (Claude va Google AI Studio) uchun alohida arxitekturalangan promptlar keltirilgan.
O‘zingizga qulay platformaning tegishli qismini nusxalab oling va AI ga yuboring!

================================================================================
VARIANT 1: CLAUDE UCHUN MAXSUS PROMPT (Anthropic Claude 3.5 Sonnet / Opus)
================================================================================

${claude}

================================================================================
VARIANT 2: GOOGLE AI STUDIO UCHUN MAXSUS PROMPT (Gemini 2.5 Flash / Pro)
================================================================================

${googleAI}
`;

  return { claude, googleAI, combined };
}

/**
 * Dedicated sub-prompts for modular usage
 */
export function generateGamePrompt(data: TeacherLessonInput): string {
  const ctx = extractLessonContext(data);
  return `# MAXSUS DARS O‘YINI GENERATORI PROMPTI (${ctx.subject} — ${ctx.topic})

Siz ta’limiy gamifikatsiya bo‘yicha xalqaro mutaxassissiz.
Quyidagi ma’lumotlar asosida ${ctx.grade}-sinf o‘quvchilari uchun sinfda 15-20 daqiqa ichida o‘tkazish mumkin bo‘lgan to‘liq interaktiv o‘yin tizimini ishlab chiqing:

- Fan: ${ctx.subject}
- Mavzu: ${ctx.topic}
- Sinf: ${ctx.grade}-sinf (${ctx.studentCount} o‘quvchi)
- O‘yin formati: ${ctx.games.join(', ')}

Quyidagilarni 100% to‘liq taqdim eting:
1. O‘yinning aniq nomi va qiziqarli afsonasi (storyline).
2. Qoidalar va jamoalar o‘rtasidagi vazifalar taqsimoti.
3. Kamida 8 ta to‘liq o‘yin savoli (har biri uchun ballar, to‘g‘ri javoblar va maslahat/hintlar).
4. O‘qituvchi uchun o‘yinni qizg‘in va intizomli o‘tkazish yo‘riqnomasi.
5. G‘olib jamoa uchun sertifikat yoki baholash tizimi.`;
}

export function generateTestPrompt(data: TeacherLessonInput): string {
  const ctx = extractLessonContext(data);
  return `# MAXSUS TEST VA NAZORAT MATERIALI PROMPTI (${ctx.subject} — ${ctx.topic})

Siz professional pedagogik testolog va imtihon tuzuvchisiz.
${ctx.grade}-sinf uchun "${ctx.topic}" mavzusida ${data.test?.questionCount || 10} ta savoldan iborat formatlashtiruvchi test bankini yarating.

Talablar:
1. Savol formatlari: ${ctx.testTypesList}
2. Qiyinlik: ${data.test?.difficulty || 'Mixed'} (Oson, O‘rta, Qiyin mutanosibligi).
3. Har bir savol uchun variantlar, to‘g‘ri javob va har bir noto‘g‘ri variant nima uchun noto‘g‘riligi bo‘yicha batafsil ilmiy izoh.
4. Baholash shkalasi:
${ctx.gradingScaleText}`;
}

export function generateHomeworkPrompt(data: TeacherLessonInput): string {
  const ctx = extractLessonContext(data);
  return `# TAYYOR UYGA VAZIFA VA LOYIHA PROMPTI (${ctx.subject} — ${ctx.topic})

${ctx.grade}-sinf o‘quvchilari uchun "${ctx.topic}" mavzusi bo‘yicha ${data.homework?.estimatedTimeMin || 25} daqiqalik mustaqil uyga vazifa tizimini tuzing.
Vazifa turi: ${data.homework?.type || 'Mixed'}.

Tarkibi:
- Aniq topshiriq matni va misollar.
- O‘quvchi o‘zini o‘zi tekshirishi uchun tekshiruv ro‘yxati (Checklist).
- Baholash rubrikasi (Aniq ballar va mezonlar).
- Qiziquvchi o‘quvchilar uchun erkin ijodiy mini-loyiha g‘oyasi.`;
}

export function generateAssessmentPrompt(data: TeacherLessonInput): string {
  const ctx = extractLessonContext(data);
  return `# DARS BAHOLASH VA RUBRIKA TIZIMI PROMPTI (${ctx.subject} — ${ctx.topic})

Ushbu dars uchun to‘liq formativ va summativ baholash rubrikasini ishlab chiqing:
- Fan: ${ctx.subject}
- Mavzu: ${ctx.topic}
- Baholash usullari: ${data.assessment?.methods?.join(', ') || 'Points, Rubric, Formative'}
- Differensiatsiya: 4 ta daraja (A, B, C, D darajalar bo‘yicha aniq descriptors).`;
}

/**
 * Universal prompt generator entry point
 */
export function generateLessonPrompt(data: TeacherLessonInput): {
  claudePrompt?: string;
  googleAIPrompt?: string;
  combinedPrompt?: string;
  activePrompt: string;
} {
  const target = data.aiTarget || 'both';
  let claudePrompt = '';
  let googleAIPrompt = '';
  let combinedPrompt = '';
  let activePrompt = '';

  if (target === 'claude') {
    claudePrompt = generateClaudePrompt(data);
    activePrompt = claudePrompt;
  } else if (target === 'google-ai-studio') {
    googleAIPrompt = generateGoogleAIStudioPrompt(data);
    activePrompt = googleAIPrompt;
  } else {
    // Both
    const res = generateCombinedPrompts(data);
    claudePrompt = res.claude;
    googleAIPrompt = res.googleAI;
    combinedPrompt = res.combined;
    activePrompt = res.combined;
  }

  return {
    claudePrompt,
    googleAIPrompt,
    combinedPrompt,
    activePrompt,
  };
}
