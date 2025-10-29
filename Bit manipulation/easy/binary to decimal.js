


const binToDec = (str) => {
    let p2 = 1
    num = 0
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === '1') {
            num += p2
        }

        p2 *= 2
    }

    return num

}