var selectedIcon = '';
var imgWidth = Ti.Platform.displayCaps.platformWidth / 16;
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
$.schedule_edit.addEventListener('android:back', function(e) {
	openView('schedule');
});

$.listIcon.setHeight(40 + imgWidth * 2 + 'dp');

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

	for (var i = 0, n = icon.length; i < n; i++) {

		//create view
		if (i == 0 || (i + 1) % 10 == 0) {

			var view = Ti.UI.createView({
				width : Ti.UI.FILL,
				layout : 'horizontal',
				height : Ti.UI.SIZE
			});
		}

		//create image view
		var iconView = Ti.UI.createImageView({
			image : folder + icon[i],
			left : '15dp',
			top : '10dp',
			bottom : '10dp',
			opacity : '0.3',
			width : imgWidth + 'dp',
			height : imgWidth + 'dp',
		});

		//selected icon
		if (selectedIcon == (folder + icon[i])) {
			iconView.setOpacity(1);
			iconCurrent = iconView;
		}

		//add event
		iconView.addEventListener('click', function(e) {

			if (this.getOpacity() == '1') {
				this.setOpacity(0.3);
				selectedIcon = '';
			} else {
				if (iconCurrent)
					iconCurrent.setOpacity(0.3);
				this.setOpacity(1);
				selectedIcon = e.source.image;
			}

			iconCurrent = this;
		});
		view.add(iconView);
		if ((i + 1) % 10 == 0 || (i + 1) == n)
			views.push(view);
	}

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
		scheduleView();
		if ('callback' in $.schedule_edit)
			$.schedule_edit.callback();
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
