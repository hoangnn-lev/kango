exports.convertDayName = function(str) {

	switch(str) {

		case 'Monday':
		case 1:
			return '月';

		case 'Tuesday':
		case 2:
			return '火';

		case 'Wednesday':
		case 3:
			return '水';

		case 'Thursday':
		case 4:
			return '木';

		case 'Friday':
		case 5:
			return '金';

		case 'Saturday':
		case 6:
			return '土';

		case 'Sunday':
		case 0:
			return '日';

	}
	return;
};
