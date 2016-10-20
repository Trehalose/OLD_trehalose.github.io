//TODO: Add respawnRate var, a countdown of how long until respawn moment
//TODO: Add passed var, how many times passed item minus X times failed item, used to calculate respawnRate

var vType = [
	"expression", //0
	"noun", //1
	"particle", //2
	"copula", //3
	"U-verb", //4
	"RU-verb", //5
	"Irreg. verb", //6
	"I-adj.", //7
	"NA-adj.", //8
	"adverb", //9
	"counter" //10
];
var vocabList = [
	{	//VOCAB OBJECT FORMAT
		type: vType[0], //See numbers correlated to list above^|: 0="expression", 1="noun", and so on...
		kana: "", //hiragana or katakana readings
		kanji: "", //kanji reading if there is one, else leave as ""
		meaning: [""], //meanings, separated by comma, inside "quotations"
		example: [""], //example sentence, if self-evident or an expression, leave blank
		chapter: 0, //which Genki chapter # is it in? for reference sake
		score: 0
	},
	{
		type: vType[0],
		kana: "おはようございます",
		kanji: "お早うございます",
		meaning: ["Good morning"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "こんにちは",
		kanji: "今日は",
		meaning: ["Good afternoon", "Good day"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "こんばんは",
		kanji: "今晩は",
		meaning: ["Good evening"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "さようなら",
		kanji: "",
		meaning: ["Goodbye(for a while)"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "おやすみなさい",
		kanji: "お休みなさい",
		meaning: ["Good night", "Sleep well"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "ありがとうございます",
		kanji: "",
		meaning: ["Thank you very much"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "すみません",
		kanji: "",
		meaning: ["Excuse me", "Pardon"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "いいえ",
		kanji: "",
		meaning: ["No","Not at all"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "いってきます",
		kanji: "行ってきます",
		meaning: ["I'll go and come back","I'll be back"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "いってらっしゃい",
		kanji: "",
		meaning: ["Please go and come back","Come back safe", "I'll expect your return"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "ただいま",
		kanji: "",
		meaning: ["I'm home", "I'm back"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "おかえりなさい",
		kanji: "お帰りなさい",
		meaning: ["Welcome home", "Welcome back"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "いただきます",
		kanji: "",
		meaning: ["Thank you for the meal(before eating)", "xpression of gratitude before meals"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "ごちそうさまでした",
		kanji: "",
		meaning: ["Thank you for the meal(after eating)", "The food was wonderful", "The food satisfied me"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "はじめまして",
		kanji: "始めまして",
		meaning: ["How do you do?","Our first meeting","Nice to meet you"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "よろしくおねがいします",
		kanji: "よろしくお願いします",
		meaning: ["Nice to meet you", "Please treat me well", "I hope we work well together"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "あの",
		kanji: "",
		meaning: ["um...", "er...", "hmm", "an interjection"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "いま",
		kanji: "今",
		meaning: ["now"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "えいご",
		kanji: "英語",
		meaning: ["English", "English language"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "ええ",
		kanji: "",
		meaning: ["yes", "correct!"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "がくせい",
		kanji: "がくせい",
		meaning: ["student"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[2],
		kana: "～ご",
		kanji: "語",
		meaning: ["language", "～ language"],
		example: ["にほんご","フランスご"],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "こうこう",
		kanji: "高校",
		meaning: ["highschool"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[2],
		kana: "ごご",
		kanji: "午後",
		meaning: ["p.m.", "afternoon hours"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[2],
		kana: "ごぜん",
		kanji: "午前",
		meaning: ["a.m.", "morning hours"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[10],
		kana: "～さい",
		kanji: "～才",
		meaning: ["～ years of age", "age ～"],
		example: ["ジョンさんは２１さいです。"],
		chapter: 1,
		score: 0
	},
	{
		type: vType[2],
		kana: "～さん",
		kanji: "",
		meaning: ["mister / Mr. ～", "miss / Ms. ～"],
		example: ["Jenniferさん","だいきさん"],
		chapter: 1,
		score: 0
	},
	{
		type: vType[10],
		kana: "～じ",
		kanji: "～時",
		meaning: ["～o-clock"],
		example: ["今は１２じです。","今は何じですか？"],
		chapter: 1,
		score: 0
	},
	{
		type: vType[2],
		kana: "～じん",
		kanji: "人",
		meaning: ["～ type of person", "person of ～ nationality"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "せんこう",
		kanji: "",
		meaning: ["school major", "major"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "せんせい",
		kanji: "先生",
		meaning: ["teacher", "professor"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "そうです",
		kanji: "",
		meaning: ["so it is", "this is the case"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[2],
		kana: "～か",
		kanji: "",
		meaning: ["～?", "inquiry concerning ～"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "だいがく",
		kanji: "大学",
		meaning: ["university", "college", "higher education"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "でんわ",
		kanji: "電話",
		meaning: ["phone", "telephone"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "ともだち",
		kanji: "友達",
		meaning: ["friend"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "なまえ",
		kanji: "名前",
		meaning: ["name", "first name"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "なん",
		kanji: "何",
		meaning: ["what"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "にほん",
		kanji: "日本",
		meaning: ["Japan"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[10],
		kana: "～ねんせい",
		kanji: "～年生",
		meaning: ["student year", "student grade", "student rank"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[0],
		kana: "はい",
		kanji: "",
		meaning: ["yes", "correct"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "はん",
		kanji: "半",
		meaning: ["half", "part", "X:30 in time"],
		example: ["今は１２じはんです","私は半本を読みました"],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "ばんごう",
		kanji: "番号",
		meaning: ["number"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "りゅうがくせい",
		kanji: "留学生",
		meaning: ["international student", "foreign exchange student", "foreign student"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "わたし",
		kanji: "私",
		meaning: ["I", "me", ",myself"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "アメリカ",
		kanji: "",
		meaning: ["USA", "America"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "イギリス",
		kanji: "",
		meaning: ["Britain", "UK", "England"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "オーストラリア",
		kanji: "",
		meaning: ["Australia"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "かんこく",
		kanji: "韓国",
		meaning: ["Korea"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "スウェーデン",
		kanji: "",
		meaning: ["Sweden"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "ちゅうごく",
		kanji: "中国",
		meaning: ["China"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "かがく",
		kanji: "",
		meaning: ["science"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "アジアけんきゅう",
		kanji: "",
		meaning: ["asian studies"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "けいざい",
		kanji: "",
		meaning: ["economics"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "こくさいかんけえ",
		kanji: "",
		meaning: ["international relations"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "コンピューター",
		kanji: "",
		meaning: ["computer"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "じんるいがく",
		kanji: "",
		meaning: ["anthropology"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "せいじ",
		kanji: "",
		meaning: ["politics"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "ビジネス",
		kanji: "",
		meaning: ["business"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "ぶんがく",
		kanji: "",
		meaning: ["literature"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "れきし",
		kanji: "",
		meaning: ["history"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "しごと",
		kanji: "仕事",
		meaning: ["work", "job", "task","occupation"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "いしゃ",
		kanji: "",
		meaning: ["doctor", "medical doctor"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "かいしゃいん",
		kanji: "会社員",
		meaning: ["businessman", "business-worker", "company employee", "office worker"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "こうこうせい",
		kanji: "高校生",
		meaning: ["highschool student"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "しゅふ",
		kanji: "",
		meaning: ["housewife"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "だいがくいんせい",
		kanji: "大学院生",
		meaning: ["graduate student"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "だいがくせい",
		kanji: "大学生",
		meaning: ["college student"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "べんごし",
		kanji: "",
		meaning: ["lawyer"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "おかあさん",
		kanji: "お母さん",
		meaning: ["mother"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "おとうさん",
		kanji: "お父さん",
		meaning: ["father"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "おねえさん",
		kanji: "お姉さん",
		meaning: ["older sister"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "おにいさん",
		kanji: "お兄さん",
		meaning: ["older brother"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "いもうと",
		kanji: "妹",
		meaning: ["younger sister"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[1],
		kana: "おとうと",
		kanji: "弟",
		meaning: ["younger brother"],
		example: [""],
		chapter: 1,
		score: 0
	},
	{
		type: vType[10],
		kana: "～ふん",
		kanji: "分",
		meaning: ["～minutes"],
		example: [""],
		chapter: 1,
		score: 0
	},
	
	
	
	
	
	
	{
		type: vType[1],
		kana: "これ",
		kanji: "",
		meaning: ["this one", "this thing", "this"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "それ",
		kanji: "",
		meaning: ["that one", "that thing", "that"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "あれ",
		kanji: "",
		meaning: ["that one over there", "that thing yonder", "that thing there"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "どれ",
		kanji: "",
		meaning: ["which one", "which"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "この～",
		kanji: "",
		meaning: ["this ～"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "その～",
		kanji: "",
		meaning: ["that ～"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "あの～",
		kanji: "",
		meaning: ["that ～ over there", "yonder ～"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "どの～",
		kanji: "",
		meaning: ["which ～"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ここ",
		kanji: "",
		meaning: ["here"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "そこ",
		kanji: "",
		meaning: ["there"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "あそこ",
		kanji: "",
		meaning: ["over there", "yonder"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "どこ",
		kanji: "",
		meaning: ["where"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "だれ",
		kanji: "",
		meaning: ["who"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[7],
		kana: "おいしい",
		kanji: "",
		meaning: ["delicious"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "さかな",
		kanji: "魚",
		meaning: ["fish"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "とんかつ",
		kanji: "",
		meaning: ["pork cutlet"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "にく",
		kanji: "肉",
		meaning: ["meat"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "メンュー",
		kanji: "",
		meaning: ["menu"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "やさい",
		kanji: "",
		meaning: ["vegetable"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "えんぴつ",
		kanji: "",
		meaning: ["pencil"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "かさ",
		kanji: "傘",
		meaning: ["umbrella"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "かばん",
		kanji: "",
		meaning: ["bag", "purse"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "くつ",
		kanji: "",
		meaning: ["shoe"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "さいふ",
		kanji: "",
		meaning: ["wallet"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ジーンズ",
		kanji: "",
		meaning: ["jeans"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "じしょ",
		kanji: "",
		meaning: ["dictionary"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "じてんしゃ",
		kanji: "",
		meaning: ["bicycle", "bike"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "しんぶん",
		kanji: "新聞",
		meaning: ["newspaper","reading-newspaper"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "Ｔシャツ",
		kanji: "",
		meaning: ["T-shirt", "shirt"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "とけい",
		kanji: "時計",
		meaning: ["clock", "watch"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ノート",
		kanji: "",
		meaning: ["notebook"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ペン",
		kanji: "",
		meaning: ["pen"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ぼうし",
		kanji: "",
		meaning: ["hat"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ほん",
		kanji: "本",
		meaning: ["book"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "きっさてん",
		kanji: "",
		meaning: ["cafe"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ぎんこう",
		kanji: "",
		meaning: ["bank"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "トイレ",
		kanji: "",
		meaning: ["toilet", "bathroom", "restroom"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "としょかん",
		kanji: "",
		meaning: ["library"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ゆうびんきょく",
		kanji: "",
		meaning: ["post office"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "いくら",
		kanji: "",
		meaning: ["how many", "amount"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[10],
		kana: "～えん",
		kanji: "",
		meaning: ["yen", "yen counter"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[7],
		kana: "たかい",
		kanji: "高い",
		meaning: ["tall", "expensive"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "いらっしゃいませ",
		kanji: "",
		meaning: ["Welcome!", "Welcome to our store"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "～をおねがいします",
		kanji: "",
		meaning: ["Please ～"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "～をください",
		kanji: "",
		meaning: ["Please give me ～", "give me ～"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "じゃあ",
		kanji: "",
		meaning: ["then...", "if that is the case..."],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "どうぞ",
		kanji: "",
		meaning: ["please", "here it is", "feel free", "if you would"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "どうも",
		kanji: "",
		meaning: ["thank you", "gratitude"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "こくばん",
		kanji: "",
		meaning: ["blackboard", "chalkboard"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "でんき",
		kanji: "",
		meaning: ["electricity", "electric light"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "ドア",
		kanji: "",
		meaning: ["door"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "カーテン",
		kanji: "",
		meaning: ["curtain"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "まど",
		kanji: "",
		meaning: ["window"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "いす",
		kanji: "",
		meaning: ["chair"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "けしごむ",
		kanji: "",
		meaning: ["eraser"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[1],
		kana: "つくえ",
		kanji: "机",
		meaning: ["desk"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[4],
		kana: "わかる",
		kanji: "分かる",
		meaning: ["to understand"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "ゆっくりいってください",
		kanji: "",
		meaning: ["please do it slowly"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "もういちどいってください",
		kanji: "",
		meaning: ["please do it again"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "ちょっとまってください",
		kanji: "",
		meaning: ["please wait a moment"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "きいてください",
		kanji: "",
		meaning: ["please listen", "please ask"],
		example: [""],
		chapter: 2,
		score: 0
	},
	{
		type: vType[0],
		kana: "１０ページをみてください",
		kanji: "",
		meaning: ["please look at page 10"],
		example: [""],
		chapter: 2,
		score: 0
	},
	
	
	
	
	
	{
		type: vType[1],
		kana: "えいが",
		kanji: "映画",
		meaning: ["movie"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "おんがく",
		kanji: "音楽",
		meaning: ["music"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "ざっし",
		kanji: "雑誌",
		meaning: ["magazine"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "スポーツ",
		kanji: "",
		meaning: ["sports"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "デート",
		kanji: "",
		meaning: ["date", "romantic date"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "テニス",
		kanji: "",
		meaning: ["tennis"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "テレビ",
		kanji: "",
		meaning: ["TV", "television", "tele"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "アイスクリーム",
		kanji: "",
		meaning: ["icecream"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "あさごはん",
		kanji: "朝ご飯",
		meaning: ["breakfast"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "おさけ",
		kanji: "お酒",
		meaning: ["sake"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "おちゃ",
		kanji: "お茶",
		meaning: ["green tea"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "コーヒー",
		kanji: "",
		meaning: ["coffee"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "ばんごはん",
		kanji: "晩ご飯",
		meaning: [""],
		example: "dinner",
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "ハンバーガー",
		kanji: "",
		meaning: ["hamburger"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "ひるごはん",
		kanji: "昼ご飯",
		meaning: ["lunch"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "みず",
		kanji: "水",
		meaning: ["water"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "いえ",
		kanji: "家",
		meaning: ["house"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "うち",
		kanji: "家",
		meaning: ["home"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "がっこう",
		kanji: "学校",
		meaning: ["school"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "あさ",
		kanji: "朝",
		meaning: ["morning"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "あした",
		kanji: "明日",
		meaning: ["tomorrow"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "いつ",
		kanji: "",
		meaning: ["when"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "きょう",
		kanji: "今日",
		meaning: ["today"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[2],
		kana: "～ごろ",
		kanji: "",
		meaning: ["at about ～", "around ～ time"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "こんばん",
		kanji: "今晩",
		meaning: ["tonight"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "しゅうまつ",
		kanji: "週末",
		meaning: ["weekend"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "どようび",
		kanji: "土曜日",
		meaning: ["saturday"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "にちようび",
		kanji: "日曜日",
		meaning: ["sunday"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "まいにち",
		kanji: "毎日",
		meaning: ["every day"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "まいばん",
		kanji: "毎晩",
		meaning: ["every night"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[4],
		kana: "いく",
		kanji: "行く",
		meaning: ["to go"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[4],
		kana: "かえる",
		kanji: "帰る",
		meaning: ["to go back", "to return"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[4],
		kana: "きく",
		kanji: "聞く",
		meaning: ["to hear", "to listen", "to ask"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[4],
		kana: "のむ",
		kanji: "飲む",
		meaning: ["to drink"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[4],
		kana: "はなす",
		kanji: "話す",
		meaning: ["to talk", "to speak"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[4],
		kana: "よむ",
		kanji: "読む",
		meaning: ["to read"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[5],
		kana: "おきる",
		kanji: "起きる",
		meaning: ["to get up", "to wake up"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[5],
		kana: "たべる",
		kanji: "食べる",
		meaning: ["to eat"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[5],
		kana: "ねる",
		kanji: "寝る",
		meaning: ["to sleep"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[5],
		kana: "みる",
		kanji: "見る",
		meaning: ["to see", "to look"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[6],
		kana: "くる",
		kanji: "来る",
		meaning: ["to come"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[6],
		kana: "する",
		kanji: "",
		meaning: ["to do"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[6],
		kana: "べんきょうする",
		kanji: "勉強する",
		meaning: ["to study", "to do studying"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[7],
		kana: "いい",
		kanji: "良い",
		meaning: ["good", "agreeable", "pleasant", "acceptable"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[7],
		kana: "はやい",
		kanji: "早い",
		meaning: ["early", "quick", "fast"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[9],
		kana: "あまり+neg",
		kanji: "",
		meaning: ["not much"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[9],
		kana: "ぜんぜん+neg",
		kanji: "全然",
		meaning: ["not at all"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[9],
		kana: "たいてい",
		kanji: "",
		meaning: ["usually"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[9],
		kana: "ちょっと",
		kanji: "",
		meaning: ["a little"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[1],
		kana: "ときどき",
		kanji: "時々",
		meaning: ["sometimes"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[9],
		kana: "よく",
		kanji: "",
		meaning: ["often", "much"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[0],
		kana: "そうですね",
		kanji: "",
		meaning: ["that's right", "let me see", "is that so~?"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[2],
		kana: "でも～",
		kanji: "",
		meaning: ["but ～","Even so, ～"],
		example: [""],
		chapter: 3,
		score: 0
	},
	{
		type: vType[9],
		kana: "どう",
		kanji: "",
		meaning: ["how", "way", "manner", "quality"],
		example: [""],
		chapter: 3,
		score: 0
	},
	
	
	
	
	
	
	{
		type: vType[1],
		kana: "アルバイト",
		kanji: "",
		meaning: ["part-time job"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "かいもの",
		kanji: "買い物",
		meaning: ["shopping"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "クラス",
		kanji: "",
		meaning: ["class"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "あなた",
		kanji: "",
		meaning: ["you"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "いぬ",
		kanji: "犬",
		meaning: ["dog"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "おみやげ",
		kanji: "お土産",
		meaning: ["souvenir"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "こども",
		kanji: "子供",
		meaning: ["child", "kid"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ごはん",
		kanji: "ご飯",
		meaning: ["rice","meal"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "しゃしん",
		kanji: "写真",
		meaning: ["picture","photograph"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "てがみ",
		kanji: "手紙",
		meaning: ["letter"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ねこ",
		kanji: "猫",
		meaning: ["cat", "house-cat"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "パン",
		kanji: "",
		meaning: ["bread"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "メール",
		kanji: "",
		meaning: ["e-mail"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ひと",
		kanji: "人",
		meaning: ["person"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "おてら",
		kanji: "お寺",
		meaning: ["temple"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "こうえん",
		kanji: "公園",
		meaning: ["park"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "スーパー",
		kanji: "",
		meaning: ["super market","grocery"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "デパート",
		kanji: "",
		meaning: ["department store"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "バスてい",
		kanji: "バス停",
		meaning: ["bus stop"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "びょういん",
		kanji: "病院",
		meaning: ["hospital"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ホテル",
		kanji: "",
		meaning: ["hotel"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ほんや",
		kanji: "本屋",
		meaning: ["book shop"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "まち",
		kanji: "町",
		meaning: ["town", "city"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "レストラン",
		kanji: "",
		meaning: ["restaurant"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "きのう",
		kanji: "昨日",
		meaning: ["yesterday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "～じかん",
		kanji: "～時間",
		meaning: ["～ hours", "～ number of hours"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "せんしゅう",
		kanji: "先週",
		meaning: ["last week"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "とき",
		kanji: "時",
		meaning: ["time"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "げつようび",
		kanji: "月曜日",
		meaning: ["monday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "かようび",
		kanji: "火曜日",
		meaning: ["tuesday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "すいようび",
		kanji: "水曜日",
		meaning: ["wednesday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "もくようび",
		kanji: "木曜日",
		meaning: ["thursday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "きんようび",
		kanji: "金曜日",
		meaning: ["friday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[4],
		kana: "あう",
		kanji: "会う",
		meaning: ["to meet"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[4],
		kana: "ある",
		kanji: "有る",
		meaning: ["to exist(inanimate)", "to have"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[4],
		kana: "かう",
		kanji: "買う",
		meaning: ["to buy"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[4],
		kana: "かく",
		kanji: "書く",
		meaning: ["to write"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[4],
		kana: "とる",
		kanji: "撮る",
		meaning: ["to take", "to make a take", "to do a take"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[4],
		kana: "まつ",
		kanji: "待つ",
		meaning: ["to wait"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[5],
		kana: "いる",
		kanji: "",
		meaning: ["to exist(animate)", "stays at"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[9],
		kana: "～ぐらい",
		kanji: "",
		meaning: ["about ～", "approximately ～"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[0],
		kana: "ごめんなさい",
		kanji: "",
		meaning: ["I'm sorry"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[9],
		kana: "だから",
		kanji: "",
		meaning: ["therefore", "so", "thus"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[9],
		kana: "たくさん",
		kanji: "沢山",
		meaning: ["many", "a lot"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[2],
		kana: "と",
		kanji: "",
		meaning: ["～and～", "～with"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[0],
		kana: "どうして",
		kanji: "",
		meaning: ["why"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[0],
		kana: "ひとりで",
		kanji: "一人で",
		meaning: ["alone", "one person", "by oneself"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "みぎ",
		kanji: "右",
		meaning: ["right"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ひだり",
		kanji: "左",
		meaning: ["left"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "まえ",
		kanji: "前",
		meaning: ["front", "before"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "うしろ",
		kanji: "後ろ",
		meaning: ["back", "behind"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "なか",
		kanji: "中",
		meaning: ["inside", "middle", "center"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "うえ",
		kanji: "上",
		meaning: ["up", "on", "above"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "した",
		kanji: "下",
		meaning: ["down", "under", "below"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ちかく",
		kanji: "近く",
		meaning: ["near", "nearby"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "となり",
		kanji: "隣",
		meaning: ["next", "neighbouring"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "あいだ",
		kanji: "間",
		meaning: ["space", "between-area"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "ついたち",
		kanji: "一日",
		meaning: ["1st day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "ふつか",
		kanji: "二日",
		meaning: ["2nd day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "みっか",
		kanji: "三日",
		meaning: ["3rd day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "よっか",
		kanji: "四日",
		meaning: ["4th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "いつか",
		kanji: "五日",
		meaning: ["5th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "むいか",
		kanji: "六日",
		meaning: ["6th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "なのか",
		kanji: "七日",
		meaning: ["7th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "ようか",
		kanji: "八日",
		meaning: ["8th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "ここのか",
		kanji: "九日",
		meaning: ["9th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "とおか",
		kanji: "十日",
		meaning: ["10th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[10],
		kana: "はつか",
		kanji: "二十日",
		meaning: ["20th day"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "いちがつ",
		kanji: "一月",
		meaning: ["January"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "おととい",
		kanji: "",
		meaning: ["day before yesterday"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "あさって",
		kanji: "",
		meaning: ["day after tomorrow"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "にしゅうかんまえ",
		kanji: "二週間前",
		meaning: ["two weeks ago"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "こんしゅう",
		kanji: "今週",
		meaning: ["this week"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "らいしゅう",
		kanji: "来週",
		meaning: ["next week"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "さらいしゅう",
		kanji: "再来週",
		meaning: ["week after next week"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "にかげつまえ",
		kanji: "二か月前",
		meaning: ["two months ago"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "せんげつ",
		kanji: "先月",
		meaning: ["last month"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "こんげつ",
		kanji: "今月",
		meaning: ["this month"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "らいげつ",
		kanji: "来月",
		meaning: ["next month"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "さらいげつ",
		kanji: "再来月",
		meaning: ["month after next month"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "おととし",
		kanji: "",
		meaning: ["two years ago"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "きょねん",
		kanji: "去年",
		meaning: ["last year"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "ことし",
		kanji: "今年",
		meaning: ["this year"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "らいねん",
		kanji: "来年",
		meaning: ["next year"],
		example: [""],
		chapter: 4,
		score: 0
	},
	{
		type: vType[1],
		kana: "さらいねん",
		kanji: "再来年",
		meaning: ["year after next year"],
		example: [""],
		chapter: 4,
		score: 0
	},
	
	
	
	
	
	
	{
		type: vType[1],
		kana: "うみ",
		kanji: "海",
		meaning: ["sea", "ocean"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "きって",
		kanji: "切手",
		meaning: ["stamp", "postal stamp"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "きっぶ",
		kanji: "",
		meaning: ["ticket"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "サーフィン",
		kanji: "",
		meaning: ["surfing"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "しゅくだい",
		kanji: "宿題",
		meaning: ["homework"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "たべもの",
		kanji: "食べ物",
		meaning: ["food"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "たんじょうび",
		kanji: "誕生日",
		meaning: ["birthday"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "テスト",
		kanji: "",
		meaning: ["test"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "てんき",
		kanji: "天気",
		meaning: ["weather"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "のみもの",
		kanji: "飲み物",
		meaning: ["drink", "beverage"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "はがき",
		kanji: "葉書",
		meaning: ["postcard"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "バス",
		kanji: "",
		meaning: ["bus"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "ひこうき",
		kanji: "飛行機",
		meaning: ["airplane"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "へや",
		kanji: "部屋",
		meaning: ["room"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "ぼく",
		kanji: "僕",
		meaning: ["'I' for dudes"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "やすみ",
		kanji: "休み",
		meaning: ["holiday", "rest", "absence"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "りょこう",
		kanji: "旅行",
		meaning: ["travel", "a travel"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "あたらしい",
		kanji: "新しい",
		meaning: ["new"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "あつい",
		kanji: "暑い(weather)、熱い(things)",
		meaning: ["hot"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "いそがしい",
		kanji: "忙しい",
		meaning: ["busy"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "おおきい",
		kanji: "大きい",
		meaning: ["big", "large"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "おもしろい",
		kanji: "面白い",
		meaning: ["interesting", "funny"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "かっこいい",
		kanji: "",
		meaning: ["good-looking", "cool"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "こわい",
		kanji: "怖い",
		meaning: ["scary", "frightening"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "さむい",
		kanji: "寒い",
		meaning: ["cold", "cold weather"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "たのしい",
		kanji: "楽しい",
		meaning: ["fun"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "ちいさい",
		kanji: "小さい",
		meaning: ["small", "little"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "つまらない",
		kanji: "",
		meaning: ["boring"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "ふるい",
		kanji: "古い",
		meaning: ["old", "old thing"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "むずかしい",
		kanji: "難しい",
		meaning: ["difficult"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "やさしい",
		kanji: "",
		meaning: ["easy", "easy-going", "kindly"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[7],
		kana: "やすい",
		kanji: "安い",
		meaning: ["cheap"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "きらい",
		kanji: "嫌い",
		meaning: ["dislike"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "きれい",
		kanji: "",
		meaning: ["pretty", "clean"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "げんき",
		kanji: "元気",
		meaning: ["healthy", "energetic"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "しずか",
		kanji: "静か",
		meaning: ["quiet"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "すき",
		kanji: "好き",
		meaning: ["liked"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "だいきらい",
		kanji: "大嫌い",
		meaning: ["hated"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "だいすき",
		kanji: "大好き",
		meaning: ["loved"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "にぎやか",
		kanji: "",
		meaning: ["lively"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[8],
		kana: "ひま",
		kanji: "暇",
		meaning: ["not busy", "with lots of free-time"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[4],
		kana: "およぐ",
		kanji: "泳ぐ",
		meaning: ["to swim"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[4],
		kana: "のる",
		kanji: "乗る",
		meaning: ["to ride", "to board"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[4],
		kana: "やる",
		kanji: "",
		meaning: ["to do", "to perform"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[5],
		kana: "でかける",
		kanji: "出かける",
		meaning: ["to go out"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[9],
		kana: "いっしょに",
		kanji: "一緒に",
		meaning: ["together"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[9],
		kana: "すごく",
		kanji: "",
		meaning: ["extremely"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[0],
		kana: "それから",
		kanji: "",
		meaning: ["and then", "then", "from that", "from there"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[0],
		kana: "だいじょうぶ",
		kanji: "大丈夫",
		meaning: ["its okay","everything under control"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[9],
		kana: "とても",
		kanji: "",
		meaning: ["very"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[0],
		kana: "どんな",
		kanji: "",
		meaning: ["what kind of..."],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[10],
		kana: "～まい",
		kanji: "～枚",
		meaning: ["～ many flat objects", "counter for flat objects"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[2],
		kana: "～まで",
		kanji: "",
		meaning: ["～until"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "まどぐち",
		kanji: "窓口",
		meaning: ["counter","front desk"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "こづつみ",
		kanji: "小包",
		meaning: ["parcel"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "こうくうびん",
		kanji: "航空便",
		meaning: ["airmail"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "ふなびん",
		kanji: "船便",
		meaning: ["surface mail", "ground mail"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "そくたつ",
		kanji: "速達",
		meaning: ["special delivery"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "かきとめ",
		kanji: "書留",
		meaning: ["registered mail"],
		example: [""],
		chapter: 5,
		score: 0
	},
	{
		type: vType[1],
		kana: "ほけん",
		kanji: "保険",
		meaning: ["insurance"],
		example: [""],
		chapter: 5,
		score: 0
	},
	
	
	
	
	
	
	{
		type: vType[1],
		kana: "おかね",
		kanji: "お金",
		meaning: ["money"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "おふろ",
		kanji: "お風呂",
		meaning: ["bath"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "かんじ",
		kanji: "漢字",
		meaning: ["kanji"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "きょうかしょ",
		kanji: "教科書",
		meaning: ["textbook"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "シーディー",
		kanji: "",
		meaning: ["CD"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "しみんびょういｎ",
		kanji: "市民病院",
		meaning: ["municipal hospital"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "シャワー",
		kanji: "",
		meaning: ["shower"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "つぎ",
		kanji: "次",
		meaning: ["next"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "でんしゃ",
		kanji: "電車",
		meaning: ["train", "electric train"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "にもつ",
		kanji: "荷物",
		meaning: ["baggage", "luggage"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "パソコン",
		kanji: "",
		meaning: ["personal computer", "PC"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "ページ",
		kanji: "",
		meaning: ["page"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "よる",
		kanji: "夜",
		meaning: ["night"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[8],
		kana: "たいへん",
		kanji: "大変",
		meaning: ["tough", "rough", "difficult"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "あそぶ",
		kanji: "遊ぶ",
		meaning: ["to play"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "いそぐ",
		kanji: "急ぐ",
		meaning: ["to hurry"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "おふろにはいる",
		kanji: "お風呂に入る",
		meaning: ["to take a bath"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "かえす",
		kanji: "返す",
		meaning: ["to return something"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "けす",
		kanji: "消す",
		meaning: ["to erase","to turn off"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "しぬ",
		kanji: "死ぬ",
		meaning: ["to die"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "すわる",
		kanji: "座る",
		meaning: ["to sit down"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "たつ",
		kanji: "立つ",
		meaning: ["to stand up"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "タバコをすう",
		kanji: "タバコを吸う",
		meaning: ["to smoke", "to inhale tobacco"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "つかう",
		kanji: "使う",
		meaning: ["to use"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "てつだう",
		kanji: "手伝う",
		meaning: ["to help", "to assist"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "はいる",
		kanji: "入る",
		meaning: ["to enter"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "もつ",
		kanji: "持つ",
		meaning: ["to hold", "to carry"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "やすむ",
		kanji: "休む",
		meaning: ["to rest", "to be absent from"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "あける",
		kanji: "開ける",
		meaning: ["to open something"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "おしえる",
		kanji: "教える",
		meaning: ["to teach", "to instruct"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "おりる",
		kanji: "降りる",
		meaning: ["to get off", "to get off of something"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "かりる",
		kanji: "借りる",
		meaning: ["to borrow"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "しめる",
		kanji: "閉める",
		meaning: ["to close something"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "シャワーをあびる",
		kanji: "シャワーを浴びる",
		meaning: ["to take a shower"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "つける",
		kanji: "付ける",
		meaning: ["to turn on","to attach"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "でんわをかける",
		kanji: "電話をかける",
		meaning: ["to make a phone call"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[5],
		kana: "わすれる",
		kanji: "忘れる",
		meaning: ["to forget a thing", "to leave behind"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[6],
		kana: "つれてくる",
		kanji: "連れてくる",
		meaning: ["to bring a person"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[6],
		kana: "もってくる",
		kanji: "持ってくる",
		meaning: ["to bring a thing"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[9],
		kana: "あとで",
		kanji: "後で",
		meaning: ["later on", "afterwards"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[9],
		kana: "おそく",
		kanji: "遅く",
		meaning: ["late", "to do something late"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[2],
		kana: "～から",
		kanji: "",
		meaning: ["from ～","because of ～"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[0],
		kana: "けっこうです",
		kanji: "結構です",
		meaning: ["that's fine","it's unnecessary"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[9],
		kana: "すぐ",
		kanji: "",
		meaning: ["right away","immediately"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[0],
		kana: "ほんとうですか",
		kanji: "本当ですか",
		meaning: ["really?","for realsies?","truly?"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[9],
		kana: "ゆっくり",
		kanji: "",
		meaning: ["slowly","leisurely"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[9],
		kana: "まっすぐ",
		kanji: "",
		meaning: ["straight"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "まがる",
		kanji: "曲がる",
		meaning: ["to turn", "to bend"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[4],
		kana: "わたる",
		kanji: "渡る",
		meaning: ["to cross"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "かど",
		kanji: "角",
		meaning: ["corner"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "ひとつめ",
		kanji: "一つ目",
		meaning: ["first seen thing"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "ふたつめ",
		kanji: "二つ目",
		meaning: ["second seen thing"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "しんごう",
		kanji: "信号",
		meaning: ["street light"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "がわ",
		kanji: "側",
		meaning: ["side"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "ひがし",
		kanji: "東",
		meaning: ["east"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "にし",
		kanji: "西",
		meaning: ["west"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "みなみ",
		kanji: "南",
		meaning: ["south"],
		example: [""],
		chapter: 6,
		score: 0
	},
	{
		type: vType[1],
		kana: "きた",
		kanji: "北",
		meaning: ["north"],
		example: [""],
		chapter: 6,
		score: 0
	},
	
	
	
	
	
	
	{
		type: vType[1],
		kana: "あね",
		kanji: "姉",
		meaning: ["an older sister"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "アパート",
		kanji: "",
		meaning: ["apartment"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "うた",
		kanji: "歌",
		meaning: ["song"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おじいさん",
		kanji: "お爺さん",
		meaning: ["grandpa"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おとこのひと",
		kanji: "男の人",
		meaning: ["man"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おばあさん",
		kanji: "お婆さん",
		meaning: ["grandma"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おんなのひと",
		kanji: "女の人",
		meaning: ["woman"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "かいしゃ",
		kanji: "会社",
		meaning: ["business","company"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "かぞく",
		kanji: "家族",
		meaning: ["family"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "かみ",
		kanji: "髪",
		meaning: ["hair"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "きょうだい",
		kanji: "兄弟",
		meaning: ["siblings", "brothers"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "くち",
		kanji: "口",
		meaning: ["mouth","portal"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "くに",
		kanji: "国",
		meaning: ["country","nation"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "くるま",
		kanji: "車",
		meaning: ["car"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "ゲーム",
		kanji: "",
		meaning: ["game"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "コンビニ",
		kanji: "",
		meaning: ["convenience store"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "サークル",
		kanji: "",
		meaning: ["club activity"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "しょくどう",
		kanji: "食堂",
		meaning: ["cafeteria", "dining commons"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "ちち",
		kanji: "父",
		meaning: ["a father"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "ディーブイディー",
		kanji: "",
		meaning: ["DVD"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "はは",
		kanji: "母",
		meaning: ["a mother"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "め",
		kanji: "目",
		meaning: ["eye"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "めがね",
		kanji: "眼鏡",
		meaning: ["glasses", "spectacles"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[7],
		kana: "あたまがいい",
		kanji: "頭がいい",
		meaning: ["smart","bright","clever","a good head"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[7],
		kana: "かわいい",
		kanji: "",
		meaning: ["cute"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[7],
		kana: "せがたかい",
		kanji: "背が高い",
		meaning: ["tall","tall in stature"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[7],
		kana: "せがひくい",
		kanji: "背が低い",
		meaning: ["short","short in stature"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[7],
		kana: "ながい",
		kanji: "長い",
		meaning: ["long"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[7],
		kana: "みじかい",
		kanji: "短い",
		meaning: ["short","short in length"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[8],
		kana: "しんせつ",
		kanji: "親切",
		meaning: [""],
		example: "kind",
		chapter: 7,
		score: 0
	},
	{
		type: vType[8],
		kana: "べんり",
		kanji: "便利",
		meaning: ["convenient"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[4],
		kana: "うたう",
		kanji: "歌う",
		meaning: ["to sing"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[4],
		kana: "かぶる",
		kanji: "",
		meaning: ["to put on (hat)", "to wear (hat)"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[4],
		kana: "しる",
		kanji: "知る",
		meaning: ["to know"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[4],
		kana: "すむ",
		kanji: "住む",
		meaning: ["to live","to reside"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[4],
		kana: "はく",
		kanji: "",
		meaning: ["to put on(below waist)","to wear(below waist)"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[4],
		kana: "太る",
		kanji: "",
		meaning: ["to gain weight", "to be heavy"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[5],
		kana: "めがねをかける",
		kanji: "",
		meaning: ["to put on glasses"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[5],
		kana: "きる",
		kanji: "着る",
		meaning: ["to put on(above waist)","to wear(above waist)"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[5],
		kana: "つとめる",
		kanji: "勤める",
		meaning: ["to work for", "to work at"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[5],
		kana: "やせる",
		kanji: "",
		meaning: ["to lose weight", "to be thin"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[6],
		kana: "けっこんする",
		kanji: "結婚する",
		meaning: ["to be married", "to marry"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[2],
		kana: "～が",
		kanji: "",
		meaning: ["～but","～though"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[0],
		kana: "なにも",
		kanji: "何も",
		meaning: ["anything"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[10],
		kana: "～にん",
		kanji: "～人",
		meaning: ["～amount of people", "～ many people"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "二人",
		kanji: "二人",
		meaning: ["two people"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[9],
		kana: "べつに+neg",
		kanji: "別に",
		meaning: ["not particularly"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[0],
		kana: "もしもし",
		kanji: "",
		meaning: ["telephone-hello"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[0],
		kana: "もちろん",
		kanji: "",
		meaning: ["of course"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[0],
		kana: "よかったら",
		kanji: "",
		meaning: ["if you like","if its good"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "みみ",
		kanji: "耳",
		meaning: ["ear"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "はな",
		kanji: "鼻",
		meaning: ["nose"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "ゆび",
		kanji: "指",
		meaning: ["finger","limb sub-unit"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "は",
		kanji: "歯",
		meaning: ["tooth"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "て",
		kanji: "手",
		meaning: ["hand"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "くび",
		kanji: "首",
		meaning: ["neck"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "あたま",
		kanji: "頭",
		meaning: ["head"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "かお",
		kanji: "顔",
		meaning: ["face"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "かた",
		kanji: "肩",
		meaning: ["shoulder"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "むね",
		kanji: "胸",
		meaning: ["chest"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おなか",
		kanji: "",
		meaning: ["gut","belly"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "せなか",
		kanji: "背中",
		meaning: ["back"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おしり",
		kanji: "",
		meaning: ["butt"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "あし",
		kanji: "足",
		meaning: ["leg","foot"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "あに",
		kanji: "兄",
		meaning: ["an older brother"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "しゅじん",
		kanji: "主人",
		meaning: ["husband"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おっと",
		kanji: "夫",
		meaning: ["a husband"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "おくさん",
		kanji: "奥さん",
		meaning: ["wife"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "つま",
		kanji: "妻",
		meaning: ["a wife"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "よめさん",
		kanji: "嫁さん",
		meaning: ["wife"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "そふ",
		kanji: "祖父",
		meaning: ["a grandfather"],
		example: [""],
		chapter: 7,
		score: 0
	},
	{
		type: vType[1],
		kana: "そぼ",
		kanji: "祖母",
		meaning: ["a grandmother"],
		example: [""],
		chapter: 7,
		score: 0
	},
	
	
	
	
	
	
	{
		type: vType[1],
		kana: "あめ",
		kanji: "雨",
		meaning: ["rain"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "カメラ",
		kanji: "",
		meaning: ["camera"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "カラオケ",
		kanji: "",
		meaning: ["karaoke"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "くうき",
		kanji: "空気",
		meaning: ["air"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "けさ",
		kanji: "今朝",
		meaning: ["this morning"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "てんきよほう",
		kanji: "天気予報",
		meaning: ["weather forecast"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "よほう",
		kanji: "予報",
		meaning: ["forecast"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ところ",
		kanji: "所",
		meaning: ["place"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "トマト",
		kanji: "",
		meaning: ["tomato"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "なつ",
		kanji: "夏",
		meaning: ["summer"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "なにか",
		kanji: "何か",
		meaning: ["something"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "パーティー",
		kanji: "",
		meaning: ["party"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "バーベキュー",
		kanji: "",
		meaning: ["barbeque"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "はし",
		kanji: "",
		meaning: ["chopsticks"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ふゆ",
		kanji: "冬",
		meaning: ["winter"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ホームステイ",
		kanji: "",
		meaning: ["homestay","living with a local family"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "まいしゅう",
		kanji: "毎週",
		meaning: ["every week"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[8],
		kana: "じょうず",
		kanji: "上手",
		meaning: ["skilled","skillful","good at","the upper hand"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[8],
		kana: "へた",
		kanji: "下手",
		meaning: ["unskilled","clumbsy","poor at", "the bad hand"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[8],
		kana: "ゆうめい",
		kanji: "有名",
		meaning: ["famous"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "あめがふる",
		kanji: "雨が降る",
		meaning: ["to rain","to pour"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "あらう",
		kanji: "洗う",
		meaning: ["to wash"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "いう",
		kanji: "言う",
		meaning: ["to say","to speak"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "いる",
		kanji: "",
		meaning: ["to need"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "おそくなら",
		kanji: "遅くなら",
		meaning: ["to be late"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "おもう",
		kanji: "思う",
		meaning: ["to think"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "きる",
		kanji: "切る",
		meaning: ["to cut","to slice"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "つくる",
		kanji: "作る",
		meaning: ["to make","to construct","to create"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[4],
		kana: "もっていく",
		kanji: "持っていく",
		meaning: ["to take something","to take"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[5],
		kana: "じろじろみる",
		kanji: "じろじろ見る",
		meaning: ["to stare"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[5],
		kana: "すてる",
		kanji: "捨てる",
		meaning: ["to throw away"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[5],
		kana: "はじめる",
		kanji: "始める",
		meaning: ["to begin"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[6],
		kana: "うんてんする",
		kanji: "運転する",
		meaning: ["to drive","to do a drive"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[6],
		kana: "せんたくする",
		kanji: "洗濯する",
		meaning: ["to do laundry"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[6],
		kana: "そうじする",
		kanji: "掃除する",
		meaning: ["to clean", "to do cleaning"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[6],
		kana: "でんわする",
		kanji: "電話する",
		meaning: ["to call","to do a call"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[6],
		kana: "りょうりする",
		kanji: "料理する",
		meaning: ["to cook","to do cooking"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[9],
		kana: "いつも",
		kanji: "",
		meaning: ["always"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[0],
		kana: "ううん",
		kanji: "",
		meaning: ["nope","uh-uh","nah"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[0],
		kana: "うん",
		kanji: "",
		meaning: ["yup","uh-huh","yeah"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[0],
		kana: "かんぱい",
		kanji: "乾杯",
		meaning: ["Cheers","a toast"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[0],
		kana: "ざんねんですね",
		kanji: "残念ですね",
		meaning: ["that's too bad","that's a shame","how unfortunate"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[0],
		kana: "～について",
		kanji: "",
		meaning: ["～concerning","～about"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[9],
		kana: "まだ+neg",
		kanji: "",
		meaning: ["not as of yet","not yet","still not yet"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "みんなで",
		kanji: "",
		meaning: ["everyone together", "we all", "all of us"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "おかず",
		kanji: "",
		meaning: ["dish of food"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "みそしる",
		kanji: "みそ汁",
		meaning: ["miso soup"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "しる",
		kanji: "汁",
		meaning: ["soup", "sauce", "sap", "stock", "broth"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "カレーライス",
		kanji: "",
		meaning: ["curry with rice"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "えびフライ",
		kanji: "",
		meaning: ["deep fried shrimp"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ラーメン",
		kanji: "",
		meaning: ["ramen noodles"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "うどん",
		kanji: "",
		meaning: ["udon noodles"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "スパゲッティ",
		kanji: "",
		meaning: ["spaghetti"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ぎょうざ",
		kanji: "",
		meaning: ["dumplings"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ぎゅうどん",
		kanji: "牛丼",
		meaning: ["beef rice bowl"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "さしみ",
		kanji: "",
		meaning: ["raw seafood"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "おこのみやき",
		kanji: "お好み焼き",
		meaning: ["savory pancake"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "トースト",
		kanji: "",
		meaning: ["toast"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "スープ",
		kanji: "",
		meaning: ["soup"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "ヨーグルト",
		kanji: "",
		meaning: ["yogurt"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "やきさかな",
		kanji: "焼き魚",
		meaning: ["broiled fish"],
		example: [""],
		chapter: 8,
		score: 0
	},
	{
		type: vType[1],
		kana: "たまご",
		kanji: "",
		meaning: ["egg"],
		example: [""],
		chapter: 8,
		score: 0
	}	
];
/*
	,{
		type: vType[1],
		kana: "",
		kanji: "",
		meaning: [""],
		example: [""],
		chapter: 9,
		score: 0
	}
	*/