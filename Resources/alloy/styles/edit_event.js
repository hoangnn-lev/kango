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
            fontSize: "16sp"
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
    priority: 1000.0008,
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
    priority: 1000.0009,
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
    priority: 10000.001,
    key: "error",
    style: {
        font: {
            fontSize: "12dp"
        },
        color: "red"
    }
}, {
    isClass: true,
    priority: 10000.0021,
    key: "pink",
    style: {
        color: "#ff3974"
    }
}, {
    isClass: true,
    priority: 10000.0022,
    key: "wicon",
    style: {
        backgroundColor: "#e4f7ff",
        borderRadius: 10,
        borderColor: "#e4f7ff"
    }
}, {
    isClass: true,
    priority: 10000.0023,
    key: "iconMemo",
    style: {
        width: "19%",
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        borderColor: "#fff"
    }
}, {
    isClass: true,
    priority: 10000.0024,
    key: "btnTop",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0025,
    key: "tab",
    style: {
        width: Ti.UI.SIZE,
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
        height: Ti.UI.FILL,
        backgroundColor: "#f3f3f3",
        color: "#999",
        font: {
            fontSize: "14sp"
        },
        borderRadius: 0
    }
}, {
    isClass: true,
    priority: 10000.0026,
    key: "time",
    style: {
        height: "45dp",
        width: Ti.UI.FILL,
        top: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0027,
    key: "timeBackground",
    style: {
        height: "35dp",
        width: "55dp",
        backgroundColor: "#ccc",
        left: 0
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "labelTime",
    style: {
        left: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0029,
    key: "inputTime",
    style: {
        left: "60dp",
        font: {
            fontWeight: "bold",
            fontSize: "20dp"
        },
        height: "35dp",
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0031,
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
    priority: 100000.0007,
    key: "tabMenu",
    style: {
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        height: "50dp"
    }
}, {
    isId: true,
    priority: 100000.0019,
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
    priority: 100000.002,
    key: "content",
    style: {
        top: 0,
        left: "10dp",
        right: "10dp"
    }
}, {
    isId: true,
    priority: 100000.003,
    key: "groupButton",
    style: {
        top: "15dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
} ];