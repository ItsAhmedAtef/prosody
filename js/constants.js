const A = "ا";

const AA = "اّ";

OPENED_T = "ت";

CLOSED_T = "ة";

const L = "ل";

const N = "ن";

const NONE_STARTABLE_CHARS = [
    CLOSED_T,
    "ؤ",
    "ئ",
    "ى"
];

const MOON_CHARS = [
    "ء",
    "أ",
    A,
    "آ",
    "إ",
    "ب",
    "ج",
    "ح",
    "خ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "م",
    "ه",
    "و",
    "ي"
];

const SUN_CHARS = [
    OPENED_T,
    "ث",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    L,
    N
]

const ALPHABETS = [
    ...NONE_STARTABLE_CHARS,
    ...MOON_CHARS,
    ...SUN_CHARS
];

const VOWEL_FORMATIONS = [
    "َ", // فتحة
    "ِ", // كسرة
    "ُ" // ضمة
];

const DOUBLE_VOWEL_FORMATIONS = [
    "ً", // تنوين الفتح
    "ٍ", // تنوين الكسر
    "ٌ" // تنوين الضم
];

const SILENT_FORMATION = "ْ"; // سكون

const DOUBLE_FORMATION = "ّ" // شدة

const FORMATIONS = [
    ...VOWEL_FORMATIONS,
    ...DOUBLE_VOWEL_FORMATIONS,
    SILENT_FORMATION,
    DOUBLE_FORMATION
];

const MODIFIED_KEYWORDS = {

    "هذا": "هَاْذَا",
    "هَذا": "هَاْذَا",
    "هذَا": "هَاْذَا",
    "هَذَا": "هَاْذَا",
    "هؤلاء": "هَاْؤُلَاْء",
    "هَؤلاء": "هَاْؤُلَاْء",
    "هؤُلاء": "هَاْؤُلَاْء",
    "هؤلَاء": "هَاْؤُلَاْء",
    "هؤلاْء": "هَاْؤُلَاْء",
    "هَؤُلاء": "هَاْؤُلَاْء",
    "هَؤلَاء": "هَاْؤُلَاْء",
    "هَؤلاْء": "هَاْؤُلَاْء",
    "هؤُلَاء": "هَاْؤُلَاْء",
    "هؤُلاْء": "هَاْؤُلَاْء",
    "هؤلَاْء": "هَاْؤُلَاْء",
    "هَؤُلَاء": "هَاْؤُلَاْء",
    "هَؤُلاْء": "هَاْؤُلَاْء",
    "هَؤلَاْء": "هَاْؤُلَاْء",
    "هؤُلَاْء": "هَاْؤُلَاْء",
    "هَؤُلَاْء": "هَاْؤُلَاْء",
    "ذلك": "ذَاْلِك",
    "ذَلك": "ذَاْلِك",
    "ذلِك": "ذَاْلِك",
    "ذَلِك": "ذَاْلِك",
    // حروف المد المحذوفة

    "أولئك": "أُلَاْئِك",
    "أُولئك": "أُلَاْئِك",
    "أوْلئك": "أُلَاْئِك",
    "أولَئك": "أُلَاْئِك",
    "أولئِك": "أُلَاْئِك",
    "أُوْلئك": "أُلَاْئِك",
    "أُولَئك": "أُلَاْئِك",
    "أُولئِك": "أُلَاْئِك",
    "أوْلَئك": "أُلَاْئِك",
    "أوْلئِك": "أُلَاْئِك",
    "أولَئِك": "أُلَاْئِك",
    "أُوْلَئك": "أُلَاْئِك",
    "أُوْلئِك": "أُلَاْئِك",
    "أُولَئِك": "أُلَاْئِك",
    "أوْلَئِك": "أُلَاْئِك",
    "أُوْلَئِك": "أُلَاْئِك",
    // الحروف التي تزداد في الخط لا يعتد بها في الكتابة العروضية

    "لا": "لَا",
    "ما": "مَا",
    "يا": "يَا",
    "سا": "سَا",
    // حروف قبل الألف تكون مفتوحة

};
