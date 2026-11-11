var config = {}; // Will be populated with the configuration for the current domain and page
var tabHost;
var tabUrl;
var toggleButton = document.getElementById("toggle");

async function saveConfig(){
	await browser.storage.local.set({[tabHost] : config});
}

function addDisableButton(tabId){
	toggleButton.setAttribute("class", "toggleBtnDisable");
	toggleButton.title = "Disable for this page | Ctrl+click for entire domain | Ctrl+shift+click to reset domain config";
	toggleButton.onclick = function(e){
			if(e.ctrlKey && e.shiftKey){
				config = {}; // Reset config for entire domain
				logInPage(tabId, `[SurfJS] Reset config for this domain.`);
				saveConfig();
				return;
			}else if(e.ctrlKey){ // Disable for entire domain
				config["disabled"] = true;
				logInPage(tabId, `[SurfJS] Disabled for this domain.`);
			} else{ // Disable for this URL specifically
				if(!("disabledPages" in config)) config["disabledPages"] = [];
				config["disabledPages"].push(tabUrl);
				logInPage(tabId, `[SurfJS] Disabled for this page.`);
			}
			addEnableButton(tabId);
			saveConfig();
	}
}

function addEnableButton(tabId){
	toggleButton.setAttribute("class", "toggleBtnEnable");
	toggleButton.title = "Enable for this page | Ctrl+click for entire domain | Ctrl+shift+click to reset domain config";
	toggleButton.onclick = function(e){
			if(e.ctrlKey && e.shiftKey){
				logInPage(tabId, `[SurfJS] Reset config for this domain.`);
				config = {}; // Reset config for entire domain
			} else if(e.ctrlKey){ // Enable for entire domain
				config["disabled"] = false;
				logInPage(tabId, `[SurfJS] Enabled for this domain.`);
			} else{ // Enable for this URL specifically
				if(config["disabled"]){
					logInPage(tabId, `[SurfJS] Cannot enable for single page; needs to be enabled for the entire domain.`); // Special case: if SurfJS is disabled for the entire domain a single page cannot be whitelisted
					return;
				}
				if("disabledPages" in config && config["disabledPages"].includes(tabUrl)){
					config["disabledPages"].splice(config["disabledPages"].indexOf(tabUrl), 1); // Remove page from disabled ones
					logInPage(tabId, `[SurfJS] Enabled for this page.`);
				}
			}
			addDisableButton(tabId);
			saveConfig();
	}
}

async function logInPage(tabId, msg){
	const [{result}] = await chrome.scripting.executeScript({
		func: (msg) => {console.warn(msg);},
		args: [msg],
		target: {
			tabId: tabId
		},
		injectImmediately: true,
		world: "MAIN"
	});
}

browser.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
	let activeTab = tabs[0];
	let activeTabUrl = new URL(activeTab.url);
	tabHost = activeTabUrl.host;
	tabUrl = tabHost + activeTabUrl.pathname; // Ignore URL parameters and fragments

	let result = await browser.storage.local.get([tabHost]);
	config = result[tabHost] || {};

	let enabled;

	if(!config || !config["disabled"]) enabled = true; // Turned on by default
	else if(config["disabled"]) enabled = false;

	if(enabled){ // If enabled for the domain, check specifically for the current page URL
		if("disabledPages" in config && config["disabledPages"].includes(tabUrl)) enabled = false;
		else enabled = true;
	}

	if(enabled) addDisableButton(tabs[0].id);
	else addEnableButton(tabs[0].id);
});

document.getElementById("settings").addEventListener("click", () => {
	if(browser.runtime.openOptionsPage) browser.runtime.openOptionsPage();
	else window.open(browser.runtime.getURL('settings/index.html'));
});