var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

var menu = Ti.API.TABMENU, activeColor = '#ed829c';

for (var i = 0, n = menu.length; i < n; i++) {

	var menuItemWidth = deviceWidth / n;

	var view = Ti.UI.createView({
		width : menuItemWidth + 'dp',
		height : '50dp',
		left : i * menuItemWidth + 'dp',
		action : menu[i].action	});
	if (i == 1) {
		view.setBackgroundColor(activeColor);
	}

	//button image
	view.add(Ti.UI.createImageView({
		image : menu[i].img,
		height : '22dp',
		width : '22dp',
		zIndex : 0,
		top : '3dp',
		touchEnabled : false,
		className : 'menu'
	}));

	//text
	view.add(Ti.UI.createLabel({
		text : menu[i].text,
		font : {
			fontSize : '11dp'
		},
		color : '#fff',
		zIndex : 0,
		top : '28dp',
		touchEnabled : false,
		className : 'menu-text'
	}));

	view.addEventListener('click', function(e) {
		openView(e.source.action);
	});

	$.tabMenu.add(view);
}