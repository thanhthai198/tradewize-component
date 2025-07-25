export type Subtitle = {
  [key: string]: string;
};

export type LanguageCode =
  | 'aa'
  | 'ab'
  | 'ae'
  | 'af'
  | 'ak'
  | 'am'
  | 'an'
  | 'ar'
  | 'as'
  | 'av'
  | 'ay'
  | 'az'
  | 'ba'
  | 'be'
  | 'bg'
  | 'bi'
  | 'bm'
  | 'bn'
  | 'bo'
  | 'br'
  | 'bs'
  | 'ca'
  | 'ce'
  | 'ch'
  | 'co'
  | 'cr'
  | 'cs'
  | 'cu'
  | 'cv'
  | 'cy'
  | 'da'
  | 'de'
  | 'dv'
  | 'dz'
  | 'ee'
  | 'el'
  | 'en'
  | 'eo'
  | 'es'
  | 'et'
  | 'eu'
  | 'fa'
  | 'ff'
  | 'fi'
  | 'fj'
  | 'fo'
  | 'fr'
  | 'fy'
  | 'ga'
  | 'gd'
  | 'gl'
  | 'gn'
  | 'gu'
  | 'gv'
  | 'ha'
  | 'he'
  | 'hi'
  | 'ho'
  | 'hr'
  | 'ht'
  | 'hu'
  | 'hy'
  | 'hz'
  | 'ia'
  | 'id'
  | 'ie'
  | 'ig'
  | 'ii'
  | 'ik'
  | 'io'
  | 'is'
  | 'it'
  | 'iu'
  | 'ja'
  | 'jv'
  | 'ka'
  | 'kg'
  | 'ki'
  | 'kj'
  | 'kk'
  | 'kl'
  | 'km'
  | 'kn'
  | 'ko'
  | 'kr'
  | 'ks'
  | 'ku'
  | 'kv'
  | 'kw'
  | 'ky'
  | 'la'
  | 'lb'
  | 'lg'
  | 'li'
  | 'ln'
  | 'lo'
  | 'lt'
  | 'lu'
  | 'lv'
  | 'mg'
  | 'mh'
  | 'mi'
  | 'mk'
  | 'ml'
  | 'mn'
  | 'mr'
  | 'ms'
  | 'mt'
  | 'my'
  | 'na'
  | 'nb'
  | 'nd'
  | 'ne'
  | 'ng'
  | 'nl'
  | 'nn'
  | 'no'
  | 'nr'
  | 'nv'
  | 'ny'
  | 'oc'
  | 'oj'
  | 'om'
  | 'or'
  | 'os'
  | 'pa'
  | 'pi'
  | 'pl'
  | 'ps'
  | 'pt'
  | 'qu'
  | 'rm'
  | 'rn'
  | 'ro'
  | 'ru'
  | 'rw'
  | 'sa'
  | 'sc'
  | 'sd'
  | 'se'
  | 'sg'
  | 'si'
  | 'sk'
  | 'sl'
  | 'sm'
  | 'sn'
  | 'so'
  | 'sq'
  | 'sr'
  | 'ss'
  | 'st'
  | 'su'
  | 'sv'
  | 'sw'
  | 'ta'
  | 'te'
  | 'tg'
  | 'th'
  | 'ti'
  | 'tk'
  | 'tl'
  | 'tn'
  | 'to'
  | 'tr'
  | 'ts'
  | 'tt'
  | 'tw'
  | 'ty'
  | 'ug'
  | 'uk'
  | 'ur'
  | 'uz'
  | 've'
  | 'vi'
  | 'vo'
  | 'wa'
  | 'wo'
  | 'xh'
  | 'yi'
  | 'yo'
  | 'za'
  | 'zh'
  | 'zu';

// aa: Afar
// ab: Abkhazian
// ae: Avestan
// af: Afrikaans
// ak: Akan
// am: Amharic
// an: Aragonese
// ar: Arabic
// as: Assamese
// av: Avaric
// ay: Aymara
// az: Azerbaijani
// ba: Bashkir
// be: Belarusian
// bg: Bulgarian
// bi: Bislama
// bm: Bambara
// bn: Bengali
// bo: Tibetan
// br: Breton
// bs: Bosnian
// ca: Catalan
// ce: Chechen
// ch: Chamorro
// co: Corsican
// cr: Cree
// cs: Czech
// cu: Church Slavic
// cv: Chuvash
// cy: Welsh
// da: Danish
// de: German
// dv: Divehi
// dz: Dzongkha
// ee: Ewe
// el: Greek
// en: English
// eo: Esperanto
// es: Spanish
// et: Estonian
// eu: Basque
// fa: Persian
// ff: Fula
// fi: Finnish
// fj: Fijian
// fo: Faroese
// fr: French
// fy: Western Frisian
// ga: Irish
// gd: Gaelic (Scottish)
// gl: Galician
// gn: Guaraní
// gu: Gujarati
// gv: Manx
// ha: Hausa
// he: Hebrew
// hi: Hindi
// ho: Hiri Motu
// hr: Croatian
// ht: Haitian Creole
// hu: Hungarian
// hy: Armenian
// hz: Herero
// ia: Interlingua
// id: Indonesian
// ie: Interlingue
// ig: Igbo
// ii: Sichuan Yi
// ik: Inupiaq
// io: Ido
// is: Icelandic
// it: Italian
// iu: Inuktitut
// ja: Japanese
// jv: Javanese
// ka: Georgian
// kg: Kongo
// ki: Kikuyu
// kj: Kwanyama
// kk: Kazakh
// kl: Kalaallisut
// km: Khmer
// kn: Kannada
// ko: Korean
// kr: Kanuri
// ks: Kashmiri
// ku: Kurdish
// kv: Komi
// kw: Cornish
// ky: Kyrgyz
// la: Latin
// lb: Luxembourgish
// lg: Ganda
// li: Limburgish
// ln: Lingala
// lo: Lao
// lt: Lithuanian
// lu: Luba‑Katanga
// lv: Latvian
// mg: Malagasy
// mh: Marshallese
// mi: Māori
// mk: Macedonian
// ml: Malayalam
// mn: Mongolian
// mr: Marathi
// ms: Malay
// mt: Maltese
// my: Burmese
// na: Nauru
// nb: Norwegian Bokmål
// nd: North Ndebele
// ne: Nepali
// ng: Ndonga
// nl: Dutch
// nn: Norwegian Nynorsk
// no: Norwegian
// nr: South Ndebele
// nv: Navajo
// ny: Chichewa
// oc: Occitan
// oj: Ojibwa
// om: Oromo
// or: Oriya (Odia)
// os: Ossetian
// pa: Punjabi
// pi: Pāli
// pl: Polish
// ps: Pashto
// pt: Portuguese
// qu: Quechua
// rm: Romansh
// rn: Rundi
// ro: Romanian
// ru: Russian
// rw: Kinyarwanda
// sa: Sanskrit
// sc: Sardinian
// sd: Sindhi
// se: Northern Sami
// sg: Sango
// si: Sinhala
// sk: Slovak
// sl: Slovenian
// sm: Samoan
// sn: Shona
// so: Somali
// sq: Albanian
// sr: Serbian
// ss: Swati
// st: Southern Sotho
// su: Sundanese
// sv: Swedish
// sw: Swahili
// ta: Tamil
// te: Telugu
// tg: Tajik
// th: Thai
// ti: Tigrinya
// tk: Turkmen
// tl: Tagalog
// tn: Tswana
// to: Tonga
// tr: Turkish
// ts: Tsonga
// tt: Tatar
// tw: Twi
// ty: Tahitian
// ug: Uyghur
// uk: Ukrainian
// ur: Urdu
// uz: Uzbek
// ve: Venda
// vi: Vietnamese
// vo: Volapük
// wa: Walloon
// wo: Wolof
// xh: Xhosa
// yi: Yiddish
// yo: Yoruba
// za: Zhuang
// zh: Chinese
// zu: Zulu
