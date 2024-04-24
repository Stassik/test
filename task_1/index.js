import { encoded, translations } from './data.js'
const idList = new Set();

decodingObjectKeys(encoded);
console.log(encoded);
console.log(idList);


function decodingObjectKeys(array) {
    array.forEach(element => {
        for (const key in element) {
            idList.add(key);
            const lastLetters = key.slice(-2);
            if (lastLetters.toLowerCase() === 'id' && key !== 'groupId' && key !== 'service' && key !== 'ca' && key !== 'formatSize') {
                element[key] = translations[element[key]];
            }
        }

    });
}

