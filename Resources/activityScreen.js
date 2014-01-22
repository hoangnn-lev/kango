var activityScreen = function() {
    function createControls() {
        win = Ti.UI.createWindow({
            height: "100%",
            width: "100%",
            backgroundColor: "#000",
            opacity: .5,
            zIndex: 8
        });
        var view = Ti.UI.createView();
        view.add(Ti.UI.createLabel({
            text: " Loading...",
            font: {
                fontSize: "20sp"
            }
        }));
        win.add(view);
        win.open();
    }
    var win;
    var api = {};
    var currentWindow = "";
    api.nextWindow = function(nextWindow) {
        nextWindow.open();
        currentWindow && currentWindow != nextWindow && currentWindow.close();
        currentWindow = nextWindow;
    };
    api.nextWindowByLoading = function(nextWindow) {
        createControls();
        nextWindow.open();
        currentWindow && currentWindow != nextWindow && currentWindow.close();
        currentWindow = nextWindow;
        win.close();
    };
    return api;
}();