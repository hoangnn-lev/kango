module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#fff"
    }
}, {
    isApi: true,
    priority: 1000.0003,
    key: "Button",
    style: {
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "25sp"
        },
        zIndex: 2,
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
    priority: 1000.0004,
    key: "Label",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        }
    }
}, {
    isApi: true,
    priority: 1000.0005,
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
    priority: 1000.0006,
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
    priority: 10000.0002,
    key: "container",
    style: {
        layout: "vertical",
        left: 50,
        right: 50
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "btnTabMenu",
    style: {
        width: "40dp",
        height: "40dp",
        backgroundColor: "#ededed",
        top: "5dp",
        bottom: "5dp"
    }
}, {
    isClass: true,
    priority: 10000.0031,
    key: "calenderTitle",
    style: {
        color: "#fff",
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0032,
    key: "scheduleTitle",
    style: {
        width: Ti.UI.FILL,
        height: "40dp",
        backgroundColor: "#e4f7ff"
    }
}, {
    isClass: true,
    priority: 10000.0033,
    key: "scheduleDateInfo",
    style: {
        color: "#333",
        font: {
            fontSize: "20sp"
        }
    }
}, {
    isClass: true,
    priority: 10000.0034,
    key: "editScheduleButton",
    style: {
        font: {
            fontSize: "20sp"
        }
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "tabMenu",
    style: {
        backgroundColor: "#ededed",
        width: Ti.UI.FILL,
        heigth: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0035,
    key: "days",
    style: {
        layout: "horizontal",
        top: 0,
        height: "22dp",
        backgroundColor: "#ff3974"
    }
} ];