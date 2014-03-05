$.shareImage.addEventListener('click',function(){
	openView('share_by_image');
});

$.shareText.addEventListener('click',function(){
	openView('share_by_text');
});

$.share.addEventListener('android:back', function(e) {
	 openView('schedule');
});