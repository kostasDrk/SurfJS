
let cleanUpContentScripts = async function(){
	await chrome.scripting.unregisterContentScripts(); // remove all content scripts
}

let setContentScripts = async function(excludeMatchesPatterns){
	await cleanUpContentScripts();

	await chrome.scripting.registerContentScripts([{
		"id" : "init",
		"js" : ["contentScripts/init.js"],
		"matches" : ["<all_urls>"],
		"excludeMatches" : excludeMatchesPatterns,
		"runAt" : "document_start",
		"allFrames" : true,
		"matchOriginAsFallback" : true,
		"world" : "ISOLATED"
	}]);

	await chrome.scripting.registerContentScripts([{
		"id" : "cleanup",
		"js" : ["contentScripts/cleanup.js"],
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