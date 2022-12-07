const BEHOOR = {};

const ECHO_SOUNDS = {
    "فَعُوْلُنْ": {
        "echo": "//O/O",
        "info": "صحيح"
    },
    "فَعُوْلُ": {
        "echo": "//O/",
        "info": "مقبوض"
    },
    "فَعُوْلْ": {
        "echo": "//OO",
        "info": "مقصور"
    },
    "فَعُوْ": {
        "echo": "//O",
        "info": "محذوف"
    },
    "فَعْ": {
        "echo": "/O",
        "info": "أبتر"
    }
};

const addBahr = (echo_nums, inner = [], last1 = [], last2 = [], name = "") => {
    if ([8,6].includes(echo_nums)) {
        for (let i of inner) {
            for (let i2 of inner) {
                for (let i3 of echo_nums==6?last1:inner) {
                    for (let i4 of echo_nums==8?last1:inner) {
                        for (let i5 of inner) {
                            for (let i6 of echo_nums==6?last2:inner) {
                                if (echo_nums==6) {
                                    BEHOOR[ECHO_SOUNDS[i].echo+ECHO_SOUNDS[i2].echo+ECHO_SOUNDS[i3].echo+ECHO_SOUNDS[i4].echo+ECHO_SOUNDS[i5].echo+ECHO_SOUNDS[i6].echo] = {
                                        name,
                                        "echo_sound": `${i} ${i2} ${i3} *** ${i4} ${i5} ${i6}`,
                                        "notes": `العروض ${ECHO_SOUNDS[i3].notes+"ة"}، والضرب ${ECHO_SOUNDS[i6].notes}`
                                    };
                                } else {
                                    for (let i7 of inner) {
                                        for (let i8 of last2) {
                                            BEHOOR[ECHO_SOUNDS[i].echo+ECHO_SOUNDS[i2].echo+ECHO_SOUNDS[i3].echo+ECHO_SOUNDS[i4].echo+ECHO_SOUNDS[i5].echo+ECHO_SOUNDS[i6].echo+ECHO_SOUNDS[i7].echo+ECHO_SOUNDS[i8].echo] = {
                                                name,
                                                "echo_sound": `${i} ${i2} ${i3} ${i4} *** ${i5} ${i6} ${i7} ${i8}`,
                                                "notes": `العروض ${ECHO_SOUNDS[i4].info+"ة"}، والضرب ${ECHO_SOUNDS[i8].info}`
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

addBahr(
    8,
    ["فَعُوْلُنْ","فَعُوْلُ"],
    ["فَعُوْلُنْ","فَعُوْ","فَعُوْلُ","فَعُوْلْ"],
    ["فَعُوْلُنْ","فَعُوْلْ","فَعُوْ","فَعْ"],
    "بحر المتقارب التام"
);

addBahr(
    6,
    ["فَعُوْلُنْ","فَعُوْلُ"],
    ["فَعُوْ"],
    ["فَعُوْ","فَعْ"],
    "بحر المتقارب المجزوء"
);
