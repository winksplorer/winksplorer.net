function unTokenize(tokens) {
    return tokens.join(' ')
        .replace(/\s+([.,;:%!?])\s*/g, '$1 ')      // no space *before* punctuation
        .replace(/\s*([\[({«])\s+/g, '$1')         // no space *after* opener
        .replace(/\s+([\])}»])/g, '$1')            // no space before closer
        .replace(/\(/g, ' (')
        .replace(/\s+/g, ' ')                      // collapse leftovers
        .trim();
}

// gotta love chatgpt doing the work for you
function runMarkovModel(ngrams, n, maxWords = 50, start = null) {
    const keys = Object.keys(ngrams);
    if (keys.length === 0) return "";

    // Pick a starting context
    let current;
    if (start) {
        // Normalize and trim to last (n - 1) words
        const startTokens = start.trim().split(/\s+/);
        current = startTokens.slice(-n + 1).join(" ");

        // Fallback if not in model
        if (!ngrams[current]) {
            console.warn(`Start "${current}" not found, picking random seed.`);
            current = keys[Math.floor(Math.random() * keys.length)];
        }
        } else current = keys[Math.floor(Math.random() * keys.length)];

        const output = current.split(" ");

        for (let i = 0; i < maxWords - (n - 1); i++) {
        const possibilities = ngrams[current];
        if (!possibilities || possibilities.length === 0) break;

        let next;
        if (Math.random() < 0.9) {
            // Weighted choice toward common words
            next = possibilities[Math.floor(Math.random() * possibilities.length)];
        } else {
            // Inject chaos: choose a rare one
            const unique = [...new Set(possibilities)];
            next = unique[Math.floor(Math.random() * unique.length)];
        }

        output.push(next);

        // Update context window
        current = output.slice(-n + 1).join(" ");
    }

    const sentenceEnd = output.findLastIndex(w => /[.?!]/.test(w));
    if (sentenceEnd > 0 && sentenceEnd < output.length - 3) {
        return unTokenize(output.slice(0, sentenceEnd + 1));
    }

    return unTokenize(output);
}

// starting tokens
const msgs = {
    'base': [
        'Very early in', 'According to interviews',
        'Over the long', 'The effects of',
        'The creation of', 'At the time',
        'The fall of', 'As development progressed',
    ],
    'ai': [
        'AI is used', 'Vibe coding is',
        'Major venture capital', 'OpenAI is an'
    ],
    'osdev-geopolitics': [
        'See Memory Map', 'A variety of',
        'The idea behind', 'First of all',
        'ELF is a', 'At the time',
        'To access a', 'Programmers often think'
    ]
};

let n = 0;
let ngrams = {};
let selectedModel = '';

// listen for model change
document.getElementById('model').addEventListener('change', function (e) {
    if (!e.target.value || !Object.keys(msgs).includes(e.target.value)) return;

    // disable the run button
    document.getElementById('runBtn').setAttribute('disabled', '');

    // download the markov chain
    fetch(`${e.target.value}.bin`)
        .then(res => res.ok ? res.arrayBuffer() : Promise.reject(`HTTP ${res.status}`))
        .then(arrbuf => {
            const data = msgpack.deserialize(arrbuf); // parse the binary data into an object
            n = data['n'];
            ngrams = data['ngrams'];
            selectedModel = e.target.value

            // enable the run button
            document.getElementById('runBtn').removeAttribute('disabled');
        })
        .catch(err => {
            console.error('could not download model', err);
            document.getElementById('result').textContent = `could not download model: ${err}`;
        });
});

function runPmc4() {
    const result = runMarkovModel(
        ngrams, // markov chain
        n, // "context"
        document.getElementById('tokens').value, // how many tokens to generate
        msgs[selectedModel][Math.floor(Math.random() * msgs[selectedModel].length)]); // starting tokens (must be n-1 tokens)
    
    // set result
    document.getElementById('result').textContent = result;
}