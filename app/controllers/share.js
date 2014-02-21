// var Blob = $.content.toImage().media;
// var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'image_1.png');
// file.write(Blob);

Titanium.Media.showCamera({
	//success: successMethod,
	//error: errorMethod,
	cancel : function(e) {
	},
	// overlay: myOverlay,
	saveToPhotoGallery : true,
	allowEditing : false,
	mediaTypes : ['public.image']
});
