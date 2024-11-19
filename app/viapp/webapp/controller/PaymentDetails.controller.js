sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
], function (Controller, Filter, FilterOperator, UIComponent) {
    "use strict";

    return Controller.extend("viapp.controller.PaymentDetails", {
        onInit: function () {
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this._oRouter.attachRouteMatched(this.handleRouteMatched, this);

        },
        // onAfterRendering: function () {
        //     var parsedstring = this.getView().getModel("oGlobalModel").getData().Object;
        //     sap.m.MessageBox.success(parsedstring);
        // },

        handleRouteMatched: function (oEvent) {
            // this.removeKeyParameter();
            // var aData = oEvent.getParameter("arguments").message;
        },


        onPressNavtoPaymentapp: function () {

            sap.m.MessageToast.show("Navigating to payment app");
            var SO_Number = "39921047";
            var MyCartTotal = "100";

            var aParameters = {
                Saleorder: "",
                Invoice: "",
                MOPType: "",
                CardNo: "",
                Authcode: "",
                TransactionMessage: ""
            };

            // Convert the array to a string (typically JSON)
            var myaParameters = JSON.stringify(aParameters);

            // let currentUrl = 'com.sap.mobile.start://navigation?resolve-type=ibn#ZCarwash-create?sap-ui-app-id-hint=scf100dt_35A045CDF1638F1A638036BF48335FC3&/Services/' + myaParameters;

            let currentUrl =
                'com.sap.mobile.start://navigation?resolve-type=ibn#viapp-display?sap-ui-app-id-hint=saas_approuter_viapp';

            // URL encode it
            let encodedReturnUrl = encodeURIComponent(currentUrl);

            // JSON object with data
            var jsonData = {
                trxnType: "SALE",
                amount: MyCartTotal,
                mode: "card",
                trxnID: SO_Number
            };

            // Convert JSON object to string
            var jsonString = JSON.stringify(jsonData);

            // Encode the JSON string to be URL-safe
            var encodedJsonString = encodeURIComponent(jsonString);

            // Construct the custom URI with encoded JSON data
            //var uri = "adnoc://pay.com/card?data=" + encodedJsonString;
            // Construct the custom URI with encoded JSON data and returnUrl

            console.log(encodedReturnUrl);

            var uri = "adnoc://sapmetapay.com/card?data=" + encodedJsonString + "&returnUrl=" + encodedReturnUrl;
            window.location.href = uri;

            /*Setting Flag*/
            // this.getView().getModel("oGlobalModel").setProperty("/PaymentDetailFlag", "X");

        },
        ongetSOdetails: function () {
            var so = this.getView().getModel("oGlobalModel").getProperty("/Saleorder");
            var vAuthcode = this.getView().getModel("oGlobalModel").getProperty("/Authcode");
            this.getView().getModel("CarwashService").read("/Payment", {
                filters: [
                    new Filter("ORDERNUM", FilterOperator.EQ, so)
                ],
                urlParameters: {
                    $expand: "ITEMS"
                },
                success: function (oData, oResponse) {
                    var obj = "";
                    var itemsarr = oData.results[0].ITEMS.results;
                    for (var i = 0; i < itemsarr.length; i++) {
                        if (itemsarr[i].MOP_TYPE === "CARD") {
                            itemsarr[i].AUTH_CODE = vAuthcode;
                            obj = itemsarr[i];
                        }
                    }
                    if (obj) {
                        this.saveDetails(obj);
                    }

                }.bind(this),
                error: function (oError) {
                    // BusyIndicator.hide();
                    MessageBox.error(oError.message);
                }.bind(this)
            });
        },
        saveDetails: function (payload) {
            var obj = {
                "ID": payload.ID,
                "PARENT_KEY_ID": payload.PARENT_KEY_ID,
                "MOP_COUNTER": payload.MOP_COUNTER,
                "AMOUNT": payload.AMOUNT,
                "CURRENCY": payload.CURRENCY,
                "MOP_TYPE": payload.MOP_TYPE,
                "AUTH_CODE": payload.AUTH_CODE
            };
            var oModel = this.getView().getModel("CarwashService");
            var path = "";
            path = oModel.createKey("/PaymentItem", {
                ID: payload.ID
            });

            oModel.sDefaultUpdateMethod = sap.ui.model.odata.UpdateMethod.Put;
            oModel.update(path, obj, {

                success: function (oData, oResponse) {
                    if (oData.ID) {
                        sap.m.MessageToast.show("Payment Details Updated successfully");
                        this.onRemoveKeyParameter();
                    }
                }.bind(this),
                error: function (oError) {
                    // BusyIndicator.hide();
                    MessageBox.error(oError.message);
                }.bind(this)
            });


        },
        removeKeyParameter: function () {
            // Get the current URL
            var currentUrl = 'com.sap.mobile.start://navigation?resolve-type=ibn#viapp-display?sap-ui-app-id-hint=saas_approuter_viapp';

            // Define the parameters to be removed
            // var parametersToRemove = ["authcode", "message", "orderid", "status"];

            // 			// Loop through and delete each parameter
            // 			parametersToRemove.forEach(function(param) {
            // 				currentUrl.searchParams.delete(param);
            // 			});

            // Update the URL in the address bar without reloading the page
            // Replace the current URL in the browser without adding a new history entry
            window.history.replaceState({}, document.title, currentUrl);
            // window.history.pushState({}, document.title, currentUrl.toString());
            alert("Back to Home from Payment");
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("Home", {}, true); // true: replace history, false: create new history entry

        },



        onRemoveKeyParameter: function () {
            // alert("Change url")
            // Define the new URL
            // var newUrl = "com.sap.mobile.start://navigation?resolve-type=ibn#viapp-display?sap-ui-app-id-hint=saas_approuter_viapp";

            // // Replace the current URL without adding a new history entry
            // // window.history.replaceState({}, document.title, newUrl);

            // window.location.replace(newUrl);

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("home", true); // true: replace history, false: create new history entry






        }
    });

});