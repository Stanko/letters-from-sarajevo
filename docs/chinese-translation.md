# Chinese translation

Imported from `Pisma iz Sarajeva - kineski.docx`. The document uses Simplified
Chinese, including characters such as 书, 网, and 们. Serbian content is the
source of truth; the supplied Chinese document provides the translated wording
and green/yellow illustration markers.

## URLs

The document supplies these unaccented Pinyin slugs. They are used directly
under `/zh/`, with no legacy Jekyll reading/About `.html` redirects.

| Serbian entry    | Chinese title  | Chinese URL                   |
| ---------------- | -------------- | ----------------------------- |
| Prvo pismo       | 第一封信       | `/zh/diyifengxin/`            |
| Prvi odgovor     | 第一回信       | `/zh/diyihuixin/`             |
| Drugo pismo      | 第二封信       | `/zh/dierfengxin/`            |
| Drugi odgovor    | 第二回信       | `/zh/dierhuixin/`             |
| Treće pismo      | 第三封信       | `/zh/disanfengxin/`           |
| Treći odgovor    | 第三回信       | `/zh/disanhuixin/`            |
| Četvrto pismo    | 第四封信       | `/zh/disifengxin/`            |
| Četvrti odgovor  | 第四回信       | `/zh/disihuixin/`             |
| Peto pismo       | 第五封信       | `/zh/diwufengxin/`            |
| Peti odgovor     | 第五回信       | `/zh/diwuhuixin/`             |
| Epilog           | 结语           | `/zh/jieyu/`                  |
| O knjizi i sajtu | 关于本书和网站 | `/zh/guanyubenshuyuwangzhan/` |

## Import decisions

- Green highlights become illustrated words; yellow descriptions become alt text.
- Illustration order follows Chinese grammar. In letter two's signoff, the
  father portrait comes first and the greeting illustration last.
- The document omits dates. Dates, navigation labels, footer, dedication, and
  error-page copy were translated from their Serbian counterparts.
- Chinese sentence components omit the spaces inserted between parts in other
  languages. Chinese fonts load only on Chinese pages.
- The About page uses the translated book title and includes Ana alongside
  Felipe in the Portuguese translation credits, following the requested credit update.

## Source corrections

Clear character errors and meaning errors were corrected against Serbian.
The remaining Chinese wording follows the supplied document; this import is
not a complete stylistic rewrite.

| Passage             | Correction                                                                                 | Serbian basis                                                |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Home                | 被围成的 → 被围困的                                                                        | `opsednutom`: besieged                                       |
| Letter one          | 成市 → 城市; 监视狙击手 → 当心狙击手                                                       | `grada`; `Pazi snajper`                                      |
| Letter two          | 击到了窗户上 → 击中了窗户正上方                                                            | `udarila iznad samog prozora`: hit just above the window     |
| Letters three/four  | Consistent plural address to both boys; question punctuation and “listen to mum” clarified | `vas dvojica`, `Vi`, `Slušate li mamu?`                      |
| Letter four         | 你门 → 你们; 座在 → 躺在                                                                   | Addressing the boys; `leže na kauču`: lying on the couch     |
| Letter four         | 游过太阳 → 绕着太阳转了一圈                                                                | `Zemlja ... obišla ... oko Sunca`: Earth went around the Sun |
| Letter four image   | 坦克 → 大炮                                                                                | `topu`: cannon, rather than a tank                           |
| Reply two           | 松子 → 松果; children described as too young for school                                    | `šišarkama`; `još mali za školu`                             |
| Reply four          | Added missing pine cones; 星期五 → 五年级学生                                              | `napadaju šišarkama`; `mi petaci`                            |
| Reply four/epilogue | Repaired the corrupted transliteration of Aleksandra to 亚历山德拉                         | `Aleksandra`                                                 |
| Letter five         | 水坑 → 灰斗; drawing the stove's face clarified                                            | `lužnica`: the stove's ash compartment                       |
| Reply five          | 自鸣得意地 → 不知所措地                                                                    | `Smušeno`: bewildered, rather than smug                      |
| Epilogue            | 扑去 → 扔雪球                                                                              | `grudvama gađali drvo`: throwing snowballs at a tree         |

Latin/full-width punctuation and whitespace were normalized where needed for rendering.
