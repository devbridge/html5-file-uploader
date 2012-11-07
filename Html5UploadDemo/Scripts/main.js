/*global require, alert*/
/*jslint browser:true*/

require.config({
    paths: {
        knockout: '/scripts/knockout-2.1.0'
    }
});

require(['src/html5Upload', 'domReady', 'knockout-models'], function (html5Upload, domReady, models) {
    'use strict';

    domReady(function () {
        if (html5Upload.fileApiSupported()) {

            var context = document.getElementById('upload-liveuploads'),
                uploadsModel = new models.UploadsViewModel();

            html5Upload.initialize({
                uploadUrl: '/file/upload',
                dropContainer: document.getElementById('dragndropimage'),
                inputField: document.getElementById('upload-input'),
                key: 'File',
                data: { ProjectId: 1, ProjectName: 'Demo' },
                maxSimultaneousUploads: 2,
                onFileAdded: function (file) {

                    var fileModel = new models.FileViewModel(file);
                    uploadsModel.uploads.push(fileModel);

                    file.on({
                        onCompleted: function (response) {
                            fileModel.uploadCompleted(true);
                        },
                        onProgress: function (progress, fileSize, uploadedBytes) {
                            fileModel.uploadProgress(parseInt(progress, 10));
                        }
                    });
                }
            });

            models.applyBindings(uploadsModel, context);
        }
    });
});
