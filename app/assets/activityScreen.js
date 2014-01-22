var activityScreen = ( function() {
		//
		// Private methods and vars
		//

		var win, indicator;
		function createControls() {
			
			win = Ti.UI.createWindow({
				height : '100%',
				width : '100%',
				backgroundColor : '#000',
				opacity : 0.5,
				zIndex : 8,
			});

			var view = Ti.UI.createView();
			view.add(Ti.UI.createLabel({
				text : ' Loading...',
				font : {
					fontSize : '20sp'
				}
			}));
			win.add(view);
			win.open();
		}

		//
		// Public methods stored in api
		//

		var api = {};
		var currentWindow = '';

		api.nextWindow = function(nextWindow) {
			nextWindow.open();

			if (currentWindow && currentWindow != nextWindow) {
				currentWindow.close();
			}
			currentWindow = nextWindow;
		};
		api.nextWindowByLoading = function(nextWindow) {
			createControls();
			nextWindow.open();

			if (currentWindow && currentWindow != nextWindow) {
				currentWindow.close();
			}
			currentWindow = nextWindow;
			win.close();
		};

		return api;
	}());
