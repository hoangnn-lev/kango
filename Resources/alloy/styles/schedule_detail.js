module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#fff"
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "Button",
    style: {
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "25sp"
        },
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10
    }
}, {
    isApi: true,
    priority: 1000.0005,
    key: "Label",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        }
    }
}, {
    isApi: true,
    priority: 1000.0006,
    key: "TextArea",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#fff"
    }
}, {
    isApi: true,
    priority: 1000.0007,
    key: "TextField",
    style: {
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff"
    }
}, {
    isApi: true,
    priority: 1000.0009,
    key: "TableViewRow",
    style: {
        height: Ti.UI.SIZE,
        top: 20,
        bottom: 20,
        color: "#666",
        font: {
            fontSize: "20sp"
        }
    }
}, {
    isApi: true,
    priority: 1000.001,
    key: "ScrollView",
    style: {
        top: 20,
        bottom: 20
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "container",
    style: {
        layout: "vertical",
        left: 50,
        right: 50
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "error",
    style: {
        font: {
            fontSize: "12dp"
        },
        color: "red"
    }
}, {
    isClass: true,
    priority: 10000.0075,
    key: "btnTop",
    style: {
        height: "25dp",
        width: "14dp",
        zIndex: 10,
        top: "10dp",
        bottom: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0076,
    key: "titleCenter",
    style: {
        height: Ti.UI.SIZE,
        width: "60dp",
        left: "50%",
        zIndex: 0,
        backgroundColor: "#ffcc33"
    }
}, {
    isClass: true,
    priority: 10000.008,
    key: "smallTitle",
    style: {
        font: {
            fontSize: "13dp"
        },
        color: "#666",
        top: 0,
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0081,
    key: "scheduleTitle",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0083,
    key: "button",
    style: {
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        top: 0
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "main",
    style: {
        top: "50dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "tabMenu",
    style: {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp"
    }
}, {
    isId: true,
    priority: 100000.0073,
    key: "top",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        top: 0,
        bottom: 20
    }
}, {
    isId: true,
    priority: 100000.0074,
    key: "content",
    style: {
        left: "10dp",
        right: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0077,
    key: "dateTitle",
    style: {
        color: "#fff",
        height: "30dp",
        width: "70dp",
        left: "30%"
    }
}, {
    isId: true,
    priority: 100000.0078,
    key: "friendBlock",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0079,
    key: "friendList",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "25dp"
    }
}, {
    isId: true,
    priority: 100000.0082,
    key: "groupButton",
    style: {
        top: "15dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
} ];