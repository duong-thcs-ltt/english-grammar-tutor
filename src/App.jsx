import { useState, useRef, useEffect } from "react";

const GRAMMAR_MODULES = [
  {
    id: 1,
    title: "Words liên quan đến số MỘT (ONE)",
    icon: "1️⃣",
    theory: {
      title: "Từ vựng liên quan đến khái niệm 'MỘT'",
      explanation: `Trong tiếng Anh, có nhiều từ thể hiện ý nghĩa "một" theo các ngữ cảnh khác nhau. Đây là điều học viên hay nhầm lẫn!`,
      points: [
        { word: "once", meaning: "một lần (trạng từ về số lần)", example: "I've only been to Paris once. (Tôi chỉ đến Paris một lần.)" },
        { word: "only", meaning: "duy nhất, chỉ (tính từ/trạng từ nhấn mạnh)", example: "She is an only child. (Cô ấy là con một.)" },
        { word: "single", meaning: "một vé một chiều / độc thân / duy nhất", example: "A single ticket to London, please. (Cho tôi một vé một chiều đến London.)" },
        { word: "alone", meaning: "một mình (trạng thái cô đơn/độc lập)", example: "She lived alone but had many friends. (Cô ấy sống một mình nhưng có nhiều bạn.)" },
        { word: "singular", meaning: "số ít (ngữ pháp)", example: "The singular form of 'children' is 'child'. (Dạng số ít của 'children' là 'child'.)" },
        { word: "unique", meaning: "độc nhất vô nhị, có một không hai", example: "This museum has a unique collection. (Bảo tàng này có bộ sưu tập độc nhất vô nhị.)" },
      ]
    },
    exercises: [
      { q: "I don't like being an _____ child.", hint: "Con một → chỉ một đứa con duy nhất trong gia đình → dùng tính từ 'chỉ có một'", answer: "only" },
      { q: "Please can I have a _____ ticket to Manchester?", hint: "Vé một chiều (không khứ hồi) → 'single ticket' là cụm từ cố định trong tiếng Anh", answer: "single" },
      { q: "Although Aunt Harriet lived _____ she had lots of friends.", hint: "Bà ấy sống một mình nhưng có nhiều bạn → trạng thái ở một mình = ?", answer: "alone" },
      { q: "The plural is the same as the _____.", hint: "Đề cập đến ngữ pháp: số nhiều giống số... → dạng số ít trong ngữ pháp = ?", answer: "singular" },
      { q: "The museum had a _____ collection of manuscripts.", hint: "Bộ sưu tập có một không hai, độc nhất → không gì sánh được = ?", answer: "unique" },
    ]
  },
  {
    id: 2,
    title: "Biến đổi dạng từ (Word Forms)",
    icon: "🔤",
    theory: {
      title: "Các hậu tố biến đổi dạng từ",
      explanation: `Trong tiếng Anh, bạn có thể thêm hậu tố (suffix) vào sau từ gốc để tạo ra danh từ, tính từ, trạng từ. Đây là kỹ năng cực kỳ quan trọng!`,
      points: [
        { word: "-ly", meaning: "Thêm vào tính từ → trạng từ", example: "lucky → luckily (may mắn thay) | extreme → extremely (vô cùng)" },
        { word: "-ful", meaning: "Thêm vào danh từ → tính từ mang nghĩa 'đầy'", example: "peace → peaceful (yên bình) | beauty → beautiful (đẹp)" },
        { word: "-ly (adj)", meaning: "Thêm vào danh từ → tính từ", example: "friend → friendly (thân thiện) | love → lovely (dễ thương)" },
        { word: "-ly (adj2)", meaning: "social → sociable? Chú ý: social ≠ sociable", example: "social = thuộc xã hội | sociable = hòa đồng, thích giao tiếp" },
        { word: "-ent/-ant", meaning: "Tạo tính từ mang nghĩa 'khác nhau'", example: "differ → different (khác nhau)" },
        { word: "-age", meaning: "Tạo danh từ nơi chốn/trạng thái", example: "orphan → orphanage (trại trẻ mồ côi)" },
        { word: "-ous/-ious", meaning: "Thêm vào danh từ → tính từ", example: "humor → humorous (hài hước)" },
      ]
    },
    exercises: [
      { q: "They were very _____ to survive a shipwreck. (luck)", hint: "LUCK (may mắn) → tính từ: lucky → NHƯNG có 'very' trước và câu cần trạng từ bổ nghĩa cho tính từ. Thêm -ily vào lucky → luckily. Ý nghĩa: họ may mắn thay sống sót", answer: "lucky (luckily nếu bổ nghĩa động từ)" },
      { q: "I love the _____ summer evenings. (peaceful)", hint: "peaceful là TÍNH TỪ → bổ nghĩa cho danh từ 'evenings' → giữ nguyên. Nhưng nếu cần trạng từ thì thêm -ly: peacefully", answer: "peaceful" },
      { q: "Those cats look _____. (love)", hint: "love → lovely (dễ thương). Sau 'look' dùng TÍNH TỪ. love + ly = lovely", answer: "lovely" },
      { q: "Jim is very _____ kind and generous. (social)", hint: "Cần tính từ mô tả Jim. social có nghĩa 'thuộc xã hội'. Sociable mới có nghĩa 'hòa đồng'. Nhưng dùng 'socially' (trạng từ) để bổ nghĩa cho 'kind and generous'", answer: "socially" },
      { q: "Each of my friends has a _____ character. (differ)", hint: "differ (khác nhau) → tính từ: differ + ent = different. Mỗi người bạn có tính cách KHÁC NHAU.", answer: "different" },
      { q: "People in my country are very warm and _____ (friend)", hint: "friend → tính từ: friend + ly = friendly (thân thiện). Sau 'and' cần TÍNH TỪ song song với 'warm'.", answer: "friendly" },
      { q: "An _____ is a home for children whose parents are dead. (orphan)", hint: "orphan (trẻ mồ côi) → nơi ở của trẻ mồ côi. Thêm -age: orphan + age = orphanage (trại trẻ mồ côi)", answer: "orphanage" },
      { q: "L.A Hill is a _____ writer. (humor)", hint: "humor → tính từ: humor + ous = humorous (hài hước). Là tính từ bổ nghĩa cho 'writer'.", answer: "humorous" },
      { q: "I'm _____ sorry for the delay. (extreme)", hint: "extreme → trạng từ: extreme + ly = extremely (vô cùng). Bổ nghĩa cho tính từ 'sorry'.", answer: "extremely" },
      { q: "She looks more _____ than her sister. (beauty)", hint: "beauty → tính từ: beauti + ful = beautiful. Sau 'more' và 'looks' dùng tính từ. beautiful → more beautiful (so sánh hơn)", answer: "beautiful" },
    ]
  },
  {
    id: 3,
    title: "Viết lại câu - Thì hiện tại hoàn thành",
    icon: "⏰",
    theory: {
      title: "Cách chuyển câu liên quan đến thời gian",
      explanation: `Đây là dạng bài chuyển câu rất phổ biến trong đề thi! Bạn cần nhớ các cấu trúc tương đương nhau về nghĩa.`,
      points: [
        { word: "Cấu trúc 1", meaning: "S + have/has + V3 + for + thời gian", example: "I have learnt English for 10 years. (Tôi đã học tiếng Anh được 10 năm.)" },
        { word: "Cấu trúc 2", meaning: "S + began/started + V-ing + time ago", example: "I began learning English 10 years ago. (Tôi bắt đầu học tiếng Anh 10 năm trước.)" },
        { word: "Cấu trúc 3", meaning: "It is/has been + thời gian + since + S + V(quá khứ)", example: "It is 10 years since I started learning English." },
        { word: "Cấu trúc 4", meaning: "S + moved/left + time ago → S + have lived/been in... + for + time", example: "She moved to London 20 years ago → She has lived in London for 20 years." },
        { word: "How long...?", meaning: "When did...? → How long ago did...? / How long have...?", example: "When did he buy the car? → How long has he had the car?" },
        { word: "It takes...", meaning: "It takes + người + thời gian + to V → S + spends + thời gian + V-ing", example: "It takes her 30 mins to get to work → She spends 30 mins getting to work." },
      ]
    },
    exercises: [
      { q: "I have learnt English for 10 years now.\n→ I began ___", hint: "Hiện tại hoàn thành → quá khứ đơn. 'began' + V-ing + thời gian ago. → I began learning English 10 years ago.", answer: "I began learning English 10 years ago." },
      { q: "She moved to London 20 years ago.\n→ She has ___", hint: "Quá khứ đơn (ago) → Hiện tại hoàn thành (for). 'moved to London' → 'lived in London'. → She has lived in London for 20 years.", answer: "She has lived in London for 20 years." },
      { q: "Mary has learnt French for 6 years.\n→ It's ___", hint: "Dùng cấu trúc: It is + số năm + since + S + V(quá khứ đơn). → It's 6 years since Mary started/began learning French.", answer: "It's 6 years since Mary started learning French." },
      { q: "When did your father buy that car?\n→ How long ___", hint: "Chuyển sang hiện tại hoàn thành: How long + have/has + S + V3? 'buy' → 'had'. → How long has your father had that car?", answer: "How long has your father had that car?" },
      { q: "It takes her half an hour to get to work.\n→ She gets ___", hint: "Cấu trúc khác: She gets to work in half an hour. (Cô ấy đến nơi làm việc trong nửa tiếng.)", answer: "She gets to work in half an hour." },
      { q: "You don't need to finish the work today.\n→ It is not ___", hint: "don't need to = it is not necessary to. → It is not necessary for you to finish the work today.", answer: "It is not necessary for you to finish the work today." },
      { q: "Because of the bad weather, they had to stop their picnic.\n→ The bad weather prevented ___", hint: "prevent + O + from + V-ing. → The bad weather prevented them from continuing their picnic.", answer: "The bad weather prevented them from continuing their picnic." },
      { q: "My father got to Sam Son by taxi last month.\n→ My father took ___", hint: "take a taxi to + nơi chốn. → My father took a taxi to Sam Son last month.", answer: "My father took a taxi to Sam Son last month." },
      { q: "The trip to Da Lat city was cheaper than we expected.\n→ The trip to Da Lat city wasn't ___", hint: "cheaper than expected → not as expensive as expected. → The trip to Da Lat city wasn't as expensive as we expected.", answer: "The trip to Da Lat city wasn't as expensive as we expected." },
      { q: "This is the first time I have visited the USA.\n→ I haven't ___", hint: "first time I have visited → I haven't visited before. → I haven't visited the USA before.", answer: "I haven't visited the USA before." },
    ]
  },
  {
    id: 4,
    title: "Cụm động từ với GIVE",
    icon: "🤝",
    theory: {
      title: "Phrasal Verbs với GIVE",
      explanation: `Phrasal verb là động từ + giới từ/trạng từ, tạo thành nghĩa mới hoàn toàn. Học thuộc lòng từng cụm là cách tốt nhất!`,
      points: [
        { word: "give out", meaning: "phân phát, phát ra", example: "The teacher gave out the papers. (Giáo viên phát đề kiểm tra.)" },
        { word: "give way (to)", meaning: "nhường đường cho", example: "Traffic must give way to buses. (Xe phải nhường đường cho xe buýt.)" },
        { word: "give in", meaning: "nộp bài / đầu hàng, nhượng bộ", example: "Give in your homework on Friday. (Nộp bài tập vào thứ Sáu.)" },
        { word: "give up", meaning: "từ bỏ, bỏ cuộc", example: "They gave up the search. (Họ từ bỏ cuộc tìm kiếm.)" },
        { word: "give back", meaning: "trả lại", example: "Give me back the book. (Trả lại sách cho tôi.)" },
        { word: "give away", meaning: "cho không, tặng miễn phí", example: "I'll give away my old bike. (Tôi sẽ cho không chiếc xe cũ.)" },
      ]
    },
    exercises: [
      { q: "At a junction, traffic on the minor road must _____ to traffic on the main road.", hint: "Nhường đường → give + way + to = give way to (nhường đường cho)", answer: "give way" },
      { q: "The teacher asked the students to _____ their homework on Friday.", hint: "Nộp bài tập → nộp = give in (hoặc hand in). → give in their homework", answer: "give in" },
      { q: "They had to _____ the search because it was getting dark.", hint: "Từ bỏ cuộc tìm kiếm vì trời tối → give up (từ bỏ)", answer: "give up" },
      { q: "Can you give _____ me _____ the record I lent you last month?", hint: "Trả lại đĩa nhạc tôi cho bạn mượn → give back (trả lại). Can you give me back...?", answer: "give ... back (give me back)" },
      { q: "My bike is so rusty I can't possibly sell it; I'll have to _____ it _____.", hint: "Không bán được, cho không luôn → give away (cho tặng miễn phí)", answer: "give ... away (give it away)" },
    ]
  },
  {
    id: 5,
    title: "Viết lại câu (tổng hợp)",
    icon: "✍️",
    theory: {
      title: "Các cấu trúc viết lại câu quan trọng",
      explanation: `Tổng hợp nhiều dạng viết lại câu: thụ động, điều kiện, so sánh, câu hỏi gián tiếp...`,
      points: [
        { word: "too...to", meaning: "quá...đến nỗi không thể", example: "We arrived too late to see the film. (Chúng tôi đến quá muộn, không xem được phim.)" },
        { word: "Unless = If...not", meaning: "trừ khi = nếu không", example: "Unless you rest, you will be ill. = If you don't rest, you will be ill." },
        { word: "It is the first time...", meaning: "Đây là lần đầu tiên... → never...before", example: "It's the first time I've seen this → I've never seen this before." },
        { word: "Passive: How much does X weigh?", meaning: "What is the weight of X?", example: "How much does the suitcase weigh? → What is the weight of the suitcase?" },
        { word: "Comparative", meaning: "bigger than → not as big as", example: "My house is bigger than yours → Your house is not as big as mine." },
        { word: "Passive voice", meaning: "S + cleans → The car is cleaned + by S + every week", example: "My father cleans the car → The car is cleaned by my father every week." },
      ]
    },
    exercises: [
      { q: "How long is it since he left school?\n→ When ___", hint: "It has been X time since → When did he leave school? (Câu hỏi về thời điểm trong quá khứ)", answer: "When did he leave school?" },
      { q: "We can't afford to buy the car.\n→ The car ___", hint: "can't afford = too expensive. → The car is too expensive for us to buy.", answer: "The car is too expensive for us to buy." },
      { q: "We arrived too late to see the film.\n→ We didn't ___", hint: "too late to see = didn't arrive early enough to see. → We didn't arrive early enough to see the film.", answer: "We didn't arrive early enough to see the film." },
      { q: "If you don't rest yourself, you will be ill.\n→ Unless ___", hint: "If you don't = Unless you. → Unless you rest yourself, you will be ill.", answer: "Unless you rest yourself, you will be ill." },
      { q: "Nam has never spoken to a foreigner before.\n→ It ___", hint: "Never...before = This is the first time. → It is the first time Nam has spoken to a foreigner.", answer: "It is the first time Nam has spoken to a foreigner." },
      { q: "What is the weight of your suitcase?\n→ How ___", hint: "weight of → how much...weigh. → How much does your suitcase weigh?", answer: "How much does your suitcase weigh?" },
      { q: "My house is bigger than yours.\n→ Your house isn't ___", hint: "A bigger than B → B not as big as A. → Your house isn't as big as mine.", answer: "Your house isn't as big as mine." },
      { q: "My father cleans the car every week.\n→ The car ___", hint: "Câu chủ động → câu bị động. The car + is cleaned + by my father + every week.", answer: "The car is cleaned by my father every week." },
      { q: '"Do you know how to speak English?" He asked me.\n→ He asked me ___', hint: "Câu hỏi gián tiếp với 'if/whether'. He asked me if/whether I knew how to speak English.", answer: "He asked me if/whether I knew how to speak English." },
      { q: "Someone should do the job tomorrow.\n→ The job ___", hint: "Bị động với modal: should be done. → The job should be done tomorrow.", answer: "The job should be done tomorrow." },
    ]
  },
  {
    id: 6,
    title: "Từ vựng về ấn phẩm in",
    icon: "📚",
    theory: {
      title: "Từ vựng về tài liệu in ấn",
      explanation: `Nhóm từ vựng về sách báo, tài liệu - rất hay gặp trong bài thi!`,
      points: [
        { word: "dictionary", meaning: "từ điển - tra nghĩa từ", example: "Elizabeth looked up the word in her dictionary." },
        { word: "programme", meaning: "chương trình (tờ giới thiệu tại nhà hát)", example: "He always buys a programme at the theatre." },
        { word: "brochure/leaflet", meaning: "tờ rơi, tập sách nhỏ quảng cáo/thông tin", example: "I'll pick up some brochures from the travel agent's." },
        { word: "timetable", meaning: "thời gian biểu, lịch tàu xe", example: "You can get a free railway timetable at the station." },
        { word: "directory", meaning: "danh bạ điện thoại", example: "Their telephone number is not in the directory." },
        { word: "guide", meaning: "sách hướng dẫn (du lịch, tham quan)", example: "Grant bought a Visitor's guide to London." },
      ]
    },
    exercises: [
      { q: "Elizabeth looked up the word in her _____.", hint: "Tra từ → dùng cuốn sách tra nghĩa từ = dictionary (từ điển)", answer: "dictionary" },
      { q: "When he goes to the theatre, he always buys a _____.", hint: "Mua ở nhà hát → tờ giới thiệu chương trình biểu diễn = programme", answer: "programme" },
      { q: "I'll pick up some _____ from the travel agent's, and then we can plan our holiday.", hint: "Từ đại lý du lịch → tờ rơi, catalog du lịch = brochures", answer: "brochures" },
      { q: "You can get a free railway _____ at the station information office.", hint: "Lịch tàu hỏa = railway timetable (thời gian biểu)", answer: "timetable" },
      { q: "Their telephone number is not in the _____.", hint: "Số điện thoại được tìm trong... → danh bạ điện thoại = directory", answer: "directory" },
    ]
  },
  {
    id: 8,
    title: "Từ vựng về Thức ăn & Đồ uống",
    icon: "🍽️",
    theory: {
      title: "Từ vựng mô tả thức ăn đồ uống",
      explanation: `Các tính từ mô tả thức ăn - rất quan trọng trong giao tiếp hàng ngày!`,
      points: [
        { word: "sweet", meaning: "ngọt", example: "She added two more spoons of sugar to make it even sweeter." },
        { word: "tough", meaning: "dai, cứng (thịt)", example: "That steak was very tough. (Miếng bít tết rất dai.)" },
        { word: "fresh", meaning: "tươi, mới (ngược với stale - ôi, cũ)", example: "These sandwiches are not fresh." },
        { word: "flavour", meaning: "hương vị, mùi vị", example: "This sauce has a very strong flavour." },
        { word: "sour/off", meaning: "chua, ôi thiu (sữa hỏng)", example: "He realized the milk was sour/off." },
        { word: "stale", meaning: "ôi, không còn tươi (bánh mì, bánh sandwich)", example: "These sandwiches may not be stale but they are not fresh." },
      ]
    },
    exercises: [
      { q: "I put a spoonful of sugar in Mary's tea but she added two more to make it even _____.", hint: "Thêm đường vào trà → ngọt hơn. 'even' bổ nghĩa cho tính từ so sánh hơn → even sweeter", answer: "sweeter" },
      { q: "'That steak you sold me last week was _____.' (bà Jones muốn thịt mềm)", hint: "Bà muốn thịt MỀM nhưng tuần trước thịt... → ngược với tender (mềm) = tough (dai)", answer: "tough" },
      { q: "These sandwiches may not be stale but they are certainly not _____ either.", hint: "Không ôi nhưng cũng không... → stale (ôi) ↔ fresh (tươi)", answer: "fresh" },
      { q: "You'll only need a little of this sauce because it has a very strong _____.", hint: "Mùi vị mạnh của nước sốt → flavour (hương vị)", answer: "flavour" },
      { q: "He left the milk out of the fridge and when he went to use it he realized it was _____.", hint: "Sữa để ngoài tủ lạnh → bị hỏng/chua = sour hoặc off", answer: "sour (off)" },
    ]
  },
  {
    id: 10,
    title: "Biến đổi dạng từ (Word Forms 2)",
    icon: "🔄",
    theory: {
      title: "Thêm hậu tố để tạo dạng từ mới",
      explanation: `Tiếp tục luyện kỹ năng biến đổi dạng từ với nhiều hậu tố khác nhau.`,
      points: [
        { word: "-ence/-ance", meaning: "Biến động từ/tính từ → danh từ", example: "differ → difference (sự khác biệt)" },
        { word: "-ty/-ity", meaning: "Biến tính từ → danh từ", example: "difficult → difficulty (khó khăn)" },
        { word: "-ing", meaning: "Biến động từ → tính từ (gây ra cảm xúc)", example: "excite → exciting (thú vị, hồi hộp)" },
        { word: "-ship", meaning: "Biến danh từ → danh từ chỉ mối quan hệ", example: "friend → friendship (tình bạn)" },
        { word: "-ating/-ating", meaning: "Biến động từ → tính từ", example: "fascinate → fascinating (hấp dẫn)" },
        { word: "-ency/-cy", meaning: "Biến tính từ → danh từ/trạng từ", example: "fluent → fluently (lưu loát)" },
      ]
    },
    exercises: [
      { q: "There is no _____ between my answer and his. (Differ)", hint: "difference = sự khác biệt (danh từ). Differ + ence = difference", answer: "difference" },
      { q: "We have a lot of _____ in learning English. (Difficult)", hint: "difficulty = khó khăn (danh từ). Difficult + y = difficulty", answer: "difficulty" },
      { q: "There is an _____ football match this afternoon. (Excite)", hint: "Trận đấu thú vị → exciting (tính từ bổ nghĩa cho noun). Excite + ing = exciting", answer: "exciting" },
      { q: "We are very proud of our _____. (Friend)", hint: "Tự hào về tình bạn → friendship (danh từ). Friend + ship = friendship", answer: "friendship" },
      { q: "Her smile is very _____. (Fascinate)", hint: "Nụ cười rất... → tính từ sau 'very'. Fascinate → fascinating (hấp dẫn)", answer: "fascinating" },
      { q: "He speaks English _____. (Fluency)", hint: "Nói tiếng Anh một cách... → trạng từ bổ nghĩa cho động từ 'speaks'. Fluency → fluently", answer: "fluently" },
      { q: "You will be late for the _____. (Meet)", hint: "Muộn cho buổi... → danh từ. Meet → meeting (cuộc họp)", answer: "meeting" },
      { q: "Would you tell me some _____ about the train, please? (Inform)", hint: "Thông tin về tàu → danh từ. Inform + ation = information", answer: "information" },
      { q: "She is quite _____ in the book. (Interest)", hint: "Cô ấy khá... trong cuốn sách → interested (bị thu hút, cảm thấy hứng thú). Chú ý: interesting = thú vị; interested = bị thu hút bởi", answer: "interested" },
      { q: "I love this car. It is very _____. (Economics)", hint: "Chiếc xe tiết kiệm nhiên liệu → economical (tiết kiệm). Economics → economical", answer: "economical" },
    ]
  },
  {
    id: 12,
    title: "Viết lại câu - Bị động & Điều kiện",
    icon: "🔀",
    theory: {
      title: "Câu bị động, câu điều kiện và câu so sánh",
      explanation: `Ba dạng cấu trúc quan trọng thường xuất hiện trong dạng bài viết lại câu.`,
      points: [
        { word: "Bị động (Passive)", meaning: "S + be + V3 + by + O", example: "They will change the date → The date will be changed by them." },
        { word: "Bị động tương lai", meaning: "will be + V3", example: "The garage will repair the car → We are going to have the car repaired." },
        { word: "Hiện tại hoàn thành - thời gian", meaning: "last saw her in Feb → haven't seen her since Feb", example: "I last saw her in February → I haven't seen her since February." },
        { word: "Điều kiện loại 2", meaning: "If + S + V2, S + would/could + V", example: "If my husband had left the keys, I could have picked him up." },
        { word: "Câu ước (wish)", meaning: "wish + S + had + V3 (ước quá khứ)", example: "Maria wishes she had been put in a higher class." },
        { word: "So sánh hơn → bằng phủ định", meaning: "A longer than B → B not as long as A", example: "The bus takes longer → The train doesn't take as long as the bus." },
      ]
    },
    exercises: [
      { q: "They'll have to change the date of the meeting again.\n→ The date ___", hint: "Chuyển sang bị động. will have to change → will have to be changed. → The date will have to be changed again.", answer: "The date will have to be changed again." },
      { q: "The garage is going to repair the car for us next week.\n→ We are going ___", hint: "have something done = nhờ ai làm gì. → We are going to have the car repaired next week.", answer: "We are going to have the car repaired next week." },
      { q: "John has not had his hair cut for over six months.\n→ It is ___", hint: "It is + time + since + S + V (quá khứ). → It is over six months since John had his hair cut.", answer: "It is over six months since John had his hair cut." },
      { q: "I last saw her in February.\n→ I haven't ___", hint: "last saw in Feb → haven't seen since Feb. → I haven't seen her since February.", answer: "I haven't seen her since February." },
      { q: "The bus takes longer than the train.\n→ The train ___", hint: "A longer than B → B not as long as A. → The train doesn't take as long as the bus.", answer: "The train doesn't take as long as the bus." },
    ]
  },
  {
    id: 14,
    title: "Viết lại với từ gợi ý",
    icon: "💡",
    theory: {
      title: "Viết lại câu dùng từ trong ngoặc",
      explanation: `Dạng bài yêu cầu dùng từ/cấu trúc cho sẵn để viết lại câu có nghĩa tương đương.`,
      points: [
        { word: "enough to", meaning: "đủ để làm gì", example: "The weather is warm enough to go swimming. (Thời tiết đủ ấm để đi bơi.)" },
        { word: "too...to", meaning: "quá...đến nỗi không thể", example: "I am too short to reach the picture. (Tôi quá thấp không với tới bức tranh.)" },
        { word: "prefer...to", meaning: "thích A hơn B", example: "Nam prefers staying at home to going to the zoo." },
        { word: "isn't used to", meaning: "không quen với", example: "My father isn't used to getting up late." },
        { word: "is good at", meaning: "giỏi về", example: "My sister is good at playing football." },
        { word: "What a/an + adj + noun!", meaning: "Câu cảm thán", example: "What a beautiful painting this is!" },
      ]
    },
    exercises: [
      { q: "The weather wasn't warm. We couldn't go swimming. (enough)\n→", hint: "warm enough to go swimming. → The weather wasn't warm enough for us to go swimming.", answer: "The weather wasn't warm enough for us to go swimming." },
      { q: "Nam likes staying at home more than going to the zoo. (Nam prefers)\n→", hint: "prefer A to B = thích A hơn B. → Nam prefers staying at home to going to the zoo.", answer: "Nam prefers staying at home to going to the zoo." },
      { q: "My father doesn't often get up late. (My father isn't used)\n→", hint: "isn't used to + V-ing = không quen với. → My father isn't used to getting up late.", answer: "My father isn't used to getting up late." },
      { q: "My sister plays football skillfully. (My sister is)\n→", hint: "plays skillfully = is good at playing. → My sister is good at playing football.", answer: "My sister is good at playing football." },
      { q: "This painting is so beautiful. (What)\n→", hint: "Câu cảm thán: What a/an + adj + noun + S + V! → What a beautiful painting this is!", answer: "What a beautiful painting this is!" },
      { q: "How much is this dictionary? (What is)\n→", hint: "How much is = What is the price of. → What is the price of this dictionary?", answer: "What is the price of this dictionary?" },
      { q: "I am very short. I can't reach the picture on the wall. (too)\n→", hint: "too short to reach. → I am too short to reach the picture on the wall.", answer: "I am too short to reach the picture on the wall." },
      { q: '"Can you open the door, Ba?" asked the teacher. (The teacher asked Ba)\n→', hint: "Câu hỏi gián tiếp: asked Ba to open the door. → The teacher asked Ba to open the door.", answer: "The teacher asked Ba to open the door." },
      { q: "I last saw her in February. (I haven't)\n→", hint: "last saw in February → haven't seen since February. → I haven't seen her since February.", answer: "I haven't seen her since February." },
      { q: "Minh began to collect stamps in 2000. (Minh has)\n→", hint: "began in 2000 → has collected for + số năm. 2000 đến nay = hơn 20 năm. → Minh has collected stamps since 2000.", answer: "Minh has collected stamps since 2000." },
    ]
  },
  {
    id: 17,
    title: "Từ vựng về Tiền bạc (Money)",
    icon: "💰",
    theory: {
      title: "Từ vựng về tiền và tài chính",
      explanation: `Nhóm từ vựng tài chính thường gặp trong bài thi và giao tiếp hàng ngày.`,
      points: [
        { word: "cash", meaning: "tiền mặt", example: "They only accept cash. (Họ chỉ nhận tiền mặt.)" },
        { word: "exchange rate", meaning: "tỷ giá hối đoái", example: "What is the exchange rate of the pound? (Tỷ giá đồng bảng hôm nay là bao nhiêu?)" },
        { word: "discount", meaning: "chiết khấu, giảm giá", example: "The shop will give a 20% discount. (Cửa hàng sẽ giảm 20%.)" },
        { word: "loan", meaning: "khoản vay ngân hàng", example: "He can hardly find money to repay his bank loan. (Anh ấy khó trả nợ vay ngân hàng.)" },
        { word: "interest", meaning: "tiền lãi suất", example: "We will pay you 10% interest. (Chúng tôi sẽ trả 10% lãi suất.)" },
        { word: "salary", meaning: "lương tháng (nhân viên văn phòng)", example: "His salary is paid into his bank account every month." },
      ]
    },
    exercises: [
      { q: "You can't pay by check or credit card. They only accept _____.", hint: "Không dùng thẻ, không dùng séc → chỉ nhận tiền... = cash (tiền mặt)", answer: "cash" },
      { q: "What is the _____ rate of the pound today?", hint: "Tỷ giá của đồng bảng → exchange rate (tỷ giá hối đoái)", answer: "exchange" },
      { q: "During the sale the shop will give a 20% _____ on all purchases over $100.", hint: "Giảm 20% → discount (chiết khấu, giảm giá)", answer: "discount" },
      { q: "Because of losing his job he can hardly find the money to repay his bank _____.", hint: "Trả nợ ngân hàng → bank loan (khoản vay ngân hàng)", answer: "loan" },
      { q: "If you invest $100,000 in our bank for one year, we will pay you 10% _____.", hint: "Lãi suất ngân hàng → interest (tiền lãi)", answer: "interest" },
    ]
  },
  {
    id: 18,
    title: "Cấu trúc ENOUGH / TOO",
    icon: "⚖️",
    theory: {
      title: "Cấu trúc ENOUGH và TOO",
      explanation: `Hai cấu trúc này rất hay bị học viên nhầm lẫn. Hãy học kỹ vị trí của 'enough' và 'too'!`,
      points: [
        { word: "enough (tính từ)", meaning: "S + be + adj + enough + to V (đủ... để làm gì)", example: "The box is light enough for her to lift. (Hộp đủ nhẹ để cô ấy nhấc.)" },
        { word: "not...enough", meaning: "S + be + not + adj + enough + to V (không đủ... để làm gì)", example: "I'm not tall enough to reach the shelf. (Tôi không đủ cao để với tới kệ.)" },
        { word: "too (tính từ)", meaning: "S + be + too + adj + to V (quá... không thể làm gì)", example: "The weather is too rough for us to swim. (Thời tiết quá xấu để bơi.)" },
        { word: "Chú ý vị trí!", meaning: "ENOUGH đứng SAU tính từ; TOO đứng TRƯỚC tính từ", example: "✅ tall enough / ✅ too tall | ❌ enough tall / ❌ tall too" },
        { word: "for + O + to V", meaning: "Thêm chủ thể của hành động khi khác chủ ngữ", example: "The ice is thick enough for people to dance on it." },
      ]
    },
    exercises: [
      { q: "The box is light. She can lift it.\n→ The box is ___", hint: "Đủ nhẹ để cô ấy nhấc → adj + enough + for + O + to V. → The box is light enough for her to lift.", answer: "The box is light enough for her to lift." },
      { q: "The weather is very rough. We can't swim in it.\n→", hint: "Quá xấu không thể bơi → too + adj + to V. → The weather is too rough for us to swim in.", answer: "The weather is too rough for us to swim in." },
      { q: "Tom doesn't have money. He can't pay his bills.\n→", hint: "Không đủ tiền trả hóa đơn → not + enough + money. → Tom doesn't have enough money to pay his bills.", answer: "Tom doesn't have enough money to pay his bills." },
      { q: "The ice is very thick. People can dance on it.\n→", hint: "Đủ dày để người ta nhảy → thick enough for people to dance on. → The ice is thick enough for people to dance on.", answer: "The ice is thick enough for people to dance on." },
      { q: "The shirt is big. He can wear it.\n→", hint: "Đủ to để anh ấy mặc → big enough for him to wear. → The shirt is big enough for him to wear.", answer: "The shirt is big enough for him to wear." },
    ]
  },
  {
    id: 24,
    title: "Although / Despite / In spite of",
    icon: "🔄",
    theory: {
      title: "Mệnh đề nhượng bộ",
      explanation: `Ba cách diễn đạt ý nghĩa 'mặc dù' trong tiếng Anh - rất hay bị nhầm lẫn!`,
      points: [
        { word: "Although + S + V", meaning: "Mặc dù + mệnh đề (có chủ ngữ và động từ)", example: "Although it was cold, she wasn't wearing a coat. (Mặc dù trời lạnh, cô ấy không mặc áo khoác.)" },
        { word: "Despite + N/V-ing", meaning: "Mặc dù + danh từ/cụm danh từ/V-ing", example: "Despite the cold weather, she wasn't wearing a coat." },
        { word: "In spite of + N/V-ing", meaning: "Giống 'Despite' hoàn toàn!", example: "In spite of the cold weather, she wasn't wearing a coat." },
        { word: "Quy tắc chuyển đổi", meaning: "Although + S + V → Despite/In spite of + V-ing/N", example: "Although she was tired → Despite being tired / In spite of her tiredness" },
        { word: "Lưu ý!", meaning: "Despite/In spite of KHÔNG dùng với mệnh đề có S + V đầy đủ", example: "❌ Despite she was tired | ✅ Despite being tired" },
      ]
    },
    exercises: [
      { q: "Although he has a very important job, he isn't particularly well-paid.\n→ In spite of ___", hint: "Although + S + V → In spite of + danh từ/V-ing. 'he has a very important job' → 'having a very important job'. → In spite of having a very important job, he isn't particularly well-paid.", answer: "In spite of having a very important job, he isn't particularly well-paid." },
      { q: "Although I had never seen her before, I recognized her from a photograph.\n→ Despite ___", hint: "Despite + V-ing. 'I had never seen her before' → 'never having seen her before'. → Despite never having seen her before, I recognized her from a photograph.", answer: "Despite never having seen her before, I recognized her from a photograph." },
      { q: "She wasn't wearing the coat although it was quite cold.\n→ In spite of ___", hint: "In spite of + danh từ. 'it was quite cold' → 'the cold weather'. → In spite of the cold weather, she wasn't wearing the coat.", answer: "In spite of the cold weather, she wasn't wearing the coat." },
      { q: "Although the heat was on, the room wasn't warm.\n→ Despite ___", hint: "Despite + V-ing. 'the heat was on' → 'the heat being on'. → Despite the heat being on, the room wasn't warm.", answer: "Despite the heat being on, the room wasn't warm." },
    ]
  },
  {
    id: 26,
    title: "Câu tường thuật (Reported Speech)",
    icon: "💬",
    theory: {
      title: "Câu tường thuật - Chuyển lời nói",
      explanation: `Khi thuật lại lời của người khác, cần lùi thì và thay đổi đại từ, trạng từ chỉ thời gian/nơi chốn.`,
      points: [
        { word: "Lùi thì (Backshift)", meaning: "Hiện tại → Quá khứ | Quá khứ → Quá khứ hoàn thành", example: "\"I am tired\" → He said he was tired. | \"I went\" → He said he had gone." },
        { word: "Thay đại từ", meaning: "I → he/she | we → they | you → I/they", example: "\"I love you\" → She said she loved him." },
        { word: "Thay trạng từ", meaning: "now → then | today → that day | here → there | tomorrow → the next day", example: "\"I'll come tomorrow\" → He said he would come the next day." },
        { word: "Reported questions", meaning: "if/whether (yes/no) hoặc wh-word + S + V (trật tự câu kể)", example: "\"Do you speak English?\" → He asked me if I spoke English." },
        { word: "Reporting verbs", meaning: "say, tell, ask, persuade, remind, confess, allow, doubt", example: "He persuaded me to type the letter. | She reminded me to hand in my work." },
      ]
    },
    exercises: [
      { q: '"If you type this letter out for me, I\'ll buy you a drink." he said (persuade)\n→', hint: "persuade + O + to V. → He persuaded me to type the letter out for him.", answer: "He persuaded me to type the letter out for him, promising to buy me a drink." },
      { q: '"Sure, I don\'t mind at all if you use my typewriter." he said (allow)\n→', hint: "allow + O + to V. → He allowed me to use his typewriter.", answer: "He allowed me to use his typewriter." },
      { q: '"All right, it\'s true, I was nervous." he said (confess)\n→', hint: "confess + that + S + V. 'was' → 'had been'. → He confessed that he had been nervous.", answer: "He confessed that he had been nervous." },
      { q: '"I don\'t think Liverpool will win." he said (doubt)\n→', hint: "doubt + that + S + V. 'will win' → 'would win'. → He doubted that Liverpool would win.", answer: "He doubted that Liverpool would win." },
      { q: '"Don\'t forget: you\'ve got to hand in your work this evening." he said (remind)\n→', hint: "remind + O + to V. → He reminded me to hand in my work that evening.", answer: "He reminded me to hand in my work that evening." },
      { q: 'He said, "I don\'t know what happened."\n→', hint: "said → said that. 'don't know' → 'didn't know'. → He said that he didn't know what had happened.", answer: "He said that he didn't know what had happened." },
      { q: 'She said, "I went to the dentist yesterday."\n→', hint: "'went' → 'had gone'. 'yesterday' → 'the day before'. → She said that she had gone to the dentist the day before.", answer: "She said that she had gone to the dentist the day before." },
    ]
  },
  {
    id: 29,
    title: "Mệnh đề quan hệ (Relative Clauses)",
    icon: "🔗",
    theory: {
      title: "Mệnh đề quan hệ với WHO, WHICH, WHERE, WHOSE",
      explanation: `Mệnh đề quan hệ dùng để mô tả, giải thích thêm về danh từ đứng trước nó.`,
      points: [
        { word: "WHO", meaning: "Thay thế cho NGƯỜI (chủ ngữ/tân ngữ)", example: "The man who I talked to was very kind. (Người đàn ông tôi nói chuyện rất tốt bụng.)" },
        { word: "WHICH/THAT", meaning: "Thay thế cho VẬT/ĐỘNG VẬT", example: "A dictionary is a book which gives you the meaning of words." },
        { word: "WHERE", meaning: "Thay thế cho NƠI CHỐN", example: "Kim Lien is a village where Ho Chi Minh was born." },
        { word: "WHOSE", meaning: "Thay thế cho 'của ai' (sở hữu cách)", example: "Nam is a student whose father's death made him sad." },
        { word: "WHEN", meaning: "Thay thế cho THỜI GIAN", example: "Teacher's Day is a day when students show their gratitude." },
        { word: "Cách ghép câu", meaning: "Tìm danh từ chung → thay bằng đại từ quan hệ → ghép vào sau danh từ đó", example: "The boy is crying. He lost his way. → The boy who lost his way is crying." },
      ]
    },
    exercises: [
      { q: "The children are playing soccer in the stadium. Do you know them?\n→ Combine with relative clause", hint: "them = the children → WHO (người, tân ngữ). → Do you know the children who are playing soccer in the stadium?", answer: "Do you know the children who are playing soccer in the stadium?" },
      { q: "The little boy lost his way. He is crying over there.\n→ Combine", hint: "He = the little boy → WHO (người). → The little boy who lost his way is crying over there.", answer: "The little boy who lost his way is crying over there." },
      { q: "Kim Lien is a village. Ho Chi Minh was born and lived there.\n→ Combine", hint: "there = Kim Lien (nơi chốn) → WHERE. → Kim Lien is a village where Ho Chi Minh was born and lived.", answer: "Kim Lien is a village where Ho Chi Minh was born and lived." },
      { q: "Vu Quoc Viet is a famous artist. I love his works very much.\n→ Combine", hint: "his = Vu Quoc Viet's (sở hữu) → WHOSE. → Vu Quoc Viet is a famous artist whose works I love very much.", answer: "Vu Quoc Viet is a famous artist whose works I love very much." },
      { q: "A dictionary is a book. It gives you the meaning of words.\n→ Combine", hint: "It = a book (vật) → WHICH/THAT. → A dictionary is a book which/that gives you the meaning of words.", answer: "A dictionary is a book which/that gives you the meaning of words." },
    ]
  },
  {
    id: 33,
    title: "Cấu trúc nhân quả HAVE/GET/MAKE",
    icon: "🛠️",
    theory: {
      title: "Causative: Have/Get/Make something done",
      explanation: `Cấu trúc này dùng khi nhờ người khác làm việc gì đó cho mình (hoặc bắt ai làm gì).`,
      points: [
        { word: "have + O + V3 (passive)", meaning: "Nhờ ai làm gì (mình trả tiền/nhờ vả)", example: "I had the doctor check my health. (Tôi nhờ bác sĩ kiểm tra sức khỏe.)" },
        { word: "get + O + to V", meaning: "Nhờ ai làm gì (thuyết phục hơn)", example: "She got the post office to install a telephone. (Cô ấy nhờ bưu điện lắp điện thoại.)" },
        { word: "make + O + V (bare inf)", meaning: "BẮT ai làm gì (có quyền lực)", example: "She can make any dogs obey her. (Cô ấy có thể bắt con chó nào cũng nghe lời.)" },
        { word: "have + O + V3", meaning: "Nhờ làm dịch vụ → O bị động!", example: "He has his shoes shined every day. (Anh ấy nhờ đánh giày mỗi ngày.)" },
        { word: "get + O + V3", meaning: "Cũng dùng được như have!", example: "He gets his hair cut once a month. (Anh ấy cắt tóc một lần/tháng.)" },
      ]
    },
    exercises: [
      { q: "Maria had her landlord _____ the broken windows before winter. (fix)", hint: "have + O + V (nguyên thể). Chủ nhà = O, fix = hành động. → had her landlord fix", answer: "fix" },
      { q: "I'll get a specialist _____ my health. (check up)", hint: "get + O + to V. → get a specialist to check up", answer: "to check up" },
      { q: "They are going to have their wedding card _____ there. (print)", hint: "have + O + V3 (bị động). wedding card bị in ấn. → have their wedding card printed", answer: "printed" },
      { q: "She got the post office _____ a telephone in his flat. (install)", hint: "get + O + to V. → got the post office to install", answer: "to install" },
      { q: "Before we leave, let's have Sally _____ a map so we wouldn't get lost. (draw)", hint: "have + O + V nguyên thể. Sally = O, draw = hành động. → have Sally draw", answer: "draw" },
      { q: "She can make any dogs _____ her. (obey)", hint: "make + O + V bare infinitive (không 'to'). → make any dogs obey", answer: "obey" },
      { q: "He has his shoes _____ every day. (shine)", hint: "have + O + V3 (đôi giày được đánh bóng). shine → shined/shone. → has his shoes shined", answer: "shined" },
      { q: "He gets his hair _____ once a month. (cut)", hint: "get + O + V3 (tóc được cắt). cut → cut (bất quy tắc). → gets his hair cut", answer: "cut" },
    ]
  },
  {
    id: 35,
    title: "Câu bị động (Passive Voice)",
    icon: "🔁",
    theory: {
      title: "Chuyển câu chủ động sang bị động",
      explanation: `Câu bị động nhấn mạnh vào hành động hoặc đối tượng chịu tác động, không phải người thực hiện.`,
      points: [
        { word: "Công thức chung", meaning: "S(chủ động) + V + O → O + be + V3 + (by S)", example: "The teacher corrects exercises → Exercises are corrected (by the teacher)." },
        { word: "Các thì bị động", meaning: "HTĐ: am/is/are + V3 | QKĐ: was/were + V3 | HTHT: have/has been + V3", example: "is corrected / was corrected / has been corrected" },
        { word: "Bị động với modal", meaning: "can/should/will + be + V3", example: "He can't repair my bike → My bike can't be repaired by him." },
        { word: "People say that...", meaning: "→ It is said that... / He is said to be...", example: "People say he is intelligent → It is said that he is intelligent / He is said to be intelligent." },
        { word: "Câu hỏi bị động", meaning: "How many trees did they cut down? → How many trees were cut down?", example: "Không cần 'by them' nếu không quan trọng." },
      ]
    },
    exercises: [
      { q: "My students have met their friend at the station.\n→ Passive", hint: "HTHT bị động: have/has been + V3. 'met' → 'been met'. → Their friend has been met at the station by my students.", answer: "Their friend has been met at the station by my students." },
      { q: "They didn't allow Tom to take these books home.\n→ Passive", hint: "allow + O + to V → O + be not allowed + to V. → Tom was not allowed to take these books home.", answer: "Tom was not allowed to take these books home." },
      { q: "The teacher won't correct exercises tomorrow.\n→ Passive", hint: "Tương lai bị động: will not be + V3. → Exercises won't be corrected by the teacher tomorrow.", answer: "Exercises won't be corrected (by the teacher) tomorrow." },
      { q: "How many trees did they cut down?\n→ Passive", hint: "Câu hỏi bị động: How many trees + were + cut down? → How many trees were cut down?", answer: "How many trees were cut down?" },
      { q: "People say that he is intelligent.\n→ Passive (It is...)", hint: "It is said that + mệnh đề. → It is said that he is intelligent.", answer: "It is said that he is intelligent." },
      { q: "He can't repair my bike.\n→ Passive", hint: "Modal + be + V3. 'can't repair' → 'can't be repaired'. → My bike can't be repaired by him.", answer: "My bike can't be repaired by him." },
    ]
  },
];

const AI_SYSTEM_PROMPT = `Bạn là một giáo viên tiếng Anh nhiều năm kinh nghiệm, chuyên dạy cho học viên mất gốc tiếng Anh người Việt Nam. 
Hãy giải thích bằng tiếng Việt, ngắn gọn, dễ hiểu, dùng ví dụ thực tế gần gũi với người Việt. 
Khi học viên hỏi về bài tập, hãy gợi ý từng bước, KHÔNG cho đáp án trực tiếp ngay, mà hướng dẫn họ tự suy nghĩ.
Dùng emoji để bài học sinh động hơn. Tối đa 200 từ mỗi câu trả lời.`;

export default function EnglishGrammarTutor() {
  const [activeModule, setActiveModule] = useState(null);
  const [activeTab, setActiveTab] = useState("theory");
  const [exerciseState, setExerciseState] = useState({});
  const [shownHints, setShownHints] = useState({});
  const [shownAnswers, setShownAnswers] = useState({});
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "👋 Xin chào! Tôi là giáo viên tiếng Anh của bạn. Hãy chọn một bài học ở bên trái hoặc hỏi tôi bất cứ điều gì về ngữ pháp tiếng Anh! 📚" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleExerciseInput = (moduleId, exIdx, value) => {
    setExerciseState(prev => ({
      ...prev,
      [`${moduleId}-${exIdx}`]: value
    }));
  };

  const toggleHint = (moduleId, exIdx) => {
    const key = `${moduleId}-${exIdx}`;
    setShownHints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAnswer = (moduleId, exIdx) => {
    const key = `${moduleId}-${exIdx}`;
    setShownAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);
    try {
      const contextMsg = activeModule
        ? `[Học viên đang học module: ${activeModule.title}]\n${userMsg}`
        : userMsg;
      const history = chatMessages.slice(-8).map(m => ({ role: m.role, content: m.content }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: AI_SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: contextMsg }]
        })
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Xin lỗi, có lỗi xảy ra. Hãy thử lại!";
      setChatMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "❌ Lỗi kết nối. Hãy thử lại nhé!" }]);
    }
    setChatLoading(false);
  };

  const currentModule = activeModule;

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'Segoe UI', sans-serif",
      background: "#0f172a", color: "#e2e8f0", overflow: "hidden"
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 280 : 0, minWidth: sidebarOpen ? 280 : 0,
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        borderRight: "1px solid #334155", overflow: "hidden",
        transition: "all 0.3s ease", display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #334155" }}>
          <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>
            WRITING 2 GRAMMAR
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#38bdf8" }}>
            📖 English Tutor
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
          {/* AI Chat button */}
          <div
            onClick={() => setActiveModule(null)}
            style={{
              padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
              background: !activeModule ? "#1d4ed8" : "transparent",
              border: !activeModule ? "1px solid #3b82f6" : "1px solid transparent",
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: 14 }}>🤖 Hỏi giáo viên AI</span>
          </div>
          {/* Module list */}
          {GRAMMAR_MODULES.map(mod => (
            <div
              key={mod.id}
              onClick={() => { setActiveModule(mod); setActiveTab("theory"); }}
              style={{
                padding: "8px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 2,
                background: activeModule?.id === mod.id ? "rgba(56, 189, 248, 0.15)" : "transparent",
                border: activeModule?.id === mod.id ? "1px solid #38bdf8" : "1px solid transparent",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <span>{mod.icon}</span>
                <span style={{ color: activeModule?.id === mod.id ? "#38bdf8" : "#94a3b8", lineHeight: 1.3 }}>
                  Bài {mod.id}: {mod.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          padding: "12px 20px", background: "#1e293b", borderBottom: "1px solid #334155",
          display: "flex", alignItems: "center", gap: 12
        }}>
          <button
            onClick={() => setSidebarOpen(p => !p)}
            style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 18 }}
          >☰</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9" }}>
              {currentModule ? `${currentModule.icon} ${currentModule.title}` : "🤖 Hỏi Giáo Viên AI"}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              {currentModule ? "Học lý thuyết → Luyện bài tập" : "Đặt câu hỏi bất kỳ về ngữ pháp tiếng Anh"}
            </div>
          </div>
          {currentModule && (
            <div style={{ display: "flex", gap: 6 }}>
              {["theory", "exercises"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                  background: activeTab === tab ? "#38bdf8" : "transparent",
                  color: activeTab === tab ? "#0f172a" : "#94a3b8",
                  border: activeTab === tab ? "none" : "1px solid #334155",
                  fontWeight: activeTab === tab ? 700 : 400
                }}>
                  {tab === "theory" ? "📚 Lý Thuyết" : "✏️ Bài Tập"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {!currentModule ? (
            /* AI Chat Panel */
            <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 130px)" }}>
              <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: 12
                  }}>
                    {msg.role === "assistant" && (
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", background: "#1d4ed8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, marginRight: 8, flexShrink: 0
                      }}>👨‍🏫</div>
                    )}
                    <div style={{
                      maxWidth: "80%", padding: "12px 16px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: msg.role === "user" ? "#1d4ed8" : "#1e293b",
                      border: msg.role === "user" ? "none" : "1px solid #334155",
                      fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap"
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👨‍🏫</div>
                    <div style={{ padding: "12px 16px", background: "#1e293b", border: "1px solid #334155", borderRadius: "18px 18px 18px 4px" }}>
                      <span style={{ color: "#64748b" }}>Đang suy nghĩ</span>
                      <span style={{ animation: "blink 1s infinite" }}> ...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid #334155" }}>
                <input
                  ref={inputRef}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
                  placeholder="Hỏi giáo viên về ngữ pháp, từ vựng, bài tập..."
                  style={{
                    flex: 1, padding: "12px 16px", borderRadius: 12, background: "#1e293b",
                    border: "1px solid #334155", color: "#f1f5f9", fontSize: 14, outline: "none"
                  }}
                />
                <button onClick={sendChat} disabled={chatLoading} style={{
                  padding: "12px 20px", borderRadius: 12, background: chatLoading ? "#334155" : "#1d4ed8",
                  border: "none", color: "#fff", cursor: chatLoading ? "not-allowed" : "pointer", fontSize: 16
                }}>➤</button>
              </div>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Giải thích thì hiện tại hoàn thành", "Cách dùng TOO và ENOUGH", "Câu bị động là gì?", "Báo cáo lời nói gián tiếp"].map(q => (
                  <button key={q} onClick={() => { setChatInput(q); inputRef.current?.focus(); }} style={{
                    padding: "4px 10px", borderRadius: 20, background: "transparent",
                    border: "1px solid #334155", color: "#64748b", cursor: "pointer", fontSize: 11
                  }}>{q}</button>
                ))}
              </div>
            </div>
          ) : activeTab === "theory" ? (
            /* Theory Panel */
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)",
                borderRadius: 16, padding: "24px 28px", marginBottom: 24
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{currentModule.theory.title}</div>
                <div style={{ color: "#bfdbfe", fontSize: 14, lineHeight: 1.6 }}>{currentModule.theory.explanation}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {currentModule.theory.points.map((point, i) => (
                  <div key={i} style={{
                    background: "#1e293b", borderRadius: 12, padding: "18px 20px",
                    border: "1px solid #334155", borderLeft: "4px solid #38bdf8"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{
                        background: "#0ea5e9", color: "#fff", borderRadius: 6,
                        padding: "2px 10px", fontSize: 13, fontWeight: 700, fontFamily: "monospace"
                      }}>{point.word}</span>
                      <span style={{ color: "#94a3b8", fontSize: 13 }}>→ {point.meaning}</span>
                    </div>
                    <div style={{
                      background: "#0f172a", borderRadius: 8, padding: "10px 14px",
                      fontSize: 13, color: "#a3e635", fontFamily: "monospace", lineHeight: 1.6
                    }}>
                      💡 {point.example}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("exercises")}
                style={{
                  marginTop: 24, width: "100%", padding: "14px", borderRadius: 12,
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  border: "none", color: "#fff", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                ✏️ Bắt đầu làm bài tập →
              </button>
            </div>
          ) : (
            /* Exercises Panel */
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ marginBottom: 20, padding: "14px 18px", background: "#1e293b", borderRadius: 12, border: "1px solid #334155" }}>
                <span style={{ color: "#64748b", fontSize: 13 }}>💡 Gợi ý: Đọc lý thuyết trước, sau đó thử tự làm. Dùng nút "💡 Gợi ý" nếu bí, và "✅ Đáp án" để kiểm tra.</span>
              </div>

              {currentModule.exercises.map((ex, idx) => {
                const key = `${currentModule.id}-${idx}`;
                const userInput = exerciseState[key] || "";
                const hintShown = shownHints[key];
                const answerShown = shownAnswers[key];

                return (
                  <div key={idx} style={{
                    background: "#1e293b", borderRadius: 12, padding: "18px 20px",
                    marginBottom: 14, border: "1px solid #334155"
                  }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      <span style={{
                        background: "#7c3aed", color: "#fff", borderRadius: 6,
                        padding: "2px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0
                      }}>Câu {idx + 1}</span>
                      <div style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{ex.q}</div>
                    </div>

                    <input
                      value={userInput}
                      onChange={e => handleExerciseInput(currentModule.id, idx, e.target.value)}
                      placeholder="✏️ Nhập câu trả lời của bạn..."
                      style={{
                        width: "100%", padding: "10px 14px", borderRadius: 8, boxSizing: "border-box",
                        background: "#0f172a", border: "1px solid #475569", color: "#f1f5f9",
                        fontSize: 14, outline: "none", marginBottom: 10
                      }}
                    />

                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => toggleHint(currentModule.id, idx)} style={{
                        padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12,
                        background: hintShown ? "#ca8a04" : "transparent",
                        color: hintShown ? "#fff" : "#ca8a04",
                        border: "1px solid #ca8a04"
                      }}>
                        💡 {hintShown ? "Ẩn gợi ý" : "Gợi ý"}
                      </button>
                      <button onClick={() => toggleAnswer(currentModule.id, idx)} style={{
                        padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12,
                        background: answerShown ? "#10b981" : "transparent",
                        color: answerShown ? "#fff" : "#10b981",
                        border: "1px solid #10b981"
                      }}>
                        ✅ {answerShown ? "Ẩn đáp án" : "Xem đáp án"}
                      </button>
                    </div>

                    {hintShown && (
                      <div style={{
                        marginTop: 10, padding: "12px 14px", borderRadius: 8,
                        background: "rgba(202, 138, 4, 0.1)", border: "1px solid rgba(202, 138, 4, 0.3)",
                        fontSize: 13, color: "#fde68a", lineHeight: 1.6
                      }}>
                        💡 <strong>Gợi ý:</strong> {ex.hint}
                      </div>
                    )}

                    {answerShown && (
                      <div style={{
                        marginTop: 8, padding: "12px 14px", borderRadius: 8,
                        background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)",
                        fontSize: 13, color: "#6ee7b7", lineHeight: 1.6
                      }}>
                        ✅ <strong>Đáp án:</strong> <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{ex.answer}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{
                marginTop: 16, padding: "14px", background: "#1e293b", borderRadius: 12,
                border: "1px dashed #334155", textAlign: "center"
              }}>
                <span style={{ color: "#64748b", fontSize: 13 }}>
                  🤖 Còn câu hỏi nào không hiểu?
                </span>
                <button onClick={() => setActiveModule(null)} style={{
                  marginLeft: 8, padding: "4px 12px", borderRadius: 8,
                  background: "#1d4ed8", border: "none", color: "#fff",
                  cursor: "pointer", fontSize: 12
                }}>Hỏi giáo viên AI</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  );
}
