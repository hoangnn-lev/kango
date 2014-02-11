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
    isApi: true,
    priority: 1000.0081,
    key: "View",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    }
}, {
    isApi: true,
    priority: 1000.0082,
    key: "TextField",
    style: {
        zIndex: 0
    }
}, {
    isApi: true,
    priority: 1000.0083,
    key: "Button",
    style: {
        zIndex: 0
    }
}, {
    isApi: true,
    priority: 1000.0084,
    key: "Label",
    style: {
        zIndex: 0
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
    priority: 10000.0088,
    key: "smallText",
    style: {
        font: {
            fontSize: "13dp"
        },
        color: "#000",
        top: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0089,
    key: "timeBlock",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
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
    priority: 100000.0085,
    key: "content",
    style: {
        left: "10dp",
        right: "10dp",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: "40dp",
        bottom: "55dp",
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0086,
    key: "shiftName",
    style: {
        width: "120dp",
        height: "35dp",
        backgroundColor: "#f19c98",
        left: 0,
        top: "10dp",
        font: {
            fontSize: "15dp"
        }
    }
}, {
    isId: true,
    priority: 100000.0087,
    key: "shiftAlias",
    style: {
        height: "35dp",
        width: "120dp",
        left: 0
    }
}, {
    isId: true,
    priority: 100000.009,
    key: "timeStart",
    style: {
        left: 0,
        width: "160dp",
        height: "35dp",
        backgroundColor: "#f19c98",
        font: {
            fontSize: "15dp"
        }
    }
}, {
    isId: true,
    priority: 100000.0091,
    key: "timeEnd",
    style: {
        right: 0,
        width: "160dp",
        height: "35dp",
        backgroundColor: "#f19c98",
        font: {
            fontSize: "15dp"
        }
    }
} ];