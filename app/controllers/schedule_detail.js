var scheduleModel = Alloy.Collections.schedule;

//set day on title
//$.dateTitle.setText(Ti.API.day);

//add back button
$.schedule_detail.addEventListener('android:back', function(e) {
	openView('schedule');
});

/*
 * function addSchedule
 * add new schedule
 * input : null
 * output : void
 * */
function saveSchedule() {

}

/*
 * function cancelEditSchulde
 * cancel and return schedule view
 * input : null
 * output : void
 * */
function cancelEditSchulde(e) {

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

getListScheduleByDate();
/*
 * function getListScheduleByDate
 * Get schedule list
 * input : date
 * output : void
 * */
function getListScheduleByDate() {

	scheduleModel.fetch({
		query : 'SELECT * from schedule where _date =  "' + Ti.API.day + '"'
	});
alert(Ti.API.day);
	var data = scheduleModel.models;

	if (!data[0])
		return;

	var tableView = Ti.UI.createTableView({
		top : 0,
		height : 'auto',
		separatorColor : '#fff'
	});

	tableView.addEventListener('click', function(e) {
		openView('edit_event');
	});

	var data_list = [];
	data = data[0].toJSON();
	data = JSON.parse(data._schedule);

	for (var i = 0, n = data.length; i < n; ++i) {

		var item = data[i];

		var row = Ti.UI.createTableViewRow({
			title : item.title,
			selectionStyle : 'none',
			selectedBackgroundColor : 'transparent',
			backgroundColor : '#f0f0f0',
			left : '7dp',
			right : '7dp'
		});

		if (data[i].img) {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : item.title,
				bottom : '10dp',
				color : '#666',
				font : {
					fontSize : '18sp'
				},
				touchEnabled : false,
				left : '30dp'
			});

			row.add(Ti.UI.createImageView({
				height : '20dp',
				image : item.img,
				left : '5dp',
				touchEnabled : false,
			}));
		} else {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : item.title,
				bottom : '10dp',
				color : '#666',
				font : {
					fontSize : '18sp'
				},
				left : '5dp',
				touchEnabled : false,
			});
		}

		row.add(Ti.UI.createLabel({
			text : '| 20:00',
			font : {
				fontSize : '18dp'
			},
			touchEnabled : false,
			color : '#666',
			right : '10dp'
		}));
		row.add(scheduleTitle);
		data_list.push(row);

	}

	tableView.setData(data_list);

	$.scheduleList.add(tableView);

}

loadFriend();
/*
 * function loadFriend
 * load friend by date
 * input : null
 * output : void
 * */
function loadFriend() {

	var row = 2, column = 4, height = '30', top = 0;

	for (var i = 0; i < row; i++) {

		for (var j = 0; j < column; j++) {

			if (i > 0) {
				top = i * height + 10;
			}

			var view = Ti.UI.createView({
				backgroundColor : '#f19c98',
				height : height + 'dp',
				width : '23%',
				left : (j * 25) + '%',
				top : top + 'dp'
			});

			if ((i == 0 && j == 1) || (i == 1 && j == 2))
				view.setBackgroundColor('#efefef');

			view.add(Ti.UI.createLabel({
				text : 'Aさん',
				color : '#000',
				font : {
					fontSize : '16dp'
				}
			}));
			$.friendList.add(view);
		}

	}

}
