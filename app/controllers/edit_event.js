var selectedIcon = '';
var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

var args = arguments[0] || {};
var date = (args['data'].day).split('-');

$.date.setText(date[1] + ' / ' + date[2]);
$.dayName.setText(func.convertDayName((new Date(args['data'].day)).getDay()));

var buttonTabs = Ti.API.ICON;
var currentButton = null;
var activeTab = null;
for (var i = 0, l = buttonTabs.length; i < l; i++) {
	//create image view
	var buttontab = Ti.UI.createButton({
		'title' : buttonTabs[i].title,
		'data' : buttonTabs[i].icons,
		'folder' : buttonTabs[i].folder,
		backgroundColor : '#f9dce3',
		color : '#ed829c',
		height : Ti.UI.FILL,
		width : '20%',
		textAlign : 'center',
		className : 'buttonTabs'
	});

	//add event
	buttontab.addEventListener('click', function(e) {
		if (this !== currentButton) {
			if (currentButton)
				currentButton.setBackgroundColor("#f9dce3");
			currentButton = this;
			currentButton.setBackgroundColor("#fff");
			$.listIcon.removeAllChildren();
			$.listIcon.add(createIconByScrollView(e.source.data, e.source.folder));
		}
	});
	if (i == 0 && selectedIcon == '') {
		currentButton = buttontab;
		currentButton.setBackgroundColor("#fff");
		$.listIcon.add(createIconByScrollView(buttonTabs[i].icons, buttonTabs[i].folder));
	} else if (selectedIcon != '') {

		if (selectedIcon.indexOf(buttonTabs[i].folder) != '-1') {
			buttontab.fireEvent('click');
		}
	}

	$.buttonTabs.add(buttontab);
}

$.buttonTabs.setContentWidth(Ti.Platform.displayCaps.platformWidth + Ti.Platform.displayCaps.platformWidth / 4);

/*
 * function createIconByScrollView
 * create scrollview for icon
 * input : icon
 * output : void
 * */
function createIconByScrollView(icon, folder) {

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
				var iconView = Ti.UI.createImageView({
					image : folder + icon[icon_index],
					left : left + 'dp',
					top : imgSize * r + 5 + 'dp',
					bottom : '10dp',
					opacity : '0.1',
					width : imgSize - 15 + 'dp',
					height : imgSize - 15 + 'dp',
					right : '3dp'
				});

				//active selected icon
				if (selectedIcon == (folder + icon[icon_index])) {
					iconView.setOpacity(1);
					iconCurrent = iconView;
				}

				//click icon
				iconView.addEventListener('click', function(e) {

					if (this.getOpacity() == '1') {
						this.setOpacity(0.1);
						selectedIcon = '';
					} else {
						if (iconCurrent)
							iconCurrent.setOpacity(0.1);
						this.setOpacity(1);
						selectedIcon = e.source.image;
					}

					iconCurrent = this;
				});
				icon_index++;
				view.add(iconView);
			}

		}
		views.push(view);
	}

	$.listIcon.setHeight(imgSize * row + 'dp');

	return Ti.UI.createScrollableView({
		views : views
	});
}

/*
 * function addSchedule
 * add new schedule
 * input : null
 * output : void
 * */
function saveSchedule() {
	var title = $.title.getValue();
	if (!title) {
		Ti.UI.createAlertDialog({
			title : 'お知らせ',
			message : 'タイトルを入力してください。',
			buttonNames : ['OK']
		}).show();
	} else {

		$.title.blur();
		$.memo.blur();
		//create collection users
		Alloy.Collections.schedule = Alloy.createCollection('schedule');
		var scheduleModel = Alloy.Collections.schedule;

		var data = [];
		var day = Ti.API.day;
		if (Ti.API.holidayItem) {
			var data = Ti.API.holidayItem;
		}

		if (Ti.API.rowIndex != null) {
			data[Ti.API.rowIndex].img = selectedIcon;
			data[Ti.API.rowIndex].title = title;
			data[Ti.API.rowIndex].content = $.memo.getValue();
		} else {
			data.push({
				img : selectedIcon,
				title : title,
				content : $.memo.getValue()
			});
		}

		if (Ti.API.id) {
			var row = {
				id : Ti.API.id,
				_schedule : JSON.stringify(data),
				_date : day
			};
		} else {
			var row = {
				_schedule : JSON.stringify(data),
				_date : day
			};
		}
		var schedule = Alloy.createModel('schedule', row);
		scheduleModel.add(schedule);
		schedule.save();
		resetData();
		openView('schedule');
		if ('callback' in $.edit_event)
			$.edit_event.callback();
	}
}

//add back button
$.edit_event.addEventListener('android:back', function(e) {
	openView('schedule');
});

$.startTime.addEventListener('click', function(e) {
	var picker1 = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_TIME,
		format24 : true
	});
	$.edit_event.add(picker1);
});
