const A = "ا";

const AA = "اّ";

const N = "ن";

const NONE_STARTABLE_CHARS = [
    "ة",
    "ؤ",
    "ئ",
    "ى"
];

const ALPHABETS = [
    "ء",
    A,
    "أ",
    "آ",
    "إ",
    "ب",
    "ت",
    "ث",
    "ج",
    "ح",
    "خ",
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
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "ل",
    "م",
    N,
    "ه",
    "و",
    "ي",
    ...NONE_STARTABLE_CHARS
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
    "يا": "يَا"
};
