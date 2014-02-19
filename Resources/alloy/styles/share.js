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
            fontSize: "14dp"
        },
        height: Ti.UI.SIZE,
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
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
    priority: 1000.0111,
    key: "View",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    }
}, {
    isApi: true,
    priority: 1000.0112,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        top: 0,
        height: Ti.UI.SIZE,
        zIndex: 0
    }
}, {
    isApi: true,
    priority: 1000.0113,
    key: "Button",
    style: {
        zIndex: 0
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
    priority: 10000.0114,
    key: "line",
    style: {
        top: "10dp",
        bottom: "10dp",
        zIndex: "0",
        backgroundColor: "#ccc",
        width: Ti.UI.FILL,
        height: "1"
    }
}, {
    isClass: true,
    priority: 10000.0115,
    key: "item",
    style: {
        backgroundColor: "#f19c99",
        borderRadius: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        color: "#000",
        left: 0,
        top: "10dp",
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp"
    }
}, {
    isClass: true,
    priority: 10000.0117,
    key: "title",
    style: {
        color: "#000",
        top: "20dp",
        bottom: "0",
        height: "20dp",
        width: Ti.UI.FILL,
        textAlign: "left"
    }
}, {
    isClass: true,
    priority: 10000.0118,
    key: "on",
    style: {
        backgroundColor: "#fff2cc",
        width: "60dp",
        height: Ti.UI.FILL,
        color: "#000",
        font: {
            fontSize: "14dp"
        },
        borderRadius: 0,
        right: 0
    }
}, {
    isClass: true,
    priority: 10000.0119,
    key: "off",
    style: {
        backgroundColor: "#cccccc",
        width: "60dp",
        height: Ti.UI.FILL,
        color: "#000",
        font: {
            fontSize: "14dp"
        },
        borderRadius: 0,
        right: 0
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
    priority: 100000.0116,
    key: "content",
    style: {
        left: "10dp",
        right: "10dp",
        top: "10dp",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical"
    }
} ];