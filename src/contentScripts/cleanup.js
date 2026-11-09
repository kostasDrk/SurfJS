if(document.scripts[0] && document.scripts[0].id == "surfjsInit" && document.scripts[0].getAttribute("sAPI") == sAPI) document.scripts[0].remove(); // remove sAPI-bearing dummy script

const cleanupEvent = new Event("cleanupEvent_" + sAPI);
document.dispatchEvent(cleanupEvent);