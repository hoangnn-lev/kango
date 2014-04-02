Ti.API.DW = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

Ti.API.TABMENU = [ {
    img: "/tabmenu/shift.png",
    action: "shift",
    img_active: "/tabmenu/shift_active.png"
}, {
    img: "/tabmenu/schedule.png",
    action: "schedule",
    img_active: "/tabmenu/schedule_active.png"
}, {
    img: "/tabmenu/share.png",
    action: "share",
    img_active: "/tabmenu/share_active.png"
}, {
    img: "/tabmenu/setting.png",
    action: "setting",
    img_active: "/tabmenu/setting_active.png"
} ];

Ti.API.ICON = [ {
    title: "披瀝",
    folder: "/memo/history/",
    icons: ""
}, {
    title: "シンプル",
    folder: "/memo/simple/",
    icons: [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png" ]
}, {
    title: "プライベート",
    folder: "/memo/private/",
    icons: [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png" ]
}, {
    title: "仕事",
    folder: "/memo/job/",
    icons: [ "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png" ]
} ];

Ti.API.KANGO = "http://192.168.1.224/kango/";

Ti.API.KANGO_API_REGISTER = Ti.API.KANGO + "users/register.json";

Ti.API.KANGO_API_SYNS_DATA = Ti.API.KANGO + "kango/sysnDatabase.json";