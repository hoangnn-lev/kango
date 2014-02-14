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
    priority: 1000.004,
    key: "View",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
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
    priority: 10000.0041,
    key: "border",
    style: {
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#eee"
    }
}, {
    isClass: true,
    priority: 10000.0043,
    key: "header",
    style: {
        top: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974"
    }
}, {
    isClass: true,
    priority: 10000.0044,
    key: "lbHeader",
    style: {
        textAlign: "center",
        color: "#fff"
    }
}, {
    isClass: true,
    priority: 10000.0045,
    key: "btnHeader",
    style: {
        right: "5dp",
        width: "30dp",
        top: "5dp",
        bottom: "5dp",
        zIndex: "5",
        height: "30dp"
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
    priority: 100000.0042,
    key: "leftMenu",
    style: {
        backgroundColor: "#f3f3f3",
        width: "80%",
        height: Ti.UI.FILL,
        left: "-80%",
        zIndex: 3
    }
}, {
    isId: true,
    priority: 100000.0046,
    key: "searchResult",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#f8ecee",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#f8ecee"
    }
}, {
    isId: true,
    priority: 100000.0047,
    key: "searchUsr",
    style: {
        font: {
            fontSize: "20sp"
        }
    }
} ];