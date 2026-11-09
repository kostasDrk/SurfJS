
let cleanUpContentScripts = async function(){
	await chrome.scripting.unregisterContentScripts(); // remove all content scripts
}

let setContentScripts = async function(excludeMatchesPatterns){
	await cleanUpContentScripts();

	await chrome.scripting.registerContentScripts([{ // Initialization + sAPI generation in ISOLATED world
		"id" : "init",
		"js" : ["contentScripts/core/init.js"],
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludeMatchesPatterns,
		"runAt" : "document_start",
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "ISOLATED"
	}]);

	await chrome.scripting.registerContentScripts([{ // In-page initialization + surrogate APIs in MAIN world
		"id" : "main",
		"js" : ["contentScripts/core/surf.js", "contentScripts/core/API_refs.js",
			"contentScripts/APIs/cookies.js", "contentScripts/APIs/storage.js", "contentScripts/APIs/requests.js"],
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludeMatchesPatterns,
		"runAt" : "document_start",
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "MAIN"
	}]);

	await chrome.scripting.registerContentScripts([{ // In-page cleanup in ISOLATED world
		"id" : "cleanup",
		"js" : ["contentScripts/core/cleanup.js"],
		"runAt" : "document_start",
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludeMatchesPatterns,
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "ISOLATED"
	}]);
}


chrome.runtime.onStartup.addListener(function(){
	setContentScripts([]);
});

chrome.runtime.onInstalled.addListener(function(){
	setContentScripts([]);
});