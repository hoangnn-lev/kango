exports.synsDatabase = function(uid) {
    var tables = [ "Shifts", "Configs", "Friend", "Calendar_shift", "Schedule", "Schedule_detail" ];
    var models = [ "Shifts", "Configs", "Friend", "CalendarShift", "Schedule", "ScheduleDetail" ];
    var data = {};
    for (var i in tables) {
        var table = tables[i];
        var model = models[i];
        var result = Alloy.Collections[table.toLowerCase()];
        result.fetch({
            query: "select * from " + table
        });
        data[model] = result;
    }
    var client = Ti.Network.createHTTPClient();
    client.open("POST", Ti.API.KANGO_API_SYNS_DATA);
    client.send({
        uid: uid,
        udata: JSON.stringify(data)
    });
};