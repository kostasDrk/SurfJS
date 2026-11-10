// browser.storage.local.clear();

var excludePatterns;
let init = async function(){
	// return;
	excludePatterns = [];
	let configs = await browser.storage.local.get(null); // Get all domain configs
	for(let host of Object.keys(configs)) setExcludePattersFromConfig(host, configs[host]);
	
	setContentScripts();
}

let setExcludePattersFromConfig = function(host, config){
	let hostPattern = `*://${host}/*`;

	if(config["disabled"]){
		excludePatterns.push(hostPattern); // Exclude entire host
		return; // No need to check for specific URLs
	}

	if("disabledPages" in config){
		for(let url of config["disabledPages"]){
			excludePatterns.push(`*://${url}`); // Exclude specific URLs
			excludePatterns.push(`*://${url}\?*`); // Account for URL parameters
			excludePatterns.push(`*://${url}#*`); // and fragments
		}
	}
}

let cleanUpContentScripts = async function(){
	await browser.scripting.unregisterContentScripts(); // remove all content scripts
}

let setContentScripts = async function(){
	await cleanUpContentScripts();

	await browser.scripting.registerContentScripts([{ // Initialization + sAPI generation in ISOLATED world
		"id" : "init",
		"js" : ["contentScripts/core/init.js"],
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludePatterns,
		"runAt" : "document_start",
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "ISOLATED"
	}]);

	await browser.scripting.registerContentScripts([{ // In-page initialization + surrogate APIs in MAIN world
		"id" : "main",
		"js" : ["contentScripts/core/surf.js", "contentScripts/core/API_refs.js",
			"contentScripts/APIs/cookies.js", "contentScripts/APIs/storage.js", "contentScripts/APIs/requests.js"],
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludePatterns,
		"runAt" : "document_start",
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "MAIN"
	}]);

	await browser.scripting.registerContentScripts([{ // In-page cleanup in ISOLATED world
		"id" : "cleanup",
		"js" : ["contentScripts/core/cleanup.js"],
		"runAt" : "document_start",
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludePatterns,
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "ISOLATED"
	}]);
}


browser.runtime.onStartup.addListener(async function(){ init(); }); // Set `excludePatterns` and initialize content scripts accordingly on startup,
browser.runtime.onInstalled.addListener(async function(){ init(); }); // when installed / reloaded,
browser.storage.local.onChanged.addListener(function(){ init(); }); // and when a config is changed from the popup or a settings page