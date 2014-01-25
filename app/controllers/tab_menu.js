var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

$.tabMenu.setTop(top - 75 + 'dp');

var menu = Ti.API.TABMENU;

for (var i = 0, n = menu.length; i < n; i++) {

	var menuItemWidth = deviceWidth / n;

	var view = Ti.UI.createView({
		width : menuItemWidth + 'dp',
		height : '50dp',
		left : i * menuItemWidth + 'dp',
		action : menu[i].action	});

	//button image
	view.add(Ti.UI.createImageView({
		image : menu[i].img,
		height : '27dp',
		width : '27dp',
		zIndex : 0,
		top : '3dp',
		touchEnabled : false,
		className:'menu'
	}));

	//text
	view.add(Ti.UI.createLabel({
		text : menu[i].text,
		font : {
			fontSize : '11dp'
		},
		color : '#666',
		zIndex : 0,
		top : '32dp',
		touchEnabled : false,
		className:'menu-text'
	}));

	view.addEventListener('click', function(e) {
		openView(e.source.action);
	});

	$.tabMenu.add(view);
}