# HTML5 AJAX File Uploader Module
================================

**This module abstracts HTML5 file and drag and drop API and manages file upload process**

* Free, open source (MIT license)
* Pure JavaScript - works with any web framework
* Small & lightweight
* No dependencies

Samples on how to use module and create custom user interface for file uploads are available.

## Demos

* [HTML5 Drag & Drop Ajax File Uploader](https://www.devbridge.com/sourcery/components/drag-and-drop-uploader/)

## Usage

    html5Upload.initialize({
        // URL that handles uploaded files
        uploadUrl: '/file/upload',
        
        // HTML element on which files should be dropped (optional)
        dropContainer: document.getElementById('dragndropimage'),

        // HTML file input element that allows to select files (optional)
        inputField: document.getElementById('upload-input'),

        // Key for the file data (optional, default: 'file')
        key: 'File',

        // Additional data submitted with file (optional)
        data: { ProjectId: 1, ProjectName: 'Demo' },

        // Maximum number of simultaneous uploads
        // Other uploads will be added to uploads queue (optional)
        maxSimultaneousUploads: 2,

        // Callback for each dropped or selected file
        // It receives one argument, add callbacks 
        // by passing events map object: file.on({ ... })
        onFileAdded: function (file) {

            var fileModel = new models.FileViewModel(file);
            uploadsModel.uploads.push(fileModel);

            file.on({
                // Called after received response from the server
                onCompleted: function (response) {
                    fileModel.uploadCompleted(true);
                },
                // Called during upload progress, first parameter
                // is decimal value from 0 to 100.
                onProgress: function (progress, fileSize, uploadedBytes) {
                    fileModel.uploadProgress(parseInt(progress, 10));
                }
            });
        }
    });


## Support

IE10+, Firefox 15+, Chrome 22+, Safari 6+, Opera 12+

## Authors

Tomas Kirda / [@tkirda](https://twitter.com/tkirda)
