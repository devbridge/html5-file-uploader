/*global require, alert*/
/*jslint browser:true*/

require.config({
    paths: {
        knockout: '/scripts/knockout-2.1.0'
    }
});

require(['src/html5Upload', 'domReady', 'knockout'], function (html5Upload, domReady, ko) {
    'use strict';

    var
        trimTrailingZeros = function (number) {
            return number.toFixed(1).replace(/\.0+$/, '');
        },

        formatFileSize = function (sizeInBytes) {
            var kiloByte = 1024,
                megaByte = Math.pow(kiloByte, 2),
                gigaByte = Math.pow(kiloByte, 3);

            if (sizeInBytes < kiloByte) {
                return sizeInBytes + ' B';
            }

            if (sizeInBytes < megaByte) {
                return trimTrailingZeros(sizeInBytes / kiloByte) + ' kB';
            }

            if (sizeInBytes < gigaByte) {
                return trimTrailingZeros(sizeInBytes / megaByte) + ' MB';
            }

            return trimTrailingZeros(sizeInBytes / gigaByte) + ' GB';
        };

    function UploadViewModel() {
        this.uploads = ko.observableArray([]);
        this.showTotalProgress = ko.observable();
        this.uploadSpeedFormatted = ko.observable();
        this.timeRemainingFormatted = ko.observable();
        this.totalProgress = ko.observable();
    }

    function FileViewModel(file) {
        this.file = file;
        this.uploadProgress = ko.observable(0);
        this.uploadCompleted = ko.observable(false);
        this.uploadSpeedFormatted = ko.observable();
        this.fileName = file.fileName;
        this.fileSizeFormated = formatFileSize(file.fileSize);
    }

    domReady(function () {
        if (html5Upload.fileApiSupported()) {

            var context = document.getElementById('upload-liveuploads'),
                uploadsModel = new UploadViewModel();

            html5Upload.initialize({
                dropContainer: document.getElementById('dragndropimage'),
                inputField: document.getElementById('upload-input'),
                uploadUrl: '/file/upload',
                maxSimultaneousUploads: 2,
                onFileAdded: function (file) {

                    var fileModel = new FileViewModel(file);
                    uploadsModel.uploads.push(fileModel);

                    file.on({
                        onCompleted: function (response) {
                            fileModel.uploadCompleted(true);
                        },
                        onProgress: function (fileSize, uploadedBytes) {
                            var progress = parseInt(uploadedBytes / fileSize * 100, 10);
                            fileModel.uploadProgress(progress);
                        }
                    });
                }
            });

            ko.applyBindings(uploadsModel, context);
        }
    });
});
