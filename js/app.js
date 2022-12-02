// HTML Constants
const formInput = document.getElementById("input");
const submitButton = document.getElementById("submit");
const errorMessage = document.getElementById("error");
const outputA = document.getElementById("outputA");
const outputB = document.getElementById("outputB");

const updateGUI = ( action, data )  => {
    // Update HTML GUI and show data

    if (action === "error") {
        if (errorMessage.classList.contains("hidden")) errorMessage.classList.remove("hidden");
    } else {
        if (!errorMessage.classList.contains("hidden")) errorMessage.classList.add("hidden");
    }

    if (action === "result") {
        if (outputA.classList.contains("hidden")) outputA.classList.remove("hidden");
        if (outputB.classList.contains("hidden")) outputB.classList.remove("hidden");
    } else {
        if (!outputA.classList.contains("hidden")) outputA.classList.add("hidden");
        if (!outputB.classList.contains("hidden")) outputB.classList.add("hidden");
    }

    errorMessage.innerHTML = action === "error"? data.error: "";
    outputA.innerHTML = action === "result"? data.alphabetsOut: "";
    outputB.innerHTML = action === "result"? data.binaryOut: "";
};

const showError = ( message ) => { updateGUI( "error", { error: "*" + message } ); };

const processData = ( data ) => {
    let alphabetsOut = "";
    let binaryOut = "";

    for ( let i in data ) {
        i = parseInt(i);
        if ( data[i] === " " ) {
            alphabetsOut += " ";
            binaryOut += " ";
        } else if ( ALPHABETS.includes(data[i]) ) {
            if ( ! data[i-1] ) {
                // First char Can't start with silent
                alphabetsOut += data[i];
                binaryOut += "/";
            } else if ( DOUBLE_VOWEL_FORMATIONS.includes(data[i+1]) ) {
                if (data[i] === A) {
                    alphabetsOut += N;
                    binaryOut += "O";
                } else {
                    alphabetsOut += data[i] + N;
                    binaryOut += "/O";
                }
            } else if ( data[i+1] === DOUBLE_FORMATION ) {
                // Doubled char
                alphabetsOut += data[i] + data[i];
                binaryOut += "O/";
                if (DOUBLE_VOWEL_FORMATIONS.includes(data[i+2])) {
                    // Doubled with double formation
                    alphabetsOut += N;
                    binaryOut += "O";
                }
            } else if ( VOWEL_FORMATIONS.includes(data[i+1]) ) {
                // Vowel Char
                alphabetsOut += data[i];
                binaryOut += "/";
            } else if ( data[i+1] === SILENT_FORMATION ) {
                // Silent Char
                alphabetsOut += data[i];
                binaryOut += "O";
            } else if ( ! data[i+1] ) {
                // Last Alphabet
                alphabetsOut += data[i];
                binaryOut += "O";
            } else {
                // Couldn't detect.
                alphabetsOut += `<span class="notice">${data[i]}</span>`;
                binaryOut += '<span class="notice">_</span>';
            }
        }
    }

    updateGUI("result", { alphabetsOut, binaryOut });
};

const validateChars = ( userData ) => {
    let validatedChars = "";
    for (let i in userData) {
        i = parseInt(i);
        if ([" ", ...ALPHABETS].includes(userData[i])) {
            // All Arabic Alphabets are allowed
            validatedChars += userData[i];
        } else if (FORMATIONS.includes(userData[i])) {
            // Formations only allowed if there is a [ALPHABETS or DOUBLE_FORMATION] before it
            if (ALPHABETS.includes(userData[i-1])) {
                validatedChars += userData[i];
            } else if (userData[i-1] === DOUBLE_FORMATION && ![DOUBLE_FORMATION, SILENT_FORMATION].includes(userData[i])) {
                validatedChars += userData[i];
            }
        }
    };
    return validatedChars.trim().replace(/\s+/g, " ");
};

const validate = ( userData ) => {

    updateGUI("clean");

    if (userData === "") {
        showError("الحقل فارغ");
    } else if (userData.length > 2048) {
        showError("يرجى إدخال عدد حروف أقل");
        formInput.value = "";
    } else {

        // Validate the input
        userData = validateChars(userData);
        formInput.value = userData;

        if (userData === "") {
            showError("لم يتم العثور على أحرف عربية!");
            return;
        }

        // Check the starting of each word
        let userWords = userData.split(" ");

        for ( let word of userWords ) {
            if (NONE_STARTABLE_CHARS.includes(word[0])) {
                if (word.length > 1) {
                    showError(`لا يمكن البدء بـ"${word[0]}" في "${word}"`);
                } else {
                    showError(`حرف "${word}" غير مستخدم في كلمة`);
                }
                return;
            } else if (word.includes(AA)) {
                showError(`لا يمكن تضعيف الألف  "${word}"`);
                return;
            }
        }

        processData(userData);

    }
};

// Listen on submit
submitButton.addEventListener("click", () => { validate(input.value); });
formInput.addEventListener("keypress", (e) => { if (e.key === "Enter") validate(e.target.value); });

/*
const FormatWordsForYOu = ( phrase ) => {
    let re = new RegExp(Object.keys(MODIFIED_KEYWORDS).join("|"), "gi");
    return phrase.replace( re, (matched) => {
        return MODIFIED_KEYWORDS[matched];
    });
};
*/