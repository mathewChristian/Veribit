


hexEncode(str) {
    let arr1 = [];
    let hex = '';
    for (let n = 0, l = str.length; n < l; n++) {
        hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}


ConvertToHEx(val) {
    let str = '0x' + this.hexEncode(val);
    console.log(str);
    return str;
};
