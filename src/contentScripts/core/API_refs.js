{
	let sAPI = document.scripts[0].getAttribute("sAPI");
	let SURF = window[`s${sAPI}`];

	SURF.registerOriginal("console.log", console.log);
	SURF.registerOriginal("console.warn", console.warn);
	SURF.registerOriginal("console.error", console.error);

	SURF.registerOriginal("Error", Error.prototype.constructor);

	SURF.registerOriginal("Array", Array);
	SURF.registerOriginal("Array.push", Array.prototype.push);
	SURF.registerOriginal("Array.pop", Array.prototype.pop);
	SURF.registerOriginal("Array.splice", Array.prototype.splice);
	SURF.registerOriginal("Array.slice", Array.prototype.slice);
	SURF.registerOriginal("Array.indexOf", Array.prototype.indexOf);
	SURF.registerOriginal("Array.join", Array.prototype.join);
	SURF.registerOriginal("Array.shift", Array.prototype.shift);
	SURF.registerOriginal("Array.unshift", Array.prototype.unshift);
	SURF.registerOriginal("Array.includes", Array.prototype.includes);
	SURF.registerOriginal("Array.forEach", Array.prototype.forEach);
	SURF.registerOriginal("Array.some", Array.prototype.some);
	SURF.registerOriginal("Array.from", Array.from);

	SURF.registerOriginal("Set", Set);
	SURF.registerOriginal("Set.add", Object.getOwnPropertyDescriptor(Set.prototype, 'add').value);
	SURF.registerOriginal("Set.size", Object.getOwnPropertyDescriptor(Set.prototype, 'size').get);

	SURF.registerOriginal("RegExp", RegExp.prototype.constructor);
	SURF.registerOriginal("RegExp.test", RegExp.prototype.test);

	SURF.registerOriginal("Event", Event.prototype.constructor);
	SURF.registerOriginal("CustomEvent", CustomEvent.prototype.constructor);
	SURF.registerOriginal("dispatchEvent", EventTarget.prototype.dispatchEvent);

	SURF.registerOriginal("String.includes", String.prototype.includes);
	SURF.registerOriginal("String.replace", String.prototype.replace);
	SURF.registerOriginal("String.startsWith", String.prototype.startsWith);
	SURF.registerOriginal("String.replaceAll", String.prototype.replaceAll);
	SURF.registerOriginal("String.match", String.prototype.match);
	SURF.registerOriginal("String.matchAll", String.prototype.matchAll);
	SURF.registerOriginal("String.toLowerCase", String.prototype.toLowerCase);
	SURF.registerOriginal("String.trim", String.prototype.trim);
	SURF.registerOriginal("String.split", String.prototype.split);
	SURF.registerOriginal("String.slice", String.prototype.slice);
	SURF.registerOriginal("String.indexOf", String.prototype.indexOf);
	SURF.registerOriginal("String.substring", String.prototype.substring);
	SURF.registerOriginal("String.endsWith", String.prototype.endsWith);
	SURF.registerOriginal("String.startsWith", String.prototype.startsWith);
	SURF.registerOriginal("String.toString", String.prototype.toString);

	SURF.registerOriginal("Object.keys", Object.keys);

	SURF.registerOriginal("Performance.now", Performance.prototype.now);
}