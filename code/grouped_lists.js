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

async function permanentList(name, kanji) {
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
    await addCardsToList(targetList, cards);
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
        if (!found) {
            kanjiNotPresent.add(ch);
            //console.log(ch);
        } else {
            kanjiPresent.add(ch);
        }
    }
    return uuids;
}

async function makeGroupedLists() {
    await permanentList('Yoga', `庭建誕健延鍵廷艇`, `延正,廷王`);
    await permanentList('Yakuza(left)', `死残列殖殊殉`, `殖直,殉旬`);
    await permanentList('Wrap', `包抱砲泡胞飽`, `砲石,胞月,飽食`);
    await permanentList('Woman (bottom)', `女安要妥妻委姿妄婆`, `姿次,妄亡,婆波`);
    await permanentList('Woman (left) 2', `妊娠嬉妖姫娯嫁嬢如妃媛媒姻婿嫡`, 
            `妊王,嬉喜,妖天,姫巨,娯呉,嫁家,如口,妃己,媒某,姻因`);
    await permanentList('Woman (left) 1', `女姉妹始好嫌妨妙婦娘婚奴姓妬嫉`, 
            `姉市,妹未,始台,好子,嫌兼,妨方,妙少,娘良,奴又,姓生,妬石,嫉疾`);
    await permanentList('Woman (left)', `女姉妹始好嫌妨妙婦娘婚奴姓妊娠妬嫉嫡嬉妖姫娯嫁嬢如妃媛媒姻婿`,
            `妊王,嬉喜,妖天,姫巨,娯呉,嫁家,如口,妃己,媒某,姻因,
            姉市,妹未,始台,好子,嫌兼,妨方,妙少,娘良,奴又,姓生,妬石,嫉疾`);
    await permanentList('Winter (right) 2', `微救散敬致敏敷徹撤牧傲赦`,
            `救求,致至,敏毎,牧牛,赦赤`);
    await permanentList('Winter (right) 1', `教数放政敗枚改敵故激徴敢`,
            `教孝,放方,政正,敗貝,枚木,改己,故古`);
    await permanentList('Winter (right)', `教数放政敗枚改敵故激徴攻微救散敬致敏敷徹撤牧傲敢赦`,
            `救求,致至,敏毎,牧牛,赦赤,教孝,放方,政正,敗貝,枚木,改己,故古`);
    await permanentList('Wind', `嵐颯楓風`, `颯立,楓木`);
    await permanentList('White', `白楽習線階泉皆的激迫皇泊綿伯錦拍舶`,
            `習羽,線糸,階皆,皆比,皇王,舶舟`);
    await permanentList('Wedding', `哺舗輔浦補捕`, `哺口,舗舎,輔車`);
    await permanentList('Well', `囲丼井耕`, `囲,丼,井,耕`);
    await permanentList('Weapon (right)', `役投殺設段股般殿鍛殴搬没穀殻毀`,
            `役,投,殺,設,段,股,般,殿,鍛,殴,搬,没,穀,殻,毀`);
    await permanentList('Walk', `渉頻歩`, `頻頁`);
    await permanentList('Village', `里理野童量裏埋鐘瞳黙糧鯉憧`,
            `理王,野予,童立,埋土,鯉魚`);
    await permanentList('Vikings (left)', `学労賞堂覚常栄営党蛍掌`,
            `学子,労力,賞員,覚見,栄木,営呂,党兄,蛍虫`);
    await permanentList('Umbrella (right)', `礼札乱乳孔`, `札木,乱舌,孔子`);
    await permanentList('Turkey (right)', `難稚雄離雑推維雅誰唯准椎雌`,
            `維糸,雅牙,誰言,唯口,椎木`);
    await permanentList('Turkey', `隹進集曜確難権観護準稚雄催離雑歓推維雇躍勧奪雅携獲焦誰穫鶴唯奮隻濯擁隼准羅椎雌礁`,
            `集木,維糸,雇戸,雅牙,誰言,唯口,隻又,隼十,椎木`);
    await permanentList('Tsunami (left) 4', `活海決池泳酒漢注波洋深消港湯流温泣法浅浴治渉汽洗減混済氾汎`,
        `活舌,海毎,池也,泳永,注主,波皮,洋羊,消肖,
        湯易,泣立,法去,浴谷,治台,渉歩,洗先,混昆,済斉`);
    await permanentList('Tsunami (left) 3', `沢況満渡激河汗濃浜清潔添江浮漏渇濡泥汚染液漠源沿湖測油恣濫溺`,
        `沢尺,況兄,渡度,河可,汗干,濃農,浜兵,清青,江工,
        濡需,泥尼,液夜,漠莫,源原,湖胡,測則,油由`);
    await permanentList('Tsunami (left) 2', `
        漁湾渋潜瀬潟泊滑沼滅滋沈潮涙湿溝澄滝泡涼滴溶淡浸潤洞漂淀涯潰`,
        `漁魚,潜替,瀬頼,泊白,滑骨,沼召,潮朝,涙戻,
        澄登,滝竜,泡包,涼京,溶容,淡炎,洞同,漂票,淀定`);
    await permanentList('Tsunami (left) 1', `漫浦沸濯渦没浄洪漬淑濁漆沙汰浪漸漣泌渓湧汁滞津沖派演準沃淫`,
        `浄争,洪共,漬責,淑叔,沙少,汰太,
        浪良,漸斬,漣連,泌某,湧勇,汁十,滞帯,沖中,沃天`);
    await permanentList('Tsunami (left)', `
        活海決池泳酒漢注波洋深消港湯流温泣法浅浴治渉汽洗減混済派演準淫潰溺
        沢況満渡激河汗濃浜清潔添江浮漏渇濡泥汚染液漠源沿湖測油汁滞津沖
        漁湾渋潜瀬潟泊滑沼滅滋沈潮涙湿溝澄滝泡涼滴溶淡浸潤洞漂淀涯
        漫浦沸濯渦没浄洪漬淑濁漆沙汰浪漸漣泌渓湧沃濫恣氾汎`,
        `活舌,海毎,池也,泳永,注主,波皮,洋羊,消肖,
        湯易,泣立,法去,浴谷,治台,渉歩,洗先,混昆,済斉,沢尺,況兄,渡度,河可,汗干,濃農,浜兵,清青,江工,
        濡需,泥尼,液夜,漠莫,源原,湖胡,測則,油由,漁魚,潜替,瀬頼,泊白,滑骨,沼召,潮朝,涙戻,
        澄登,滝竜,泡包,涼京,溶容,淡炎,洞同,漂票,淀定,浄争,洪共,漬責,淑叔,沙少,汰太,
        浪良,漸斬,漣連,泌某,湧勇,汁十,滞帯,沖中,沃天`);
    await permanentList('Triceratops', `半当光消削鎖尚肖`, `半干,肖月`);
    await permanentList('Tree (top)', `木森査杏奇`, `森林,査且,杏口,奇可`);
    await permanentList('Tree (bottom)', `木某楽集葉築栄案菜染柔梨架桑栞呆柴`,
            `某甘,案安,柔矛,梨利,架加,呆口`);
    await permanentList('Tree (left) 3', `桜枝杉核棋枠柱樹析枢柄桃木林札校相横植根橋様`,
            `枝支,柱主,析斤,枢区,桃兆,
            校交,相目,横黄,植直,根良`);
    await permanentList('Tree (left) 2', `棚椅棟柳概枯欄栓栃朴楓槽椎朽梓桟机楷梗棺村標`,
            `椅奇,棟束,概既,枯古,栓全,楓風,槽曹,
            梓辛,楷皆,梗更,棺官,村寸,標票`);
    await permanentList('Tree (left) 1', `材松格梅枚械機検権株模構極板杯柵枕棒楼柿桁`,
            `材才,松公,格各,梅毎,械戒,機幾,株朱,模莫,
            板反,杯不,柵冊,柿市,桁行`);
    await permanentList('Tree (left)', `
        木林札校相横植根橋様標材松格梅枚械機検権株模構極板杯柵枕棒机楼楷柿梗棺桁村
        桜枝杉核棋枠柱樹析枢柄桃棚椅棟柳概枯欄栓栃朴楓槽椎朽梓桟`,
        `枝支,柱主,析斤,枢区,桃兆,校交,相目,横黄,植直,根良,
        椅奇,棟束,概既,枯古,栓全,楓風,槽曹,梓辛,楷皆,梗更,
        棺官,村寸,標票,材才,松公,格各,梅毎,械戒,機幾,株朱,模莫,
        板反,杯不,柵冊,柿市,桁行`);
    await permanentList('Treasure chest', `脳胸悩凶`, ``);
    await permanentList('Triangle (top)', `命令会全今貪舎倉傘`, `全王`);
    await permanentList('Trash', `育流棄徹撤硫`, `育月,棄果`);
    await permanentList('Towel', `希帯巾帽幣帰`, `帽冒`);
    await permanentList('Tongue', `活話辞乱舌括憩`, `活舌,話言,辞辛`);
    await permanentList('Tombstone', `軽経怪径茎`, `軽車,経糸`);
    await permanentList('Tiger', `劇虞虚慮嘘墟虎膚虐虜戯`, `虞呉,慮思,膚胃,虜男`);
    await permanentList('Thread', `糸係素潔索緊繁紫累`, `累田`);
    await permanentList('Thread (left) 3', `糸組紙絵終線級緑編績納紅純縮縦紹継紡繕緻`,
            `組且,紙氏,絵会,終冬,線泉,級及,績責,納内,紅工,純屯,縮宿,縦従,紹召,紡方,繕善,緻致`);
    await permanentList('Thread (left) 2', `維縄緩繰緒綱紛網糾縁綿綾繊緯緋紋縛紳綻`,
            `縄亀,緒者,綱岡,紛分,緋非,紋文,縛専,紳申,綻定`);
    await permanentList('Thread (left) 1', `練約紀結細続絡経総統絞給締織綺絶縫紺絹`,
            `練東,約勺,紀己,結吉,細田,続売,絡各,統充,絞交,給合,締帝,綺奇,絶色,紺甘`);
    await permanentList('Thread (left)', `
        糸組紙絵終線級緑編績納紅純縮縦紹継紡維縄緩繰緒綱紛網糾縁綿繕緻
        綾繊緯緋紋縛紳綻練約紀結細続絡経総統絞給締織綺絶縫紺絹`,
        `組且,紙氏,絵会,終冬,線泉,級及,績責,納内,紅工,純屯,縮宿,
         縦従,紹召,紡方,繕善,緻致,縄亀,緒者,綱岡,紛分,緋非,紋文,縛専,紳申,綻定,
         練東,約勺,紀己,結吉,細田,続売,絡各,統充,絞交,給合,締帝,綺奇,絶色,紺甘`);
    await permanentList('Tent (top)', `発登祭`, `登豆,祭示`);
    await permanentList('Temple (right)', `時持特待詩寺侍`, `時日,特牛,詩言`);
    await permanentList('Task', `用角通備再痛踊猟`, ``);
    await permanentList('Table', `風冗処航机抗拠肌飢凡殻帆坑`, `机木,肌月,飢食`);
    await permanentList('Sword', `刀刃切分辺成初留喫解潔券貿契蟹拐瑠窃寡`, `切七`);
    await permanentList('Suit', `答拾合給塔搭`, `答竹,給糸`);
    await permanentList('Sun (left)', `日明時暗映晴晩昨暇暖昭曙暁曖昧旺`,
            `明月,時寺,暗音,映央,晴青,晩免,昭召,曙署,暁尭,昧未,旺王`);
    await permanentList('Sun (bottom)', `日百音者昔暑春書替普暮曽香暫旨昌智曹`,
            `音立,暮莫,暫斬,旨,昌日,智知`);
    await permanentList('Sun (top)', `日早星最冒暑是昆暴景昇曇晶昌易旦`,
            `早十,星生,冒目,暑者,是正,昆比,景京,昇升,曇雲,昌日,易勿,旦一`);
    await permanentList('Stop', `正止歩歯歴企武渋祉歳紫肯卸柴雌`, `歩少,紫糸,肯月`);
    await permanentList('Stool (right)', `取収奴双又叙淑叔`, `取耳,奴女,叙余`);
    await permanentList('Stool', `友反受度努最報督緊騒痩獲侵堅浸桑又隻慢寂趣文岐斉支`,``);
    await permanentList('Stone (left)', `石研確砂磁破砲硬砕礎碑硝硫礁`,
            `砂少,破皮,砲包,硬更,碑卑,硝肖`);
    await permanentList('Stand 2', `端締翌拉笠粒鐘瞳帝颯傍靖憧辛竜産商`,
            `翌羽,笠竹,粒米,颯風,靖青`);
    await permanentList('Stand 1', `立音新顔親競位章童商暗鏡泣韻産諦境接`,
            `音日,章早,童童,諦帝`);
    await permanentList('Stand', `立音新顔親競位章童商暗鏡泣韻産諦境接端締翌拉笠粒鐘瞳帝颯傍靖憧辛竜産商`,
        `翌羽,笠竹,粒米,颯風,靖青,音日,章早,童童,諦帝`);
    await permanentList('Squid', `験険検剣倹`, `験馬,検木`);
    await permanentList('Spring', `実寒春棒寿奏泰奉俸`, `春日,寿寸,奏天,泰水,奉干`);
    await permanentList('Spikes', `業虚並嘘湿霊繊顕戯`, ``);
    await permanentList('Soul (left) 2', `情性忙慣怪悩怖懐快慎恨憎憶悔慄憬`,
            `情青,性生,忙亡,慣貫,怖布,慎真,憎曽,憶意,悔毎,憬景`);
    await permanentList('Soul (left) 1', `悟慌恒惰慢惨惜悼愉憾悦憤慨憧惧`,
            `悟吾,惨参,惜昔,悼卓,憾感,慨既,憧童,惧具`);
    await permanentList('Soul (left)', `情性忙慣怪悩怖懐快慎恨憎惧慄憬憶悔悟慌恒惰慢惨惜悼愉憾悦憤慨憧`,
            `情青,性生,忙亡,慣貫,怖布,慎真,憎曽,憶意,悔毎,憬景,
            悟吾,惨参,惜昔,悼卓,憾感,慨既,憧童,惧具`);
    await permanentList('Someone', `者暑都署著諸緒賭箸煮曙`,
            `者,暑,都,署,著,諸,緒,賭,箸,煮,曙`);
    await permanentList('Spirit (left)', `礼裾社初神福祈禅裕被袖祝褐視補祖複祉裸襟祥禍`,
            `礼,裾,社,初,神,福,祈,禅,裕,被,
            袖,祝,褐,視,補,祖,複,祉,裸,襟,祥,禍`);
    await permanentList('Slice', `劾該核咳刻`, `劾力,該言,核木,咳口`);
    await permanentList('Skin (right)', `皮波被彼破披`, `皮,波,被,彼,破,披`);
    await permanentList('Simple', `戦単禅弾`, `戦,単,禅,弾`);
    await permanentList('Sick (flank left and top)', `病痒痛症痩療疲癖疫痘疾痴癒痢瘍痕`,
            `病,痒,痛,症,痩,療,疲,癖,疫,痘,疾,痴,癒,痢,瘍,痕`);
    await permanentList('Shrimp', `駅昼沢訳択尺尽釈`, `駅,昼,沢,訳,択,尺,尽,釈`);
    await permanentList('Shellfish (left)', `貝敗財則販貯購賄賂贈賭貼賠賊賜賦`,
            `貝,敗,財,則,販,貯,購,賄,賂,贈,賭,貼,賠,賊,賜,賦`);
    await permanentList('Shellfish (bottom)', `貝買負員賞責資賀費贅質貸貧貨賛賃貴貿貢賢貞貫賓`,
            `貝,買,負,員,賞,責,資,賀,費,贅,
            質,貸,貧,貨,賛,賃,貴,貿,貢,賢,貞,貫,賓`);
    await permanentList('Self', `自身息鼻臭憩`, `自,身,息,鼻,臭,憩`);
    await permanentList('See', `見親鏡覚観現規境視覧寛`,
            `見,親,鏡,覚,観,現,規,境,視,覧,寛`);
    await permanentList('Scooter (left and bottom) 3', `近辺通週道返送進運適込迎遅遺遣避逃還巡`,
            `近,辺,通,週,道,返,送,進,運,適,込,迎,遅,遺,遣,避,逃,還,巡`);
    await permanentList('Scooter (left and bottom) 2', `
        透遜遂迅蓮遭遇逸遼遥遮遍迭遷逝漣逓遡`,
        `透,遜,遂,迅,蓮,遭,遇,逸,遼,遥,遮,遍,迭,遷,逝,逓,遡`);
    await permanentList('Scooter (left and bottom) 1', `速追選遠達連過違述逮造迷退途迫逆遊遵逐`,
            `速,追,選,遠,達,連,過,違,述,逮,造,迷,退,途,迫,逆,遊,遵,逐`);
    await permanentList('Scooter (left and bottom)', `
        近辺通週道返送進運速追選遠達連過違述逮造迷退途迫逆遊遵逐逓遡
        適込迎遅遺遣避逃還巡透遜遂迅蓮遭遇逸遼遥遮遍迭遷逝漣`,
        `近,辺,通,週,道,返,送,進,運,速,追,選,
        遠,達,連,過,違,述,逮,造,迷,退,途,迫,逆,
        遊,遵,逐,逓,遡,適,込,迎,遅,遺,遣,避,逃,還,巡,透,遜,
        遂,迅,蓮,遭,遇,逸,遼,遥,遮,遍,迭,遷,逝,漣`);
    await permanentList('Servant', `監臣緊覧臨堅姫賢腎`, `監,臣,緊,覧,臨,堅,姫,賢,腎`);
    await permanentList('Scarecrow', `福副富幅`, `幅`);
    await permanentList('Say (left) 3', `課訳謝詩言記話談試調語読護訟訴討誘訪診請詰詣`,
            `課,訳,謝,詩,言,記,話,談,試,調,語,
            読,護,訟,訴,討,誘,訪,診,請,詰,詣`);
    await permanentList('Say (left) 2', `誌諸誤講諾託譲謙誠誰謎誇詐謀諮訂諭諒謡訃諧詮`,
            `誌,諸,誤,講,諾,託,譲,謙,誠,
            誰,謎,誇,詐,謀,諮,訂,諭,諒,謡,訃,諧,詮`);
    await permanentList('Say (left) 1', `計証詳識説訓許詞議論設評認誕諦該譜詠謹謁詔`,
            `計,証,詳,識,説,訓,許,詞,議,論,
            設,評,認,誕,諦,該,譜,詠,謹,謁,詔`);
    await permanentList('Say (left)', `
        言記話談試調語読謝詩課計証詳識説訓許詞議論設評認誕諦訃諧謁詔詣詮
        護訟訴討誘訪診請詰訳誌諸誤講諾託譲謙誠誰謎誇詐謀諮訂諭諒謡該譜詠謹`,
        `言,記,話,談,試,調,語,読,謝,詩,課,計,証,詳,識,
        説,訓,許,詞,議,論,設,評,認,誕,諦,訃,諧,謁,詔,詣,詮,
        護,訟,訴,討,誘,訪,診,請,詰,訳,誌,諸,誤,講,諾,
        託,譲,謙,誠,誰,謎,誇,詐,謀,諮,訂,諭,諒,謡,該,譜,詠,謹`);
    await permanentList('Satellite', `揺謡遥`, `謡`);
    await permanentList('Samurai', `仕声売士志装誌隷壮荘穀殻款麦`,
            `仕,声,売,士,志,装,誌,隷,壮,荘,穀,殻,款,麦`);
    await permanentList('Same', `興銅筒胴洞同`, `興,銅,筒,胴,洞,同`);
    await permanentList('Run (flank left and bottom)', `走起越超趣赴`,
            `走,起,越,超,趣,赴`);
    await permanentList('Roof (top) 2', `審寝宮宅憲寄宴宗富密宣宜宛蜜寮寧寛賓寂宰寡窟`,
            `審,寝,宮呂,宅,憲,寄,宴,宗,富,密,
            宣,宜,宛,蜜,寮,寧,寛,賓,寂,宰,寡,窟`);
    await permanentList('Roof (top) 1', `字宝空安室家定客実寒宿完守官塞察容宙宇害宵`,
            `字,宝,空,安,室,家,定,客,実,寒,
            宿,完,守,官,塞,察,容,宙,宇,害,宵`);
    await permanentList('Roof (top)', `
        字宝空安室家定客実寒宿完守官察容宙宇塞害審寝宮宅憲寄宴宗富密窟宣宜宵宛蜜寮寧寛賓寂宰寡`,
        `字,宝,空,安,室,家,定,客,実,寒,宿,完,守,官,察,容,
        宙,宇,塞,害,審,寝,宮呂,宅,憲,寄,宴,宗,富,密,窟,宣,
        宜,宵,宛,蜜,寮,寧,寛,賓,寂,宰,寡`);
    await permanentList('Rocket', `離璃`, `璃`);
    await permanentList('Righteousness', `議義犠儀`, `議,犠`);
    await permanentList('Right', `右若諾匿`,
            `右,若,諾,匿`);
    await permanentList('Rice paddy (bottom)', `田番留雷蓄畜奮苗`,
            `田,番,留,雷,蓄,畜,奮,苗`);
    await permanentList('Rice paddy (top)', `田甲男思界胃異塁畳累畏`,
            `田,甲,男,思,界,胃,異,塁,畳,累,畏`);
    await permanentList('Rice paddy', `町画卑畔畝`, `町,画,卑,畔,畝`);
    await permanentList('Rice (left)', `米料精粉糖粋粒粧粘糧粗`,
            `米,料,精,粉,糖,粋,粒,粧,粘,糧,粗`);
    await permanentList('Rice', `米断齢奥歯噛迷菊来粛継類謎隣数`,
            `米,断,齢,奥,歯,噛,迷,菊,来,粛,継,類,謎,隣,数`);
    await permanentList('Red', `赤変恋湾跡赦蛮`, `赤,変,恋,湾,跡,赦,蛮`);
    await permanentList('Reason', `由笛宙袖届油軸抽`, `笛,届,軸`);
    await permanentList('Rain (top)', `雨雪雲電雰震需露雷霊零霧霜`,
            `雨,雪,雲,電,雰,震,需,露,雷,霊,零,霧,霜`);
    await permanentList('Products', `器品臨操繰燥藻`, `器,品,臨,操,繰,燥,藻`);
    await permanentList('Power (right)', `力助功働動効励幼勤勧勘劾勃`,
            `力,助,功,働,動,効,励,幼,勤,勧,勘,劾,勃`);
    await permanentList('Power (bottom)', `力男労努勢募劣勇`,
            `力,男,労,努,勢,募,劣,勇`);
    await permanentList('Power', `力勝勉協加務賀筋架霧脇脅勲嘉`,
            `力,勝,勉,協,加,務,賀,筋,架,霧,脇,脅,勲,嘉`);
    await permanentList('Poop', `後幻機率響幼幾磁郷滋幽慈擁系玄畿`,
            `後,幻,機,率,響,幼,幾,磁,郷,滋,幽,慈,擁,系,玄,畿`);
    await permanentList('Poem', `警驚敬`, `警,驚`);
    await permanentList('Plate (bottom)', `皿血益監盗盛盟盤盆蓋`,
            `皿,血,益,監,盗,盛,盟,盤,盆,蓋`);
    await permanentList('Pig', `家劇豚隊豪縁墜遂塚蒙`,
            `家,劇,豚,隊,豪,縁,墜,遂,塚,蒙`);
    await permanentList('Past', `法却脚去`, `法,却,脚,去`);
    await permanentList('Page (right) 2', `項頻顧瀬頃頂須顕煩頰頓頒顎`,
            `項,頻,顧,瀬,頃,頂,須,顕,煩,頰,頓,頒,顎`);
    await permanentList('Page (right) 1', `顔頭頁願頑類順領額預頼傾`,
            `顔,頭,頁,願,頑,類,順,領,額,預,頼,傾`);
    await permanentList('Page (right)', `顔頭頁願頑類順領額預頼傾項頻顧瀬頃頂須顕煩頰頓頒顎`,
            `顔,頭,頁,願,頑,類,順,領,額,預,頼,傾,
            項,頻,顧,瀬,頃,頂,須,顕,煩,頰,頓,頒,顎`);
    await permanentList('Original', `願原源`, `願,原,源`);
    await permanentList('Older brother', `競祝況党呪兄`,
            `競,祝,況,党,呪,兄`);
    await permanentList('Old', `古苦固個居故湖克枯胡据`,
            `古,苦,固,個,居,故,湖,克,枯,胡,据`);
    await permanentList('One-sided', `版片`, `版,片`);
    await permanentList('Oneself (right)', `記配紀己妃`, `記,配,紀,己,妃`);
    await permanentList('Nurse', `譲嬢壌醸`, `譲,嬢,壌,醸`);
    await permanentList('Not', `不杯否`, `不,杯,否`);
    await permanentList('Next', `羨資姿盗諮茨`, `羨,資,姿,盗,諮,茨`);
    await permanentList('Net (top)', `買署罪罰置羅罷罵`,
            `買,署,罪,罰,置,羅,罷,罵`);
    await permanentList('Narwhal (flank top and left)', `左右友有存布在`,
            `左,右,友,有,存,布,在`);
    await permanentList('Music', `農典豊遭槽曹`, `農,典,豊,遭,槽,曹`);
    await permanentList('Mountain (top)', `山出岸岩炭嵐崖崇崩`,
            `山,出,岸,岩,炭,嵐,崖,崇,崩`);
    await permanentList('Mountain (left)', `崎岐峰峡岬峠`, `崎,岐,峰,峡,岬,峠`);
    await permanentList('Mouth (surrounding)', `口四図国固囲園因団困囚圏回`,
            `口,四,図,国,固,囲,園,因,団,困,囚,圏,回`);
    await permanentList('Mouth (right)', `口知和加如`, `口,知,和,加,如`);
    await permanentList('Mouth (left) 2', `唱嘘喧嘩叱叫呪咲唯喚噴唆哺喝嘱吟咽嚇唾吐`,
            `唱,嘘,喧,嘩,叱,叫,呪,咲,唯,喚,噴,唆,哺,喝,嘱,吟,咽,嚇,唾,吐`);
    await permanentList('Mouth (left) 1', `口鳴味喫叩喉吸呼嘆噂咳噌喋噛吹唄喩嗅嘲`,
            `口,鳴,味,喫,叩,喉,吸,呼,嘆,噂,咳,噌,喋,噛,吹,唄,喩,嗅,嘲`);
    await permanentList('Mouth (left)', `口鳴味喫叩喉吸呼嘆噂喩嗅嘲咽嚇吐唾咳噌喋噛吹唱嘘喧嘩叱叫呪咲唯喚噴唆哺喝嘱吟唄`,
            `喫契,鳴,味,叩,喉,吸,呼,嘆,噂,喩,嗅,嘲,咽,嚇,吐,唾,咳,噌,喋,噛,吹,唱,嘘,喧,
                嘩,叱,叫,呪,咲,唯,喚,噴,唆,哺,喝,嘱,吟,唄`);
    await permanentList('Mouth (bottom)', `口右台名谷告善害含否哲吾啓杏吉召呂`,
            `口,右,台,名,谷,告,善,害,含,否,哲,吾,啓,杏,吉,召,呂`);
    await permanentList('Mouth (top)', `口号兄呈呆`, `口,号,兄,呈,呆`);
    await permanentList('Morning', `幹乾韓潮`, `幹,乾,韓,潮`);
    await permanentList('Moon (left) 2', `月服勝脳胸脱腕腰肥豚腹脈股肺臓朕肘膳肢`,
            `月,服,勝,脳,胸,脱,腕,腰,肥,豚,腹,脈,股,肺,臓,朕,肘,膳,肢`);
    await permanentList('Moon (left) 1', `膝肝脚肌胴脇脂肪膨胞騰腸膜胎胆腺謄臆腫`,
            `膝,肝,脚,肌,胴,脇,脂,肪,膨,胞,騰,腸,膜,胎,胆,腺,謄,臆,腫`);
    await permanentList('Moon (left)', `月服勝脳胸脱腫腕腰肥豚腹脈股肺臓膝肝脚肌胴脇脂肪膨胞騰腸膜胎胆腺謄臆朕肘膳肢`,
            `月,服,勝,脳,胸,脱,腫,腕,腰,肥,豚,腹,
            脈,股,肺,臓,膝,肝,脚,肌,胴,脇,脂,肪,膨,胞,
            騰,腸,膜,胎,胆,腺,謄,臆,朕,肘,膳,肢`);
    await permanentList('Mole', `倒致至到窒`, `倒,致,至,到,窒`);
    await permanentList('Mohawk', `滴摘適敵`, ``);
    await permanentList('Misc 4', `為旧甘舞牙壁充孝即琴輝塗鬱覇舗且憂恭弊堕垂`,
            `為,旧,甘,舞,牙,壁,充,孝,即,琴,輝,塗,鬱,覇,舗,且,憂,恭,弊,堕,垂`);
    await permanentList('Misc 3', `望求司軍面弁可静飛岡革型差鮮靴児麗衆撃背既`,
            `望,求,司,軍,面,弁,可,静,飛,岡,革,型,差,鮮,靴,児,麗,衆,撃,背,既`);
    await permanentList('Misc 2', `甚屯升壱葛釜瓦串墾嗣璽塑丙蔽貌冥麺耗弄聖辣`,
            `甚,屯,升,壱,葛,釜,瓦,串,墾,
            嗣,璽,塑,丙,蔽,貌,冥,麺,耗,弄,聖辣`);
    await permanentList('Misc 1', `丁了才元公世両州民以具共題厳亀羞麓摯璧弔乙`,
            `丁,了,才,元,公,世,両,州,民,以,
            具,共,題,厳,亀,羞,麓,摯,璧,弔,乙`);
    await permanentList('Middle', `中仲忠貴沖`, `中,仲,忠,貴,沖`);
    await permanentList('Melon (right)', `弧孤瓜狐爪`, `弧,孤,瓜,狐,爪`);
    await permanentList('Measurement (right)', `封寸村付対謝討射酎樹耐尉`,
            `封,寸,村,付,対,謝,討,射,酎,樹,耐,尉`);
    await permanentList('Measurement', `寸将博守専団導尋尊噂寿闘奪慰辱冠鋳爵`,
            `寸,将,博,守,専,団,導,尋,尊,噂,寿,闘,奪,慰,辱,冠,鋳,爵`);
    await permanentList('Mask', `僧増層噌贈憎`, `僧,増,層,噌,贈,憎`);
    await permanentList('Master (right)', `主住注往柱駐`, `主,住,注,往,柱,駐`);
    await permanentList('Machine', `始治飴怠胎台冶`, `始,治,飴,怠,胎,台,冶`);
    await permanentList('Long ago', `借措籍惜錯`, `借,措,籍,惜,錯`);
    await permanentList('Long', `長張髪帳`, `長,張,髪,帳`);
    await permanentList('Loiter (left)', `後役待得徒律徴往従復微径徳彼御徹征徐循`,
            `後,役,待,得,徒,律,徴,往,従,復,微,径,徳,彼,御,徹,征,徐,循`);
    await permanentList('Lid (top)', `六市交京夜高卒幸率亭豪裏褒哀衰亮享`,
            `六,市,交,京,夜,高,卒,幸,率,
            亭,豪,裏,褒,哀,衰,亮,享`);
    await permanentList('Life', `生麦星表性毒喫害産責素割憲潔姓契隆俵牲轄`,
            `生,麦,星,表,性,毒,喫,害,産,
            責,素,割,憲,潔,姓,契,隆,俵,牲,轄`);
    await permanentList('Library', `編偏遍`, `編,偏,遍`);
    await permanentList('Leader (left) 4', `伸償伴併仙俊儀側借僧個倒任件人仕他休代体作侶儒`,
            `伸,償,伴,併,仙,俊,儀,側,借,僧,個,
            倒,任,件,人,仕,他,休,代,体,作,侶,儒`);
    await permanentList('Leader (left) 3', `何化付住保仮使便低位仲伝働倍僕億像例信係傑但侯`,
            `何,化,付,住,保,仮,使,便,低,位,仲,
            伝,働,倍,僕,億,像,例,信,係,傑,但,侯`);
    await permanentList('Leader (left) 2', `価値俳停備優供候健修僚催促似偵傷債伎依仏侮僅倹`,
            `価,値,俳,停,備,優,供,候,健,修,
            僚,催,促,似,偵,傷,債,伎,依,仏,侮,僅,倹`);
    await permanentList('Leader (left) 1', `偽仁侵伺俺侍俵佐伊俗偶伯仰偉偏倫傲伏佳傍伐俸倣`,
            `偽,仁,侵,伺,俺,侍,俵,佐,伊,俗,
            偶,伯,仰,偉,偏,倫,傲,伏,佳,傍,伐,俸,倣`);
    await permanentList('Leader (left)', `
        人仕他休代体作何化付住保仮使便低位仲伝働倍僕億像例信仏係侯
        側借僧個倒任件価値俳停備優供候健修僚催促似偵傷債伎依侶儒但僅倣
        伸償伴併仙俊儀偽仁侵伺俺侍俵佐伊俗偶伯仰偉偏倫傲伏佳傍伐俸傑侮倹`,
        `人,仕,他,休,代,体,作,何,化,付,住,保,仮,使,便,低,位,仲,伝,働,
        倍,僕,億,像,例,信,仏,係,侯,
        側,借,僧,個,倒,任,件,価,値,俳,停,備,優,供,候,
        健,修,僚,催,促,似,偵,傷,債,伎,依,侶,儒,但,僅,倣,
        伸,償,伴,併,仙,俊,儀,偽,仁,侵,伺,俺,侍,俵,佐,伊,
        俗,偶,伯,仰,偉,偏,倫,傲,伏,佳,傍,伐,俸,傑,侮,倹`);
    await permanentList('Landslide', `農震振娠唇辱`, `農,震,振,娠,唇,辱`);
    await permanentList('Ladle (right)', `科料斗斜`, `科,料,斜`);
    await permanentList('Lack (right)', `次欠飲歌欧欲歓吹炊欺軟款`, 
            `次,欠,飲,歌,欧,欲,歓,吹,炊,欺,軟,款`);
    await permanentList('Korea', `違韓衛偉緯`, `違,韓,衛,偉,緯`);
    await permanentList('Knife (right) 2', `刺刻測剣刑削刊剥剤到刷刈剛剰剖`,
            `刺,刻,測,剣,刑,削,刊,剥,剤,到,刷,刈,剛,剰,剖`);
    await permanentList('Knife (right) 1', `利別例列劇側倒制判副割則創刹`,
            `利,別,例,列,劇,側,倒,制,判,副,割,則,創,刹`);
    await permanentList('Knife (right)', `利別例列刹劇側剥倒制判副割則創刺刻測剣刑削刊剤到刷刈剛剰剖`,
            `利,別,例,列,刹,劇,側,剥,倒,制,判,
            副,割,則,創,刺,刻,測,剣,刑,削,刊,
            剤,到,刷,刈,剛,剰,剖`);
    await permanentList('Kiss (right)', `路格絡各略賂酪`,
            `路,格,絡,各,略,賂,酪`);
    await permanentList('King (left)', `王理球現環珍班珠瑛瑠瑞璃斑玩`,
            `王,理,球,現,環,珍,班,珠,瑛,瑠,瑞,璃,斑,玩`);
    await permanentList('Kick', `表展裏褒猿俵哀衰喪袋裂襲衷製衣`,
            `表,展,裏,褒,猿,俵,哀,衰,
            喪,袋,裂,襲,衷,製,衣`);
    await permanentList('Jammed in', `界介`, `界`);
    await permanentList('Jackhammer', `祭標禁余示票宗隷奈斎慰歳漂襟凛尉崇款条県小`,
            `祭,標,禁,余,示,票,宗,隷,
            奈,斎,慰,歳,漂,襟,凛,尉,崇,
            款,条,県,小`);
    await permanentList('Insect', `虫蜂虹蚊蛇蝶融触蚕蟹`,
            `虫,蜂,虹,蚊,蛇,蝶,融,触,蚕,蟹解`);
    await permanentList('Ice (left)', `次冷凍凄准凝凛凌`,
            `次,冷,凍,凄,准,凝,凛,凌`);
    await permanentList('Horse (left)', `馬験駅騒駆駐騎駒駄駿`,
            `馬,験,駅,騒,駆,駐,騎,駒,駄,駿`);
    await permanentList('Horns (top)', `首美羊弟前送善狭従益並隊尊噂磁縦併餅滋墜遂咲瓶慈`,
            `首,美,羊,弟,前,送,善,狭,従,益,
            並,隊,尊,噂,磁,縦,併,餅,滋,墜,遂,咲,瓶,慈`);
    await permanentList('Hook', `決喉候快`, `決,喉,候,快`);
    await permanentList('Hole', `究穴突窓窮搾窒窃`, `究,穴,突,窓,窮,搾,窒,窃`);
    await permanentList('History', `更丈史吏使便更硬`, `更,丈,史,吏,使,便,更,硬`);
    await permanentList('Hills', `乏芝之`, ``);
    await permanentList('Heavy', `重働動種衝勲腫`, `重,働,動,種,衝,勲,腫`);
    await permanentList('Heart (bottom) 2', `思意息想感念急恋悲忘態怒惑憲悠怨忌`,
            `思,意,息,想,感,念,急,恋,悲,忘,態,怒,惑,憲,悠,怨,忌`);
    await permanentList('Heart (bottom)  1', `恐心必悪志恩忠窓患恵懸懲慰懇忍憩芯慈怠愚愁`,
            `恐,心,必,悪,志,恩,忠,窓,患,恵,
            懸,懲,慰,懇,忍,憩,芯,慈,怠,愚,愁`);
    await permanentList('Heart (bottom)', `
        心必思意悪息想感念急恋悲忘態怒惑憲恐志恩忠窓愁患恵懸懲慰懇忍憩怨芯慈怠愚悠忌`,
        `心,必,思,意,悪,息,想,感,念,急,恋,悲,忘,態,怒,
        惑,憲,恐,志,恩,忠,窓,愁,患,恵,懸,懲,慰,
        懇,忍,憩,怨,芯,慈,怠,愚,悠,忌`);
    await permanentList('Happiness', `達報執`, `報,執`);
    await permanentList('Hair (right)', `形影彫杉彩彰膨`,
            `形,影,彫,杉,彩,彰,膨`);
    await permanentList('Guard', `説税脱鋭悦閲`, `説言,脱月,鋭金,閲門`);
    await permanentList('Gun (top)', `先年午矢毎朱匂乞勾缶生失`,
            `先,年,午,矢,毎,朱,匂,乞,勾,缶,生,失`);
    await permanentList('Grain (left) 2', `禾科私和利秒秋種税程稚移稽`,
            `禾,科,私,和,利,秒,秋,種,税,程,稚,移,稽`);
    await permanentList('Grain (left) 1', `積秘称稲稼穏穂租穫秩稿剰`,
            `積,秘,称,稲,稼,穏,穂,租,穫,秩,稿,剰`);
    await permanentList('Grain (left)', `禾科私和利秒秋種税程稚移積稽秘称稲稼穏穂租穫秩稿剰`,
            `禾,科,私,和,利,秒,秋,種,税,程,稚,移,積,
            稽,秘,称,稲,稼,穏,穂,租,穫,秩,稿,剰`);
    await permanentList('Good', `良養狼郎娘朗浪痕`,
            `良,養,狼,郎,娘,朗,浪,痕`);
    await permanentList('Gold (left) 2', `釣鐘鈍鍛鍵錬鉢銘鎖錦鎌鎮錯錠鋳錮`,
            `釣,鐘,鈍,鍛,鍵,錬,鉢,銘,鎖,錦,鎌,鎮,錯,錠,鋳,錮`);
    await permanentList('Gold (left) 1', `金鉄鏡銀鉛針録鑑銭銅鍋鈴銃鋼鋭鉱`,
            `金,鉄,鏡,銀,鉛,針,録,鑑,銭,銅,鍋,鈴,銃充,鋼,鋭,鉱`);
    await permanentList('Gold (left)', `金鉄鏡銀錮鉛針録鑑銭銅鍋鈴銃鋼鋭鉱釣鐘鈍鍛鍵錬鉢銘鎖錦鎌鎮錯錠鋳`,
            `金,鉄,鏡,銀,錮,鉛,針,録,鑑,銭,銅,鍋,鈴,銃,
            鋼,鋭,鉱,釣,鐘,鈍,鍛,鍵,錬,鉢,銘,鎖,錦,鎌,
            鎮,錯,錠,鋳`);
    await permanentList('Go (flank left and right)', `行術街衛衝衡`, `術,街,衛,衝,衡`);
    await permanentList('Gladiator', `勝藤巻券拳騰誉挙`, `勝,藤,巻,券,拳,騰,誉,挙`);
    await permanentList('Giant', `巨拒距`, `距`);
    await permanentList('Gate (flank left and right)', `間聞開問門関閥閣閉闘闇閲閑`,
            `間,聞,開,問,門,関,閥,閣,閉,闘,闇,閲,閑`);
    await permanentList('Fruit', `課果菓巣棄裸彙`, `課,棄,彙`);
    await permanentList('Frostbite', `綾陵凌`, `綾`);
    await permanentList('Fortune', `点店占粘貼`, `粘,貼`);
    await permanentList('Football', `援暖緩媛`, `援,暖,緩,媛`);
    await permanentList('Foot (left)', `足路踏跳跡躍距踊蹴践踪`,
        `足,路,踏,跳,跡,躍,距,踊,蹴,践,踪`);
    await permanentList('Flowers (top) 3', `花草茶苦落葉芸苺英茂芝荒芽菌菊芯蓄蓮蔵墓`,
            `花,草,茶,苦,落,葉,芸,苺,英,茂,芝,荒,芽,菌,菊,芯,蓄,蓮,蔵,墓`);
    await permanentList('Flowers (top) 2', `苗茨芳蒙葵莉茜茎荘蒼萌藩菅蔑藍藻繭慕幕`,
            `苗,茨,芳,蒙,葵,莉,茜,茎,荘,蒼,萌,藩,菅,蔑,藍,藻,繭,慕,幕`);
    await permanentList('Flowers (top) 1', `荷薬苛若夢藤菓華菜著蒸芋薦葬薄薪蓋萎募`,
            `荷,薬,苛,若,夢,藤,菓,華,菜,著,蒸,芋,薦,葬,薄,薪,蓋,萎,募`);
    await permanentList('Flowers (top)', `
        花草茶苦落葉芸苺英荷薬苛若夢藤菓華菜著蒸芋薦葬薄蔵茂芝幕墓
        荒芽菌菊芯蓄蓮慕萎募薪蓋苗茨芳蒙葵繭莉茜茎荘蒼萌藩菅蔑藍藻`,
        `花,草,茶,苦,落,葉,芸,苺,英,荷,薬,苛,若,夢,藤,菓,華,
        菜,著,蒸,芋,薦,葬,薄,蔵,茂,芝,幕,墓,
        荒,芽,菌,菊,芯,蓄,蓮,慕,萎,募,薪,蓋,苗,茨,芳,蒙,葵,
        繭,莉,茜,茎,荘,蒼,萌,藩,菅,蔑,藍,藻`);
    await permanentList('Flood', `災巡拶`, `災`);
    await permanentList('Flag (flank top and left)', `局屋履尻尾届展層居眉属屈屁尼尿`,
            `局,屋,履,尻,尾,届,展,層,居,眉,属,屈,屁,尼,尿`);
    await permanentList('Fix', `植置値殖直`, `植,置,値,殖,直`);
    await permanentList('Five', `五語吾悟`, `五,語,吾,悟`);
    await permanentList('Fire (left)', `火炎焼煙燃爆畑炉炊灯燥煩`,
            `火,炎,焼,煙,燃,爆,畑,炉,炊,灯,燥,煩`);
    await permanentList('Finger (left) 4', `撲拶挨挿拘拓抽探掃採捨拡操揮打投持指拾折技`,
            `撲,拶,挨,挿,拘,拓,抽,探,掃,採,捨,拡,操,揮,打,持,指,拾,折,技`);
    await permanentList('Finger (left) 3', `批援提担捉捕抜掛捜接授振招撮押掘括握揚擦拭捗`,
            `批,援,提,担,捉,捕,抜,掛,捜,接,授,振,招,撮,押,掘,括,握,揚,擦,拭,捗`);
    await permanentList('Finger (left) 2', `推損拝払換摘抗掲抱抵描扱択抑控拒拉携排揺抄`,
            `損,拝,払,換,摘,抗,掲,抱,抵,描,扱,択,抑,控,拒,拉,携,排,揺,抄`);
    await permanentList('Finger (left) 1', `把搬挟擁搭披据拐抹拍摂搾扶拙擬拷拠措撤挑捻挫`,
            `把,搬,挟,擁,搭,披,据,拐,抹,拍,摂,搾,扶,拙,擬,拷,拠,措,撤,挑,捻,挫`);
    await permanentList('Finger (left)', `
        打投持指拾折技批援提担捉捕抜掛捜接授振招撮押探掃採捨拡操揮推損拝払換摘抗掲抱抵捻挫抄拭捗
        描扱択抑控拒拉携排拠措撤挑掘括握揚揺擦撲拶挨挿拘拓抽把搬挟擁搭披据拐抹拍摂搾扶拙擬拷`,
        `打,持,指,拾,折,技,批,援,提,担,捉,捕,抜,掛,捜,接,授,振,
        招,撮,押,探,掃,採,捨,拡,操,揮,推,損,拝,払,換,摘,抗,掲,抱,抵,捻,挫,抄,拭,捗,
        描,扱,択,抑,控,拒,拉,携,排,拠,措,撤,挑,掘,括,握,揚,
        揺,擦,撲,拶,挨,挿,拘,拓,抽,把,搬,挟,擁,搭,披,据,
        拐,抹,拍,摂,搾,扶,拙,擬,拷`);
    await permanentList('Festival', `察際擦`, ``);
    await permanentList('Feather', `翁羽弱翼習翌翔扇翻`,
            `翁,翼,習,翌,翔,扇,翻`);
    await permanentList('Fault', `鉄秩迭`, `鉄,秩`);
    await permanentList('Explosion', `率塁渋摂脊兆楽薬`, ``);
    await permanentList('Excuse', `勉晩免逸`, `勉,晩`);
    await permanentList('Eye (left)', `目睡眠眼眺瞬瞳瞭睦`,
            `睡,眠,眼,眺,瞬,瞳,瞭,睦`);
    await permanentList('Eye (bottom)', `目着冒省看督盲`, `着,冒,省,看,督,盲`);
    await permanentList('Eternity', `泳永詠`, `詠`);
    await permanentList('Escalator, Stairs', `秀誘携透乃級吸及扱`, `秀,誘,携,透,`);
    await permanentList('Energy', `気汽`, ``);
    await permanentList('Eat (left)', `食飲館飯飴飾飼餅餓飢飽餌`,
            `飲,館,飯,飴,飾,飼,餅,餓,飢,飽,餌`);
    await permanentList('East', `東練凍棟錬陳欄`, `練,棟,錬,欄`);
    await permanentList('Ear (left)', `耳取職恥聴聡`, `取,職,恥,聴`);
    await permanentList('Early', `章卓悼早`, `章`);
    await permanentList('Dry', `半午平干汗刊肝軒`, `半,午,平,干,汗,刊,肝,軒`);
    await permanentList('Drunkard 2', `幾戚戒茂滅威歳繊戴栽伐哉賊戯蔑`,
            `幾,戚,戒,茂,滅,威,歳,繊,戴,栽,伐,哉,賊,戯,蔑`);
    await permanentList('Drunkard 1', `成戦感識閥減械機域職裁載惑織我`,
            `成,戦,感,識,閥,減,械,機,域,職,裁,載,惑,織,我`);
    await permanentList('Drunkard', `成戦感識閥減械機域職裁載惑織幾戚戒茂滅威歳繊戴栽伐哉賊戯蔑我`,
            `戦,識,閥,械,機,域,職,裁,載,惑,織,幾,戚,戒,茂,滅,威,歳,繊,戴,栽,伐,哉,賊,戯,蔑,我`);
    await permanentList('Drum', `喜樹膨嘉鼓`, `樹,鼓`);
    await permanentList('Doubt', `凝擬疑`, ``);
    await permanentList('Door (flank top and left)', `戸肩戻房雇扇扉`, `肩,戻,房,扇,扉`);
    await permanentList('Dollar', `費沸`, `費`);
    await permanentList('Dog', `犬然状獣就獄献黙蹴伏`, `獣,就,献,黙,蹴`);
    await permanentList('District', `欧駆枢殴区`, `欧,駆,枢`);
    await permanentList('Dirt (left) 2', `墟垣塔塊塀培壇堰堤墳塚壌坪堪坑堆`,
            `墟,垣,塔,塊,塀,培,壇,堰,堤,墳,塚,壌,坪,堪,坑`);
    await permanentList('Dirt (left) 1', `土地場坂塩増坊域城境壊均埋埼堀塡`,
            `地,場,坂,塩,増,坊,域,城,境,壊,均,埋,埼,堀,塡`);
    await permanentList('Dirt (left)', `土地場坂塩増坊域城境壊均埋埼堀墟垣塔塊塀培壇堰堤墳塚壌坪堪坑塡堆`,
            `地,場,坂,塩,増,坊,域,城,境,壊,均,埋,埼,堀,墟,垣,塔,塊,塀,培,壇,堰,
                堤,墳,塚,壌,坪,堪,坑,塡`);
    await permanentList('Director, Paragraph', `詞飼伺句拘駒`, `詞,飼,駒`);
    await permanentList('Direction (right)', `方妨防坊訪肪紡`, `妨,坊,訪,肪,紡`);
    await permanentList('Direction (left)', `方放族旅施旗旋`, ``);
    await permanentList('Demon', `鬼魅塊魂魔醜`, `魅,塊,魂`);
    await permanentList('Death Star', `輸諭癒愉`, `輸車,諭言`);
    await permanentList('Criminal', `非悲罪俳輩斐排扉緋`, `悲,輩,斐,扉,緋`);
    await permanentList('Crab', `期基旗棋碁欺`, `期,基,棋,碁,欺`);
    await permanentList('Cow (left)', `牛物特犠牧牲`, `物勿,特,犠義,牲`);
    await permanentList('Copy', `写与互号呉`, ``);
    await permanentList('Construction (left)', `工功攻項巧`, `功,項,巧`);
    await permanentList('Concurrently', `嫌謙兼鎌廉`, `嫌,謙,兼,鎌,廉`);
    await permanentList('Compare', `階皆比昆混批屁鹿陛`, `皆,昆,屁,鹿`);
    await permanentList('Comb', `印暇段興鍛臼`, ``);
    await permanentList('Coffin', `考者老拷`, `者`);
    await permanentList('Clown', `部倍培賠陪剖`, `培,賠,剖`);
    await permanentList('Cliff (flank top and left)', `反歴圧厚厄暦盾后灰`,
            `反,歴,圧,厚,暦,盾,灰`);
    await permanentList('Cleat', `受妥愛乳隠浮菜採稲瞬穏彩鶏渓采淫`,
            `妥,愛,乳孔,采`);
    await permanentList('Circle', `熱勢熟執塾丸`, `執`);
    await permanentList('Chinese', `漢難嘆`, `嘆`);
    await permanentList('Child', `子字学好季存厚乳猛浮遊孫承遜孔孤`,
            `好,季,孫,承,孤`);
    await permanentList('Ceremony', `代試式武弐`, `式,武,弐`);
    await permanentList('Center', `央映英瑛`, `映`);
    await permanentList('Cat pirate', `迎抑仰`, `迎,抑,仰`);
    await permanentList('Car (left)', `車軽転輪輸較軸斬軌軒軟輔轄`,
            `車,軽,転,輪,輸,較,軸,斬,軌,軒,軟,輔,轄`);
    await permanentList('Canopy (left) 2', `序腐鹿廃床摩磨魔庄麻唐庸慶席度`,
            `序,腐,鹿,廃,床,摩,磨,魔,庄,麻,唐,庸,慶,席,度`);
    await permanentList('Canopy (left) 1', `広店庭府底座応庁康庫廊厘廉`,
            `広,店,庭,府,底,座,応,庁,康,庫,廊,厘,廉`);
    await permanentList('Canopy (left)', `広厘店庭府底座応庁康庫席廊序腐鹿廃床摩磨魔庄麻唐庸慶廉`,
            `広,厘,店,庭,府,底,座,応,庁,康,庫,席,廊,序,腐,鹿,廃,床,
                摩,磨,魔,庄,麻,唐,庸,慶,廉`);
    await permanentList('Cage', `医区匹堰匠匿`, `医,匠,匿`);
    await permanentList('Bundle', `速整束頼瀬疎勅`, `頼,瀬,疎,勅力`);
    await permanentList('Building (right)', `部都郵郎邦邪郡邸郊郭那`,
            `部,都,郵,郎,邦,邪,郡,邸,郊,郭,那`);
    await permanentList('Building (left) 2', `陣隆隣陰阻隙陛隔陶隅陥陳随阿陵陪`,
            `陣,隆,隣,陰,阻,隙,陛,隔,陶,隅,陥,陳,随,阿,陵,陪`);
    await permanentList('Building (left) 1', `院階陽阪険防際隠限障隊除陸降附`,
            `院,階,陽,阪,険,防,際,隠,限,障,隊,除,陸,降,附`);
    await permanentList('Building (left)', `院階陽阪険防際隠附限障隊除陸降陣隆隣陰阻隙陛隔陶隅陥陳随阿陵陪`,
            `院,階,陽,阪,険,防,際,隠,附,限,障,隊,除,陸,降,陣,隆,隣,陰,阻,隙,陛,隔,
                陶,隅,陥,陳,随,阿,陵,陪`);
    await permanentList('Buddy', `君群郡`, `群`);
    await permanentList('Brush', `建書妻律筆健糖隷津鍵唐庸事`, `書,妻,筆`);
    await permanentList('Bookshelf', `輪冊論柵倫`, `輪,論,柵`);
    await permanentList('Blue (right)', `青情晴清精請靖`, `晴,精,請,靖`);
    await permanentList('Bow (left)', `引強弓張弾弧弥弦`, `張,弾,弧,弥,弦玄`);
    await permanentList('Bone', `滑髄骨骸`, `髄,骸玄`);
    await permanentList('Boil (bottom)', `点熱然烈照熟無蒸熊焦黙煎煮庶勲魚黒窯薫`,
            `点,熱,然,烈列,照,熟,無,蒸,熊,焦,黙,煎,煮,庶,勲,魚,黒,窯,薫`);
    await permanentList('Boat (left)', `船航般艦舟艇丹舶舷`, `船,航,般,艦,艇延,舶,舷玄`);
    await permanentList('Black hole', `履復腹複覆`, `腹`);
    await permanentList('Bird', `鳥鳴島薦鳩鶴鶏`, `鳴,鳩,鶴,鶏`);
    await permanentList('Big (look-alike) ', `天未末本大朱犬太失央休木体来米夫`);
    await permanentList('Big', `大太央美器参臭崎突換奈契戻奥奪俺涙爽奨奮喚奔`,
            `美,臭,突,奈,契,戻,奨将`);
    await permanentList('Beforehand', `矛野預序予`, `野,預`);
    await permanentList('Bear', `追館官師管遣阜帥菅`, `館,師,阜,帥`);
    await permanentList('Beans', `頭登短豊豆闘痘澄艶鼓`, `頭,短,豊,闘,鼓`);
    await permanentList('Bar (right)', `残浅銭践桟`, `残,銭,践,桟`);
    await permanentList('Bamboo 2', `筆符筋簡範筒籍笠箸簿篤箋籠`,
            `筆,符,筋,簡,範,筒,籍,笠,箸,簿,篤,箋,籠`);
    await permanentList('Bamboo 1', `竹答算第築箱笑等笛節箇策管`,
            `答,算,第,築,箱,笑,等,笛,節,箇,策,管`);
    await permanentList('Bamboo (top)', `竹答算第築箱笑等笛節箇策管筆符筋簡範筒籍笠箸簿篤箋籠`,
            `答,算,第,築,箱,笑,等,笛,節,箇,策,管,筆,符,筋,簡,範,筒,籍,笠,箸,簿,篤,箋,籠`);
    await permanentList('Axe', `斤斥近所新折兵祈断質訴浜析哲暫丘岳斬誓匠逝漸`,
            `所,新,祈,質,訴,析,斬,漸`);
    await permanentList('Asia', `悪亜`);
    await permanentList('Arrow', `矢知医短族疑喉候勧挨疾痴智矯`,
            `知,短,矯`);
    await permanentList('Anti', `反版板販阪坂飯仮返`,
            `版片,板木,販貝,坂土,飯食`);
    await permanentList('Animal (left)', `狼猫犯狭独猛獄狙獲狩狂猿猟猶狐`,
            `狼,猫,犯,狭,独,猛,獄,狙,獲,狩,狂,猿,猟,猶,狐`);
    await permanentList('Angel', `茶術述`);
    await permanentList('Alligator', `他地池施也`,
            `他,地,施`);
    await permanentList('Alcohol (left)', `配酸酔酢酎酷酬醸酵酌酪醜醒`,
            `配,酸,酔,酢,酎,酷,酬,醸,酵,酌,酪,醜,醒`);
    await permanentList('Ability', `能態熊罷`);
    await permanentList('Weather (meaning)', `雷嵐曇雲虹霧風夏雪雨晴雰陽虹`);
    await permanentList('Water (meaning) 2', `水滝沖湯潤湿氷汽蒸井潤泳渦波注港濡潟滴`);
    await permanentList('Water (meaning) 1', `魚釣漁滝貝海洋湖池鯨川河流泉橋傘泡潮`);
    await permanentList('Water (meaning)', `泡潮潟滴水滝沖湯潤湿氷汽蒸井潤泳魚釣漁滝貝海洋湖池鯨川河流泉渦橋港波注傘濡`);
    await permanentList('Violence (meaning) 3', `突刺絞逮武勢争敵刀暴兵守危毒軍士`);
    await permanentList('Violence (meaning) 2', `刃滅襲銃闘募塁陣将剣烈隊撃攻殺`);
    await permanentList('Violence (meaning) 1', `殉拷帥虐尉艦侵征蹴殴砕矛侍砲戦`);
    await permanentList('Violence (meaning)', `殉拷帥虐尉艦争侵征蹴殴砕矛侍砲刃滅襲銃闘募塁陣将剣烈隊撃攻突刺絞逮武勢敵刀暴兵守危毒軍士殺戦`);
    await permanentList('Time (meaning) 2', `遅速早久昔経現暇回朝晩夜泊夕昼暦旦`);
    await permanentList('Time (meaning) 1', `予前後秒時月日今曜昨年歳期間週暁曙`);
    await permanentList('Time (meaning)', `暁旦曙予前後秒時月日暦曜昨年歳期間遅今速早久昔経現暇回朝晩夜泊夕週昼`);
    await permanentList('Sound, Music (meaning)', `曲楽歌音声静笛響奏聴唱鐘琴喧`);
    await permanentList('Shapes (meaning) 2', `太角境狭長高坂細周玉枚容穴厚姿`);
    await permanentList('Shapes (meaning) 1', `凸凹痩円形丸小大線広端径濃平`);
    await permanentList('Shapes (meaning)', `凸凹痩円形丸小大玉周線広端径濃平太角境狭長高坂細枚容穴厚姿`);
    await permanentList('Seasons (meaning)', `夏冬秋春節旬季`);
    await permanentList('Religion (meaning)', `坊聖拝誓尼崇禅僧祈寺式信仏神坊宮宗精尼霊崇`);
    await permanentList('Quantity (meaning)', `少多均減半殖量額数積増加減幾弥倍輸`);
    await permanentList('Plants (meaning) 3', `樹稲芝梓柴麦植根幹苺松牧果梅藤菜苗`);
    await permanentList('Plants (meaning) 2', `梓麻咲柳杉竹草穂芋林粒桃梨桜森桑枯`);
    await permanentList('Plants (meaning) 1', `花木枝杏莉瓜葵耕蓮柴栃栽茎椎藻楓`);
    await permanentList('Plants (meaning)', `花芽桑木枝杏莉瓜葵耕蓮幹柴栃栽茎椎藻梓麻咲柳杉竹草穂芋林粒桃梨桜森樹稲芝梓柴麦植根苺松牧果梅藤菜楓枯苗`);
    await permanentList('People (meaning) 3', `胡孤寡蛮叔曹雌尉宰匠賓虜奴殿彼`);
    await permanentList('People (meaning) 2', `駐隣帝妃婆嬢嫁姫誰后伯凶侍哺雄`);
    await permanentList('People (meaning) 1', `女子友親客氏体男主名将祖皇戚`);
    await permanentList('People (meaning)', `女子友親客氏体男主名将祖皇戚駐隣帝妃婆嬢嫁姫誰后伯凶侍哺胡孤寡蛮叔曹雌尉宰匠賓虜奴殿彼雄`);
    await permanentList('Numbers (meaning)', `一二三四五六七八九十百千万億零`);
    await permanentList('Movement (meaning) 2', `東後西近来道連渉荷帰宿動登追標訪渡輸躍駆到拶`);
    await permanentList('Movement (meaning) 1', `搬止方出入早車路速運進泳乗返発所場通船向歩南`);
    await permanentList('Movement (meaning)', `搬止方出入早車路速運進泳乗返発所場通船向歩南東後西近来道連渉荷帰宿動登追標訪渡輸躍駆到拶`);
    await permanentList('Money, Commence (meaning) 2', `俸昌惜倹幣円償奪租稼賄隆雇銭税業商払盗貧購`);
    await permanentList('Money, Commence (meaning) 1', `債買暮貿品資価富財値費職額株販補貯給積預`);
    await permanentList('Money, Commence (meaning)', `俸昌惜倹幣円償奪租稼賄隆雇銭税業商払債買暮貿品資価富財値費職額株販補貯給積預購盗貧`);
    await permanentList('Metal (meaning)', `鉄銅鋼鉄銀銅鋼鉱錬`);
    await permanentList('Medical (meaning)', `医薬診症健痛害傷臓咳療菌哺遇屁`);
    await permanentList('Life (meaning)', `生寿命活居存在誕産亡死暮歳逝没`);
    await permanentList('Language (meaning) 2', `弁詩巻批応本簿帳冊栞条嘆喋項諮款`);
    await permanentList('Language (meaning) 1', `語答申声読談話耳論議詞句告警書哉`);
    await permanentList('Language (meaning)', `語答申声読談話耳論議詞句告警書弁詩巻批応本簿帳冊栞条嘆喋項諮款哉`);
    await permanentList('Home, household objects (meaning)', `皿屋住家鏡席枕傘机鍵椅卓畳扉架庄寮灯荘`);
    await permanentList('Food (meaning) 2', `辛餓鉢煎炊漬酵穀瓶脂沸繊餅串噛`);
    await permanentList('Food (meaning) 1', `亭飴喫焼飯酢肉汁醤鍋芋豆糖麺粒`);
    await permanentList('Food (meaning)', `亭飴喫焼飯酢肉汁醤鍋芋豆糖麺粒辛餓鉢煎炊漬酵穀瓶脂沸繊餅串噛`);
    await permanentList('Feeling (meaning)', `情感喜歓悦嬉幸悲怒恋愛`);
    await permanentList('Family (meaning)', `譜母父妹姉兄弟叔娘郎息子婿祖嬢妻婦夫孫戚姓紋`);
    await permanentList('Education (meaning)', `瞳塾習教校授師瞳`);
    await permanentList('Directions (meaning)', `北上下南左東右西底内中外横側`);
    await permanentList('Crime, Justice (meaning) 2', `訴訟則囚奪懲廷拘賊窃赦拐赦`);
    await permanentList('Crime, Justice (meaning) 1', `罪犯非裁律罰権義判審盗怪拉`);
    await permanentList('Crime, Justice (meaning)', `罪犯非裁律罰権義判審盗怪訴訟則囚奪懲廷拘賊窃赦拐赦拉`);
    await permanentList('Colors (meaning)', `色彩丹黄赤茜青紺緋蒼白黒墨緑紫明光陽暗闇`);
    await permanentList('Clothing (meaning)', `絹服布着鏡脱袖靴織条装聖拝綿衣帽縫錦絹`);
    await permanentList('Body (meaning) 2', `体腕鼻頭脇口髪足眉腰目眼膝指耳胸脳心歯肝唇胎`);
    await permanentList('Body (meaning) 1', `胃腹爪臓肌皮膚手骨髄筋血股脚息肺尻顔肩舌胴`);
    await permanentList('Body (meaning)', `胎体腕股鼻頭臓脇口髪足眉腰胴唇目眼膝脚指耳胸脳心手胃肝腹歯舌爪肌皮膚骨髄筋血息肺尻顔肩`);
    await permanentList('Animals (meaning) 2', `鮭犬毛蟹鰐蛇畜蚊騎魚翼鳩猿匹竜釣卵熊狩狐亀甲`);
    await permanentList('Animals (meaning) 1', `虫貝牛羊鳥鳴狼猫象漁虎蛍豚鯉隼烏蝶鯨鶏尾牙鹿`);
    await permanentList('Animals (meaning)', `蜂鮭毛犬蟹鰐蛇畜蚊騎魚翼鳩猿尾匹竜釣卵熊狩虫貝牛羊鳥鳴狼猫象漁虎蛍豚鯉隼烏蝶鯨鶏狐牙鹿亀甲`);    
    await permanentList('JLPT (extra Jouyou)', jlpt['none']);
    await permanentList('JLPT N1', jlpt[1]);
    await permanentList('JLPT N2', jlpt[2]);
    await permanentList('JLPT N3', jlpt[3]);
    await permanentList('JLPT N4', jlpt[4]);
    await permanentList('JLPT N5', jlpt[5]);
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
        硝詔薪畝斥繕塑但逐嫡衷勅朕逓痘謄弐頒眉賦附丙倣繭耗冶窯濫吏厘楼`,
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