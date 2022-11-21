const input = document.getElementById("input");
const submit = document.getElementById("submit");
const error = document.getElementById("error");
const outputA = document.getElementById("outputA");
const outputB = document.getElementById("outputB");

const showError = ( message ) => {
    if (error.classList.contains("hidden")) error.classList.remove("hidden");
    if (!outputA.classList.contains("hidden")) outputA.classList.add("hidden");
    if (!outputB.classList.contains("hidden")) outputB.classList.add("hidden");
    error.innerHTML = "*" + message;
    outputA.innerHTML = "";
    outputB.innerHTML = "";
};

const customTrim = ( phrase ) => {
    return phrase.trim().replace(/\s+/g, " ");
};

const FormatWordsForYOu = ( phrase ) => {
    let re = new RegExp(Object.keys(replaceKeywords).join("|"), "gi");
    return phrase.replace( re, (matched) => {
        return replaceKeywords[matched];
    });
};

const analyze = ( userInput ) => {
    if (userInput === "") {
        showError("الحقل فارغ");
    } else if (userInput.length > 2048) {
        showError("يرجى إدخال عدد حروف أقل");
    } else {

        if (!error.classList.contains("hidden")) error.classList.add("hidden");
        error.innerHTML = "";

        // Validate Arabic chars and formations.
        let userAlphabets = "";
        let userFormatedAlphabets = "";
        for ( let index in userInput ) {
            char = userInput[index];
            charBefore = index-1 > -1 ? userInput[index-1]: "";
            if (char === " ") {
                if (charBefore !== " ") {
                    userAlphabets += char;
                    userFormatedAlphabets += char;
                }
            } else if (FORMATIONS.includes(char)) {
                if (![" ", ""].includes(charBefore)) {
                    if (charBefore === DOUBLE_FORMATION) {
                        if (![SILENT_FORMATION, DOUBLE_FORMATION].includes(char)) userFormatedAlphabets += char;
                    } else if (!FORMATIONS.includes(charBefore)) {
                        userFormatedAlphabets += char;
                    }
                }
            } else if (ALPHABETS.includes(char)) {
                userAlphabets += char;
                userFormatedAlphabets += char;
            }
        }

        // Remove unwanted spaces.
        userAlphabets = customTrim(userAlphabets);
        userFormatedAlphabets = customTrim(userFormatedAlphabets);

        if (!userAlphabets.length) {
            showError("لم يتم العثور على أحرف عربية!");
            return;
        }

        // Validate Starting Words
        let userWords = userAlphabets.split(" ");
        for ( word of userWords ) {
            if (NONE_STARTABLE_CHARS.includes(word[0])) {
                startingError = `لا يمكن البدء بـ"${word[0]}"`;
                if (word.length > 1) startingError += ` في كلمة "${word}"`;
                showError(startingError);
                return;
            }
        }

        input.value = userFormatedAlphabets;
        userFormatedAlphabets = FormatWordsForYOu(userFormatedAlphabets);

        let outputAlphabets = "";
        let outputBinary = "";

        for ( let i in userFormatedAlphabets ) {
            i = parseInt(i);
            let charBefore = userFormatedAlphabets[i-1];
            let char = userFormatedAlphabets[i];
            let charAfter = userFormatedAlphabets[i+1];
            if ( ALPHABETS.includes(char) || char === " " ) {
                if ( char === " " ) {
                    outputAlphabets += " ";
                    outputBinary += " ";
                } else if ( !charBefore ) {
                    // First char.
                    // Can't start with silent.
                    outputAlphabets += char;
                    outputBinary += "/";
                } else if ( SILENT_FORMATION === charAfter ) {
                    outputAlphabets += char;
                    outputBinary += "O";
                } else if ( VOWEL_FORMATIONS.includes(charAfter) ) {
                    outputAlphabets += char;
                    outputBinary += "/";
                } else if ( charAfter === DOUBLE_FORMATION ) {
                    outputAlphabets += char + char;
                    outputBinary += "O/";
                } else if (!charAfter) {
                    outputAlphabets += char;
                    outputBinary += "O";
                } else {
                    // Couldn't detect.
                    outputAlphabets += `<span class="notice">${char}</span>`;
                    outputBinary += '<span class="notice">_</span>';
                }
            }
        }

        if ( outputAlphabets ) {
            outputA.innerHTML = outputAlphabets;
            if (outputA.classList.contains("hidden")) outputA.classList.remove("hidden");
        }

        if ( outputBinary.trim() ) {
            outputB.innerHTML = outputBinary;
            if (outputB.classList.contains("hidden")) outputB.classList.remove("hidden");
        }

    }
};

submit.addEventListener("click", () => { analyze(input.value); });
input.addEventListener("keypress", (e) => { if (e.key === "Enter") analyze(e.target.value); });