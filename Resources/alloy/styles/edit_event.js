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
    priority: 1000.0005,
    key: "Label",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 1,
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
    priority: 10000.0022,
    key: "pink",
    style: {
        color: "#ff3974"
    }
}, {
    isClass: true,
    priority: 10000.0023,
    key: "wicon",
    style: {
        backgroundColor: "#e4f7ff",
        borderRadius: 10,
        borderColor: "#e4f7ff"
    }
}, {
    isClass: true,
    priority: 10000.0024,
    key: "iconMemo",
    style: {
        width: "19%",
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        borderColor: "#fff"
    }
}, {
    isClass: true,
    priority: 10000.0025,
    key: "btnTop",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0026,
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
    priority: 10000.0027,
    key: "time",
    style: {
        height: "45dp",
        width: Ti.UI.FILL,
        top: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "timeBackground",
    style: {
        height: "35dp",
        width: "55dp",
        backgroundColor: "#ccc",
        left: 0
    }
}, {
    isClass: true,
    priority: 10000.0029,
    key: "labelTime",
    style: {
        left: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.003,
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
    priority: 10000.0032,
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
    priority: 100000.002,
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
    priority: 100000.0021,
    key: "content",
    style: {
        top: 0,
        left: "10dp",
        right: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0031,
    key: "groupButton",
    style: {
        top: "15dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
} ];