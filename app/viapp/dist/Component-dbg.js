/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "viapp/model/models",
         "viapp/model/formatter"
    ],
    function (UIComponent, Device, models,formatter) {
        "use strict";

        return UIComponent.extend("viapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                var oRootPath = sap.ui.require.toUrl("viapp"); // your resource root
                var oImageModel = new sap.ui.model.json.JSONModel({
                    path: oRootPath
                });
                this.setModel(oImageModel, "imageModel");
                 /*Global Model*/
                 this.setModel(new sap.ui.model.json.JSONModel({
                    "MainPlant": "",
                    "CW_ProcessVisible": false,
                    "LPG_ProcessVisible": false,
                    "PlantF4Nav": [{
                        "Plant": "AD914",
                        "PlantName": "Zayed Stadium",
                        "Operation": "CW"
                    }, {
                        "Plant": "AD454",
                        "PlantName": "Market Jetty",
                        "Operation": "LPG"
                    }],
                    "Chassisno": "",
                    "Platecode": "",

                    /*Search Details*/
                    "Profile_BPNo": "",
                    "Profile_BPType": "",
                    "Profile_Name": "",
                    "Profile_Mobile": "",
                    "Profile_Email": "",
                    "Profile_PlateNo": "",
                    "Profile_PlateCode": "",
                    "Profile_Emirates": "",
                    "Profile_Model": "",
                    "Profile_CarType": "",
                    "Profile_VINNo": "",

                }), "oGlobalModel");
                // var oRenderer = sap.ushell.Container.getRenderer("fiori2");
                // oRenderer.setHeaderVisibility(false, false, ["home", "app"]);
            }
        });
    }
);