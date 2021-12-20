import {
    Platform
} from 'react-native';
var AppConfig = {
    DempConfig: null,

    loadConfigJSON: async function (Dempapp) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            //_this._loadConfig("assets/dempConfig.json").then(

            _this._loadFileConfig("dempConfig.json",Dempapp).then(
                (config) => {
                    console.log("DEMP app load config : successful")
                    _this.DempConfig = config;
                    resolve(config);
                },
                (error) => {
                    console.log("DEMP app load config : failed " + error);
                    reject(error);
                }
            );
        })

    },

    _loadConfig: async function (url) {
        /*
            For iOS 
            Add to app .plst
            <key>NSAppTransportSecurity</key>  
            <dict>  
            <key>NSAllowsArbitraryLoads</key>  
            <true/>  
            </dict> 
        */

        return new Promise(function (resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.responseType = 'json';
                xhr.onload = function () {
                    var status = xhr.status;
                    if (status == 200 || status == 0) {
                        resolve(xhr.response);
                    } else {
                        reject(status);
                    }
                };
                xhr.send();
            } catch (e) {
                reject(e);
            }
        });
    },

    _loadFileConfig: async function (path,Dempapp) {

        return new Promise(function (resolve, reject) {

            try {
                console.log("Test coming",Dempapp.multiply(5,6))
                // const RNFS = require('react-native-fs');
                // if (Platform.OS == 'ios') {
                //     RNFS.readFile(`${RNFS.MainBundlePath}/${path}`).then(res => {
                //             console.log("file Content", res)
                //             resolve(JSON.parse(res))
                //         })
                //         .catch(err => {

                //             console.log(err.message, err.code);

                //         });
                // } else if (Platform.OS == 'android') {
                //     RNFS.readFileAssets(`${book}.txt`).then(res => {
                //             console.log("file Content", res)
                //         })
                //         .catch(err => {

                //             console.log(err.message, err.code);

                //         });
                // }
                // window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/" + path, 
                //     (fileEntry) => {
                //         fileEntry.file(
                //             (file) => {
                //                 var reader = new FileReader();

                //                 reader.onloadend = function() {
                //                     var content = JSON.parse(this.result);
                //                     console.log("Successful config file read");
                //                     console.dir(content);
                //                     resolve(content);         
                //                 };

                //                 //start reading
                //                 reader.readAsText(file);

                //             }, 
                //             (e) => {
                //                 console.log("DEMP app load config: reading file failed " + e);
                //                 console.dir(e);     
                //                 reject(e);
                //             }    
                //         );
                //     }, 
                //     (e) => {
                //         console.log("DEMP app load config : failed " + e);
                //         console.dir(e);     
                //         reject(e);
                //     }
                //     )     
            } catch (e) {
                reject(e);
            }
        });

    }

}

module.exports = AppConfig;