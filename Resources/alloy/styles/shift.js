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
    priority: 10000.0134,
    key: "calenderTitle",
    style: {
        color: "#fff",
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0135,
    key: "scheduleTitle",
    style: {
        width: Ti.UI.FILL,
        height: "40dp",
        backgroundColor: "#fff",
        top: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0136,
    key: "calendarButton",
    style: {
        zIndex: "5",
        width: "30dp",
        height: "30dp"
    }
}, {
    isClass: true,
    priority: 10000.0137,
    key: "editScheduleButton",
    style: {
        font: {
            fontSize: "16sp"
        },
        backgroundColor: "#f3acbd"
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
    priority: 100000.0121,
    key: "main",
    style: {
        backgroundColor: "#f5f1e9"
    }
}, {
    isId: true,
    priority: 100000.0122,
    key: "calendar",
    style: {
        height: Ti.UI.SIZE,
        top: "5dp"
    }
}, {
    isId: true,
    priority: 100000.0123,
    key: "calendarTitle",
    style: {
        height: "40dp",
        width: Ti.UI.FILL,
        top: 0,
        left: "10dp",
        right: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0124,
    key: "dateInfo",
    style: {
        width: "110dp",
        top: 0,
        height: Ti.UI.FILL,
        touchEnabled: false
    }
}, {
    isId: true,
    priority: 100000.0125,
    key: "year",
    style: {
        color: "#b4a186",
        font: {
            fontSize: "16dp"
        },
        left: 0,
        top: "10dp",
        height: Ti.UI.FILL,
        width: Ti.UI.SIZE,
        touchEnabled: false
    }
}, {
    isId: true,
    priority: 100000.0126,
    key: "month",
    style: {
        color: "#666666",
        font: {
            fontSize: "28dp"
        },
        left: "42dp",
        height: Ti.UI.FILL,
        width: Ti.UI.SIZE,
        touchEnabled: false
    }
}, {
    isId: true,
    priority: 100000.0127,
    key: "monthName",
    style: {
        color: "#b4a186",
        font: {
            fontSize: "16dp"
        },
        height: Ti.UI.FILL,
        width: Ti.UI.SIZE,
        right: 0,
        top: "10dp"
    }
}, {
    isId: true,
    priority: 100000.0128,
    key: "shiftDateInfo",
    style: {
        color: "#8d8d8d",
        font: {
            fontSize: "24sp"
        },
        left: "5dp"
    }
}, {
    isId: true,
    priority: 100000.0129,
    key: "days",
    style: {
        layout: "horizontal",
        top: 0,
        height: "22dp"
    }
}, {
    isId: true,
    priority: 100000.013,
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
    priority: 100000.0131,
    key: "scheduleInfo",
    style: {
        height: Ti.UI.SIZE,
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0132,
    key: "scheduleList",
    style: {
        top: "1dp"
    }
}, {
    isId: true,
    priority: 100000.0133,
    key: "shiftList",
    style: {
        top: "2dp",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal"
    }
} ];