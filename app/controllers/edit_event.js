var selectedIcon = '';
var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

//set data for edit schedule
if (Ti.API.rowIndex != null) {
	var row = Ti.API.holidayItem;
	row = row[Ti.API.rowIndex];
	$.title.setValue(row.title);
	$.memo.setValue(row.content);
	selectedIcon = row.img;
}

//active tabmenu
//$.tabMenu.getView('schedule').setImage(Ti.API.TABMENU['schedule_active']);

//add back button
$.edit_event.addEventListener('android:back', function(e) {
	openView('schedule');
});

var buttonTabs = Ti.API.ICON;
var currentButton = null;
var activeTab = null;
for (var i = 0, l = buttonTabs.length; i < l; i++) {
	//create image view
	var buttontab = Ti.UI.createButton({
		'title' : buttonTabs[i].title,
		'data' : buttonTabs[i].icons,
		'folder' : buttonTabs[i].folder,
		backgroundColor : '#f3f3f3',
		height : Ti.UI.FILL,
		width : Ti.UI.SIZE
	});

	//add event
	buttontab.addEventListener('click', function(e) {
		if (this !== currentButton) {
			if (currentButton)
				currentButton.setBackgroundColor("#f3f3f3");
			currentButton = this;
			currentButton.setBackgroundColor("#e4f7ff");
			$.listIcon.removeAllChildren();
			$.listIcon.add(createIconByScrollView(e.source.data, e.source.folder));
		}
	});
	if (i == 0 && selectedIcon == '') {
		currentButton = buttontab;
		currentButton.setBackgroundColor("#e4f7ff");
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

	var column = 7, row = 2, num = column * row, n = icon.length, m = Math.ceil(icon.length / num), imgSize = deviceWidth / column, icon_index = 0;

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

/*
 * function cancelEditSchulde
 * cancel and return schedule view
 * input : null
 * output : void
 * */
function cancelEditSchulde(e) {
	$.title.blur();
	$.memo.blur();
	resetData();
	openView('schedule');
}

/*
 * function resetData
 * empty data after save
 * input : null
 * output : void
 * */
function resetData() {
	Ti.API.id = null;
	Ti.API.day = null;
	Ti.API.data = null;
	Ti.API.rowIndex = null;
}

/*
 * function timePicker
 * set time for event
 * input : null
 * output : void
 * */
function timePicker() {

	$.time.setText('20:00~21:00');
}
