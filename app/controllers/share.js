var Blob = $.main.toImage().media;
var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'imagsse_1.png');
file.write(Blob); 