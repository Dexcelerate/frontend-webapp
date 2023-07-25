/**
 * Chat
 */

/*** Inject HTML - Base ***/

(() => {
    const html = `
		<div id="Chat" class="togglable d-none">
			<div class="container">
				<input type="radio" name="chat_tab" id="Chat__Tab1" class="visually-hidden" autocomplete="off" checked>
				<input type="radio" name="chat_tab" id="Chat__Tab2" class="visually-hidden" autocomplete="off">
				<input type="radio" name="chat_tab" id="Chat__Tab3" class="visually-hidden" autocomplete="off">
				<input type="radio" name="chat_tab" id="Chat__Tab4" class="visually-hidden" autocomplete="off">
				<input type="radio" name="chat_tab" id="Chat__Tab5" class="visually-hidden" autocomplete="off">

				<div id="Chat__Header" class="header">
					<label for="Chat__Tab1" class="btn btn-style w-100 d-flex align-items-center justify-content-center">
						<label for="Chat__Tab2" class="btn btn-has-icon" data-tooltip="Languages" data-tooltip-bottom>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
								<path d="M0 8A8 8 0 1116 8 8 8 0 010 8ZM7.5 1.077C6.83 1.281 6.165 1.897 5.613 2.932A7.97 7.97 0 005.145 4H7.5V1.077ZM4.09 4A9.267 9.267 0 014.73 2.461 6.7 6.7 0 015.327 1.528 7.025 7.025 0 002.255 4H4.09ZM3.508 7.5C3.538 6.623 3.646 5.782 3.82 5H1.674A6.958 6.958 0 001.018 7.5H3.508ZM4.847 5A12.5 12.5 0 004.509 7.5H7.5V5H4.847ZM8.5 5V7.5H11.49A12.495 12.495 0 0011.153 5H8.5ZM4.51 8.5A12.5 12.5 0 004.847 11H7.5V8.5H4.51ZM8.5 8.5V11H11.153C11.34 10.235 11.459 9.392 11.491 8.5H8.5ZM5.145 12C5.283 12.386 5.44 12.744 5.613 13.068 6.165 14.103 6.831 14.718 7.5 14.923V12H5.145ZM5.327 14.472A6.696 6.696 0 014.73 13.539 9.268 9.268 0 014.09 12H2.255A7.024 7.024 0 005.327 14.472ZM3.82 11A13.652 13.652 0 013.508 8.5H1.018C1.08 9.39 1.309 10.233 1.674 11H3.82ZM10.673 14.472A7.024 7.024 0 0013.745 12H11.91A9.27 9.27 0 0111.27 13.539 6.688 6.688 0 0110.673 14.472ZM8.5 12V14.923C9.17 14.719 9.835 14.103 10.387 13.068 10.56 12.744 10.717 12.386 10.855 12H8.5ZM12.18 11H14.326C14.691 10.233 14.92 9.39 14.982 8.5H12.492A13.65 13.65 0 0112.18 11ZM14.982 7.5A6.959 6.959 0 0014.326 5H12.18C12.354 5.782 12.462 6.623 12.492 7.5H14.982ZM11.27 2.461C11.517 2.925 11.732 3.441 11.91 4H13.745A7.024 7.024 0 0010.673 1.528C10.891 1.812 11.091 2.126 11.27 2.461ZM10.855 4A7.966 7.966 0 0010.387 2.932C9.835 1.897 9.17 1.282 8.5 1.077V4H10.855Z"></path>
							</svg>
						</label>

						<div class="text-truncated ml-4px">Chat</div>
					</label>

					<label for="Chat__Tab3" class="btn btn-style w-100 d-flex align-items-center justify-content-center ml-12px">
						<label for="Chat__Tab4" class="btn btn-has-icon" data-tooltip="Notifications" data-tooltip-bottom>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
								<path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"></path>
							</svg>
						</label>

						<div class="text-truncated ml-4px">P2P</div>
					</label>

					<button class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center ml-12px lightbox" data-togglable="Chat">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"></path>
						</svg>
					</button>
				</div>

				<div id="Chat__Body" class="body">
					<div id="Chat__Panel1" class="panel"></div>

					<div id="Chat__Panel2" class="panel"></div>

					<div id="Chat__Panel3" class="panel"></div>

					<div id="Chat__Panel4" class="panel"></div>

					<div id="Chat__Panel5" class="panel"></div>
				</div>
			</div>
		</div>
	`;

    document.getElementById('Chat').outerHTML = html;
})();

/*** Inject HTML - Panel 1 ***/

const togglableProfile = htmlToElement(`<div id="ChatProfile" class="togglable">
	<div class="container">
		<div class="header">
			<button class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</button>

			<div class="title text-white text-truncated"></div>
		</div>

		<div class="body">
			<img src="#" onerror="error_user_img(this)">
			<div class="name text-white text-center text-truncated"></div>
			<div class="description"></div>
			<div class="actions">
				<button class="btn btn-style w-100" data-action="view_profile" data-view-uid="0">View Profile</button>
				<button class="btn btn-style w-100 mt-12px" onclick="document.querySelector('#ChatProfile .header button').click()" data-room="">Send Message</button>
				<button class="btn btn-style w-100 mt-12px" data-action="follow" data-view-uid="0">Follow</button>
				<button class="btn btn-style w-100 mt-12px" data-action="report" data-view-uid="0">Report</button>
			</div>
		</div>
	</div>
</div>`);

/*** Panel 1 - Chat user profile ***/

const show_profile = (title, id) => {
    let _body = togglableProfile.querySelector('.body');

    if (DATA.conf.uid == id) {
        (async () => {
            _body.querySelector('img').src = await get_user_image(DATA.conf.JBU);
        })();
    } else {
        _body.querySelector('img').src = DATA.ERROR_USER_IMG;
        DATA.view_chat_uid = id;
        DATA.view_chat_img = _body.querySelector('img');
        handleAction('wuid');
    }

    togglableProfile.querySelector('.header button').addEventListener('click', (event) => {
        togglableProfile.remove();
    });

    togglableProfile.querySelector('.header .title').textContent = title;

    _body.querySelector('.name').textContent = title;
    _body.querySelector('.description').textContent = `Hello my name is ${title} and this is some demo placeholder text.`;

    if (DATA.conf.uid == id) {
        _body.querySelector('.actions button[data-view-uid][data-action="view_profile"]').dataset.viewUid = id;
        _body.querySelectorAll('.actions .mt-12px').forEach((el) => {
            el.classList.add('d-none');
        });
    } else {
        _body.querySelector('.actions button[data-room]').dataset.room = `${Math.min(DATA.conf.uid, id)}:${Math.max(DATA.conf.uid, id)}`;
        _body.querySelectorAll('.actions button[data-view-uid]').forEach((el) => {
            el.dataset.viewUid = id;
        });
        _body.querySelectorAll('.actions .mt-12px').forEach((el) => {
            el.classList.remove('d-none');
        });
    }

    let _follow = _body.querySelector('.actions button[data-action="follow"], .actions button[data-action="unfollow"]');

    if (DATA.conf.followings && DATA.conf.followings[id]) {
        _follow.dataset.action = 'unfollow';
        _follow.innerText = 'Unfollow';
    } else {
        _follow.dataset.action = 'follow';
        _follow.innerText = 'Follow';
    }

    elementify('Chat').appendChild(togglableProfile);
};

const set_chat = (msg) => {
    msg = msg
        .map(
            (v) => `<div class="message">
	<button class="name" style="color: ${stringToColour(v.M || 'Anonymous')};" ${(v.u && ' onclick="show_profile(\'' + v.M + "', " + v.u + ')"') || ''}>${v.M || 'Anonymous'}</button>
	<div class="text">${v.d}</div>
	<div class="time" data-timer="${(v.t = new Date(v.t)).getTime()}" data-tooltip="${v.t.toLocaleDateString()} ${v.t.toLocaleTimeString()}" data-tooltip-left>${timeDifference(Date.now(), v.t)}</div>
</div>`
        )
        .join('');

    document.getElementById('Chat__Panel1').outerHTML = `<div id="Chat__Panel1" class="panel">
	<div class="container">
		<div class="body">${msg}</div>

		<div class="footer">
			<div id="Chat__TextInput" placeholder="Message" autocomplete="off" autocorrect="off" spellcheck="false" contenteditable="true"></div>

			<button id="Chat__SendButton" class="btn btn-style btn-has-icon" data-action="chat">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="chat">
					<path d="M1 8A.5.5 0 011.5 7.5H13.293L10.146 4.354A.5.5 0 0110.854 3.646L14.854 7.646A.5.5 0 0114.854 8.354L10.854 12.354A.5.5 0 0110.146 11.646L13.293 8.5H1.5A.5.5 0 011 8Z" data-action="chat"/>
				</svg>
			</button>
		</div>
	</div>
</div>`;
};

const handle_chat = (msg) => {
    DATA.chat.unshift(msg);
    set_chat(DATA.chat);
};

/*** Inject HTML - Panel 2 ***/

(() => {
    set_chat(DATA.chat);
})();

(() => {
    /*** Panel 1 - Allow only text in chat text input ***/

    const textInput = elementify('Chat__TextInput');

    /* https://stackoverflow.com/a/64001839 */
    function insertTextAtSelection(div, txt) {
        let sel = window.getSelection();
        let text = div.textContent;
        let before = Math.min(sel.focusOffset, sel.anchorOffset);
        let after = Math.max(sel.focusOffset, sel.anchorOffset);
        let afterStr = text.substring(after);
        if (afterStr == '') afterStr = '\n';
        div.textContent = text.substring(0, before) + txt + afterStr;
        sel.removeAllRanges();
        let range = document.createRange();
        range.setStart(div.childNodes[0], before + txt.length);
        range.setEnd(div.childNodes[0], before + txt.length);
        sel.addRange(range);
    }

    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            insertTextAtSelection(textInput, '\n');
        } else {
            DATA.chat_message = event.target.value;
        }
    });

    textInput.addEventListener('paste', (event) => {
        event.preventDefault();
        let text = (event.originalEvent || event).clipboardData.getData('text/plain');
        insertTextAtSelection(textInput, text);
        DATA.chat_message = event.target.value;
    });
})();

/*** Inject HTML - Panel 2 ***/

(() => {
    const world = (Lang) => {
        let [lang, lang_title] = Lang;
        return `<label for="Chat__Tab1" class="btn btn-style btn-has-icon w-100 d-flex align-items-center justify-content-center" data-room="${lang}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-room="${lang}">
		<path d="M0 8A8 8 0 1116 8 8 8 0 010 8ZM7.5 1.077C6.83 1.281 6.165 1.897 5.613 2.932A7.97 7.97 0 005.145 4H7.5V1.077ZM4.09 4A9.267 9.267 0 014.73 2.461 6.7 6.7 0 015.327 1.528 7.025 7.025 0 002.255 4H4.09ZM3.508 7.5C3.538 6.623 3.646 5.782 3.82 5H1.674A6.958 6.958 0 001.018 7.5H3.508ZM4.847 5A12.5 12.5 0 004.509 7.5H7.5V5H4.847ZM8.5 5V7.5H11.49A12.495 12.495 0 0011.153 5H8.5ZM4.51 8.5A12.5 12.5 0 004.847 11H7.5V8.5H4.51ZM8.5 8.5V11H11.153C11.34 10.235 11.459 9.392 11.491 8.5H8.5ZM5.145 12C5.283 12.386 5.44 12.744 5.613 13.068 6.165 14.103 6.831 14.718 7.5 14.923V12H5.145ZM5.327 14.472A6.696 6.696 0 014.73 13.539 9.268 9.268 0 014.09 12H2.255A7.024 7.024 0 005.327 14.472ZM3.82 11A13.652 13.652 0 013.508 8.5H1.018C1.08 9.39 1.309 10.233 1.674 11H3.82ZM10.673 14.472A7.024 7.024 0 0013.745 12H11.91A9.27 9.27 0 0111.27 13.539 6.688 6.688 0 0110.673 14.472ZM8.5 12V14.923C9.17 14.719 9.835 14.103 10.387 13.068 10.56 12.744 10.717 12.386 10.855 12H8.5ZM12.18 11H14.326C14.691 10.233 14.92 9.39 14.982 8.5H12.492A13.65 13.65 0 0112.18 11ZM14.982 7.5A6.959 6.959 0 0014.326 5H12.18C12.354 5.782 12.462 6.623 12.492 7.5H14.982ZM11.27 2.461C11.517 2.925 11.732 3.441 11.91 4H13.745A7.024 7.024 0 0010.673 1.528C10.891 1.812 11.091 2.126 11.27 2.461ZM10.855 4A7.966 7.966 0 0010.387 2.932C9.835 1.897 9.17 1.282 8.5 1.077V4H10.855Z" data-room="${lang}"/>
	</svg>
	<div data-room="${lang}">${lang_title}</div>
</label>`;
    };

    document.getElementById('Chat__Panel2').outerHTML = `<div id="Chat__Panel2" class="panel">${DATA.LANGS.map(world).join('')}</div>`;
})();

/*** Inject HTML - Panel 3 ***/

(async () => {
    const set_last_chat = (data) => `<label for="Chat__Tab5" class="btn" data-room="${data.r}">
	<img id="${lazy_get_nft_image('JBU', data.j, DATA.CHAIN_ID, `p2p-chat-user-img-${data.j}`)}">

	<div>
		<div class="meta">
			<div class="name text-white text-truncated">User #${data.u}</div>
			<div class="time" data-timer="${(data.t = new Date(data.t)).getTime()}" data-tooltip="${data.t.toLocaleDateString()} ${data.t.toLocaleTimeString()}" data-tooltip-left>${timeDifference(Date.now(), data.t)}</div>
		</div>
		<div class="text-truncated">${data.d}</div>
	</div>
</label>`;

    const html = `
		<div id="Chat__Panel3" class="panel">
			<div class="container">
				<input type="radio" name="chat_panel3_tab" id="Chat__Panel3__Tab1" class="visually-hidden" autocomplete="off" checked>
				<input type="radio" name="chat_panel3_tab" id="Chat__Panel3__Tab2" class="visually-hidden" autocomplete="off">

				<div id="Chat__Panel3__Header" class="header">
					<label for="Chat__Panel3__Tab1" class="btn btn-style w-100">
						<div class="text-truncated">Messages</div>
					</label>

					<label for="Chat__Panel3__Tab2" class="btn btn-style w-100">
						<div class="text-truncated">Private Pool</div>
					</label>
				</div>

				<div id="Chat__Panel3__Body" class="body">
					<div id="Chat__Panel3__Panel1" class="panel">
						<label for="Chat__Tab5" id="Chat__Support" class="btn">
							<img src="Base/graphics/raster/profiles/support.jpg">

							<div>
								<div class="meta">
									<div class="name text-white text-truncated">Support</div>
									<div class="time">14:15</div>
								</div>
								<div class="text-truncated">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum aliquam aliquid, sed maxime, iusto, provident quis animi voluptates vitae molestiae cum praesentium consequuntur enim. Odio atque officiis hic rem ipsum.</div>
							</div>
						</label>

						${DATA.p2p.map(set_last_chat).join('')}
					</div>

					<div id="Chat__Panel3__Panel2" class="panel">
						<button class="btn">
							<img src="Base/graphics/raster/profiles/synagogue1.jpg">

							<div>
								<div class="meta">
									<div class="name text-white text-truncated">S1</div>
									<div class="time">14:56</div>
								</div>
								<div class="text-truncated">Lorem ipsum dolor sit amet.</div>
							</div>
						</button>

						<button class="btn">
							<img src="Base/graphics/raster/profiles/synagogue2.jpg">

							<div>
								<div class="meta">
									<div class="name text-white text-truncated">S2</div>
									<div class="time">13:45</div>
								</div>

								<div class="text-truncated">Lorem?</div>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	`;

    document.getElementById('Chat__Panel3').outerHTML = html;
})();

/*** Inject HTML - Panel 4 ***/

(() => {
    const html = `
		<div id="Chat__Panel4" class="panel">
			<div class="container">
				<div class="notification active">
					<div class="header">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-6px">
							<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
						</svg>

						<div class="text-truncated">New follower</div>
					</div>

					<div class="body"><a href="#"><u>User123</u></a> is now following you!</div>

					<div class="footer">
						<div class="mr-auto">13:37</div>

						<label class="checkbox-svg mr-6px" data-tooltip="Mark as read" data-tooltip-alt="Mark as unread" data-tooltip-left>
							<input type="checkbox" class="visually-hidden" autocomplete="off">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">x
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
							</svg>
						</label>

						<button class="btn btn-has-icon" data-tooltip="Delete" data-tooltip-left>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
							</svg>
						</button>
					</div>
				</div>

				<div class="notification active">
					<div class="header">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-6px">
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5.255 5.786A.237.237 0 005.496 6.033H6.321C6.459 6.033 6.569 5.92 6.587 5.783 6.677 5.127 7.127 4.649 7.929 4.649 8.615 4.649 9.243 4.992 9.243 5.817 9.243 6.452 8.869 6.744 8.278 7.188 7.605 7.677 7.072 8.248 7.11 9.175L7.113 9.392A.25.25 0 007.363 9.638H8.174A.25.25 0 008.424 9.388V9.283C8.424 8.565 8.697 8.356 9.434 7.797 10.043 7.334 10.678 6.82 10.678 5.741 10.678 4.23 9.402 3.5 8.005 3.5 6.738 3.5 5.35 4.09 5.255 5.786ZM6.812 11.549C6.812 12.082 7.237 12.476 7.822 12.476 8.431 12.476 8.85 12.082 8.85 11.549 8.85 10.997 8.43 10.609 7.821 10.609 7.237 10.609 6.812 10.997 6.812 11.549Z"/>
						</svg>

						<div class="text-truncated">New request</div>
					</div>

					<div class="body"><a href="#"><u>User123</u></a> is requesting something from you! You can <a href="#"><u>Accept</u></a> or <a href="#"><u>Decline</u></a> the request from here.</div>

					<div class="footer">
						<div class="mr-auto">13:37</div>

						<label class="checkbox-svg mr-6px" data-tooltip="Mark as read" data-tooltip-alt="Mark as unread" data-tooltip-left>
							<input type="checkbox" class="visually-hidden" autocomplete="off">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">x
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
							</svg>
						</label>

						<button class="btn btn-has-icon" data-tooltip="Delete" data-tooltip-left>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
							</svg>
						</button>
					</div>
				</div>

				<div class="notification">
					<div class="header">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-6px">
							<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
						</svg>

						<div class="text-truncated">New follower</div>
					</div>

					<div class="body"><a href="#"><u>ElonMusk</u></a> is now following you!</div>

					<div class="footer">
						<div class="mr-auto">May 1</div>

						<label class="checkbox-svg mr-6px" data-tooltip="Mark as read" data-tooltip-alt="Mark as unread" data-tooltip-left>
							<input type="checkbox" class="visually-hidden" autocomplete="off">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">x
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
							</svg>
						</label>

						<button class="btn btn-has-icon" data-tooltip="Delete" data-tooltip-left>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
							</svg>
						</button>
					</div>
				</div>

				<div class="notification">
					<div class="header">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-6px">
							<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
						</svg>

						<div class="text-truncated">New follower</div>
					</div>

					<div class="body"><a href="#"><u>JeffBezos</u></a> is now following you!</div>

					<div class="footer">
						<div class="mr-auto">April 25</div>

						<label class="checkbox-svg mr-6px" data-tooltip="Mark as read" data-tooltip-alt="Mark as unread" data-tooltip-left>
							<input type="checkbox" class="visually-hidden" autocomplete="off">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">x
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
							</svg>
						</label>

						<button class="btn btn-has-icon" data-tooltip="Delete" data-tooltip-left>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
							</svg>
						</button>
					</div>
				</div>

				<div class="notification">
					<div class="header">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-6px">
							<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
						</svg>

						<div class="text-truncated">New follower</div>
					</div>

					<div class="body"><a href="#"><u>VitalikButerin</u></a> is now following you!</div>

					<div class="footer">
						<div class="mr-auto">April 12</div>

						<label class="checkbox-svg mr-6px" data-tooltip="Mark as read" data-tooltip-alt="Mark as unread" data-tooltip-left>
							<input type="checkbox" class="visually-hidden" autocomplete="off">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">x
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"/>
							</svg>
						</label>

						<button class="btn btn-has-icon" data-tooltip="Delete" data-tooltip-left>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	`;

    document.getElementById('Chat__Panel4').outerHTML = html;
})();

/*** Inject HTML - Panel 5 ***/

(() => {
    const html = `
		<div id="Chat__Panel5" class="panel">
			<div class="container">
				<div class="body">
					<div class="message">
						<button class="name" style="color: rgba(204, 169, 10, 1);">Serious Jew</button>
						<div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
						<div class="time">13:39</div>
					</div>
				</div>

				<div class="footer">
					<div id="Chat__TextInput" placeholder="Message" autocomplete="off" autocorrect="off" spellcheck="false" contenteditable="true"></div>

					<button id="Chat__SendButton" class="btn btn-style btn-has-icon" data-action="chat">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="chat">
							<path d="M1 8A.5.5 0 011.5 7.5H13.293L10.146 4.354A.5.5 0 0110.854 3.646L14.854 7.646A.5.5 0 0114.854 8.354L10.854 12.354A.5.5 0 0110.146 11.646L13.293 8.5H1.5A.5.5 0 011 8Z" data-action="chat"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	`;

    document.getElementById('Chat__Panel5').outerHTML = html;
})();

/*** Panel 4 - Mark notification as read or unread ***/

(() => {
    document.querySelectorAll('#Chat__Panel4 .notification').forEach((notification) => {
        notification.querySelector('input[type="checkbox"]').addEventListener('change', (event) => {
            notification.classList.toggle('active');
        });

        notification.querySelector('button[data-tooltip="Delete"]').addEventListener('click', (event) => {
            notification.remove();
        });
    });
})();
