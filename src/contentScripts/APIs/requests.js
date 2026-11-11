{
	let sAPI = document.scripts[0].getAttribute("sAPI");
	let SURF = window[`s${sAPI}`];

	/** https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest **/
	let _send = XMLHttpRequest.prototype.send;
	let _readyState = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "readyState").get;
	XMLHttpRequest.prototype.send = function(){
		return _send.apply(this, arguments);
	}
	SURF.registerPatch(XMLHttpRequest.prototype.send, _send);

	/** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API **/
	let _fetch = fetch;
	fetch = async function(resource, init = null){
		return _fetch.apply(this, arguments);
	}
	SURF.registerPatch(fetch, _fetch);

	/** https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon **/
	let _navigator_sendBeacon = Navigator.prototype.sendBeacon;
	Navigator.prototype.sendBeacon = function(){
		return _navigator_sendBeacon.apply(this, arguments);
	}
	SURF.registerPatch(Navigator.prototype.sendBeacon, _navigator_sendBeacon);

	/** https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket **/
	let _websocket_proto = WebSocket.prototype;
	let _websocket_constructor = WebSocket.prototype.constructor;
	WebSocket = function(){
		return new _websocket_constructor(...arguments);
	}
	_websocket_proto.constructor = WebSocket;
	WebSocket.prototype = _websocket_proto;
	Object.setPrototypeOf(WebSocket, _websocket_constructor);
	SURF.registerPatch(WebSocket.prototype.constructor, _websocket_constructor);
	SURF.registerPatch(WebSocket, _websocket_constructor);
	
	/** https://developer.mozilla.org/en-US/docs/Web/API/WebTransport **/
	let _webtransport_proto = WebTransport.prototype;
	let _webtransport_constructor = WebTransport.prototype.constructor;
	WebTransport = function(){
		return new _webtransport_constructor(...arguments);
	}
	_webtransport_proto.constructor = WebTransport;
	WebTransport.prototype = _webtransport_proto;
	Object.setPrototypeOf(WebTransport, _webtransport_constructor);
	SURF.registerPatch(WebTransport.prototype.constructor, _webtransport_constructor);
	SURF.registerPatch(WebTransport, _webtransport_constructor);

	/** https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection **/
	let _rtcpeerconnection_proto = RTCPeerConnection.prototype;
	let _rtcpeerconnection_constructor = RTCPeerConnection.prototype.constructor;
	RTCPeerConnection = function(){
		return new _rtcpeerconnection_constructor(...arguments);
	}
	_rtcpeerconnection_proto.constructor = RTCPeerConnection;
	RTCPeerConnection.prototype = _rtcpeerconnection_proto;
	Object.setPrototypeOf(RTCPeerConnection, _rtcpeerconnection_constructor);
	SURF.registerPatch(RTCPeerConnection.prototype.constructor, _rtcpeerconnection_constructor);
	SURF.registerPatch(RTCPeerConnection, _rtcpeerconnection_constructor);
}