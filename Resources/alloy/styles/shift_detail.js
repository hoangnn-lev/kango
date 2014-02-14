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
    priority: 1000.0123,
    key: "View",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    }
}, {
    isApi: true,
    priority: 1000.0124,
    key: "TextField",
    style: {
        zIndex: 0
    }
}, {
    isApi: true,
    priority: 1000.0125,
    key: "Button",
    style: {
        zIndex: 0
    }
}, {
    isApi: true,
    priority: 1000.0126,
    key: "Label",
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
    priority: 10000.013,
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
    priority: 10000.0131,
    key: "timeBlock",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0135,
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
    priority: 100000.0127,
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
    priority: 100000.0128,
    key: "shiftName",
    style: {
        width: "80dp",
        height: "35dp",
        backgroundColor: "#f19c98",
        borderColor: "#f0f0f0",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        font: {
            fontSize: "15dp"
        },
        textAlign: "center"
    }
}, {
    isId: true,
    priority: 100000.0129,
    key: "shiftAlias",
    style: {
        font: {
            fontSize: "16dp"
        },
        width: "100dp",
        left: 0
    }
}, {
    isId: true,
    priority: 100000.0132,
    key: "timeStart",
    style: {
        left: 0,
        width: "120dp",
        font: {
            fontSize: "16dp"
        },
        textAlign: "center"
    }
}, {
    isId: true,
    priority: 100000.0133,
    key: "timeEnd",
    style: {
        right: 0,
        width: "120dp",
        font: {
            fontSize: "16dp"
        },
        textAlign: "center"
    }
}, {
    isId: true,
    priority: 100000.0134,
    key: "groupButton",
    style: {
        top: "15dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0136,
    key: "groupShiftColor",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
} ];