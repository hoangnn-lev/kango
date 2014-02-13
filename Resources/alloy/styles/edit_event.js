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
    isApi: true,
    priority: 1000.0021,
    key: "TextField",
    style: {
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        color: "#999999"
    }
}, {
    isApi: true,
    priority: 1000.0022,
    key: "TextArea",
    style: {
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        color: "#999999"
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
    priority: 10000.0024,
    key: "pink",
    style: {
        color: "#ff3974"
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "iconMemo",
    style: {
        width: "19%",
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        borderColor: "#fff"
    }
}, {
    isClass: true,
    priority: 10000.0029,
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
        top: "15dp"
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
    key: "main",
    style: {
        backgroundColor: "#f5f1e9"
    }
}, {
    isId: true,
    priority: 100000.0023,
    key: "content",
    style: {
        top: 0,
        left: "10dp",
        right: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0025,
    key: "wicon",
    style: {
        top: "10dp",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#e4f7ff",
        width: Ti.UI.FILL,
        layout: "vertical",
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0026,
    key: "listIcon",
    style: {
        top: "5dp",
        bottom: "5dp",
        left: "5dp",
        right: "5dp"
    }
}, {
    isId: true,
    priority: 100000.0027,
    key: "buttonTabs",
    style: {
        height: "40dp",
        backgroundColor: "#f9dce3",
        bottom: "0",
        width: Ti.UI.FILL,
        layout: "horizontal"
    }
}, {
    isId: true,
    priority: 100000.003,
    key: "groupButton",
    style: {
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0032,
    key: "dayName",
    style: {
        backgroundImage: "/icons/bg-circle.png",
        height: "25dp",
        width: "25dp",
        color: "#fff",
        font: {
            fontSize: "14dp"
        },
        textAlign: "center",
        left: "85dp"
    }
}, {
    isId: true,
    priority: 100000.0033,
    key: "date",
    style: {
        color: "#8d8d8d",
        font: {
            fontSize: "20dp"
        },
        left: "5dp"
    }
} ];