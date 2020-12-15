const input = document.querySelector('#permuteInput');
const list = document.querySelector('.list');

class Permute {
    value = '';

    constructor() {
        window.addEventListener('keyup', (e) => {
            if (e.code == 'Slash') {
                input.focus();
            }
        })
    }

    setValue = e => {
        this.value = e;
    }

    findPermute = input => {
        //We Save all the items in the array
        let possiblePermutation = [];

        if (input.length === 0) return '';
        if (input.length == 1) return `Sorry there's not much we can do about one character 😁`;

        //Permute dor two character
        let twoChar = input.split('');
        if (input.length == 2) return [input, twoChar[1] + twoChar[0]];

        input.split('').forEach((chr, idx, arr) => {
            let sub = [].concat(arr); // "clone" arr
            sub.splice(idx, 1);
            this.findPermute(sub.join('')).forEach(newOnes => possiblePermutation.push(chr + newOnes));
        });

        return possiblePermutation;
    }

    renderHtml = () => {
        let data = this.findPermute(this.value);
        if (!Array.isArray(data)) {
            list.innerHTML = `<p>${data}</p>`;
        }

        data.forEach(item => {
            list.insertAdjacentHTML('afterbegin', `<li>${item}</li>`)
        })
    }
}


const permute = new Permute();

input.addEventListener('input', (e) => {
    list.innerHTML = '';
    permute.setValue(input.value);
    permute.renderHtml();
})

