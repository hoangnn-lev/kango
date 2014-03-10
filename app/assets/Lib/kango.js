exports.synsDatabase = function() {

	var tables = ['configs', 'shifts'];
	var data = {};

	for (var i in tables) {

		var table = tables[i];
		var result = Alloy.Collections[table];

		result.fetch({
			query : 'select * from ' + table
		});
		data[table] = result;

	}

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			progressIndicator.hide();
			//var result = JSON.parse(this.responseText);
		},
		onerror : function(e) {

		}
	});
	client.open('POST', Ti.API.KANGO_API_SYNS_DATA);

	client.send({
		uid : Ti.API.UID,
		udata : JSON.stringify(data)
	});

};
