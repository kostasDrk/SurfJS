let log = function(msg){
	console.log(`[SurfJS] ${msg}`);
}

let warn = function(msg){
	console.warn(`[SurfJS] ${msg}`);
}

let error = function(msg){
	console.error(`[SurfJS] ${msg}`);
}

let uuidv4 = function () {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

if(window.frameElement && window.frameElement.getAttribute("sandbox") && !window.frameElement.getAttribute("sandbox").includes("allow-scripts")) console.warn("Not setting up in sandboxed frame (no `allow-scripts` set)");
else{
	if(window.self === window.top) var sAPI = uuidv4().replaceAll("-", "_"); // Generate new `sAPI` secret token for top-level documents
	else{
	    try{ var sAPI = window.top.sAPI; } // For same-origin nested frames, get the token from the top-level frame
	    catch(err){ var sAPI = uuidv4().replaceAll("-", "_"); } // For cross-origin frames, generate new token
	}

	warn(`sAPI: ${sAPI}`)

	/** Attach dummy script for passing sAPI in MAIN world content scripts. After sAPI has
	    been retrieved by all content scripts, this script is removed before any other JS code
	    executes in the page, so as to not leave traces of sAPI (see `cleanup.js`) **/
	var script = document.createElement("script");
	script.textContent = ``;
	script.id = "surfjsInit";
	script.setAttribute("sAPI", sAPI);
	document.documentElement.append(script);
}
