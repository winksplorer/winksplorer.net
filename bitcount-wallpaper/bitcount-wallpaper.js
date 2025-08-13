const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// converts a number into an array, based on bits. 0001 = [0, 0, 0, 1]
function expandToBits(n, bits) {
    const out = Array(bits).fill(0);
    for (let i = 0; i < bits; i++) out[i] = (n >> i) & 1;
    return out.reverse();
}

// gets input values from the page and formats them correctly
function getInputs() {
    const inputs = {'bitCount': 0, 'width': 1, 'height': 1, 'zero': '', 'one': '', 'starting': 0, 'rowHeight': 1};

    for (const key of Object.keys(inputs)) {
        const val = document.getElementById(key).value;
        inputs[key] = typeof inputs[key] === 'number' ? Math.round(Number(val)) || inputs[key] : val;
    }

    return inputs;
}

// updates the info text
function updateInfo() {
    const inputs = getInputs();
    document.getElementById('info').textContent =
        `Showing numbers ${inputs.starting}-${inputs.starting + inputs.height / inputs.rowHeight}. ${inputs.bitCount}-bit maximum is ${1 << inputs.bitCount}`;
}

// generates the actual pattern
function generateWallpaper() {
    const inputs = getInputs();

    // set size
    canvas.width = inputs.width;
    canvas.height = inputs.height;

    window.onresize = () => canvas.style.height = `${(inputs.height / inputs.width) * parseInt(getComputedStyle(canvas).width)}px`;
    window.onresize();

    // clear
    ctx.fillStyle = inputs.zero;
    ctx.fillRect(0, 0, inputs.width, inputs.height);

    // pre-calc expensive division, and set color
    const rows = inputs.height / inputs.rowHeight;
    const colWidth = inputs.width / inputs.bitCount;
    ctx.fillStyle = inputs.one;

    // go through every row (the numbers)
    for (let r = 0; r < rows; r++) {
        // get bits and fill rectangles for ones
        const bits = expandToBits(inputs.starting + r, inputs.bitCount);
        for (let b = 0; b < inputs.bitCount; b++)
            if (bits[b]) ctx.fillRect(b * colWidth, r * inputs.rowHeight, colWidth, inputs.rowHeight);
    }
}

// update info every time an associated input is changed
document.querySelectorAll('.effectsInfo').forEach(el => {
    el.addEventListener('input', updateInfo);
});
