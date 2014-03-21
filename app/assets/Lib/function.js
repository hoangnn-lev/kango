var currentWindow, deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

exports.createCalendarBody = function(_month, _dateIsEvent, _shift, _dayOffset, _dateIsFriendNoEvent) {

	var calendar = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : _month,
		dateIsEvent : _dateIsEvent,
		shiftOfDate : _shift,
		dayOffset : _dayOffset,
		dateIsFriendNoEvent : _dateIsFriendNoEvent
	});
	return calendar;

};

exports.createCalendarDay = function(_dayOffset, _view) {

	var day = [];

	var _ref = ['日', '月', '火', '水', '木', '金', '土'];
	if (_dayOffset == 1) {
		_ref = ['月', '火', '水', '木', '金', '土', '日'];
	}

	var TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);

	for (var i = 0, _len = _ref.length; i < _len; i++) {

		if (_ref[i] == '日') {
			color = '#f08791';
		} else if (_ref[i] == '土') {
			color = '#9bb9e1';
		} else {
			color = '#676767';
		}

		_view.add(Ti.UI.createLabel({
			color : color,
			textAlign : 'center',
			font : {
				fontSize : '12dp',
			},
			text : _ref[i],
			width : TILE_WIDTH,
			left : TILE_WIDTH * i,
			touchEnabled : false
		}));
	}

};

exports.convertDayName = function(str) {

	switch(str) {

		case 'Monday':
		case 1:
			return '月';

		case 'Tuesday':
		case 2:
			return '火';

		case 'Wednesday':
		case 3:
			return '水';

		case 'Thursday':
		case 4:
			return '木';

		case 'Friday':
		case 5:
			return '金';

		case 'Saturday':
		case 6:
			return '土';

		case 'Sunday':
		case 0:
			return '日';

	}
	return;
};

exports.nextView = function(nextWindow) {

	nextWindow.open();

	if (currentWindow && currentWindow != nextWindow) {
		currentWindow.close();
	}
	currentWindow = nextWindow;
};

exports.loadShiftsList = function(view) {

	var shifts = Alloy.Collections.shifts;
	var allShifts = {};

	shifts.fetch({
		query : 'SELECT * from shifts'
	});

	var n = shifts.models.length;
	var data = shifts.models, shift_data = [];

	for (var i = 0; i < n; ++i) {

		allShifts[data[i].get('id')] = {
			color : data[i].get('color'),
			text : data[i].get('name')
		};

		if (data[i].get('flag') == 1) {
			shift_data.push(data[i]);
		}
	}

	if (!view) {
		return allShifts;
	}

	var index = 0, n = shift_data.length;
	var buttonWidth = (deviceWidth - 100) / 4;
	for (var i = 0; i < 4; ++i) {

		for (var j = 0; j < 4; ++j) {

			if (index >= n) {

				var label = Ti.UI.createLabel({
					text : ' なし ',
					id : 13,
					color : '#666',
					font : {
						fontSize : '14dp'
					},
					backgroundColor : '#c6c6c6',
					height : (buttonWidth - 20) + 'dp',
					width : buttonWidth + 'dp',
					top : '10dp',
					bottom : '10dp',
					left : '20dp',
					border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
					borderRadius : 10,
					borderWidth : 3,
					borderColor : '#fff',
					textAlign : 'center',
					className : 'shift-item'
				});
				view.add(label);
				return allShifts;
			}

			var label = Ti.UI.createLabel({
				text : ' ' + shift_data[index].get('name') + ' ',
				id : shift_data[index].get('id'),
				color : '#fff',
				font : {
					fontSize : '14dp'
				},
				backgroundColor : shift_data[index].get('color'),
				height : (buttonWidth - 20) + 'dp',
				width : buttonWidth + 'dp',
				top : '10dp',
				bottom : '10dp',
				left : '20dp',
				border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				borderRadius : 10,
				textAlign : 'center',
				borderWidth : 3,
				borderColor : '#fff',
				className : 'shift-item'
			});
			index++;
			view.add(label);
		}

	}

};

exports.checkFriendRequest = function() {
	//check friend request onload
	frd.checkFriendRequest();

	//add friend request onload
	var currentIntentData = [];
	var currentActivity = Ti.Android.currentActivity;

	//add friend request from url
	frd.addNewFriend(currentActivity.getIntent().getData());

	//check and friend request from url
	currentActivity.addEventListener('newintent', function(e) {
		var newintent = e.intent;
		currentIntentData = newintent.getData();
		frd.addNewFriend(currentIntentData);
	});

	//pending push data
	gcm.registerC2dm({
		callback : function(e) {
			var data = e.data;
			if (data.channel == 'friend_request') {
				frd.friendRequestC2dm(data);
			}
		}
	});
};

exports.createBoxIcon = function(button, viewIcon, selectedIcon) {

	var buttonTabs = Ti.API.ICON, currentButton;
	var activeTab = null, l = buttonTabs.length;
	var buttonWidth = (deviceWidth - 20) / l;
	buttonTabs[0]['icons'] = func.readLogImg();

	for (var i = 0; i < l; i++) {

		var active_button = 'active.png';
		var deactive_button = 'deactive.png';

		var buttontab = Ti.UI.createImageView({
			width : '25%',
			height : '45dp',
			image : buttonTabs[i].folder + deactive_button,
			active : active_button,
			de_active : deactive_button,
			'data' : buttonTabs[i].icons,
			'folder' : buttonTabs[i].folder,
			left : i * 25 + '%',
			top : 0,
			className : 'buttonTabs'
		});

		//add event
		buttontab.addEventListener('click', function(e) {
			if (this !== currentButton) {
				if (currentButton)
					currentButton.setImage(currentButton.folder + currentButton.de_active);
				currentButton = this;
				currentButton.setImage(e.source.folder + e.source.active);
				viewIcon.removeAllChildren();
				viewIcon.add(exports.createScrollViewIcon(e.source.data, e.source.folder, viewIcon, selectedIcon));
			}
		});
		if (i == 1 && selectedIcon == '') {
			currentButton = buttontab;
			currentButton.setImage(buttonTabs[i].folder + active_button);
			viewIcon.add(exports.createScrollViewIcon(buttonTabs[i].icons, buttonTabs[i].folder, viewIcon, selectedIcon));
		} else if (selectedIcon != '') {

			if (selectedIcon.indexOf(buttonTabs[i].folder) != '-1') {
				buttontab.fireEvent('click');
			}
		}

		button.add(buttontab);
	}
};

exports.createScrollViewIcon = function(icon, folder, viewIcon, selectedIcon) {

	var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

	var views = [];
	var iconCurrent;

	var column = 5, row = 2, num = column * row, n = icon.length, m = Math.ceil(icon.length / num), imgSize = deviceWidth / column, icon_index = 0;

	//create view
	for (var i = 0; i < m; ++i) {

		var view = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE
		});

		//create image with column and row
		for (var r = 0; r < row; ++r) {

			for (var c = 0; c < column; ++c) {
				var left = 0;
				if (c > 0)
					left = imgSize * c - 12;

				//create image view
				var img = '';
				if (folder == Ti.API.ICON[0]['folder']) {
					img = icon[icon_index];
				} else {
					img = folder + icon[icon_index];
				}
				if (img) {
					var iconView = Ti.UI.createImageView({
						image : img,
						left : left + 'dp',
						top : imgSize * r + 5 + 'dp',
						bottom : '10dp',
						width : imgSize - 20 + 'dp',
						height : imgSize - 20 + 'dp',
						right : '3dp',
						borderColor : '#fff',
						borderWidth : 5
					});

					//active selected icon
					if (selectedIcon == (folder + icon[icon_index])) {
						iconView.setBorderColor('#ed829c');
						iconCurrent = iconView;
					}

					//click icon
					iconView.addEventListener('click', function(e) {

						if (this.getBorderColor() == '#ed829c') {
							this.setBorderColor('#fff');
							Ti.API.selectedIcon = selectedIcon = '';
						} else {
							if (iconCurrent)
								iconCurrent.setBorderColor('#fff');
							this.setBorderColor('#ed829c');
							Ti.API.selectedIcon = selectedIcon = e.source.image;
						}

						iconCurrent = this;
					});
					icon_index++;
					view.add(iconView);
				}

			}

		}
		views.push(view);
	}

	viewIcon.setHeight(imgSize * row + 'dp');

	return Ti.UI.createScrollableView({
		views : views
	});
};

exports.getScheduleId = function(date) {
	var scheduleModel = Alloy.Collections.schedule;
	scheduleModel.fetch({
		query : 'SELECT * from schedule where date = "' + date + '"'
	});

	if (scheduleModel.models.length > 0)
		return scheduleModel.models[0].get('id');
	else {

		var schedule = Alloy.createModel('schedule', {
			date : date
		});

		scheduleModel.add(schedule);
		schedule.save();
		return schedule.get('id');

	}
};

exports.writeLogImg = function(img) {

	var list_img = [img];
	var myFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'log_selected_img.txt');

	if (!myFile.exists()) {
		myFile.write(JSON.stringify(list_img));
	} else {
		var get_img = JSON.parse(myFile.read().toString()), temp = [];

		for (var i = 0; i < 9; i++) {
			if (get_img[i] && get_img[i] != img) {
				temp.push(get_img[i]);
			}
		}
		temp.unshift(img);
		myFile.write(JSON.stringify(temp));
	}
};

exports.readLogImg = function() {
	var myFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'log_selected_img.txt');
	return myFile.exists() ? JSON.parse(myFile.read().toString()) : [];
};

exports.pagingControl = function(scrollableView) {
	var container = Titanium.UI.createView({
		height : Ti.UI.FILL,
		backgroundColor : "tranparent",
	});

	var viewLeftArrow = Ti.UI.createView({
		height : '40dp',
		width : '40dp',
		left : '16dp',
		selected : false
	});

	var imageLeftArrow = Ti.UI.createImageView({
		image : '/tutorial/btnPrev.png',
		height : '40dp',
		width : '40dp',
	});
	viewLeftArrow.add(imageLeftArrow);

	container.add(viewLeftArrow);

	var bulletContainer = Ti.UI.createView({
		height : '13dp',
		width : Ti.UI.SIZE,
		bottom : '20dp',
	});
	container.add(bulletContainer);

	var viewRightArrow = Ti.UI.createView({
		height : '40dp',
		width : '40dp',
		right : '16dp',
		selected : true
	});

	var imageRightArrow = Ti.UI.createImageView({
		image : '/rightBlueArrow.png',
		height : '40dp',
		width : '40dp',
	});
	viewRightArrow.add(imageRightArrow);
	container.add(viewRightArrow);
	// Keep a global reference of the available pages
	var numberOfPages = scrollableView.getViews().length;

	var pages = [];
	// without this, the current page won't work on future references of the module

	// Go through each of the current pages available in the scrollableView
	for (var i = 0; i < numberOfPages; i++) {
		var page = Titanium.UI.createView({
			borderRadius : 13,
			width : '13dp',
			height : '13dp',
			left : 25 * i + 'dp',
			backgroundColor : "#fff",
		});
		// Store a reference to this view
		pages.push(page);
		// Add it to the container
		bulletContainer.add(page);
	}

	// Mark the initial selected page
	pages[scrollableView.getCurrentPage()].setBackgroundColor("#ed829c");

	if (pages.length == 1) {
		imageLeftArrow.image = '/tutorial/empty.png';
		imageRightArrow.image = '/tutorial/empty.png';
		viewLeftArrow.selected = false;
		viewRightArrow.selected = false;
	} else {
		imageLeftArrow.image = '/tutorial/empty.png';
		imageRightArrow.image = '/tutorial/btnNxt.png';
		viewLeftArrow.selected = false;
		viewRightArrow.selected = true;
	}

	viewLeftArrow.addEventListener('click', function(e) {
		if (this.selected) {
			scrollableView.currentPage -= 1;
		}
	});
	viewRightArrow.addEventListener('click', function(e) {
		if (this.selected) {
			scrollableView.currentPage += 1;
		}
	});

	container.addEventListener('swipe', function(e) {

		if (e.direction == 'right' && viewLeftArrow.selected) {
			scrollableView.currentPage -= 1;
		} else if (e.direction == 'left' && viewRightArrow.selected) {
			scrollableView.currentPage += 1;
		}
	});

	// Callbacks
	onScroll = function(event) {
		if (event.currentPage || event.currentPage == 0) {
			// Go through each and reset it's color
			for (var i = 0; i < numberOfPages; i++) {
				pages[i].setBackgroundColor("#fff");
			}
			// Bump the Color of the new current page
			pages[event.currentPage].setBackgroundColor("#ed829c");

			if (event.currentPage == 0) {
				if (event.currentPage < pages.length - 1) {
					imageLeftArrow.image = '/tutorial/empty.png';
					imageRightArrow.image = '/tutorial/btnNxt.png';
					viewLeftArrow.selected = false;
					viewRightArrow.selected = true;
				} else {
					imageLeftArrow.image = '/tutorial/empty.png';
					imageRightArrow.image = '/tutorial/empty.png';
					viewLeftArrow.selected = false;
					viewRightArrow.selected = false;
				}
			} else if (event.currentPage < pages.length - 1) {
				imageLeftArrow.image = '/tutorial/btnPrev.png';
				imageRightArrow.image = '/tutorial/btnNxt.png';
				viewLeftArrow.selected = true;
				viewRightArrow.selected = true;
			} else {
				imageLeftArrow.image = '/tutorial/btnPrev.png';
				imageRightArrow.image = '/tutorial/empty.png';
				viewLeftArrow.selected = true;
				viewRightArrow.selected = false;

			}
		}
	};

	// Attach the scroll event to this scrollableView, so we know when to update things
	scrollableView.addEventListener("scroll", onScroll);

	return container;

};

exports.getUID = function() {
	var configs = Alloy.Collections.configs;
	configs.fetch({
		query : 'select cg_value from configs where cg_name="uid"'
	});

	if (configs.models.length > 0) {
		return configs.models[0].get('cg_value');
	}
	return;
};

exports.validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

exports.rangeDate = function(date_start, date_end) {
	var output = [];

	var start = date_start.split('-');
	var end = date_end.split('-');

	for (var y = start[1]; y <= end[1]; y++) {
		for (var m = 1; m <= 12; m++) {
			if (y == start[1] && m < start[0])
				continue;
			if (y == end[1] && m > end[0])
				continue;
			m = m < 10 ? '0' + m : m;
			output.push('\'' + m + '-' + y + '\'');
		}
	}
	return output.join(',');
};

exports.alert = function(msg) {
	Titanium.UI.createAlertDialog({
		title : 'お知らせ',
		buttonNames : ['OK'],
		message : msg
	}).show();
};
