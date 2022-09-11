var creationDateOffset = 0;
var creationDate = unixtime();

var kanjiNotPresent = new Set();
var kanjiPresent = new Set();

async function getUnusedKanji() {
    let unused = '';
    for (let kanji of kanjiCards) {
        if (!kanjiPresent.has(kanji.character)) {
            unused += kanji.character;
        }
    }
    return unused;
}

var pairCounts = {};

async function setPairs(list, pairs)  {
    pairs = pairs.split(',');
    for (let pair of pairs) {
        pair = pair.trim();
        if (pair.length != 2) {
            console.log(pair, pair.charAt(0), pair.charAt(1));
        }
        let kanji = getCardsByKanji(pair);
        if (kanji.length != 2) {
            //console.log(pair);
            continue;
        }
        let ch = pair.charAt(1);
        if (pairCounts[ch]) {
            pairCounts[ch]++;
        } else {
            pairCounts[ch] = 1;
        }
        await setCardPair(list, kanji[0], kanji[1]);
    }
}

async function makeList(name, kanji, pairs) {
    listNames.add(name);

    let cards = getCardsByKanji(kanji);
    let lists = null;
    let targetList = null;

    name = name.trim();
    lists = Object.values(allListsByID);
    for (let list of lists) {
        if (list.name === name) {
            targetList = list;
            break;
        }
    }
    if (!targetList) {
        targetList = await createList(name, creationDate - creationDateOffset);
        creationDateOffset--;
    }

    let existingCards = await getCardsOfList(targetList.id);
    var newCardSet = new Set(cards);

    // remove cards from list which are in existingCards but not in cards
    let cardsToRemove = [];
    for (let existing of existingCards) {
        if (!newCardSet.has(existing.data.uuid)) {
            cardsToRemove.push(existing.data.uuid);
        }
    }
    await removeCardsFromList(targetList, cardsToRemove);
    await addCardsToList(targetList, cards);

    if (pairs) {
        await setPairs(targetList, pairs);
    }
}

function getCardsByKanji(kanji) {
    kanji = kanji.replace(/\s/g, "").split('');
    uuids = [];
    for (let ch of kanji) {
        let found = false;
        for (let card of kanjiCards) {
            if (card.character === ch) {
                uuids.push(card.uuid);
                found = true;
                break;
            }
        }
        // if (!found) {
        //     kanjiNotPresent.add(ch);
        //     //console.log(ch);
        // } else {
        //     kanjiPresent.add(ch);
        // }
    }
    return uuids;
}

var listNames = new Set();

async function makeGroupedLists() {
    await makeList('Yoga', `庭建誕健延鍵廷艇`, `延正,廷王`);
    await makeList('Yakuza (left)', `死残列殖殊殉`, `殖直,殉旬`);
    await makeList('Wrap', `包抱砲泡胞飽`, `砲石,胞月,飽食`);
    await makeList('Woman (bottom)', `女安要妥妻委姿妄婆`, `姿次,妄亡,婆波`);
    await makeList('Woman (left) 2', `妊娠嬉妖姫娯嫁嬢如妃媛媒姻婿嫡`, 
            `妊王,嬉喜,妖天,姫巨,娯呉,嫁家,如口,妃己,媒某,姻因`);
    await makeList('Woman (left) 1', `女姉妹始好嫌妨妙婦娘婚奴姓妬嫉`, 
            `姉市,妹未,始台,好子,嫌兼,妨方,妙少,娘良,奴又,姓生,妬石,嫉疾`);
    await makeList('Woman (left)', `女姉妹始好嫌妨妙婦娘婚奴姓妊娠妬嫉嫡嬉妖姫娯嫁嬢如妃媛媒姻婿`,
            `妊王,嬉喜,妖天,姫巨,娯呉,嫁家,如口,妃己,媒某,姻因,
            姉市,妹未,始台,好子,嫌兼,妨方,妙少,娘良,奴又,姓生,妬石,嫉疾`);
    await makeList('Winter (right) 2', `微救散敬致敏敷徹撤牧傲赦`,
            `救求,致至,敏毎,牧牛,赦赤`);
    await makeList('Winter (right) 1', `教数放政敗枚改敵故激徴敢`,
            `教孝,放方,政正,敗貝,枚木,改己,故古`);
    await makeList('Winter (right)', `教数放政敗枚改敵故激徴攻微救散敬致敏敷徹撤牧傲敢赦`,
            `救求,致至,敏毎,牧牛,赦赤,教孝,放方,政正,敗貝,枚木,改己,故古`);
    await makeList('Winter (bottom)', `憂愛変夏麦`, `変赤,`);
    await makeList('Window', `毎海毒梅慣貫`, ``);
    await makeList('Wind', `嵐颯楓風`, `颯立,楓木`);
    await makeList('White', `白楽習線階泉皆的激迫皇泊綿伯錦拍舶`,
            `習羽,線糸,階皆,皆比,皇王,舶舟`);
    await makeList('Wedding', `哺舗輔浦補捕`, `哺口,舗舎,輔車`);
    await makeList('Well', `囲丼井耕`, ``);
    await makeList('Weapon (right)', `役投殺設段股般殿鍛殴搬没穀殻毀`,
            `設言,股月,般舟,殴区`);
    await makeList('Warehouse', `創倉蒼`, ``);
    await makeList('Walk', `渉頻歩`, `頻頁`);
    await makeList('Village', `里理野童量裏埋鐘瞳黙糧鯉憧`,
            `理王,野予,童立,埋土,鯉魚`);
    await makeList('Vikings (left)', `学労賞堂覚常栄営党蛍掌`,
            `学子,労力,賞員,覚見,栄木,営呂,党兄,蛍虫`);
    await makeList('Umbrella (right)', `礼札乱乳孔`, `札木,乱舌,孔子`);
    await makeList('Turkey (right)', `難稚雄離雑推維雅誰唯准椎雌`,
            `維糸,雅牙,誰言,唯口,椎木`);
    await makeList('Turkey', `隹進集曜確難権観護準稚雄催離雑歓推維雇躍勧奪雅携獲焦誰穫鶴唯奮隻濯擁隼准羅椎雌礁`,
            `集木,維糸,雇戸,雅牙,誰言,唯口,隻又,隼十,椎木`);
    await makeList('Tsunami (left) 8', `沢況満渡激河汗濃浜清潔添江浮`,
            `沢尺,況兄,渡度,河可,汗干,濃農,浜兵,清青,江工`);
    await makeList('Tsunami (left) 7', `湿溝澄滝泡涼滴溶淡浸潤洞漂淀涯潰`,
            `澄登,滝竜,泡包,涼京,溶容,淡炎,洞同,漂票,淀定`);
    await makeList('Tsunami (left) 6', `浪漸漣泌渓湧汁滞津沖派演準沃淫`,
            `浪良,漸斬,漣連,泌某,湧勇,汁十,滞帯,沖中,沃天`);
    await makeList('Tsunami (left) 5', `活海決池泳酒漢注波洋深消港湯`,
            `活舌,海毎,池也,泳永,注主,波皮,洋羊,消肖,湯易`);
    await makeList('Tsunami (left) 4', `流温泣法浅浴治渉汽洗減混済氾汎`,
        `泣立,法去,浴谷,治台,渉歩,洗先,混昆,済斉`);
    await makeList('Tsunami (left) 3', `漏渇濡泥汚染液漠源沿湖測油恣濫溺`,
        `濡需,泥尼,液夜,漠莫,源原,湖胡,測則,油由`);
    await makeList('Tsunami (left) 2', `漁湾渋潜瀬潟泊滑沼滅滋沈潮涙`,
        `漁魚,潜替,瀬頼,泊白,滑骨,沼召,潮朝,涙戻,`);
    await makeList('Tsunami (left) 1', `漫浦沸濯渦没浄洪漬淑濁漆沙汰`,
        `浄争,洪共,漬責,淑叔,沙少,汰太`);
    await makeList('Tsunami (left)', `
        活海決池泳酒漢注波洋深消港湯流温泣法浅浴治渉汽洗減混済派演準淫潰溺
        沢況満渡激河汗濃浜清潔添江浮漏渇濡泥汚染液漠源沿湖測油汁滞津沖
        漁湾渋潜瀬潟泊滑沼滅滋沈潮涙湿溝澄滝泡涼滴溶淡浸潤洞漂淀涯
        漫浦沸濯渦没浄洪漬淑濁漆沙汰浪漸漣泌渓湧沃濫恣氾汎`,
        `活舌,海毎,池也,泳永,注主,波皮,洋羊,消肖,
        湯易,泣立,法去,浴谷,治台,渉歩,洗先,混昆,済斉,沢尺,況兄,渡度,河可,汗干,濃農,浜兵,清青,江工,
        濡需,泥尼,液夜,漠莫,源原,湖胡,測則,油由,漁魚,潜替,瀬頼,泊白,滑骨,沼召,潮朝,涙戻,
        澄登,滝竜,泡包,涼京,溶容,淡炎,洞同,漂票,淀定,浄争,洪共,漬責,淑叔,沙少,汰太,
        浪良,漸斬,漣連,泌某,湧勇,汁十,滞帯,沖中,沃天`);
    await makeList('Triceratops', `半当光消削鎖尚肖`, `半干,肖月`);
    await makeList('Tree (top)', `木森査杏奇`, `森林,査且,杏口,奇可`);
    await makeList('Tree (bottom)', `木某楽集葉築栄案菜染柔梨架桑栞呆柴`,
            `某甘,案安,柔矛,梨利,架加,呆口`);
    await makeList('Tree (left) 6', `桃木林札校相横植根橋様`,
            `桃兆,校交,相目,横黄,植直,根良`);
    await makeList('Tree (left) 5', `槽椎朽梓桟机楷梗棺村標`,
            `槽曹,梓辛,楷皆,梗更,棺官,村寸,標票`);
    await makeList('Tree (left) 4', `材松格梅枚械機検権株`,
            `材才,松公,格各,梅毎,械戒,機幾,株朱`);
    await makeList('Tree (left) 3', `桜枝杉核棋枠柱樹析枢柄`,
            `枝支,柱主,析斤,枢区`);
    await makeList('Tree (left) 2', `棚椅棟柳概枯欄栓栃朴楓`,
            `椅奇,棟束,概既,枯古,栓全,楓風`);
    await makeList('Tree (left) 1', `模構極板杯柵枕棒楼柿桁`,
            `模莫,板反,杯不,柵冊,柿市,桁行,棒奉`);
    await makeList('Tree (left)', `
        木林札校相横植根橋様標材松格梅枚械機検権株模構極板杯柵枕棒机楼楷柿梗棺桁村
        桜枝杉核棋枠柱樹析枢柄桃棚椅棟柳概枯欄栓栃朴楓槽椎朽梓桟`,
        `枝支,柱主,析斤,枢区,桃兆,校交,相目,横黄,植直,根良,
        椅奇,棟束,概既,枯古,栓全,楓風,槽曹,梓辛,楷皆,梗更,
        棺官,村寸,標票,材才,松公,格各,梅毎,械戒,機幾,株朱,模莫,
        板反,杯不,柵冊,柿市,桁行,棒奉`);
    await makeList('Treasure chest', `脳胸悩凶`, ``);
    await makeList('Treasure', `気図便殺希区更爽刈脳胸悩凶`, ``);
    await makeList('Triangle (top)', `命令会全今貪舎倉傘介`, `全王`);
    await makeList('Trash', `育流棄徹撤硫`, `育月,棄果`);
    await makeList('Towel', `希帯巾帽幣帰`, `帽冒`);
    await makeList('Top Hat', `組助査祖狙宜租阻畳且粗`, ``);
    await makeList('Tongue', `活話辞乱舌括憩`, `活舌,話言,辞辛`);
    await makeList('Tombstone', `軽経怪径茎`, `軽車,経糸`);
    await makeList('Toe', `上下外掛偵卓貞悼赴朴`, `上一,下一,外夕,卓早,貞貝,赴走,朴木`);
    await makeList('Tiger', `劇虞虚慮嘘墟虎膚虐虜戯`, `虞呉,慮思,膚胃,虜男`);
    await makeList('Thread', `糸係素潔索緊繁紫累`, `累田`);
    await makeList('Thread (left) 6', `糸組紙絵終線級緑編績`,
            `組且,紙氏,絵会,終冬,線泉,級及,績責`);
    await makeList('Thread (left) 5', `縁綿綾繊緯緋紋縛紳綻`,
            `緋非,紋文,縛専,紳申,綻定`);
    await makeList('Thread (left) 4', `練約紀結細続絡経総`,
            `練東,約勺,紀己,結吉,細田,続売,絡各`);
    await makeList('Thread (left) 3', `納紅純縮縦紹継紡繕緻`,
            `納内,紅工,純屯,縮宿,縦従,紹召,紡方,繕善,緻致`);
    await makeList('Thread (left) 2', `維縄緩繰緒綱紛網糾`,
            `縄亀,緒者,綱岡,紛分`);
    await makeList('Thread (left) 1', `統絞給締織綺絶縫紺絹`,
            `統充,絞交,給合,締帝,綺奇,絶色,紺甘`);
    await makeList('Thread (left)', `
        糸組紙絵終線級緑編績納紅純縮縦紹継紡維縄緩繰緒綱紛網糾縁綿繕緻
        綾繊緯緋紋縛紳綻練約紀結細続絡経総統絞給締織綺絶縫紺絹`,
        `組且,紙氏,絵会,終冬,線泉,級及,績責,納内,紅工,純屯,縮宿,
         縦従,紹召,紡方,繕善,緻致,縄亀,緒者,綱岡,紛分,緋非,紋文,縛専,紳申,綻定,
         練東,約勺,紀己,結吉,細田,続売,絡各,統充,絞交,給合,締帝,綺奇,絶色,紺甘`);
    await makeList('Tent (top)', `発登祭`, `登豆,祭示`);
    await makeList('Temple (right)', `時持特待詩寺侍`, `時日,特牛,詩言`);
    await makeList('Task', `用角通備再痛踊猟`, ``);
    await makeList('Table', `風冗処航机抗拠肌飢凡殻帆坑`, `机木,肌月,飢食`);
    await makeList('Sword', `刀刃切分辺成初留喫解潔券貿契蟹拐瑠窃寡`, `切七`);
    await makeList('Suit', `答拾合給塔搭`, `答竹,給糸`);
    await makeList('Sun (left)', `日明時暗映晴晩昨暇暖昭曙暁曖昧旺`,
            `明月,時寺,暗音,映央,晴青,晩免,昭召,曙署,暁尭,昧未,旺王`);
    await makeList('Sun (bottom)', `日百音者昔暑春書替普暮曽香暫旨昌智曹`,
            `音立,暮莫,暫斬,昌日,智知`);
    await makeList('Sun (top)', `日早星最冒暑是昆暴景昇曇晶昌易旦`,
            `早十,星生,冒目,暑者,是正,昆比,景京,昇升,曇雲,昌日,易勿,旦一`);
    await makeList('Stop', `正止歩歯歴企武渋祉歳紫肯卸柴雌`, `歩少,紫糸,肯月`);
    await makeList('Stool (right)', `取収奴双又叙淑叔`, `取耳,奴女,叙余`);
    await makeList('Stool', `友反受度努最報督緊騒痩獲侵堅浸桑又隻慢寂趣文岐斉支`,``);
    await makeList('Stone (left)', `石研確砂磁破砲硬砕礎碑硝硫礁`,
            `砂少,破皮,砲包,硬更,碑卑,硝肖`);
    await makeList('Stand 2', `端締翌拉笠粒鐘瞳帝颯傍靖憧辛竜産商`,
            `翌羽,笠竹,粒米,颯風,靖青`);
    await makeList('Stand 1', `立音新顔親競位章童商暗鏡泣韻産諦境接`,
            `音日,章早,童童,諦帝`);
    await makeList('Stand', `立音新顔親競位章童商暗鏡泣韻産諦境接端締翌拉笠粒鐘瞳帝颯傍靖憧辛竜産商`,
        `翌羽,笠竹,粒米,颯風,靖青,音日,章早,童童,諦帝`);
    await makeList('Squid', `験険検剣倹`, `験馬,検木`);
    await makeList('Spring', `実寒春棒寿奏泰奉俸`, `春日,寿寸,奏天,泰水,奉干`);
    await makeList('Spikes', `業虚並嘘湿霊繊顕戯`, ``);
    await makeList('Soul (left) 2', `情性忙慣怪悩怖懐快慎恨憎憶悔慄憬`,
            `情青,性生,忙亡,慣貫,怖布,慎真,憎曽,憶意,悔毎,憬景`);
    await makeList('Soul (left) 1', `悟慌恒惰慢惨惜悼愉憾悦憤慨憧惧`,
            `悟吾,惨参,惜昔,悼卓,憾感,慨既,憧童,惧具`);
    await makeList('Soul (left)', `情性忙慣怪悩怖懐快慎恨憎惧慄憬憶悔悟慌恒惰慢惨惜悼愉憾悦憤慨憧`,
            `情青,性生,忙亡,慣貫,怖布,慎真,憎曽,憶意,悔毎,憬景,
            悟吾,惨参,惜昔,悼卓,憾感,慨既,憧童,惧具`);
    await makeList('Someone', `者暑都署著諸緒賭箸煮曙`,
            `暑日,諸言,緒糸,賭貝,箸竹`);
    await makeList('Spirit (left)', `礼裾社初神福祈禅裕被袖祝褐視補祖複祉裸襟祥禍`,
            `社土,初刀,神申,祈斤,禅単,裕谷,被皮,
            袖由,祝兄,視見,祖且,祉止,裸果,襟禁,祥羊`);
    await makeList('Spice', `壁薪親辛宰幸倖辞執報避壁樟摯梓新章幸`, '');
    await makeList('Slice', `劾該核咳刻`, `劾力,該言,核木,咳口`);
    await makeList('Skin (right)', `皮波被彼破披`, `破石`);
    await makeList('Simple', `戦単禅弾`, `弾弓`);
    await makeList('Sick (flank left and top)', `病痒痛症痩療疲癖疫痘疾痴癒痢瘍痕`,
            `痒羊,症正,疲皮,痘豆,疾矢,痴知,痢利,瘍易`);
    await makeList('Shrimp', `駅昼沢訳択尺尽釈`, `駅馬,昼旦,訳言`);
    await makeList('Shellfish (left)', `貝敗財則販貯購賄賂贈賭貼賠賊賜賦`,
            `財才,販反,賄有,賂各,賭者,貼占,賜易`);
    await makeList('Shellfish (bottom)', `貝買負員賞責資賀費贅質貸貧貨賛賃貴貿貢賢貞貫賓`,
            `員口,資次,賀加,貸代,貧分,貨化,賃任,貢工`);
    await makeList('Self', `自身息鼻臭憩`, `息心,臭大`);
    await makeList('See', `見親鏡覚観現規境視覧寛`,`鏡金,現王,規夫`);
    await makeList('Scooter (left and bottom) 3', `近辺通週道返送進運適込迎遅遺遣避逃還巡`,
            `近斤,辺刀,週周,道首,返反,運軍,込入,遺貴,逃兆`);
    await makeList('Scooter (left and bottom) 2', `透遜遂迅蓮遭遇逸遼遥遮遍迭遷逝漣逓遡`,
        `透秀,遜孫,逸免,遮庶,迭失,逝折,遡朔`);
    await makeList('Scooter (left and bottom) 1', `速追選遠達連過違述逮造迷退途迫逆遊遵逐`,
            `速束,連車,造告,迷米,途余,迫白,遵尊,逆屯`);
    await makeList('Scooter (left and bottom)', `
        近辺通週道返送進運速追選遠達連過違述逮造迷退途迫逆遊遵逐逓遡
        適込迎遅遺遣避逃還巡透遜遂迅蓮遭遇逸遼遥遮遍迭遷逝漣`,
        `近斤,辺刀,週周,道首,返反,運軍,込入,遺貴,逃兆,透秀,
        遜孫,逸免,遮庶,迭失,逝折,遡朔,速束,
        連車,造告,迷米,途余,迫白,遵尊,逆屯`);
    await makeList('Servant', `監臣緊覧臨堅姫賢腎`, `姫女`);
    await makeList('Scarecrow', `福副富幅`, `幅巾`);
    await makeList('Say (left) 3', `課訳謝詩言記話談試調語読護訟訴討誘訪診請詰詣`,
            `課果,訳尺,謝射,詩寺,記己,話舌,談炎,試式,調周,語吾,
            読売,訟公,訴斥,討寸,誘秀,訪方,請青,詰吉,詣旨`);
    await makeList('Say (left) 2', `誌諸誤講諾託譲謙誠誰謎誇詐謀諮訂諭諒謡訃諧詮`,
            `誌志,諸者,誤呉,諾若,謙兼,誠成,
            謎迷,謀某,訂丁,諒京,諧皆`);
    await makeList('Say (left) 1', `計証詳識説訓許詞議論設評認誕諦該譜詠謹謁詔`,
            `計十,証正,詳羊,訓川,許午,詞司,議義,
            評平,認忍,誕延,譜普,詠永,詔召`);
    await makeList('Say (left)', `
        言記話談試調語読謝詩課計証詳識説訓許詞議論設評認誕諦訃諧謁詔詣詮
        護訟訴討誘訪診請詰訳誌諸誤講諾託譲謙誠誰謎誇詐謀諮訂諭諒謡該譜詠謹`,
        `課果,訳尺,謝射,詩寺,記己,話舌,談炎,試式,調周,語吾,
        読売,訟公,訴斥,討寸,誘秀,訪方,請青,詰吉,詣旨,誌志,諸者,誤呉,諾若,謙兼,誠成,
        謎迷,謀某,訂丁,諒京,諧皆,計十,証正,詳羊,訓川,許午,詞司,議義,
        評平,認忍,誕延,譜普,詠永,詔召`);
    await makeList('Satellite', `揺謡遥`, ``);
    await makeList('Samurai', `仕声売士志装誌隷壮荘穀殻款`, `志心,誌志`);
    await makeList('Same', `興銅筒胴洞同`, `銅金,筒竹,胴月`);
    await makeList('Run (flank left and bottom)', `走起越超趣赴`, `起己,超召,趣取`);
    await makeList('Root', `根銀節限既響痕退眼懇即恨概慨`, ``);
    await makeList('Roof (top) 2', `審寝宮宅憲寄宴宗富密宣宜宛蜜寮寧寛賓寂宰寡窟`,
            `審番,宮呂,寄奇,宗示,宜且,寂叔,宰辛`);
    await makeList('Roof (top) 1', `字宝空安室家定客実寒宿完守官塞察容宙宇害宵`,
            `字子,宝玉,安女,定正,客各,
            完元,守寸,察祭,容谷,宙由,宵肖`);
    await makeList('Roof (top)', `
        字宝空安室家定客実寒宿完守官察容宙宇塞害審寝宮宅憲寄宴宗富密窟宣宜宵宛蜜寮寧寛賓寂宰寡`,
        `審番,宮呂,寄奇,宗示,宜且,寂叔,宰辛,字子,宝玉,安女,定正,客各,
        完元,守寸,察祭,容谷,宙由,宵肖`);
    await makeList('Rocket', `離璃`, `璃工`);
    await makeList('Righteousness', `議義犠儀`, `議言,犠牛`);
    await makeList('Right', `右若諾匿`, ``);
    await makeList('Rice paddy (bottom)', `田番留雷蓄畜奮苗`, `雷雨,畜玄`);
    await makeList('Rice paddy (top)', `田甲男思界胃異塁畳累畏`,
            `男力,思心,界介,胃月,異共,累糸`);
    await makeList('Rice paddy', `町画卑畔畝`, `町丁,畔半`);
    await makeList('Rice (left)', `米料精粉糖粋粒粧粘糧粗`,
            `精青,粉分,粒立,粘占,糧量,粗且`);
    await makeList('Rice', `米断齢奥歯噛迷菊来粛継類謎隣数`, ``);
    await makeList('Red', `赤変恋湾跡赦蛮`, `恋心,跡足,蛮虫`);
    await makeList('Reason', `由笛宙袖届油軸抽`, `笛竹,軸車`);
    await makeList('Rain (top)', `雨雪雲電雰震需露雷霊零霧霜`,
            `雰分,露路,雷田,零令,霧務,霜相`);
    await makeList('Products', `器品臨操繰燥藻`, ``);
    await makeList('Power (right)', `力助功働動効励幼勤勧勘劾勃`,
            `助且,功工,動重,効交`);
    await makeList('Power (bottom)', `力男労努勢募劣勇`,
            `男田,努奴,募莫,劣少`);
    await makeList('Power', `力勝勉協加務賀筋架霧脇脅勲嘉`, `勉免,加口`);
    await makeList('Poop', `後幻機率響幼幾磁郷滋幽慈擁系玄畿`, `幼力,郷郎`);
    await makeList('Poem', `警驚敬`, ``);
    await makeList('Plate (bottom)', `皿血益監盗盛盟盤盆蓋`,
            `盗次,盛成,盤般,盆分`);
    await makeList('Pig', `家劇豚隊豪縁墜遂塚蒙`,
            `豚月`);
    await makeList('Past', `法却脚去`, ``);
    await makeList('Page (right) 2', `項頻顧瀬頃頂須顕煩頰頓頒顎`,
            `項工,頻歩,頂丁,煩火,頒分`);
    await makeList('Page (right) 1', `顔頭頁願頑類順領額預頼傾`,
            `頭豆,願原,頑元,順川,領令,額客,預予,頼束,傾化`);
    await makeList('Page (right)', `顔頭頁願頑類順領額預頼傾項頻顧瀬頃頂須顕煩頰頓頒顎`,
            `項工,頻歩,頂丁,煩火,頒分,頭豆,願原,頑元,順川,領令,額客,預予,頼束,傾化`);
    await makeList('Original', `願原源`, `願頁`);
    await makeList('Older brother', `競祝況党呪兄`, `呪口`);
    await makeList('Old', `古苦固個居故湖克枯胡据`,
            `固口,克十,枯木,胡月`);
    await makeList('One-sided', `版片`, `版反`);
    await makeList('Oneself (not right)', `己巻改選港起忌遷`, `忌心,改夂`);
    await makeList('Oneself (right)', `記配紀己妃`, `記言,紀糸,妃女`);
    await makeList('Nurse', `譲嬢壌醸`, `譲言,嬢女,壌土`);
    await makeList('Not', `不杯否`, `杯木,否口`);
    await makeList('Next', `次羨資姿盗諮茨`, `羨羊,資貝,姿女`);
    await makeList('Net (top)', `買署罪罰置羅罷罵`,
            `買貝,署者,罪非,置直,羅維,罷能,罵馬`);
    await makeList('Narwhal (flank top and left)', `左右友有存布在`,
            `左工,右口,友又,有月,存子,布巾,在土`);
    await makeList('Music', `農典豊遭槽曹`, `豊豆`);
    await makeList('Mountain (top)', `山出岸岩炭嵐崖崇崩`, `岩石,崩朋,炭灰,嵐風`);
    await makeList('Mountain (left)', `崎岐峰峡岬峠`, `崎奇,岐支,岬甲`);
    await makeList('Mouth (surrounding)', `口四図国固囲園因団困囚圏回`,
            `国玉,固古,囲井,因大,団寸,困木,囚人,圏巻`);
    await makeList('Mouth (right)', `口知和加如`, `知矢,加力,如女`);
    await makeList('Mouth (left) 2', `唱嘘喧嘩叱叫呪咲唯喚噴唆哺喝嘱吟咽嚇唾吐`,
            `唱昌,嘘虚,喧宣,嘩華,呪兄,嘱属,吟今,咽因,吐土`);
    await makeList('Mouth (left) 1', `口鳴味喫叩喉吸呼嘆噂咳噌喋噛吹唄喩嗅嘲`,
            `喫契,鳴鳥,味未,吸及,呼平,噛歯,吹欠,唄貝,嘲朝`);
    await makeList('Mouth (left)', `口鳴味喫叩喉吸呼嘆噂喩嗅嘲咽嚇吐唾咳噌喋噛吹唱嘘喧嘩叱叫呪咲唯喚噴唆哺喝嘱吟唄`,
            `唱昌,嘘虚,喧宣,嘩華,呪兄,嘱属,吟今,咽因,吐土,
            喫契,鳴鳥,味未,吸及,呼平,噛歯,吹欠,唄貝,嘲朝`);
    await makeList('Mouth (bottom)', `口右台名谷告善害含否哲吾啓杏吉召呂`,
            `含今,否不,哲折,吾五,杏木,吉士,召刀`);
    await makeList('Mouth (top)', `口号兄呈呆`, `呈王,呆木`);
    await makeList('Morning', `幹乾韓潮朝`, ``);
    await makeList('Moon (left) 2', `月服勝脳胸脱腕腰肥豚腹脈股肺臓朕肘膳肢`,
            `腕宛,腰要,肺市,肘寸,肢支`);
    await makeList('Moon (left) 1', `膝肝脚肌胴脇脂肪膨胞騰腸膜胎胆腺謄臆腫`,
            `肝干,脚却,胴同,肪方,胞包,膜莫,胎台,胆旦,腺泉,臆意,腫重`);
    await makeList('Moon (left)', `月服勝脳胸脱腫腕腰肥豚腹脈股肺臓膝肝脚肌胴脇脂肪膨胞騰腸膜胎胆腺謄臆朕肘膳肢`,
            `腕宛,腰要,肺市,肘寸,肢支,肝干,脚却,胴同,肪方,
            胞包,膜莫,胎台,胆旦,腺泉,臆意,腫重`);
    await makeList('Mole', `倒致至到窒`, `窒穴`);
    await makeList('Mohawk', `滴摘適敵嫡`, ``);
    await makeList('Misc 4', `為旧甘舞牙壁充孝即琴輝塗鬱覇舗且憂恭弊堕垂`,``);
    await makeList('Misc 3', `望求司軍面弁可静飛岡革型差鮮靴児麗衆撃背既`,``);
    await makeList('Misc 2', `甚屯升壱葛釜瓦串墾嗣璽塑丙蔽貌冥麺耗弄聖辣`,``);
    await makeList('Misc 1', `丁了才元公世両州民以具共題厳亀羞麓摯璧弔乙`,``);
    await makeList('Middle', `中仲忠貴沖`, `忠心`);
    await makeList('Melon (right)', `弧孤瓜狐爪`, `弧弓,孤子`);
    await makeList('Measurement (right)', `封寸村付対謝討射酎樹耐尉`, `村木,討言,射身`);
    await makeList('Measurement', `寸将博守専団導尋尊噂寿闘奪慰辱冠鋳爵`, `団口,導道`);
    await makeList('Mask', `僧増層噌贈憎`, `増土,贈貝`);
    await makeList('Master (right)', `主住注往柱駐`, `柱木,駐馬`);
    await makeList('Machine', `始治飴怠胎台冶`, `始女,怠心,胎月`);
    await makeList('Long ago', `借措籍惜錯昔`, `錯金`);
    await makeList('Long', `長張髪帳`, `張弓,帳巾`);
    await makeList('Loiter (left)', `後役待得徒律徴往従復微径徳彼御徹征徐循`,
            `待寺,徒走,往主,彼皮,御卸,征正,徐余,循盾`);
    await makeList('Lip ring', `河可阿崎苛荷歌何綺`, ``);            
    await makeList('Lid (top)', `六交京夜高卒率亭豪裏褒哀衰亮享`, `交父`);
    await makeList('Life', `生麦星表性喫害産責素割憲潔姓契隆俵牲轄`,
            `星日,責貝,素糸,姓女,牲牛`);
    await makeList('Library', `編偏遍`, `編糸`);
    await makeList('Leader (left) 4', `伸償伴併仙俊儀側借僧個倒任件人仕他休代体作侶儒`,
            `伸申,償賞,伴半,仙山,儀義,側則,借昔,僧曽,個固,
            倒到,任王,件牛,仕士,他也,休木,体本,侶呂,儒需`);
    await makeList('Leader (left) 3', `何化付住保仮使便低位仲伝働倍僕億像例信係傑但侯`,
            `何可,付寸,住主,保呆,仮反,便更,位立,仲中,
            働動,僕業,億意,像象,例列,信言,但旦`);
    await makeList('Leader (left) 2', `価値俳停備優供候健修僚催促似偵傷債伎依仏侮僅倹`,
            `値直,俳非,停亭,優憂,供共,健建,促足,似以,偵貞,債責,伎支,依衣,侮毎`);
    await makeList('Leader (left) 1', `偽仁侵伺俺侍俵佐伊俗偶伯仰偉偏倫傲伏佳傍伐俸倣`,
            `偽為,仁二,伺司,侍寺,俵表,佐左,俗谷,伯白,伏犬,俸奉,倣放`);
    await makeList('Leader (left)', `
        人仕他休代体作何化付住保仮使便低位仲伝働倍僕億像例信仏係侯
        側借僧個倒任件価値俳停備優供候健修僚催促似偵傷債伎依侶儒但僅倣
        伸償伴併仙俊儀偽仁侵伺俺侍俵佐伊俗偶伯仰偉偏倫傲伏佳傍伐俸傑侮倹`,
        `伸申,償賞,伴半,仙山,儀義,側則,借昔,僧曽,個固,倒到,任王,件牛,
        仕士,他也,休木,体本,侶呂,儒需,何可,付寸,住主,保呆,仮反,便更,位立,
        仲中,働動,僕業,億意,像象,例列,信言,但旦,値直,俳非,停亭,優憂,供共,
        健建,促足,似以,偵貞,債責,伎支,依衣,侮毎,偽為,仁二,伺司,侍寺,俵表,
        佐左,俗谷,伯白,伏犬,俸奉,倣放`);
    await makeList('Landslide', `農震振娠唇辱濃`, `農曲,震雨,娠女,唇口,辱寸`);
    await makeList('Ladle (right)', `科料斗斜`, `料米,斜余`);
    await makeList('Lack (right)', `次欠飲歌欧欲歓吹炊欺軟款`, 
            `飲食,欧区,欲谷,吹口,炊火,軟車`);
    await makeList('Korea', `違韓衛偉緯`, `韓車,衛行,緯糸`);
    await makeList('Knife (right) 2', `刺刻測剣刑削刊剥剤到刷刈剛剰剖`,
            `削肖,刊干,剤斉,到至,剛岡,剰乗`);
    await makeList('Knife (right) 1', `利別例列劇側倒制判副割則創刹`,
            `判半,割害,則貝,創倉`);
    await makeList('Knife (right)', `利別例列刹劇側剥倒制判副割則創刺刻測剣刑削刊剤到刷刈剛剰剖`,
            `削肖,刊干,剤斉,到至,剛岡,剰乗,判半,割害,則貝,創倉`);
    await makeList('Kiss (right)', `路格絡各略賂酪`,
            `路足,格木,絡糸,略田,賂貝`);
    await makeList('King (left)', `王理球現環珍班珠瑛瑠瑞璃斑玩`,
            `理里,球求,現見,珠失,瑛英,瑠留,玩元`);
    await makeList('Kick', `表展裏褒猿俵哀衰喪袋裂襲衷製衣麗鹿`,
            `裂列,製制`);
    await makeList('Key', `作昨酢詐搾`, `昨日,詐言`);
    await makeList('Jammed in', `界介`, `界田`);
    await makeList('Jackhammer', `祭標禁余示票宗隷奈斎慰歳漂襟凛尉崇款県`,
            `標木,禁林,奈大,斎斉`);
    await makeList('Insect', `虫蜂虹蚊蛇蝶融触蚕蟹`,
            `虹工,蚊文,触角,蚕天,蟹解`);
    await makeList('Ice (left)', `次冷凍凄准凝凛凌`,
            `次欠,冷令,凍東,凄妻,凝疑`);
    await makeList('Hot pepper', `璧避壁癖`, `璧玉,壁土`);
    await makeList('Horse (left)', `馬験駅騒駆駐騎駒駄駿`,
            `駅尺,駆区,駐主,騎奇,駄太`);
    await makeList('Horns (top)', `首美羊弟前送善狭従益並隊尊磁縦併餅滋墜遂咲瓶慈`,
            `首百,従征`);
    await makeList('Hook', `決喉候快`, ``);
    await makeList('Hole', `究穴突窓窮搾窒窃`, `究九,突大,窒至,窃切`);
    await makeList('History (look-alike)', `更丈史吏使便硬`, ``);
    await makeList('Hills', `乏芝之`, ``);
    await makeList('Heavy', `重働動種衝勲腫`, `動力,衝行,腫月`);
    await makeList('Heart (bottom) 2', `思意息想感念急恋悲忘態怒惑憲悠怨忌`,
            `思田,意音,息自,想相,念今,恋赤,悲非,忘亡,態能,怒奴,忌己`);
    await makeList('Heart (bottom)  1', `恐心必悪志恩忠窓患恵懸懲慰懇忍憩芯慈怠愚愁`,
            `悪亜,志士,恩因,忠中,患串,懲徴,慰尉,忍刃,怠台,愁秋`);
    await makeList('Heart (bottom)', `
        心必思意悪息想感念急恋悲忘態怒惑憲恐志恩忠窓愁患恵懸懲慰懇忍憩怨芯慈怠愚悠忌`,
        `思田,意音,息自,想相,念今,恋赤,悲非,忘亡,態能,怒奴,忌己,
        悪亜,志士,恩因,忠中,患串,懲徴,慰尉,忍刃,怠台,愁秋`);
    await makeList('Happiness', `達報執`, `執丸`);
    await makeList('Hair (right)', `形影彫杉彩彰膨`, `影景,彫周,杉木,彰章`);
    await makeList('Guard', `説税脱鋭悦閲`, `説言,脱月,鋭金,閲門`);
    await makeList('Gun (top)', `先年午矢毎朱匂乞勾缶生失`, `午十,矢大,朱木,失大`);
    await makeList('Grain (left) 2', `禾科私和利秒秋種税程稚移稽`,
            `和口,秒少,秋火,種重,程呈,移多`);
    await makeList('Grain (left) 1', `積秘称稲稼穏穂租穫秩稿`,
            `積責,秘必,稼家,穂恵,租且,秩失,稿高`);
    await makeList('Grain (left)', `禾科私和利秒秋種税程稚移積稽秘称稲稼穏穂租穫秩稿`,
            `和口,秒少,秋火,種重,程呈,移多,積責,秘必,稼家,穂恵,租且,秩失,稿高`);
    await makeList('Grain (top)', `禾季委秀香`, `季子,委女,秀乃,香日`);
    await makeList('Good', `良養狼郎娘朗浪廊`, `娘女,朗月`);
    await makeList('Gold (left) 2', `釣鐘鈍鍛鍵錬鉢銘鎖錦鎌鎮錯錠鋳錮`,
            `鐘童,鈍屯,鍛段,鍵建,錬束,鉢本,銘名,鎌兼,鎮真,錯昔,錠定,鋳寿,錮固`);
    await makeList('Gold (left) 1', `金鉄鏡銀鉛針録鑑銭銅鍋鈴銃鋼鋭鉱`,
            `鉄失,銀良,針十,鑑藍,銅同,鈴令,銃充,鋼岡,鉱広`);
    await makeList('Gold (left)', `金鉄鏡銀錮鉛針録鑑銭銅鍋鈴銃鋼鋭鉱釣
                鐘鈍鍛鍵錬鉢銘鎖錦鎌鎮錯錠鋳`,
            `鐘童,鈍屯,鍛段,鍵建,錬束,鉢本,銘名,鎌兼,鎮真,錯昔,錠定,鋳寿,
            錮固,鉄失,銀良,針十,鑑藍,銅同,鈴令,銃充,鋼岡,鉱広`);
    await makeList('Go (flank left and right)', `行術街衛衝衡`, `衝重`);
    await makeList('Gladiator', `勝藤巻券拳騰誉挙`, `巻己,券刀,拳手,誉言,挙手`);
    await makeList('Giant', `巨拒距`, `距足`);
    await makeList('Gate (flank left and right)', `間聞開問門関閥閣閉闘闇閲閑`,
            `間日,聞耳,問口,閣各,閉才,闇音,閑木`);
    await makeList('Fruit', `課果菓巣棄裸彙`, `課言`);
    await makeList('Frostbite', `綾陵凌`, `綾糸`);
    await makeList('Fortune', `点店占粘貼`, `粘米,貼貝`);
    await makeList('Football', `援暖緩媛`, `暖日,緩糸,媛女`);
    await makeList('Foot (left)', `足路踏跳跡躍距踊蹴践踪`,
        `路各,跳兆,跡赤,距巨,蹴就,踪宗`);
    await makeList('Flowers (top) 3', `花草茶苦落葉芸苺英茂芝荒芽菌菊芯蓄蓮蔵墓`,
            `花化,草早,苦古,苺母,英央,芝之,芽牙,芯心,蓄畜,蓮連`);
    await makeList('Flowers (top) 2', `苗茨芳蒙葵莉茜茎荘蒼萌藩菅蔑藍藻繭慕幕苑`,
            `苗田,芳方,莉利,茜西,荘壮,蒼倉,萌明,菅官,藍監`);
    await makeList('Flowers (top) 1', `荷薬苛若夢藤菓華菜著蒸芋薦葬薄薪蓋萎募`,
            `荷何,薬楽,苛可,若右,菓果,著者,芋干,薪新,萎委`);
    await makeList('Flowers (top)', `
        花草茶苦落葉芸苺英荷薬苛若夢藤菓華菜著蒸芋薦葬薄蔵茂芝幕墓苑
        荒芽菌菊芯蓄蓮慕萎募薪蓋苗茨芳蒙葵繭莉茜茎荘蒼萌藩菅蔑藍藻`,
        `花化,草早,苦古,苺母,英央,芝之,芽牙,芯心,蓄畜,蓮連,
        苗田,芳方,莉利,茜西,荘壮,蒼倉,萌明,菅官,藍監,荷何,
        薬楽,苛可,若右,菓果,著者,芋干,薪新,萎委`);
    await makeList('Flood', `災巡拶`, `災火`);
    await makeList('Flag (flank top and left)', `局屋履尻尾届展層居眉属屈屁尼尿`,
            `局可,屋至,履復,尻九,尾毛,届由,層曽,居古,眉目,屈出,屁比,尿水`);
    await makeList('Fix', `植置値殖直`, `植木`);
    await makeList('Five', `五語吾悟`, `語言,吾口`);
    await makeList('Fire (left)', `火炎焼煙燃爆畑炉炊灯燥煩`,
            `燃然,爆暴,畑田,炉戸,炊欠,灯丁,煩頁`);
    await makeList('Finger (left) 4', `撲拶挨挿拘拓抽探掃採捨拡操揮打投持指拾折技`,
            `撲業,拘句,拓石,抽由,捨舎,拡広,揮軍,打丁,持寺,指旨,拾合,折斤,技支`);
    await makeList('Finger (left) 3', `批援提担捉捕抜掛捜接授振招撮押掘括握揚擦拭捗`,
            `批比,提是,担旦,捉足,抜友,授受,招召,撮最,押甲,掘屈,括舌,握屋,揚易,擦察,拭式,捗歩`);
    await makeList('Finger (left) 2', `推損拝払換摘抗掲抱抵描扱択抑控拒拉携排揺抄`,
            `損員,抱包,扱及,択尺,控空,拒巨,拉立,排非,抄少`);
    await makeList('Finger (left) 1', `把搬挟擁搭披据拐抹拍摂搾扶拙擬拷拠措撤挑捻挫`,
            `把巴,搬般,披皮,据居,抹末,拍白,扶未,拙出,擬疑,拷考,拠処,措昔,挑兆,捻念`);
    await makeList('Finger (left)', `
        打投持指拾折技批援提担捉捕抜掛捜接授振招撮押探掃採捨拡操揮推損拝払換摘抗掲抱抵捻挫抄拭捗
        描扱択抑控拒拉携排拠措撤挑掘括握揚揺擦撲拶挨挿拘拓抽把搬挟擁搭披据拐抹拍摂搾扶拙擬拷`,
        `撲業,拘句,拓石,抽由,捨舎,拡広,揮軍,打丁,持寺,指旨,拾合,折斤,技支,
        批比,提是,担旦,捉足,抜友,授受,招召,撮最,押甲,掘屈,括舌,握屋,揚易,
        擦察,拭式,捗歩,損員,抱包,扱及,択尺,控空,拒巨,拉立,排非,抄少,
        把巴,搬般,披皮,据居,抹末,拍白,扶未,拙出,擬疑,拷考,拠処,措昔,挑兆,捻念`);
    await makeList('Festival', `察際擦祭`, ``);
    await makeList('Feather', `翁羽弱翼習翌翔扇翻`,
            `翁公,翼異,習白,翌立,翔羊,扇戸,翻番`);
    await makeList('Fault', `鉄秩迭失`, `鉄金`);
    await makeList('Explosion', `率塁渋摂脊兆楽薬`, ``);
    await makeList('Excuse', `勉晩免逸`, `勉力,晩日`);
    await makeList('Eye (left)', `目睡眠眼眺瞬瞳瞭睦`,
            `眠民,眼良,眺兆,瞳童`);
    await makeList('Eye (bottom)', `目着冒省看督盲`, `着羊,冒日,省少,看手,督叔,盲亡`);
    await makeList('Eternity', `泳永詠`, `詠言`);
    await makeList('Escalator, Stairs', `秀誘携透乃級吸及扱`, ``);
    await makeList('Energy', `気汽`, ``);
    await makeList('Eat (left)', `食飲館飯飴飾飼餅餓飢飽餌`,
            `飲官,館官,飯反,飴台,飾布,飼司,餓我,飽包,餌耳`);
    await makeList('Easy', `場湯陽易腸揚傷`, `腸月,場土`);
    await makeList('East', `東練凍棟錬陳欄`, `練糸,棟木,錬金,欄木`);
    await makeList('Ear (left)', `耳取職恥聴聡`, `取又,恥心`);
    await makeList('Early', `章卓悼早`, ``);
    await makeList('Dry', `半午平干汗刊肝軒`, `肝月,軒車`);
    await makeList('Drunkard 2', `幾戚戒茂滅威歳繊戴栽伐哉賊戯蔑`, `戯虚`);
    await makeList('Drunkard 1', `成戦感識閥減械機域職裁載惑織我`, `戦単`);
    await makeList('Drunkard', `成戦感識閥減械機域職裁載惑織幾戚戒茂滅威歳繊戴栽伐哉賊戯蔑我`,
            `戯虚,戦単`);
    await makeList('Drum', `喜樹膨嘉鼓`, `樹村,鼓支`);
    await makeList('Doubt', `凝擬疑`, ``);
    await makeList('Door (flank top and left)', `戸肩戻房雇扇扉`, `肩月,戻大,房方,扇羽,扉非`);
    await makeList('Dollar', `費沸`, `費貝`);
    await makeList('Dog', `犬然状獣就獄献黙蹴伏`, `就京,献南,黙黒`);
    await makeList('District', `欧駆枢殴区`, `欧欠,駆馬,枢木`);
    await makeList('Dirt (left) 2', `墟垣塔塊塀培壇堰堤墳塚壌坪堪坑堆`,
            `墟虚,塊鬼,堤是,坪平`);
    await makeList('Dirt (left) 1', `土地場坂塩増坊域城境壊均埋埼堀塡`,
            `地也,場易,坂反,増曽,坊方,城成,埋里,埼奇,堀屈`);
    await makeList('Dirt (left)', `土地場坂塩増坊域城境壊均埋埼堀墟垣塔塊塀培壇堰堤墳塚壌坪堪坑塡堆`,
            `墟虚,塊鬼,堤是,坪平,地也,場易,坂反,増曽,坊方,城成,埋里,埼奇,堀屈`);
    await makeList('Director, Paragraph', `詞飼伺句拘駒司`, `詞言,飼食,駒馬`);
    await makeList('Direction (right)', `方妨防坊訪肪紡`, `妨女,坊方,訪言,肪月,紡糸`);
    await makeList('Direction (left)', `方放族旅施旗旋`, ``);
    await makeList('Demon', `鬼魅塊魂魔醜`, `魅未,塊土`);
    await makeList('Death Star', `輸諭癒愉`, `輸車,諭言`);
    await makeList('Cross (left or right)', `協十計針汁枠酔粋博`, `計言,針金,博専`);
    await makeList('Criminal', `非悲罪俳輩斐排扉緋`, `悲心,輩車,斐文,扉戸,緋糸`);
    await makeList('Crab', `期基旗棋碁欺`, `期月,基土,棋木,碁石,欺欠`);
    await makeList('Cow (left)', `牛物特犠牧牲`, `物勿,特寺,犠義,牲生`);
    await makeList('Copy', `写与互号呉誤`, ``);
    await makeList('Construction (left)', `工功攻項巧`, `功力,項頁`);
    await makeList('Concurrently', `嫌謙兼鎌廉`, `嫌女,謙言,鎌金`);
    await makeList('Compare', `階皆比昆混批屁鹿陛`, `皆白,昆日`);
    await makeList('Comb', `印暇段興鍛臼`, ``);
    await makeList('Coffin', `考者老拷孝`, `者日,孝子`);
    await makeList('Clown', `部倍培賠陪剖`, `培土,賠貝`);
    await makeList('Clothes', `裁製壊懐装依衣喪袋襲裂`, `製制,袋代,襲龍,裂列,装壮`);
    await makeList('Cliff (flank top and left)', `反歴圧厚厄暦盾后灰厘`,
            `反又,圧土,灰火, 厘里`);
    await makeList('Cleat', `受妥愛乳隠浮菜採稲瞬穏彩鶏渓采淫`, `妥女,乳孔,采木`);
    await makeList('Clan', `氏紙民低底婚抵邸`, `紙糸`);
    await makeList('Circle', `熱勢熟執塾丸`, `執幸`);
    await makeList('Chinese', `漢難嘆`, `嘆口`);
    await makeList('Child', `子字学好季存厚乳猛浮遊孫承遜孔孤`, `好女,孫糸,孤瓜`);
    await makeList('Charcoal', `僚療寮瞭遼`, `瞭目`);
    await makeList('Ceremony', `代試式武弐`, `式工,武止,弐三`);
    await makeList('Center', `央映英瑛`, `映日`);
    await makeList('Cat pirate', `迎抑仰`, ``);
    await makeList('Car (left)', `車軽転輪輸較軸斬軌軒軟輔轄`,
            `較交,軸由,斬斤,軌九,軒干,軟欠,轄害`);
    await makeList('Canopy (left) 2', `序腐鹿廃床摩磨魔庄麻唐庸慶席度`,
            `序予,廃発,床木,庄土,麻林`);
    await makeList('Canopy (left) 1', `広店庭府底座応庁康庫廊廉`,
            `店占,庭廷,府付,応心,庁丁,庫車,廊郎,厘里,廉兼`);
    await makeList('Canopy (left)', `広店庭府底座応庁康庫席廊序腐鹿廃床摩磨魔庄麻唐庸慶廉`,
            `序予,廃発,床木,庄土,麻林,店占,庭廷,府付,応心,庁丁,庫車,廊郎,厘里,廉兼`);
    await makeList('Cage', `医区匹堰匠匿`, `医矢,匠斤,匿若`);
    await makeList('Bundle', `速整束頼瀬疎勅`, `頼頁,疎疋,勅力`);
    await makeList('Building (right)', `部都郵郎邦邪郡邸郊郭那`,
            `都者,郎良,邪牙,郡君,郊交,郭享`);
    await makeList('Building (left) 2', `陣隆隣陰阻隙陛隔陶隅陥陳随阿陵陪`,
            `陣車,阻且,陳東,阿可`);
    await makeList('Building (left) 1', `院階陽阪険防際隠限障隊除陸降附`,
            `院完,階皆,陽易,阪反,防方,際祭,限良,障章,除余,附付`);
    await makeList('Building (left)', `院階陽阪険防際隠附限障隊除陸降陣隆隣陰阻隙陛隔陶隅陥陳随阿陵陪`,
            `陣車,阻且,陳東,阿可,院完,階皆,陽易,阪反,防方,際祭,限良,障章,除余,附付`);
    await makeList('Buddy', `君群郡伊`, `群羊`);
    await makeList('Brush', `建書妻律筆健糖隷津鍵唐庸事`, `書日,妻女,筆竹`);
    await makeList('Bookshelf', `輪冊論柵倫`, `輪車,論言,柵木`);
    await makeList('Blue (right)', `青情晴清精請靖`, `晴日,精米,請言,靖立`);
    await makeList('Bow (left)', `引強弓張弾弧弥弦`, `張長,弾単,弧瓜,弦玄`);
    await makeList('Bone', `滑髄骨骸`, `骸玄`);
    await makeList('Boil (bottom)', `点熱然烈照熟無蒸熊焦黙煎煮庶勲魚黒窯薫`,
            `点占,烈列,照昭,熊能,煎前,煮者,勲動,黒里`);
    await makeList('Boat (left)', `船航般艦舟艇丹舶舷`, `艦藍,艇延,舶白,舷玄`);
    await makeList('Black hole', `履復腹複覆`, `腹月`);
    await makeList('Bird', `鳥鳴島薦鳩鶴鶏烏`, `鳴口,鳩九`);
    await makeList('Big (look-alike)', `天未末本大朱犬太失央休木体来米夫`, ``);
    await makeList('Big', `大太央美器参臭崎突換奈契戻奥奪俺涙爽奨奮喚奔`,
            `美羊,臭自,突穴,奈示,戻戸,奨将`);
    await makeList('Beforehand', `矛野預序予柔`, `野里,預頁,柔木`);
    await makeList('Bear', `追館官師管遣阜帥菅`, `阜十,帥巾`);
    await makeList('Beans', `頭登短豊豆闘痘澄艶鼓`, `頭頁,短矢,豊曲,鼓支`);
    await makeList('Bar (right)', `残浅銭践桟`, `銭金,践足,桟木`);
    await makeList('Bamboo 2', `筆符筋簡範筒籍笠箸簿篤箋籠篭`,
            `符付,簡間,筒同,笠立,箸者,篤馬`);
    await makeList('Bamboo 1', `竹答算第築箱笑等笛節箇策管`,
            `答合,箱相,等寺,笛由,節即,箇固,管官`);
    await makeList('Bamboo (top)', `竹答算第築箱笑等笛節箇策管筆符筋簡範筒籍笠箸簿篤箋籠篭`,
            `答合,箱相,等寺,笛由,節即,箇固,管官,符付,簡間,筒同,笠立,箸者,篤馬`);
    await makeList('Axe', `斤斥近所新折兵祈断質訴浜析哲暫丘岳斬誓匠逝漸`,
            `所戸,木析,斬車`);
    await makeList('Asia', `悪亜`);
    await makeList('Arrow', `矢知医短族疑喉候勧挨疾痴智矯`, `知口,短豆`);
    await makeList('Anti', `反版板販阪坂飯仮返`, `版片,板木,販貝,坂土,飯食`);
    await makeList('Animal (left)', `狼猫犯狭独猛獄狙獲狩狂猿猟猶狐`,
            `狼良,独虫,狙且,狩守,狂王,狐瓜`);
    await makeList('Angel', `茶術述`, `術行`);
    await makeList('Alligator', `他地池施也`, `地土`);
    await makeList('Alcohol (left)', `配酸酔酢酎酷酬醸酵酌酪醜醒`,
            `配己,酎寸,酷告,酬州,酵孝,酌勺,酪各,醜鬼,醒星`);
    await makeList('Ability', `能態熊罷`, `態心`);
    await makeList('Weather (meaning)', `雷嵐曇雲虹霧風夏雪雨晴雰陽虹`);
    await makeList('Water (meaning) 2', `水滝沖湯潤湿氷汽蒸井潤泳渦波注港濡潟滴`);
    await makeList('Water (meaning) 1', `魚釣漁滝貝海洋湖池鯨川河流泉橋傘泡潮`);
    await makeList('Water (meaning)', `泡潮潟滴水滝沖湯潤湿氷汽蒸井潤泳魚釣漁滝貝海洋湖池鯨川河流泉渦橋港波注傘濡`);
    await makeList('Violence (meaning) 3', `突刺絞逮武勢争敵刀暴兵守危毒軍士`);
    await makeList('Violence (meaning) 2', `刃滅襲銃闘募塁陣将剣烈隊撃攻殺`);
    await makeList('Violence (meaning) 1', `殉拷帥虐尉艦侵征蹴殴砕矛侍砲戦`);
    await makeList('Violence (meaning)', `殉拷帥虐尉艦争侵征蹴殴砕矛侍砲刃滅襲銃闘募塁陣将剣烈隊撃攻突刺絞逮武勢敵刀暴兵守危毒軍士殺戦`);
    await makeList('Trees / Wood (meaning)', ``);
    await makeList('Temperature (meaning)', `氷凝凍寒冷熱暑蒸燒湯温暖`);
    await makeList('Time (meaning) 2', `遅速早久昔経現暇回朝晩夜泊夕昼暦旦`);
    await makeList('Time (meaning) 1', `予前後秒時月日今曜昨年歳期間週暁曙`);
    await makeList('Time (meaning)', `暁旦曙予前後秒時月日暦曜昨年歳期間遅今速早久昔経現暇回朝晩夜泊夕週昼`);
    await makeList('Sound, Music (meaning)', `曲楽歌音声静笛響奏聴唱鐘琴喧唄`);
    await makeList('Shapes (meaning) 2', `太角境狭長高坂細周玉枚容穴厚姿`);
    await makeList('Shapes (meaning) 1', `凸凹痩円形丸小大線広端径濃平`);
    await makeList('Shapes (meaning)', `凸凹痩円形丸小大玉周線広端径濃平太角境狭長高坂細枚容穴厚姿`);
    await makeList('Seasons (meaning)', `夏冬秋春節旬季`);
    await makeList('Religion (meaning)', `坊聖拝誓尼崇禅僧祈寺式信仏神坊宮宗精尼霊崇`);
    await makeList('Quantity (meaning)', `少多均減半殖量額数積増加減幾弥倍輸`);
    await makeList('Plants (meaning) 3', `樹稲芝梓柴麦植根幹苺松牧果梅藤菜苗`);
    await makeList('Plants (meaning) 2', `梓麻咲柳杉竹草穂芋林粒桃梨桜森桑枯`);
    await makeList('Plants (meaning) 1', `花木枝杏莉瓜葵耕蓮柴栃栽茎椎藻楓`);
    await makeList('Plants (meaning)', `花芽桑木枝杏莉瓜葵耕蓮幹柴栃栽茎椎藻梓麻咲柳杉竹草穂芋林粒桃梨桜森樹稲芝梓柴麦植根苺松牧果梅藤菜楓枯苗`);
    await makeList('People (meaning) 3', `胡孤寡蛮叔曹雌尉宰匠賓虜奴殿彼`);
    await makeList('People (meaning) 2', `駐隣帝妃婆嬢嫁姫誰后伯凶侍哺雄`);
    await makeList('People (meaning) 1', `女子友親客氏体男主名将祖皇戚`);
    await makeList('People (meaning)', `女子友親客氏体男主名将祖皇戚駐隣帝妃婆嬢嫁姫誰后伯凶侍哺胡孤寡蛮叔曹雌尉宰匠賓虜奴殿彼雄`);
    await makeList('Movement (meaning) 2', `東後西近来道連渉荷帰宿動登追標訪渡輸躍駆到拶`);
    await makeList('Movement (meaning) 1', `搬止方出入早車路速運進泳乗返発所場通船向歩南`);
    await makeList('Movement (meaning)', `搬止方出入早車路速運進泳乗返発所場通船向歩南東後西近来道連渉荷帰宿動登追標訪渡輸躍駆到拶`);
    await makeList('Money, Commence (meaning) 2', `俸昌惜倹幣円償奪租稼賄隆雇銭税業商払盗貧購`);
    await makeList('Money, Commence (meaning) 1', `債買暮貿品資価富財値費職額株販補貯給積預`);
    await makeList('Money, Commence (meaning)', `俸昌惜倹幣円償奪租稼賄隆雇銭税業商払債買暮貿品資価富財値費職額株販補貯給積預購盗貧`);
    await makeList('Metal (meaning)', `鉄銅鋼鉄銀銅鋼鉱錬`);
    await makeList('Medical (meaning)', `医薬診症健痛害傷臓咳療菌哺遇屁`);
    await makeList('Light (meaning)', `陰`);
    await makeList('Life (meaning)', `生寿命活居存在誕産亡死暮歳逝没`);
    await makeList('Language (meaning) 2', `弁詩巻批応本簿帳冊栞条嘆喋項諮款彙`);
    await makeList('Language (meaning) 1', `語答申声読談話耳論議詞句告警書哉`);
    await makeList('Language (meaning)', `語答申声読談話耳論議詞句告警書弁詩巻批応本簿帳冊栞条嘆喋項諮款彙哉`);
    await makeList('Information, Communication, Inquire (meaning)', `糾検査調`);
    await makeList('Home, household objects (meaning)', `皿屋住家鏡席枕傘机鍵椅卓畳扉架庄寮灯荘`);
    await makeList('Food (meaning) 2', `辛餓鉢煎炊漬酵穀瓶脂沸繊餅串噛`);
    await makeList('Food (meaning) 1', `亭飴喫焼飯酢肉汁醤鍋芋豆糖麺粒`);
    await makeList('Food (meaning)', `亭飴喫焼飯酢肉汁醤鍋芋豆糖麺粒辛餓鉢煎炊漬酵穀瓶脂沸繊餅串噛`);
    await makeList('Feeling (meaning)', `情感喜歓悦嬉幸悲怒恋愛`);
    await makeList('Family (meaning)', `譜母父妹姉兄弟叔娘郎息子婿祖嬢妻婦夫孫戚姓紋`);
    await makeList('Education (meaning)', `塾習教校授師`);
    await makeList('Directions (meaning)', `北上下南左東右西底内中外横側`);
    await makeList('Crime, Justice (meaning) 2', `訴訟則囚奪懲廷拘賊窃赦拐赦`);
    await makeList('Crime, Justice (meaning) 1', `罪犯非裁律罰権義判審盗怪拉`);
    await makeList('Crime, Justice (meaning)', `罪犯非裁律罰権義判審盗怪訴訟則囚奪懲廷拘賊窃赦拐赦拉`);
    await makeList('Colors (meaning)', `色彩丹黄赤茜青紺緋蒼白黒墨緑紫明光陽暗闇紅藍`);
    await makeList('Clothing (meaning)', `絹服布着鏡脱袖靴織条装聖拝綿衣帽縫錦絹`);
    await makeList('Built Structures (meaning)', ``);
    await makeList('Body (meaning) 2', `体腕鼻頭脇口髪足眉腰目眼膝指耳胸脳心歯肝唇胎腺`);
    await makeList('Body (meaning) 1', `胃腹爪臓肌皮膚手骨髄筋血股脚息肺尻顔肩舌胴呂腎`);
    await makeList('Body (meaning)', `胎体腕股鼻頭臓脇口髪足呂眉腰胴唇目眼膝脚指耳胸脳心手胃肝腹歯舌爪肌皮膚骨髄筋血息肺尻顔肩腺腎`);
    await makeList('Animals (meaning) 2', `鮭犬毛蟹鰐蛇畜蚊騎魚翼鳩猿匹竜釣卵熊狩狐亀甲餌駒`);
    await makeList('Animals (meaning) 1', `虫貝牛羊鳥鳴狼猫象漁獣虎蛍豚鯉隼烏蝶鯨鶏尾牙鹿`);
    await makeList('Animals (meaning)', `蜂獣鮭毛餌犬蟹鰐蛇畜蚊騎魚翼鳩猿尾匹竜釣卵熊狩虫貝牛羊駒鳥鳴狼猫象漁虎蛍豚鯉隼烏蝶鯨鶏狐牙鹿亀甲`);    
    await makeList('JLPT (extra Jouyou)', jlpt['none']);
    await makeList('JLPT N1', jlpt[1]);
    await makeList('JLPT N2', jlpt[2]);
    await makeList('JLPT N3', jlpt[3]);
    await makeList('JLPT N4', jlpt[4]);
    await makeList('JLPT N5', jlpt[5]);
    
    await makeList('WaniKani 01', `上口川女二三十七力九一人下大工八入山`);
    await makeList('WaniKani 02', `玉了水文円白月木千刀丁小日立六右々田左中才王手天五四火出目本犬夕土正丸子`);
    await makeList('WaniKani 03', `矢市牛切方戸太父少友毛半心内生台母午北今古元外分公引止用万広冬`);
    await makeList('WaniKani 04', `竹車央写仕耳早気平花足打百氷虫字男主名不号他去皿先赤休申見貝石代礼糸町宝村世年`);
    await makeList('WaniKani 05', `角斤青体色来社当図毎羽林行金草里作多肉会交近兄雨米走同言自形皮空音学光考回谷声西何麦弟`);
    await makeList('WaniKani 06', `全後血両明京化国科死亡画地東食直前有私知活長曲首次夜姉点安室海羊店南星州茶思歩向妹`);
    await makeList('WaniKani 07', `辺付札鳥黒船必末氏失魚以組家欠未紙通民理由校雪強夏高教時弱週風記黄`);
    await makeList('WaniKani 08', `答反君局買雲楽数決絵住電森助馬間場医朝番所池究道役研身者支話投対`);
    await makeList('WaniKani 09', `受事美予服度発定談表客重持負相要新部和県保返乗屋売送苦泳仮験物具実試使勝界`);
    
    await makeList('WaniKani 10', `進酒始業算運漢鳴集配飲終顔落農速頭聞院調鉄語葉習軽線最開頁親読求転路病横歌起`);
    await makeList('WaniKani 11', `功成岸競争便老命指初味追神良意労級好昔低育令拾注利位仲放秒別特共努伝戦波洋働`);
    await makeList('WaniKani 12', `悪息章登寒深倍勉消祭野階庭港暑湯僕島童員商都動第期植根短球泉流合陽歯族旅待温着`);
    await makeList('WaniKani 13', `皆謝整橋選想器暗疑料感情様養緑熱億殺宿福鏡然詩練賞問館映願士課標銀駅像題輪`);
    await makeList('WaniKani 14', `能芸術雰骨束周協例折基性妥卒固望材参完松約残季技格苺頑囲的念希狼`);
    await makeList('WaniKani 15', `紀軍秋信岩仏建猫変晴築勇泣司区英丈夫飯計法晩昼毒昨帰式列浅単坂春寺`);
    await makeList('WaniKani 16', `浴箱係治危冒留弁証存面遠園門府幸阪急笑荷政品守辞真関険典専冗取曜書`);
    await makeList('WaniKani 17', `是結底因詳識劇干敗渉果官署察堂幻非愛薬覚常鼻無原栄喜恋悲塩席側兵説細梅虚警`);
    await makeList('WaniKani 18', `告達焼借弓脳飴胸喫等枚忘苛訓種報句許可祈僧禁静座煙汽叩喉類洗禅`);
    await makeList('WaniKani 19', `得加冊履忙閥布比歴続減易絡笛容団史昆徒宙混善順宇詞改乱節連舌暴財若`);
    
    await makeList('WaniKani 20', `裕尻確械犯害議難災嫌困夢震在飛産罪穴被個機妨倒経率圧防臭余尾論厚妻`);
    await makeList('WaniKani 21', `責条済委省制批断任素敵羨設評検岡増査審判件際企挙認資義権派務税解総`);
    await makeList('WaniKani 22', `援態誕状賀各費姿勢諦示寝営坊罰策案提置域応宮袖吸過領脱統価値副観藤`);
    await makeList('WaniKani 23', `呼崎施城護鬼割職秀俳停宅痒裁律導革贅乳収演現備則準規張優沢師幹看`);
    await makeList('WaniKani 24', `庁額腕境燃担祝届違差象展層視環製述武型狭管載質量販供肩株触輸腰`);
    await makeList('WaniKani 25', `慣居逮票属捕捉候輩況響効莫抜鮮満与掛隠模含訟限肥豊替景巻捜構影絞訴補渡`);
    await makeList('WaniKani 26', `接再独獣菓討故較創造励激占障我徴授往鉛郵針従豚復河貯印振刺突怪汗筆`);
    await makeList('WaniKani 27', `怒昇迷招腹睡康端極郎健誘貸惑痛退途給就靴眠暇段胃症濃締迫訪織悩屈`);
    await makeList('WaniKani 28', `攻撃浜綺益児憲冷処微修博程絶凍巨稚幼並麗奇衆潔清録逆移精隊庫妙券傘婦`);
    await makeList('WaniKani 29', `略積添寄宴板壊督僚杯娘診乾欧恐猛江韓雄航監宗請怖索臣催街詰緊閣促烈`);

    await makeList('WaniKani 30', `更魅背騒飾預版柵旗浮越照漏系覧婚懐撮枕遊快貧延押乏匂盗購適翌渇符濡`);
    await makeList('WaniKani 31', `帯廊離径融均豪除貨孫墓幾尋編陸探鑑泥巣普棒粉既救似富散華嘆偵驚掃菜脈徳倉`);
    await makeList('WaniKani 32', `酸賛祖銭込衛机汚飼複染卵永績眼液採志興恩久党序雑桜密秘厳捨訳欲暖迎傷`);
    await makeList('WaniKani 33', `灰装著裏閉股垂漠異皇拡屁暮忠肺誌操筋否盛宣賃敬尊熟噂砂簡蒸蔵糖納諸窓`);
    await makeList('WaniKani 34', `豆枝揮刻爪承咳幕紅歓降奴聖推臓損磁誤源芋純薦丼腐沿射縮隷粋痩吐貴縦勤拝`);
    await makeList('WaniKani 35', `熊噌彫杉喋銅舎酔炎彼紹介湖講寿測互油己払鍋獄戚為恥遅汁醤滞剣破亀厄酢`);
    await makeList('WaniKani 36', `諾盟将舞債伎鹿換姓牙旧般津療継遺維奈核廃献沖摘及依縄鮭踏伸甘貿頼超幅`);
    await makeList('WaniKani 37', `患狙陣塁弾葬抗崩遣掲爆眉恵漁香湾跳抱旬聴臨兆契刑募償抵戻昭串闘執跡削`);
    await makeList('WaniKani 38', `伴齢宜噛賂賄房慮託却需璧致避描刊逃扱奥併膝傾緩奏娠妊贈択還繰抑懸称緒盤`);
    await makeList('WaniKani 39', `控宛充渋岐埋鈴埼棋囚譲雇免群枠銃仙邦御慎躍謙阜片項斐隆圏勧拒稲奪鋼甲壁祉`);

    await makeList('WaniKani 40', `拉敏吹唱衝戒兼薄堀剤雅孝頻駆俊嬉誉茂殿殖隣麺繁巡柱携褒排駐顧犠獲鋭敷妖透`);
    await makeList('WaniKani 41', `棄凄至拠蜂儀炭衣潜偽畑蛍拳郷蜜仁遜侵嘘鉱喧伺徹瀬嘩墟酎措誠虎艦撤樹包`);
    await makeList('WaniKani 42', `析弧到軸綱挑焦掘紛範括床握枢揚潟芝肝餅喪網克泊双柄哲斎袋揺滑堅暫糾荒`);
    await makeList('WaniKani 43', `襲沼朗摩趣懲慰懇筒滅距籍露炉柔擦琴垣即威滋牧泰旨刷珍封斉沈撲裂潮貢誰`);
    await makeList('WaniKani 44', `刃缶砲笠竜拶縁忍釣吉粒髪丘俺斗寸桃梨姫挨娯謎侍叱棚叫匹辛芽嵐涙雷塔朱翼`);
    await makeList('WaniKani 45', `頃菌鐘舟嫁暦曇也塾呪湿稼疲翔賭霊溝狩脚澄塊狂嬢裸岳磨陰肌魂矛眺硬卓凶滝井`);
    await makeList('WaniKani 46', `墨瞬泡穏孔椅菊涼綿魔寮鳩鈍鍛碁癖穂吾鍵盆庄猿棟誇瞳寧俵幽架黙斬帝租錬阻歳零`);
    await makeList('WaniKani 47', `幣箸瞭崖炊粧墜欺滴塀霧扇扉恨帽憎佐挿伊詐如唇掌婆哀虹爽憩煎尺砕粘畳胴巾芯柳`);
    await makeList('WaniKani 48', `遂蓄脇殴咲鉢賢彩隙培踊闇斜尽霜穫麻騎辱灯畜溶蚊帳塗貼輝憶悔耐盾蛇班餓飢迅脅`);
    await makeList('WaniKani 49', `概拘煮覆駒悟慌謀鶴拓衰奨淡礎陛浸劣勘隔蹴桑尼珠抽壇陶妃刈紫唯剛征誓俗潤`);

    await makeList('WaniKani 50', `偶巧鰐把駄洞伯唐彰諮廷蟹晶堰漂淀堤后疫翻鬱涯銘仰漫簿亭訂壮軌奮峰墳搬邪`);
    await makeList('WaniKani 51', `又肯浦挟沸瓶召貞亮襟隅郡燥釈脂偉軒蓮慈塚玄肪耕媛邸喚苗隻膚軟郊頂濯渦聡枯`);
    await makeList('WaniKani 52', `祥呂偏茨陥鎖賠恒綾没擁遭噴殊倫陳隼乃輔猟唆惰怠覇須牲秩孤芳貫糧颯慢膨遇`);
    await makeList('WaniKani 53', `諭随胡搭錦鯉胞浄帥諒蒙曙惨稿啓披繊徐葵騰据莉緯瓜虐戴艇丹緋准舗壌駿剰寛`);
    await makeList('WaniKani 54', `庶且顕杏栞欄冠酷叙逸紋阿愚尚拐悠勲疎謡哺栽践呈傲疾茜酬呆鎌粛茎痴荘鯨卸`);
    await makeList('WaniKani 55', `累伏虜循粗凝栓瑛旦奉遼郭抹佳惜憂悼癒栃龍弥髄勿傍愉赴昌憾朴脊該之鎮尿賓那`);
    await makeList('WaniKani 56', `匠拍縛飽柴蝶弦凛庸錯轄悦窮嘉弊遥洪紳呉穀摂寂宰陵凡尉靖恭縫舶搾猶窒碑智`);
    await makeList('WaniKani 57', `盲醸凹弔凸烏敢堕鼓衡伐酵閲遮腸瑠乙楓膜紺蒼漬哉峡賊旋俸喝羅萌槽坪遍胎`);
    await makeList('WaniKani 58', `陪扶迭鶏瑞暁剖凌藩譜璃淑傑殻錠媒濁椎赦戯享嘱肖憤朽奔帆菅酌慨絹窃硫`);
    await makeList('WaniKani 59', `亜屯岬鋳拙詠慶酪篤侮堪禍雌睦胆擬梓漆閑憧卑姻忌曹峠吟礁沙蔑汰紡遷叔甚浪崇`);

    await makeList('WaniKani 60', `煩款蛮廉劾某矯痢逝狐漸升婿匿謹藍桟殉坑罷妄漣藻泌唄畔倹拷醜冥渓湧寡慕`);



    await makeList('* Most common 01 (Numbers)', `一二三四五六七八九十百千万億零`);
    await makeList('* Most common 02', `木言月口方糸女貝日車土寸己且反者心王少`);
    await makeList('* Most common 03', `良工田干由白支寺正毎立易召十各丁力羊斤`);
    await makeList('* Most common 04', `石未台子兼古舌主皮谷可青包同責兆奇束分`);
    await makeList('* Most common 05', `馬昔金足非牛皆肖尺交余米童曽旦大失火欠`);
    await makeList('* Most common 06', `里直亡天某因市又生至兄戸歩中官果早及屯`);
    await makeList('* Most common 07', `岡合豆意平令重固付食巨呉赤区予呂牙斉共`);
    await makeList('* Most common 08', `叔目更公行申東竹刀占化周成司義元半相今`);
    await makeList('* Most common 09', `士家羽比永原則朝京炎票林既才奉泉定吉売`);

    await makeList('* Most common 10', `充帝示音免真単矢軍秀巾式旨川玉祭玄能本`);
    await makeList('* Most common 11', `業列建広是屈次求孝舎員見虫太斬甘不辛一`);
    await makeList('* Most common 12', `文央耳布景弓折告志若延番奴郎般甲動害疑`);
    await makeList('* Most common 13', `九自章藍手出鬼疾舟去先昆度農兵尼夜魚替`);
    await makeList('* Most common 14', `頼骨戻登竜容争勇帯利加黄全曹戒幾朱冊走`);
    await makeList('* Most common 15', `氏会冬内宿従善致亀専色水貫参卓感具止首`);
    await makeList('* Most common 16', `入貴孫庶尊射斥迷午忍普雨客属契鳥宛要却`);
    await makeList('* Most common 17', `穴賞山到需象亭憂以貞衣為二表左犬放曲乗`);
    await makeList('* Most common 18', `倉亜串徴尉刃秋呈多必恵高段名寿畜壮監何`);
    
    await makeList('* Most common 19', `楽右新委句友受最屋察空居末考処念虚発廷`);
    await makeList('* Most common 20', `完間即旬波安矛冒夕思胃男七升雲卑禁知有`);
    await makeList('* Most common 21', `代任夫取介量路務維灰風井人巻身道卸盾父`);
    await makeList('* Most common 22', `留制角妻百征切丸門就宗復毛然暴異民我村`);
    await makeList('* Most common 23', `南黒孔幸三君享長昭前将析片守州星`);

    await deleteUnusedLists();

    let counts = Object.entries(pairCounts);
    //console.log(counts);
    counts.sort((a, b) => { return b[1] - a[1]; });
    for (let count of counts) {
        console.log(count[0], count[1]);
    }
}

async function deleteUnusedLists() {
    let lists = await db('list').select();
    //console.log(lists);
    for (let list of lists) {
        if (!listNames.has(list.name)) {
            await deleteList(list);
        }
    }
}

var jlpt = {
    5: `一二九七人入八十三上下大女山川土千子小中五六円天日月木水
        火出右四左本白万今午友父北半外母休先名年気百男見車毎行西何
        来学金雨国東長前南後食校時高間話電聞語読生書`,
    4: `力口工夕手文犬正田目立元公切少心方牛止兄冬古台広用世主代写去
        字早町花赤足不仕会同多考肉自色体作図売弟社言走近空青音地安有死京
        夜妹姉店明歩画知室思海茶以夏家紙通強教理週魚鳥黒住医究者研場朝答
        買道楽事使始服物屋度待持界発送重起院終習転運開集飲業漢歌親病別注
        洋特意味勉旅員動悪族着野風新問銀題館駅料映私帰春昼秋計建英飯曜品
        急真堂試借験質貸`,
    3: `才王石内太引市他号平打申礼耳交光回当米声形草化両全向曲次直活
        点科首欠由民付失必未末記組船雪支助君対局役投決馬番絵数所具受和定実
        泳苦表部乗客相美負談要勝速配酒進落葉路鳴横調頭顔最争伝共好成老位初
        利努労命放昔育指神追戦良便働庭息流消都商深球陽寒悲期歯港登亡合予反
        返宿想感暗様福殺然熱選願情疑皆例参完念折望束残求約性格能術晴列式信
        単変夫昨法晩猫園遠係取守幸箱面喜治笑辞関政留険危存原薬側席敗果因常
        識非官察愛警覚説告種達類報等座忘洗許静煙加容易財若忙徒得続連困機飛
        害余難確在夢産倒妻議犯罪論経済判制務資権件断任責増解際認過寝置費示
        観値吸状収職規割演師備優宅現呼違差供限与渡景抜候構捕慣満掛居突招段
        腹痛退迷訪怒眠靴途給冷処婦程精絶杯積寄娘怖恐婚遊貧適押更浮越背盗除
        幾散似富探迎祖雑賛込欲閉窓否暮誤降勤刻遅破互彼恥払舞頼戻抱緒逃御吹
        到髪疲歳偶偉頂`,
    2: `了丸玉久戸毛央氷皮皿竹糸虫村貝池羽角谷麦林州血星札辺弱黄森雲
        県軽農鉄算線仲低岸波拾秒競令根倍島祭章童階植温湯短泉橋緑練億課賞輪
        像卒協周囲固季希材芸技骨寺岩区坂勇毒浅軍仏築門荷府浴専細鼻兵塩栄干
        底署恋訓祈焼胸脳枚禁喫減順布詞歴冊宇団暴混乱改絡比被震械個圧厚防史
        委査総設省税各勢営領副域停革律準則導乳城担額輸燃祝届肩腕腰触層型庁
        管象量境武述販含況補効豊巻捜替造印復筆貯刺郵針菓河汗再接占胃悩昇濃
        極逆巨庫児凍幼清録券移並乾欧臣略航板詰照快版預延翌符編普掃泥棒孫帯
        粉菜貨陸均採永液績複党卵捨汚机簡誌宝尊敬灰砂著蒸蔵装裏諸臓純紅拝劇
        承損枝測講紹介湖銅油旧姓貿将伸幅甘換療般依漁募患湾爆跡香兆齢刊傾奥
        贈超雇片群埋駐柱鋭殿薄伺炭包衣鉱双床掘泊荒袋珍籍刷封筒柔沈辛匹叫涙
        缶粒塔肌舟曇磨湿硬鈍涼零綿帽憎滴畳畜溶踊賢灯咲塗召挟枯沸濯燥瓶耕肯
        脂膚軒軟郊隅隻`,
    1: `刀丁又矢羊氏仮級功第暑整詩器士標鏡養謝松基妥雰頑司泣紀典保弁
        証冒冗梅結是渉虚幻弓汽僧禅句節昆閥舌宙履善災率妨裕尾嫌臭穴笛敵挙派
        素評批検審条企義罰誕脱宮案価統策藤姿応提援態賀鬼護裁崎看幹張沢施俳
        秀製狭載視環展株影響票訴訟逮模鮮属肥絞輩隠授創往較鉛故障従我激励討
        徴怪獣振豚独屈暇織惑誘就睡症締迫端健康郎稚博潔隊修奇妙麗微益憲衆傘
        浜撃攻監催促江請雄壊診閣僚督街宗緊宴添猛烈索詳魅渇系旗乏覧懐漏購飾
        騒撮離融華既豪鑑尋廊驚嘆倉巣径救脈墓徳偵序志恩桜眼興衛酸銭飼傷厳密
        暖秘訳染筋垂宣忠拡操熟異皇盛漠糖納肺賃貴吐奴隷芋縮縦粋聖磁射幕薦推
        揮沿源歓豆腐彫舎滞己厄亀剣杉汁炎為熊獄酔酢盟遺債及奈廃摘核沖縄津献
        継維伎踏鹿諾跳昭償刑執塁崩抗抵旬弾聴遣闘陣臨削契恵掲葬需宜繰避妊娠
        致奏伴併却慮懸房扱抑択描盤称緩託賄還邦鈴岐隆控壁棋渋仙充免勧圏奪慎
        拒枠甲祉稲譲謙躍銃項鋼顧駆唱俊兼剤堀巡戒排携敏敷犠獲茂繁頻殖衝誉褒
        透隣雅徹瀬撤措拠儀樹棄虎蛍艦潜拳仁至誠郷侵偽克哲喪堅括弧挑揚握揺斎
        暫析枢軸柄滑潟焦範紛糾綱網肝芝裂襲貢趣距露牧朗潮即垣威岳慰懇懲摩擦
        撲斉旨沼泰滅滋炉琴寸竜縁翼吉刃忍桃侍娯斗朱丘梨僕釣嵐姫棚砲雷芽澄矛
        鐘凶塊狩魂脚井嬢暦眺裸塾卓菌陰霊稼嫁溝滝狂墨穏魔寮盆棟寧猿瞳碁租幽
        泡癖鍛錬穂帝瞬菊誇阻黙俵架砕粘欺詐霧柳佐尺哀唇塀墜如婆幣恨憩扇扉挿
        掌炊爽瞭胴虹帳蚊蛇辱鉢霜飢餓迅騎蓄尽彩憶耐輝脅麻培悔遂班斜殴盾穫駒
        紫抽誓悟拓拘礎鶴刈剛唯壇尼概浸淡煮覆謀陶隔征陛俗桑潤珠衰奨劣勘妃峰
        巧邪駄廷簿彰漫訂諮銘堤漂翻軌后奮亭仰伯墳壮把搬晶洞涯疫孔邸郡釈肪喚
        媛貞玄苗渦慈襟浦塚陥貫覇呂擁孤賠鎖噴祥牲秩唆膨芳恒倫陳須偏遇糧殊慢
        没怠遭惰猟寛胞浄随稿丹壌舗騰緯艇披錦准剰繊諭惨虐据徐搭帥啓鯨荘栽拐
        冠勲酬紋卸欄逸尚顕粛愚庶践呈疎疾謡鎌酷叙且痴茎悠伏鎮奉憂朴惜佳悼該
        赴髄傍累癒郭尿賓虜憾弥粗循凝旦愉抹栓那拍猶宰寂縫呉凡恭錯穀陵弊舶窮
        悦縛轄弦窒洪摂飽紳庸搾碑尉匠賊鼓旋腸槽伐漬坪紺羅峡俸醸弔乙遍衡款閲
        喝敢膜盲胎酵堕遮凸凹瑠硫赦窃慨扶戯忌濁奔肖朽殻享藩媒鶏嘱迭椎絹陪剖
        譜淑帆憤酌暁傑錠璃遷拙峠篤叔雌堪吟甚崇漆岬紡礁屯姻擬睦閑曹詠卑侮鋳
        胆浪禍酪憧慶亜汰沙逝匿寡痢坑藍畔唄拷渓廉謹湧醜升殉煩劾桟婿慕罷矯某
        囚泌漸藻妄蛮倹壱韻謁艶旺翁箇嚇褐棺斤虞薫侯墾采蚕嗣肢賜爵儒愁遵宵抄
        硝詔薪畝斥繕塑但逐嫡衷勅朕逓痘謄弐頒眉賦附丙倣繭耗冶窯濫吏厘楼朋`,
    'none': `分里身的阪無可尻岡坊韓枕丼爪寿鍋牙狙賂阜埼孝遜蜂酎蜜畑誰謎
        俺叱頃呪賭斬椅鍵粧崖箸芯貼闇隙脇巾丈唐鬱茨戴哺傲栃脊蔑挨宛畏萎咽淫
        臼餌怨臆苛蓋骸柿顎葛釜瓦玩畿僅串窟稽詣桁舷股乞勾喉慌梗痕挫塞柵拶
        璽嫉腫蹴拭腎裾凄醒戚煎羨腺詮膳曽遡痩捉袖唾堆綻捗潰諦溺妬頓匂捻罵
        剥斑氾汎膝肘蔽貌勃昧冥麺餅妖沃侶弄麓刹喩嗅嘲毀彙恣惧慄憬拉摯曖楷
        璧瘍箋籠緻羞訃諧貪踪辣錮塡頰`
}


function printLevelJLPT(level) {
    str = '';
    for (let card of kanjiCards) {
        console.log(card.jlpt);
        if (card.jlpt === level) {
            str += card.character;
        }
    }
    console.log(str.length, str);
}