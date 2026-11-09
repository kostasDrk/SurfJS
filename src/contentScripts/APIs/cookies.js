{
	let sAPI = document.scripts[0].getAttribute("sAPI");
	let SURF = window[`s${sAPI}`];

	/** https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie **/
	let _cookie_get = Object.getOwnPropertyDescriptor(Document.prototype, "cookie").get;
	let _cookie_set = Object.getOwnPropertyDescriptor(Document.prototype, "cookie").set;
	Object.defineProperty(Document.prototype, "cookie", {
		get: function(){
			return _cookie_get.apply(this);
		},
		set: function(){
			return _cookie_set.apply(this, arguments);
		},
		configurable: true, enumerable: true
	});
	SURF.registerPatch(Object.getOwnPropertyDescriptor(Document.prototype, "cookie").get, _cookie_get);
	SURF.registerPatch(Object.getOwnPropertyDescriptor(Document.prototype, "cookie").set, _cookie_set);

	/** https://developer.mozilla.org/en-US/docs/Web/API/CookieStore **/

	let _cookieStore_delete = CookieStore.prototype.delete;
	CookieStore.prototype.delete = function(){
		return _cookieStore_delete.apply(this, arguments);
	}
	SURF.registerPatch(CookieStore.prototype.delete, _cookieStore_delete);
	
	let _cookieStore_get = CookieStore.prototype.get;
	CookieStore.prototype.get = function(){
		return _cookieStore_get.apply(this, arguments);
	}
	SURF.registerPatch(CookieStore.prototype.get, _cookieStore_get);

	let _cookieStore_getAll = CookieStore.prototype.getAll;
	CookieStore.prototype.getAll = function(){
		return _cookieStore_getAll.apply(this, arguments);
	}
	SURF.registerPatch(CookieStore.prototype.getAll, _cookieStore_getAll);

	let _cookieStore_set = CookieStore.prototype.set;
	CookieStore.prototype.set = function(){
		return _cookieStore_set.apply(this, arguments);
	}
	SURF.registerPatch(CookieStore.prototype.set, _cookieStore_set);

	let _cookieStore_onchange_get = Object.getOwnPropertyDescriptor(CookieStore.prototype, "onchange").get;
	let _cookieStore_onchange_set = Object.getOwnPropertyDescriptor(CookieStore.prototype, "onchange").set;
	Object.defineProperty(CookieStore.prototype, "onchange", {
		get: function(){
			return _cookieStore_onchange_get.apply(this, arguments);
		},
		set: function(){
			return _cookieStore_onchange_set.apply(this, arguments);
		}
	})
	SURF.registerPatch(Object.getOwnPropertyDescriptor(CookieStore.prototype, "onchange").get, _cookieStore_onchange_get);
	SURF.registerPatch(Object.getOwnPropertyDescriptor(CookieStore.prototype, "onchange").set, _cookieStore_onchange_set);
}