{
	let sAPI = document.scripts[0].getAttribute("sAPI");
	let SURF = window[`s${sAPI}`];

	/** https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage + https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage **/
	let _storage_length = Object.getOwnPropertyDescriptor(Storage.prototype, "length").get;
	Object.defineProperty(Storage.prototype, "length", {
		get: function(){
			return _storage_length.apply(this);
		}, configurable: true, enumerable: true
	});
	SURF.registerPatch(Object.getOwnPropertyDescriptor(Storage.prototype, "length").get, _storage_length)

	let _storage_key = Storage.prototype.key;
	Storage.prototype.key = function(){
		return _storage_key.apply(this, arguments);
	}
	SURF.registerPatch(Storage.prototype.key, _storage_key);

	let _storage_getItem = Storage.prototype.getItem;
	Storage.prototype.getItem = function(){
		return _storage_getItem.apply(this, arguments);
	}
	SURF.registerPatch(Storage.prototype.getItem, _storage_getItem);

	let _storage_setItem = Storage.prototype.setItem;
	Storage.prototype.setItem = function(){
		return _storage_setItem.apply(this, arguments);
	}
	SURF.registerPatch(Storage.prototype.setItem, _storage_setItem);

	let _storage_removeItem = Storage.prototype.removeItem;
	Storage.prototype.removeItem = function(){
		return _storage_removeItem.apply(this, arguments);
	}
	SURF.registerPatch(Storage.prototype.removeItem, _storage_removeItem);

	let _storage_clear = Storage.prototype.clear;
	Storage.prototype.clear = function(){
		return _storage_clear.apply(this, arguments);
	}
	SURF.registerPatch(Storage.prototype.clear, _storage_clear);


	/** https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API **/
	let _idbFactory_open = IDBFactory.prototype.open;
	IDBFactory.prototype.open = function(){
		return _idbFactory_open.apply(this, arguments);
	}
	SURF.registerPatch(IDBFactory.prototype.open, _idbFactory_open);

	let _idbFactory_deleteDatabase = IDBFactory.prototype.deleteDatabase;
	IDBFactory.prototype.deleteDatabase = function(){
		return _idbFactory_deleteDatabase.apply(this, arguments);
	}
	SURF.registerPatch(IDBFactory.prototype.deleteDatabase, _idbFactory_deleteDatabase);

	let _idbFactory_cmp = IDBFactory.prototype.cmp;
	IDBFactory.prototype.cmp = function(){
		return _idbFactory_cmp.apply(this, arguments);
	}
	SURF.registerPatch(IDBFactory.prototype.cmp, _idbFactory_cmp);

	let _idbFactory_databases = IDBFactory.prototype.databases;
	IDBFactory.prototype.databases = function(){
		return _idbFactory_databases.apply(this, arguments);
	}
	SURF.registerPatch(IDBFactory.prototype.databases, _idbFactory_databases);

	/** https://developer.mozilla.org/en-US/docs/Web/API/StorageManager **/
	let _storageManager_estimate = StorageManager.prototype.estimate;
	StorageManager.prototype.estimate = function(){
		return _storageManager_estimate.apply(this, arguments);
	}
	SURF.registerPatch(StorageManager.prototype.estimate, _storageManager_estimate);

	let _storageManager_getDirectory = StorageManager.prototype.getDirectory;
	StorageManager.prototype.getDirectory = function(){
		return _storageManager_getDirectory.apply(this, arguments);
	}
	SURF.registerPatch(StorageManager.prototype.getDirectory, _storageManager_getDirectory);

	let _storageManager_persist = StorageManager.prototype.persist;
	StorageManager.prototype.persist = function(){
		return _storageManager_persist.apply(this, arguments);
	}
	SURF.registerPatch(StorageManager.prototype.persist, _storageManager_persist);

	let _storageManager_persisted = StorageManager.prototype.persisted;
	StorageManager.prototype.persisted = function(){
		return _storageManager_persisted.apply(this, arguments);
	}
	SURF.registerPatch(StorageManager.prototype.persisted, _storageManager_persisted);
}