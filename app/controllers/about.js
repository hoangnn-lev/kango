$.about.addEventListener('android:back', function(e) {
	openView('setting');
});

Ti.App.addEventListener('openBrowser', function(e) {
	Ti.Platform.openURL(e.URL);
}); 