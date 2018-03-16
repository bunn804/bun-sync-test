(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.nakamajs = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var base64 = createCommonjsModule(function (module, exports) {
/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
(function(root) {

	// Detect free variables `exports`.
	var freeExports = 'object' == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = 'object' == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof undefined == 'function' &&
		typeof undefined.amd == 'object' &&
		undefined.amd
	) {
		undefined(function() {
			return base64;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = base64;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in base64) {
				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.base64 = base64;
	}

}(commonjsGlobal));
});

/*
 * Copyright 2017 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const VERSION = '0.1.0';
const DEFAULT_SERVER_KEY = 'defaultkey';
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = '7350';

/**
 * Build a string which looks like a UUIDv4 type.
 */
const uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
    const randomNumber = Math.random() * 16 | 0,
          result = character === 'x' ? randomNumber : randomNumber & 0x3 | 0x8;
    return result.toString(16);
  });
};

class AuthenticateRequest {
  constructor(message) {
    this.message_ = message;
  }

  static custom(id) {
    return new AuthenticateRequest({
      custom: id
    });
  }

  static device(id) {
    return new AuthenticateRequest({
      device: id
    });
  }

  static email(email, password) {
    return new AuthenticateRequest({
      email: {
        email: email,
        password: password
      }
    });
  }

  static facebook(oauthToken) {
    return new AuthenticateRequest({
      facebook: oauthToken
    });
  }

  static google(oauthToken) {
    return new AuthenticateRequest({
      google: oauthToken
    });
  }
}

class Client {
  constructor(serverkey = DEFAULT_SERVER_KEY, host = DEFAULT_HOST, port = DEFAULT_PORT, lang = 'en', ssl = false, verbose = false) {
    this.serverKey = serverkey;
    this.host = host;
    this.port = port;
    this.lang = lang;
    this.ssl = ssl;
    this.verbose = verbose;
    this.serverTimestamp = 0;

    // private
    this.socket_ = null;
    this.collationIds_ = new Map();
  }

  ondisconnect(event) {}
  ontopicmessage(message) {}
  ontopicpresence(presenceUpdate) {}
  onnotification(notification) {}
  onmatchmakematched(match) {}
  onmatchdata(matchdata) {}
  onmatchpresence(presenceUpdate) {}

  login(request) {
    return this.authenticate_(request, '/user/login');
  }

  register(request) {
    return this.authenticate_(request, '/user/register');
  }

  disconnect() {
    this.socket_.close();
  }

  logout() {
    return this.send_({ logout: {} }, null, "Logout");
  }

  connect(session) {
    if (this.socket_ != null) {
      return new Promise((resolve, reject) => {
        resolve(session);
      });
    }

    const searchParams = new URLSearchParams();
    searchParams.append("token", session.token_);
    searchParams.append("lang", this.lang);
    searchParams.append("format", "json");

    const protocol = this.ssl ? 'wss' : 'ws';
    const url = `${protocol}://${this.host}:${this.port}/api?format=json&lang=${this.lang}&token=${session.token_}`;

    this.socket_ = new WebSocket(url);
    this.socket_.onclose = event => {
      this.ondisconnect(event);
      this.socket_ = null;
    };

    this.socket_.onmessage = event => {
      var message = JSON.parse(event.data);

      if (this.verbose && window.console && !message.heartbeat) {
        console.log("Response: %o", message);
      }

      if (!message.collationId) {
        if (message.heartbeat) {
          this.serverTimestamp = message.heartbeat;
        } else if (message.topicMessage) {
          message.topicMessage.data = JSON.parse(message.topicMessage.data);
          this.ontopicmessage(message.topicMessage);
        } else if (message.topicPresence) {
          this.ontopicpresence(message.topicPresence);
        } else if (message.liveNotifications) {
          message.liveNotifications.notifications.forEach(function (notification) {
            notification.content = JSON.parse(notification.content);
            this.onnotification(notification);
          });
        } else if (message.matchmakeMatched) {
          this.onmatchmakematched(message.matchmakeMatched);
        } else if (message.matchData) {
          message.matchData.data = JSON.parse(base64.decode(message.matchData.data));
          this.onmatchdata(message.matchData);
        } else if (message.matchPresence) {
          this.onmatchpresence(message.matchPresence);
        } else {
          if (window.console) {
            console.error("Unrecognized message received: %o", message);
          }
        }
      } else {
        var p = this.collationIds_[message.collationId];
        if (!p) {
          if (window.console) {
            console.error("Did not find promise for message: %o", message);
          }
          return;
        }
        this.collationIds_.delete(message.collationId);

        if (message.error) {
          p.reject(message.error);
        } else if (message.self) {
          p.resolve(message.self);
        } else if (message.users) {
          message.users.users.forEach(function (user) {
            user.metadata = JSON.parse(user.metadata);
          });
          p.resolve(message.users.users);
        } else if (message.storageData) {
          p.resolve(message.storageData);
        } else if (message.storageKeys) {
          p.resolve(message.storageKeys);
        } else if (message.friends) {
          message.friends.friends.forEach(function (friend) {
            friend.user.metadata = JSON.parse(friend.user.metadata);
          });
          p.resolve(message.friends);
        } else if (message.topics) {
          p.resolve(message.topics);
        } else if (message.topicMessageAck) {
          p.resolve(message.topicMessageAck);
        } else if (message.topicMessages) {
          message.topicMessages.messages.forEach(function (message) {
            message.data = JSON.parse(message.data);
          });
          p.resolve(message.topicMessages);
        } else if (message.groups) {
          message.groups.groups.forEach(function (group) {
            group.metadata = JSON.parse(group.metadata);
          });
          p.resolve(message.groups);
        } else if (message.groupsSelf) {
          message.groupsSelf.groupsSelf.forEach(function (groupSelf) {
            groupSelf.group.metadata = JSON.parse(groupSelf.group.metadata);
          });
          p.resolve(message.groupsSelf);
        } else if (message.groupUsers) {
          message.groupUsers.users.forEach(function (groupUser) {
            groupUser.user.metadata = JSON.parse(groupUser.user.metadata);
          });
          p.resolve(message.groupUsers);
        } else if (message.rpc) {
          message.rpc.payload = message.rpc.payload ? JSON.parse(message.rpc.payload) : null;
          p.resolve({ id: message.rpc.id, payload: message.rpc.payload });
        } else if (message.notifications) {
          message.notifications.notifications.forEach(function (notification) {
            notification.content = JSON.parse(notification.content);
          });
          p.resolve(message.notifications);
        } else if (message.matchmakeTicket) {
          p.resolve(message.matchmakeTicket);
        } else if (message.match) {
          p.resolve(message.match);
        } else if (message.matches) {
          p.resolve(message.matches);
        } else if (message.leaderboards) {
          message.leaderboards.leaderboards.forEach(function (leaderboard) {
            leaderboard.metadata = JSON.parse(leaderboard.metadata);
          });
          p.resolve(message.leaderboards);
        } else if (message.leaderboardRecords) {
          message.leaderboardRecords.records.forEach(function (record) {
            record.metadata = JSON.parse(record.metadata);
          });
          p.resolve(message.leaderboardRecords);
        } else {
          // if the object has properties, other than the collationId, log a warning
          if (window.console && Object.keys(message).length > 1) {
            console.error("Unrecognized message received: %o", message);
            p.resolve(message);
          } else {
            p.resolve();
          }
        }
      }
    };

    return new Promise((resolve, reject) => {
      this.socket_.onopen = event => {
        resolve(session);
      };
      this.socket_.onerror = event => {
        reject(event);
        this.socket_.close();
        this.ondisconnect(event);
        this.socket_ = null;
      };
    });
  }

  send(request) {
    var collationId = uuidv4();
    var message = request.build_();
    message.collationId = collationId;
    return this.send_(message, collationId, request.constructor.name);
  }

  send_(message, collationId, requestName) {
    if (this.socket_ == null) {
      return new Promise((resolve, reject) => {
        reject("Socket connection has not been established yet.");
      });
    }

    return new Promise((resolve, reject) => {
      if (collationId) {
        this.collationIds_[collationId] = {
          resolve: resolve,
          reject: reject
        };
      }

      if (this.verbose && window.console) {
        console.log("%s: %o", requestName, message);
      }

      this.socket_.send(JSON.stringify(message));
    });
  }

  authenticate_(request, path) {
    const message = request.message_;
    message["collationId"] = uuidv4();

    const protocol = this.ssl ? 'https' : 'http';
    const url = `${protocol}://${this.host}:${this.port}${path}`;

    if (this.verbose && window.console) {
      console.log("AuthenticateRequest: %s, %o", url, message);
    }

    var verbose = this.verbose;
    return fetch(url, {
      "method": "POST",
      "body": JSON.stringify(message),
      "headers": {
        "Accept-Language": this.lang,
        "Authorization": 'Basic ' + base64.encode(this.serverKey + ':'),
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "User-Agent": `nakama/${VERSION}`
      }
    }).then(function (response) {
      if (verbose && window.console) {
        console.log("AuthenticateResponse: %o", response);
      }

      return response.json();
    }).then(function (response) {
      if (verbose && window.console) {
        console.log("AuthenticateResponse (body): %o", response);
      }

      if (response.error) {
        throw response.error;
      } else {
        return Session.restore(response.session.token);
      }
    });
  }
}

class Session {
  constructor(createdAt, expiresAt, handle, id, token) {
    this.token_ = token;

    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.handle = handle;
    this.id = id;
  }

  /**
   * @param {number} currentime The current system time in milliseconds.
   * @returns {bool} True if the session has expired.
   */
  isexpired(currenttime) {
    return this.expiresAt - currenttime < 0;
  }

  static restore(jwt) {
    const parts = jwt.split('.');
    if (parts.length != 3) {
      throw 'jwt is not valid.';
    }
    const decoded = JSON.parse(base64.decode(parts[1]));
    const expiresAt = Math.floor(parseInt(decoded['exp']) * 1000);

    return new Session(Date.now(), expiresAt, decoded['han'], decoded['uid'], jwt);
  }
}

class LinkRequest {
  constructor() {
    // only set one of these fields
    this.custom = null;
    this.device = null;
    this.facebook = null;
    this.google = null;
    this.email = {
      email: "",
      password: ""
    };
  }

  build_() {
    if (this.custom) {
      return { link: { custom: this.custom } };
    }

    if (this.device) {
      return { link: { device: this.device } };
    }

    if (this.facebook) {
      return { link: { facebook: this.facebook } };
    }

    if (this.google) {
      return { link: { google: this.google } };
    }

    if (this.email.email != "") {
      return { link: { email: this.email } };
    }
  }
}

class UnlinkRequest {
  constructor() {
    // only set one of these fields
    this.custom = null;
    this.device = null;
    this.facebook = null;
    this.google = null;
    this.email = null;
  }

  build_() {
    if (this.custom) {
      return { unlink: { custom: this.custom } };
    }

    if (this.device) {
      return { unlink: { device: this.device } };
    }

    if (this.facebook) {
      return { unlink: { facebook: this.facebook } };
    }

    if (this.google) {
      return { unlink: { google: this.google } };
    }

    if (this.email) {
      return { unlink: { email: this.email } };
    }
  }
}

class SelfFetchRequest {
  constructor() {}

  build_() {
    return {
      selfFetch: {}
    };
  }
}

class SelfUpdateRequest {
  constructor() {
    this.handle = null;
    this.fullname = null;
    this.timezone = null;
    this.location = null;
    this.lang = null;
    this.metadata = null;
    this.avatarUrl = null;
  }

  build_() {
    return {
      selfUpdate: {
        handle: this.handle,
        fullname: this.fullname,
        timezone: this.timezone,
        location: this.location,
        lang: this.lang,
        avatarUrl: this.avatarUrl,
        metadata: this.metadata ? JSON.stringify(this.metadata) : "{}"
      }
    };
  }
}

class UsersFetchRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
    this.handles = [];
  }

  build_() {
    var msg = { usersFetch: { users: [] } };
    this.userIds.forEach(function (id) {
      msg.usersFetch.users.push({ userId: id });
    });
    this.handles.forEach(function (handle) {
      msg.usersFetch.users.push({ handle: handle });
    });
    return msg;
  }
}

class StorageListRequest {
  constructor() {
    // base64 user ID
    this.userId = null;
    this.bucket = null;
    this.collection = null;
    this.limit = null;
    this.cursor = null;
  }

  build_() {
    return {
      storageList: {
        userId: this.userId,
        bucket: this.bucket,
        collection: this.collection,
        limit: this.limit,
        cursor: this.cursor
      }
    };
  }
}

class StorageFetchRequest {
  constructor() {
    this.keys = [];
  }

  fetch(bucket, collection, record, userId) {
    this.keys.push({
      bucket: bucket,
      collection: collection,
      record: record,
      userId: userId
    });
    return this;
  }

  build_() {
    return { storageFetch: { keys: this.keys } };
  }
}

class StorageWriteRequest {
  constructor() {
    this.data = [];
  }

  write(bucket, collection, record, value, permissionRead = 1, permissionWrite = 1, version) {
    this.data.push({
      bucket: bucket,
      collection: collection,
      record: record,
      value: value ? JSON.stringify(value) : "{}",
      version: version ? version : null,
      permissionRead: permissionRead,
      permissionWrite: permissionWrite
    });
    return this;
  }

  build_() {
    return { storageWrite: { data: this.data } };
  }
}

class StorageRemoveRequest {
  constructor() {
    this.keys = [];
  }

  remove(bucket, collection, record, userId) {
    this.keys.push({
      bucket: bucket,
      collection: collection,
      record: record,
      userId: userId
    });
    return this;
  }

  build_() {
    return { storageRemove: { keys: this.keys } };
  }
}

class StorageUpdateRequest {
  constructor() {
    this.updates = [];
  }

  build_() {
    return { storageUpdate: { updates: this.updates } };
  }

  /**
    storageOps variable must be an array
  */
  update(bucket, collection, record, storageOps = [], permissionRead = 1, permissionWrite = 1, version) {
    this.updates.push({
      key: {
        bucket: bucket,
        collection: collection,
        record: record,
        version: version ? version : null
      },
      permissionRead: permissionRead,
      permissionWrite: permissionWrite,
      ops: storageOps
    });
    return this;
  }

  static add(path, value) {
    return {
      op: 0,
      path: path,
      value: JSON.stringify(value)
    };
  }

  static append(path, value) {
    return {
      op: 1,
      path: path,
      value: JSON.stringify(value)
    };
  }

  static copy(path, from) {
    return {
      op: 2,
      path: path,
      from: from
    };
  }

  static incr(path, value) {
    return {
      op: 3,
      path: path,
      value: JSON.stringify(value)
    };
  }

  static init(path, value) {
    return {
      op: 4,
      path: path,
      value: JSON.stringify(value)
    };
  }

  static merge(path, from) {
    return {
      op: 5,
      path: path,
      from: from
    };
  }

  static move(path, from) {
    return {
      op: 6,
      path: path,
      from: from
    };
  }

  static remove(path) {
    return {
      op: 8,
      path: path
    };
  }

  static replace(path, value) {
    return {
      op: 9,
      path: path,
      value: JSON.stringify(value)
    };
  }

  static test(path, value) {
    return {
      op: 10,
      path: path,
      value: JSON.stringify(value)
    };
  }

  static compare(path, value, assertValue) {
    return {
      op: 11,
      path: path,
      value: JSON.stringify(value),
      assert: assertValue
    };
  }
}

class FriendsAddRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
    this.handles = [];
  }

  build_() {
    var msg = { friendsAdd: { friends: [] } };
    this.userIds.forEach(function (id) {
      msg.friendsAdd.friends.push({ userId: id });
    });
    this.handles.forEach(function (handle) {
      msg.friendsAdd.friends.push({ handle: handle });
    });
    return msg;
  }
}

class FriendsRemoveRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
  }

  build_() {
    var msg = { friendsRemove: { userIds: [] } };
    this.userIds.forEach(function (id) {
      msg.friendsRemove.userIds.push({ userId: id });
    });
    return msg;
  }
}

class FriendsBlockRequest {
  constructor() {
    // base64 user IDs
    this.userIds = [];
  }

  build_() {
    var msg = { friendsBlock: { userIds: [] } };
    this.userIds.forEach(function (id) {
      msg.friendsBlock.userIds.push({ userId: id });
    });
    return msg;
  }
}

class FriendsListRequest {
  constructor() {}

  build_() {
    return {
      friendsList: {}
    };
  }
}

class TopicsJoinRequest {
  constructor() {
    // NOTE: The server only processes the first item of the list, and will ignore and logs a warning message for other items.
    this.topics = [];
  }

  dm(userId) {
    this.topics.push({ userId: userId });
    return this;
  }

  group(groupId) {
    this.topics.push({ groupId: groupId });
    return this;
  }

  room(room) {
    this.topics.push({ room: room });
    return this;
  }

  build_() {
    return { topicsJoin: { joins: this.topics } };
  }
}

class TopicsLeaveRequest {
  constructor() {
    // NOTE: The server only processes the first item of the list, and will ignore and logs a warning message for other items.
    this.topics = []; // this is a list of topicIds.
  }

  build_() {
    return { topicsLeave: { topics: this.topics } };
  }
}

class TopicMessageSendRequest {
  constructor() {
    // this is the topicId.
    this.topic = null;
    this.data = null;
  }

  build_() {
    return { topicMessageSend: {
        topic: this.topic,
        data: JSON.stringify(this.data)
      } };
  }
}

class TopicMessagesListRequest {
  constructor() {
    this.cursor = null;
    this.forward = null; // boolean
    this.limit = null; // number <= 100

    // set only one of the followings
    this.userId = null;
    this.room = null;
    this.groupId = null;
  }

  build_() {
    var msg = { topicMessagesList: {
        cursor: this.cursor,
        forward: this.forward,
        limit: this.limit
      } };

    if (this.userId) {
      msg.topicMessagesList.userId = this.userId;
    } else if (this.room) {
      msg.topicMessagesList.room = this.room;
    } else if (this.groupId) {
      msg.topicMessagesList.groupId = this.groupId;
    }

    return msg;
  }
}

class GroupsCreateRequest {
  constructor() {
    this.groups = [];
  }

  create(name, description, avatarUrl, lang, metadata, privateGroup) {
    this.groups.push({
      name: name,
      description: description,
      avatarUrl: avatarUrl,
      lang: lang,
      "private": privateGroup,
      metadata: metadata ? JSON.stringify(metadata) : "{}"
    });
  }

  build_() {
    return { groupsCreate: { groups: this.groups } };
  }
}

class GroupsUpdateRequest {
  constructor() {
    this.groups = [];
  }

  update(groupId, name, description, avatarUrl, lang, metadata, privateGroup) {
    this.groups.push({
      groupId: groupId,
      name: name,
      description: description,
      avatarUrl: avatarUrl,
      lang: lang,
      "private": privateGroup,
      metadata: metadata ? JSON.stringify(metadata) : "{}"
    });
  }

  build_() {
    return { groupsUpdate: { groups: this.groups } };
  }
}

class GroupsRemoveRequest {
  constructor() {
    // this is a list of groupIds.
    this.groups = [];
  }

  build_() {
    return { groupsRemove: { groupIds: this.groups } };
  }
}

class GroupsFetchRequest {
  constructor() {
    // this is a list of groupIds.
    this.groupIds = [];
    this.names = [];
  }

  build_() {
    var msg = { groupsFetch: { groups: [] } };
    this.groupIds.forEach(function (id) {
      msg.groupsFetch.groups.push({ groupId: id });
    });
    this.names.forEach(function (name) {
      msg.groupsFetch.groups.push({ name: name });
    });
    return msg;
  }
}

class GroupsListRequest {
  constructor() {
    this.pageLimit = null;
    this.orderByAsc = null;
    this.cursor = null;

    // only set one of the followings
    this.lang = null;
    this.createdAt = null;
    this.count = null;
  }

  build_() {
    var msg = { groupsList: {
        pageLimit: this.pageLimit,
        orderByAsc: this.orderByAsc,
        cursor: this.cursor
      } };

    if (this.lang) {
      msg.groupsList.lang = this.lang;
    } else if (this.createdAt) {
      msg.groupsList.createdAt = this.createdAt;
    } else if (this.count) {
      msg.groupsList.count = this.count;
    }

    return msg;
  }
}

class GroupsSelfListRequest {
  constructor() {}

  build_() {
    return { groupsSelfList: {} };
  }
}

class GroupUsersListRequest {
  constructor(groupId) {
    this.groupId = groupId;
  }

  build_() {
    return { groupUsersList: { groupId: this.groupId } };
  }
}

class GroupsJoinRequest {
  constructor() {
    // this is a list of groupIds.
    this.groups = [];
  }

  build_() {
    return { groupsJoin: { groupIds: this.groups } };
  }
}

class GroupsLeaveRequest {
  constructor() {
    // this is a list of groupIds.
    this.groups = [];
  }

  build_() {
    return { groupsLeave: { groupIds: this.groups } };
  }
}

class GroupUsersAddRequest {
  constructor() {
    this.adds = [];
  }

  add(groupId, userId) {
    this.adds.push({ groupId: groupId, userId: userId });
  }

  build_() {
    var msg = { groupUsersAdd: { groupUsers: [] } };
    this.adds.forEach(function (add) {
      msg.groupUsersAdd.groupUsers.push({
        groupId: add.groupId,
        userId: add.userId
      });
    });
    return msg;
  }
}

class GroupUsersKickRequest {
  constructor() {
    this.kicks = [];
  }

  kick(groupId, userId) {
    this.kicks.push({ groupId: groupId, userId: userId });
  }

  build_() {
    var msg = { groupUsersKick: { groupUsers: [] } };
    this.kicks.forEach(function (kick) {
      msg.groupUsersKick.groupUsers.push({
        groupId: kick.groupId,
        userId: kick.userId
      });
    });
    return msg;
  }
}

class GroupUsersPromoteRequest {
  constructor() {
    this.promotes = [];
  }

  promote(groupId, userId) {
    this.promotes.push({ groupId: groupId, userId: userId });
  }

  build_() {
    var msg = { groupUsersPromote: { groupUsers: [] } };
    this.promotes.forEach(function (promote) {
      msg.groupUsersPromote.groupUsers.push({
        groupId: promote.groupId,
        userId: promote.userId
      });
    });
    return msg;
  }
}

class NotificationsListRequest {
  constructor() {
    this.limit = null;
    this.resumableCursor = null;
  }

  build_() {
    return { notificationsList: {
        limit: this.limit ? this.limit : 10,
        resumableCursor: this.resumableCursor
      } };
  }
}

class NotificationsRemoveRequest {
  constructor() {
    // this is a list of notificationIds.
    this.notifications = [];
  }

  build_() {
    return { notificationsRemove: { notificationIds: this.notifications } };
  }
}

class RpcRequest {
  constructor() {
    this.id = null;
    this.payload = null;
  }

  build_() {
    return { rpc: {
        id: this.id,
        payload: this.payload ? JSON.stringify(this.payload) : null
      } };
  }
}

class MatchmakeAddRequest {
  constructor(requiredCount) {
    this.requiredCount = requiredCount;
    this.filters = [];
    this.properties = [];
  }

  addTermFilter(name, termSet, matchAllTerms) {
    this.filters.push({
      name: name,
      term: {
        terms: termSet,
        matchAllTerms: matchAllTerms
      }
    });
    return this;
  }

  addRangeFilter(name, lowerbound, upperbound) {
    this.filters.push({
      name: name,
      range: {
        lowerBound: lowerbound,
        upperBound: upperbound
      }
    });
    return this;
  }

  addCheckFilter(name, value) {
    this.filters.push({
      name: name,
      check: value
    });
    return this;
  }

  addStringSetProperty(key, termSet) {
    this.properties.push({
      key: key,
      stringSet: termSet
    });
    return this;
  }

  addIntegerProperty(key, integerValue) {
    this.properties.push({
      key: key,
      intValue: integerValue
    });
    return this;
  }

  addBooleanProperty(key, boolValue) {
    this.properties.push({
      key: key,
      boolValue: boolValue
    });
    return this;
  }

  build_() {
    return {
      matchmakeAdd: {
        requiredCount: this.requiredCount,
        filters: this.filters,
        properties: this.properties
      }
    };
  }
}

class MatchmakeRemoveRequest {
  constructor(ticket) {
    this.ticket = ticket;
  }

  build_() {
    return { matchmakeRemove: { ticket: this.ticket } };
  }
}

class MatchCreateRequest {
  constructor() {}

  build_() {
    return {
      matchCreate: {}
    };
  }
}

class MatchesJoinRequest {
  constructor() {
    this.matchIds = [];
    this.tokens = [];
  }

  build_() {
    var msg = {
      matchesJoin: { matches: [] }
    };

    this.matchIds.forEach(function (id) {
      msg.matchesJoin.matches.push({ matchId: id });
    });

    this.tokens.forEach(function (token) {
      msg.matchesJoin.matches.push({ token: token });
    });

    return msg;
  }
}

class MatchesLeaveRequest {
  constructor() {
    this.matchIds = [];
  }

  build_() {
    return {
      matchesLeave: {
        matchIds: this.matchIds
      }
    };
  }
}

class MatchDataSendRequest {
  constructor() {
    this.matchId = null;
    this.presence = null; //UserPresence
    this.opCode = 0;
    this.data = null;
  }

  build_() {
    return {
      matchDataSend: {
        matchId: matchId,
        presence: presence,
        opCode: opCode,
        data: base64.encode(JSON.stringify(data))
      }
    };
  }
}

class LeaderboardsListRequest {
  constructor() {
    this.filterLeaderboardIds = [];
    this.limit = null;
    this.cursor = null;
  }

  build_() {
    var msg = { leaderboardsList: {
        filterLeaderboardId: [],
        limit: this.limit,
        cursor: this.cursor
      } };

    this.filterLeaderboardIds.forEach(function (id) {
      msg.leaderboardsList.filterLeaderboardId.push(id);
    });
    return msg;
  }
}

class LeaderboardRecordsFetchRequest {
  constructor() {
    this.leaderboardIds = [];
    this.limit = null;
    this.cursor = null;
  }

  build_() {
    var msg = { leaderboardRecordsFetch: {
        leaderboardIds: [],
        limit: this.limit,
        cursor: this.cursor
      } };

    this.leaderboardIds.forEach(function (id) {
      msg.leaderboardRecordsFetch.leaderboardIds.push(id);
    });
    return msg;
  }
}

class LeaderboardRecordsListRequest {
  constructor() {
    this.leaderboardId = null;
    this.limit = null;
    this.cursor = null;

    // only set one of the followings
    this.lang = null;
    this.location = null;
    this.timezone = null;
    this.ownerId = null;
    this.ownerIds = [];
  }

  build_() {
    var msg = { leaderboardRecordsList: {
        leaderboardId: this.leaderboardId,
        limit: this.limit,
        cursor: this.cursor
      } };

    if (this.lang) {
      msg.leaderboardRecordsList.lang = this.lang;
    } else if (this.location) {
      msg.leaderboardRecordsList.location = this.createdAt;
    } else if (this.timezone) {
      msg.leaderboardRecordsList.count = this.count;
    } else if (this.ownerId) {
      msg.leaderboardRecordsList.ownerId = this.ownerId;
    } else if (this.ownerIds.length > 0) {
      msg.leaderboardRecordsList.ownerIds = { ownerIds: this.ownerIds };
    }

    return msg;
  }
}

class LeaderboardRecordWriteRequest {
  constructor() {
    this.records = [];
  }

  set(leaderboardId, value, metadata, location, timezone) {
    var record = {
      leaderboardId: leaderboardId,
      "set": value,
      metadata: JSON.stringify(metadata),
      location: location,
      timezone: timezone
    };

    this.records.push(record);
  }

  best(leaderboardId, value, metadata, location, timezone) {
    var record = {
      leaderboardId: leaderboardId,
      best: value,
      metadata: JSON.stringify(metadata),
      location: location,
      timezone: timezone
    };

    this.records.push(record);
  }

  decrement(leaderboardId, value, metadata, location, timezone) {
    var record = {
      leaderboardId: leaderboardId,
      decr: value,
      metadata: JSON.stringify(metadata),
      location: location,
      timezone: timezone
    };

    this.records.push(record);
  }

  increment(leaderboardId, value, metadata, location, timezone) {
    var record = {
      leaderboardId: leaderboardId,
      incr: value,
      metadata: JSON.stringify(metadata),
      location: location,
      timezone: timezone
    };

    this.records.push(record);
  }

  build_() {
    return { leaderboardRecordsWrite: { records: this.records } };
  }
}

/*
 * Copyright 2017 The Nakama Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * JavaScript client for Nakama server.
 */

exports.AuthenticateRequest = AuthenticateRequest;
exports.Client = Client;
exports.Session = Session;
exports.LinkRequest = LinkRequest;
exports.UnlinkRequest = UnlinkRequest;
exports.SelfFetchRequest = SelfFetchRequest;
exports.SelfUpdateRequest = SelfUpdateRequest;
exports.UsersFetchRequest = UsersFetchRequest;
exports.StorageListRequest = StorageListRequest;
exports.StorageFetchRequest = StorageFetchRequest;
exports.StorageWriteRequest = StorageWriteRequest;
exports.StorageRemoveRequest = StorageRemoveRequest;
exports.StorageUpdateRequest = StorageUpdateRequest;
exports.FriendsAddRequest = FriendsAddRequest;
exports.FriendsRemoveRequest = FriendsRemoveRequest;
exports.FriendsBlockRequest = FriendsBlockRequest;
exports.FriendsListRequest = FriendsListRequest;
exports.TopicsJoinRequest = TopicsJoinRequest;
exports.TopicsLeaveRequest = TopicsLeaveRequest;
exports.TopicMessageSendRequest = TopicMessageSendRequest;
exports.TopicMessagesListRequest = TopicMessagesListRequest;
exports.GroupsCreateRequest = GroupsCreateRequest;
exports.GroupsUpdateRequest = GroupsUpdateRequest;
exports.GroupsRemoveRequest = GroupsRemoveRequest;
exports.GroupsFetchRequest = GroupsFetchRequest;
exports.GroupsListRequest = GroupsListRequest;
exports.GroupsSelfListRequest = GroupsSelfListRequest;
exports.GroupUsersListRequest = GroupUsersListRequest;
exports.GroupsJoinRequest = GroupsJoinRequest;
exports.GroupsLeaveRequest = GroupsLeaveRequest;
exports.GroupUsersAddRequest = GroupUsersAddRequest;
exports.GroupUsersKickRequest = GroupUsersKickRequest;
exports.GroupUsersPromoteRequest = GroupUsersPromoteRequest;
exports.NotificationsListRequest = NotificationsListRequest;
exports.NotificationsRemoveRequest = NotificationsRemoveRequest;
exports.RpcRequest = RpcRequest;
exports.MatchmakeAddRequest = MatchmakeAddRequest;
exports.MatchmakeRemoveRequest = MatchmakeRemoveRequest;
exports.MatchCreateRequest = MatchCreateRequest;
exports.MatchesJoinRequest = MatchesJoinRequest;
exports.MatchesLeaveRequest = MatchesLeaveRequest;
exports.MatchDataSendRequest = MatchDataSendRequest;
exports.LeaderboardsListRequest = LeaderboardsListRequest;
exports.LeaderboardRecordsFetchRequest = LeaderboardRecordsFetchRequest;
exports.LeaderboardRecordsListRequest = LeaderboardRecordsListRequest;
exports.LeaderboardRecordWriteRequest = LeaderboardRecordWriteRequest;

Object.defineProperty(exports, '__esModule', { value: true });

})));
