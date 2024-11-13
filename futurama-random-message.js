// Futurama-style subtitle message, changes on every reload

const msgs = [
    "Brought to you using IP over VGA",
    "Powered by elisp serialized as xml jited to jvm running as eclipse plugin on a mac running in a virtual pc in a xen instance on a 286er",
    "Written with 16-space tabs",
    "Stored on an EQUMH RADDSI K    >C😀",
    "Also known as xrc3",
    "THIS SHIT DIDN'T WORK!!!!! Exit code: 0 (Success)",
    "Your browser crashing is not part of the website",
    "#1 most viewed website among scrapers",
    "24/7 uptime thanks to modifying the CPU to catch the triple faults",
    "Soon to be rewritten",
    "Veni, vidi, clickavi",
    "Use IA-64 instead of Itanium for best experience",
    "Supports PC/IX",
    "JavaScript execution completed in 140ms (CPU 2517853.4%)",
    "For optimal browsing, solder RESET pin to GND",
    "Hosted on NetBSD 10 for the SEGA Dreamcast",
    "Operating a time machine (Not talking about the Apple protocol)",
    "All videos on this website are edited using Finyal Cat Pro",
    "Now with losy txt cmpresion!",
    "CosmosOS is an illegal weapon of mass destruction. Stay away from it.",
    "Placing 4-figure bets on the winner of the Debian Art Contest since 2020"
];

function futuramaRandomMessage() {
    const i = Math.floor(Math.random() * msgs.length);
    document.getElementById("futurama-random-message").textContent = msgs[i];
}

// Call the function on page load
window.onload = futuramaRandomMessage;