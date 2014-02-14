var currentWindow;

exports.createCalendarBody = function(_month, _dateIsEvent, _shift, _dayOffset) {

	var calendar = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : _month,
		holidays : _dateIsEvent,
		shiftOfDate : _shift,
		dayOffset : _dayOffset
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
				fontSize : '16sp',
			},
			text : _ref[i],
			width : TILE_WIDTH,
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

