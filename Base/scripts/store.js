window.store = {
	localStoreSupport: function () {
		try {
			if ('localStorage' in window && window['localStorage'] !== null) {
				localStorage.setItem('test', 1);
				localStorage.removeItem('test', 1);
				return true;
			}
		} catch (e) {}

		return false;
	},
	set: function (name, value/* , days */) {
		/* if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else {
			var expires = "";
		} */
		if (this.localStoreSupport()) {
			localStorage.setItem(name, value);
		} /* else {
			document.cookie = name + "=" + value + expires + "; path=/";
		} */
	},
	get: function (name) {
		if (this.localStoreSupport()) {
			return localStorage.getItem(name);
		} /* else {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; ++i) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		} */
	},
	del: function (name) {
		if (this.localStoreSupport()) {
			if (name) {
				localStorage.removeItem(name);
			} else {
				localStorage.clear();
			}
		} /* else {
			this.set(name, "", -1);
		} */
	}
};