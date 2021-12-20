import AppConfig from "./appConfig"
// interface dempInterface

export const DEMPAPP =  {

    appConfig: null,
    tasks: [],
    currentTask: null,

    getConfig: function(){
      return this.appConfig.DempConfig;
    },

    init: function(Dempapp) {
        var _this = DEMPAPP;
        _this.appConfig = AppConfig;

        _this.appConfig.loadConfigJSON(Dempapp).then(
            ()=> {
                console.log("DEMP config ready");
                // cordova.fireDocumentEvent("DEMPConfigReady", {});
            },
            () => {
                console.log("DEMP config failed");
            }
        )
    },

    waitForAllTasks: async function() {
        return new Promise( (resolve, reject) =>{   
            var _this = DEMPAPP;
            
            _this._isAllPromiseSettled(_this.tasks).then(
                results => {
                    resolve(true);
                },
                err => {
                    reject (false);
                }
            )
        });
    },

    waitForSingleTask() {
        return new Promise( (resolve, reject) =>{   
            var _this = DEMPAPP;
            
            _this.currentTask.then(
                () => {
                    resolve(true);
                },
                (e) => {
                    reject (false);
                }
            )
        });

    },

    registerTask( promiseTask ) {
        //this.tasks.push(promiseTask);
        this.currentTask = promiseTask;
    },

       
    _isAllPromiseSettled(promises) {
        // To store our results
        var results = Array(promises.length);
    
        // To keep track of how many promises resolved
        var counter = 0;
  
        // Wrapping our iteration with Promise object
        // So that we can resolve and return the results on done.
        return new Promise(resolve => {
            // Iterate the inputs
            promises.forEach((promise, index) => {
                // Wait for each promise to resolve
                return Promise.resolve(promise)
                    .then(
                        result => {
                            counter++; // Increment counter
                
                            // Store status and result in same order
                            results[index] = { status: "fulfilled", value: result };
                
                            // If all inputs are settled, return the results
                            if (counter === promises.length) {
                                resolve(results);
                            }
                        }
                    ).catch(
                        err => {
                            counter++; // Increment counter
                
                            // Store status and reason for rejection in same order
                            results[index] = { status: "rejected", reason: err };
                
                            // If all inputs are settled, return the results
                            if (counter === promises.length) {
                               resolve(results);
                            }
                        }
                    );
            });
        });
    }
  
}    

  
// module.exports = DEMPAPP;

// document.addEventListener("deviceready", DEMPApp.init, false);

// require("cordova/exec/proxy").add("DEMPApp", DEMPApp);