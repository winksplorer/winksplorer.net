// Futurama-style subtitle message, changes on every reload

const msgs = [
    "Brought to you using IP over VGA",
    "Powered by elisp serialized as xml jited to jvm running as eclipse plugin on a mac running in a virtual pc in a xen instance on a 286er",
    "Written with 16-space tabs",
    "Stored on an EQUMH RADDSI K    >C😀",
    "Your browser crashing is not part of the website",
    "#1 most viewed website among scrapers",
    "Soon to be rewritten",
    "Supports PC/IX",
    "Hosted on NetBSD 10 for the SEGA Dreamcast",
    "Now with losy txt cmpresion!",
    "Placing 4-figure bets on the winner of the Debian Art Contest since 2020"
];

window.onload = () => 
    document.getElementById("futurama-random-message").textContent
    = msgs[Math.floor(Math.random() * msgs.length)];