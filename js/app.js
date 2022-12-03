// HTML Constants
const navLinks = document.querySelector(".nav__links");
const formInput = document.getElementById("input");
const submitButton = document.getElementById("submit");
const errorMessage = document.getElementById("error");
const outputA = document.getElementById("outputA");
const outputB = document.getElementById("outputB");
const outputI = document.getElementById("outputI");

const reFormat = ( data, alike )  => {
    data = data.replace(/\s/g, "");
    let formated = "";
    let z = 0;
    for ( let char of alike ) {
        if (ALPHABETS.includes(char)) {
            formated += data[z];
            z++;
        } else if ( [" ", "*"].includes(char) ) {
            formated += char;
        }
    }
    return formated;
};

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
        if (outputI.classList.contains("hidden")) outputI.classList.remove("hidden");
    } else {
        if (!outputA.classList.contains("hidden")) outputA.classList.add("hidden");
        if (!outputB.classList.contains("hidden")) outputB.classList.add("hidden");
        if (!outputI.classList.contains("hidden")) outputI.classList.add("hidden");
    }

    if (action === "result" && data.echo_sound) {
        data.alphabetsOut = reFormat(data.alphabetsOut, data.echo_sound);
        data.binaryOut = reFormat(data.binaryOut, data.echo_sound);
    }

    errorMessage.innerHTML = action === "error"? data.error: "";
    outputA.innerHTML = action === "result"? data.alphabetsOut: "";
    outputB.innerHTML = action === "result"? data.binaryOut: "";
    outputI.innerHTML = action === "result"? data.htmlData: "";
};

const showError = ( message ) => { updateGUI( "error", { error: "*" + message } ); };

const cleanUpConfetti = () => {
    document.getElementById("celebrate").innerHTML = "";
};

let Timer = null;

const celebrate = () => {

    // Thanks to <3 https://codepen.io/kareem-mahmoud/embed/abpamZp/
    for( let i=0; i<100; i++) {
        let randomRotation = Math.floor(Math.random()*360);
        let randomScale = Math.random()*1;
        let randomWidth = Math.floor(Math.random()*Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        let randomHeight =  Math.floor(Math.random()*Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
        let randomAnimationDelay = Math.floor(Math.random()*5);
        let colors = ["#0CD977", "#FF1C1C", "#FF93DE", "#5767ED", "#FFC61C", "#8497B0"];
        let randomColor = colors[Math.floor(Math.random()*colors.length)];

        // let's Rain
        let confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.top = `${randomHeight}px`;
        confetti.style.right = `${randomWidth}px`;
        confetti.style.backgroundColor = randomColor;
        confetti.style.obacity = randomScale;
        confetti.style.transform = `skew(15deg) rotate(${randomRotation}deg)`;
        confetti.style.animationDelay = `${randomAnimationDelay}s`;
        document.getElementById("celebrate").appendChild(confetti);

        // CleanUp
        clearTimeout(Timer);
        Timer = window.setTimeout( cleanUpConfetti, 5000);

    }
};

const percentageHTML = ( percent, name ) => {
    let color = `hsl(122, 90%, ${30+(100-percent)}%)`;
    return `<div>
                <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <g stroke="${color}">
                <path class="circle"
                    stroke-dasharray="${percent}, 100" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                </g>
                <text x="18" y="20.5" fill="${color}" class="percentage">${percent}%</text>
                </svg><p>${name}</p>
            </div>`;
};

const bahrChecker = ( realBinary ) => {

    let htmlData = "";
    let echo_sound = "";

    let similarity = [];

    // Check Similarity of each bahr
    for ( let bahr of Object.keys(BEHOOR) ) {
        let score = 0;
        let checkA = bahr.length >= realBinary.length? bahr: realBinary; // Longer
        let checkB = bahr.length >= realBinary.length? realBinary: bahr; // Shorter
        for ( let i in checkA ) {
            i = parseInt(i);
            if (checkA[i] === checkB[i]) score++;
        }
        score = ((score/checkA.length)*100).toFixed(2);
        let hold = BEHOOR[bahr];
        hold.score = parseFloat(score);
        similarity.push(hold);
    }

    // Sort by max score
    similarity = similarity.sort( (x, y) => {
        if (x.score < y.score) return 1;
        if (x.score > y.score) return -1;
        return 0;        
    });

    if ( similarity[0].score === 100.00 ) {
        // Bahr found
        celebrate();
        echo_sound = similarity[0].echo_sound;
        htmlData = `<i>${echo_sound}</i>`;
        htmlData += `<i class="green">${similarity[0].name}</i>`;
        htmlData += `<i class="hint">${similarity[0].notes}</i>`;
    } else if ( realBinary.length >= 20 ) {

        let helper = [
            "حاول تشكيل بعض الحروف",
            "تأكد من إدخال البيت بشكل صحيح"
        ];

        htmlData = `<i class="notice">عفواً لم يتم العثور على البحر، ${helper[Math.floor(Math.random()*helper.length)]}</i>`;

        if ( similarity[0].score >= 75 ) {
            let percentageDiv = '<div id="percentageContainer">';
            percentageDiv += percentageHTML(similarity[0].score, similarity[0].name);
            if ( similarity[1].score >= 75 ) {
                percentageDiv += percentageHTML(similarity[1].score, similarity[1].name);
                if ( similarity[2].score >= 75 ) {
                    percentageDiv += percentageHTML(similarity[2].score, similarity[2].name);
                }
            }
            percentageDiv += "</div>";
            htmlData += percentageDiv;
        }

    }

    return { htmlData, echo_sound };

};

const forceFormat = ( userInput ) => {
    let re = new RegExp(Object.keys(MODIFIED_KEYWORDS).join("|"), "gi");
    return userInput.replace( re, (matched) => {
        return MODIFIED_KEYWORDS[matched];
    });
};

const processData = ( data ) => {
    let alphabetsOut = "";
    let binaryOut = "";
    let realBinary = "";

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
                realBinary += "/";
            } else if ( DOUBLE_VOWEL_FORMATIONS.includes(data[i+1]) ) {
                if (data[i] === A) {
                    alphabetsOut += N;
                    binaryOut += "O";
                    realBinary += "O";
                } else {
                    alphabetsOut += data[i] + N;
                    binaryOut += "/O";
                    realBinary += "/O";
                }
            } else if ( data[i+1] === DOUBLE_FORMATION ) {
                // Doubled char
                alphabetsOut += data[i] + data[i];
                binaryOut += "O/";
                realBinary += "O/";
                if (DOUBLE_VOWEL_FORMATIONS.includes(data[i+2])) {
                    // Doubled with double formation
                    alphabetsOut += N;
                    binaryOut += "O";
                    realBinary += "O";
                }
            } else if ( VOWEL_FORMATIONS.includes(data[i+1]) ) {
                // Vowel Char
                alphabetsOut += data[i];
                binaryOut += "/";
                realBinary += "/";
            } else if ( data[i+1] === SILENT_FORMATION ) {
                // Silent Char
                alphabetsOut += data[i];
                binaryOut += "O";
                realBinary += "O";
            } else if ( ! data[i+1] ) {
                // Last Alphabet
                alphabetsOut += data[i];
                binaryOut += "O";
                realBinary += "O";
            } else {
                // Couldn't detect.
                alphabetsOut += `<span class="notice">${data[i]}</span>`;
                binaryOut += '<span class="notice">_</span>';
                realBinary += "_";
            }
        }
    }

    let bahrInfo = bahrChecker(realBinary);

    updateGUI("result", { alphabetsOut, binaryOut, htmlData: bahrInfo.htmlData, echo_sound: bahrInfo.echo_sound });
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
    return validatedChars.trim().replace(/\s/g, " ");
};

const validate = ( userData ) => {

    updateGUI("clean");
    cleanUpConfetti();

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

        processData(forceFormat(userData));

    }
};

// Listen on navigation
navLinks.addEventListener("click", (e) => {
    if (e.target.nodeName === "A") {
        for ( let li of navLinks.children ) {
            let a = li.querySelector("a");
            let showDiv = document.getElementById(a.id.replace("nav_",""));
            if (a.id === e.target.id) {
                if (!a.classList.contains("acitve")) a.classList.add("active");
                if (showDiv.classList.contains("hidden")) showDiv.classList.remove("hidden");
            } else {
                if (a.classList.contains("active")) a.classList.remove("active");
                if (!showDiv.classList.contains("hidden")) showDiv.classList.add("hidden");
            }
        }
    }
});

// Listen on submit
submitButton.addEventListener("click", () => { validate(input.value); });
formInput.addEventListener("keypress", (e) => { if (e.key === "Enter") validate(e.target.value); });
