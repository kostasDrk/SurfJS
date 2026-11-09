{
	let sAPI = document.scripts[0].getAttribute("sAPI");

	let isSetup = function(win){
		try{ return win && win[`s${sAPI}`]; }
		catch(err){ return true; }
		return false;
	}

	let registerOriginal = function(key, value){
		SURF.oRefs[key] = value; // Store reference to original API/interface
		Object.defineProperty(value, "apply", {
			value: Function.prototype.apply, // Ensure that even if `Function.prototype.apply` is overridden by a script, SurfJS will still call the original `apply` and avoid interception/tampering
			configurable: false // Ensure `apply` cannot be deleted and reverted back to the (overridden) inherited `Function.prototype.apply`
		});
	}

	let registerOverride = function(key, value){
		SURF.ovRefs[key] = value; // Store reference to our overridden API/interface
		Object.defineProperty(value, "apply", {
			value: Function.prototype.apply, // Ensure that even if `Function.prototype.apply` is overridden by a script, SurfJS will still call the original `apply` and avoid interception/tampering
			configurable: false // Ensure `apply` cannot be deleted and reverted back to the (overridden) inherited `Function.prototype.apply`
		});
	}

	let registerPatch = function(func, original){
		SURF.patchedStrs[func.toString()] = original.toString(); // Map patched functions to their original `toString` return value
	}

	let shouldCapture = function(){
		/** TODO: Stack-based attribution of API calls to targeted third-party scripts **/
		return false;
	}

	let SURF = (function(){
		return {
			isSetup: isSetup,
			registerOriginal: registerOriginal,
			oRefs: {}, // Stores references to original APIs for internal operations
			registerOverride: registerOverride,
			ovRefs : {}, // Stores references to our API overrides
			registerPatch: registerPatch,
			patchedStrs: {}, // Maps overridden APIs to their real `toString` representations
			shouldCapture: shouldCapture,
			log : (msg) => { SURF.oRefs["console.log"](`[SurfJS] ${msg}`); },
			warn : (msg) => { SURF.oRefs["console.warn"](`[SurfJS] ${msg}`); },
			error : (msg) => { SURF.oRefs["console.error"](`[SurfJS] ${msg}`);},
		};
	})();

	/** Globally exposed SurfJS interface to be used by the surrogate APIs. Secretly named after `sAPI` to prevent tampering from evasive scripts
	 * Although the property is set as non-enumerable, certain APIs still return it, e.g., `Object.getOwnPropertyNames` and `Reflect.ownKeys`.
	 * These are handled below.
	**/
	Object.defineProperty(window, `s${sAPI}`, {
		value: SURF,
		writeable: false,
		enumerable: false
	});

	let _getOwnPropertyNames = Object.getOwnPropertyNames;
	SURF.registerOriginal("Object.getOwnPropertyNames", _getOwnPropertyNames);
	Object.getOwnPropertyNames = function(object){ // Make sure our global SurfJS interface is not discoverable by the page when enumerating window properties through `Object.getOwnPropertyNames`
		let _props = _getOwnPropertyNames(object);
		if(object !== window) return _props; // Only interested on the window object
		let i = _props.length;
		while(i--){if(SURF.oRefs["String.includes"].apply(_props[i], [sAPI])) SURF.oRefs["Array.splice"].apply(_props, [i, 1]);} // Remove anything that includes sAPI
		return _props;
	}
	SURF.registerPatch(Object.getOwnPropertyNames, _getOwnPropertyNames);

	let _reflect_ownKeys = Reflect.ownKeys;
	Reflect.ownKeys  = function(object){ // Make sure our global SurfJS interface is not discoverable by the page when enumerating window properties through `Reflect.ownKeys`
		let _props = _reflect_ownKeys(object);
		if(object !== window) return _props; // Only interested on the window object
		let i = _props.length;
		while(i--){
			try{if(SURF.oRefs["String.includes"].apply(_props[i], [sAPI])) SURF.oRefs["Array.splice"].apply(_props, [i, 1]);} // Remove anything that includes sAPI
			catch(err){}
		}
		return _props;
	}
	SURF.registerPatch(Reflect.ownKeys, _reflect_ownKeys)
	
	// Prevent evasive scripts probing for SurfJS' presence to call `toString` on our surrogate APIs and observe our overrides
	let _Function_toString = Function.prototype.toString;
	let _Function_constructor_toString = Function.prototype.constructor.toString();
	SURF.registerOriginal("Function.toString", _Function_toString)
	Function.prototype.toString = function toString(){
		if(this === Function.prototype.toString) return "function toString() { [native code] }"; // Protect `toString` override (this function) when called on itself
		if (this.constructor && this.constructor === toString) throw new TypeError('Function.prototype.toString is not a constructor');
		if(this === Function || this === Function.prototype.constructor) return _Function_constructor_toString;

		let toStringRet = _Function_toString.apply(this);
		return (toStringRet in SURF.patchedStrs) ? SURF.patchedStrs[toStringRet] : toStringRet; // If the target func is overridden by SurfJS, return its expected string value
	}

	console.warn(`[SurfJS] Setup complete (${window.location})`)
}