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
                'com.sap.mobile.start://navigation?resolve-type=ibn#CW-display?sap-ui-app-id-hint=saas_approuter_viapp';

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
            var currentUrl = 'com.sap.mobile.start://navigation?resolve-type=ibn#CW-display?sap-ui-app-id-hint=saas_approuter_viapp';

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
            // var newUrl = "com.sap.mobile.start://navigation?resolve-type=ibn#CW-display?sap-ui-app-id-hint=saas_approuter_viapp";

            // // Replace the current URL without adding a new history entry
            // // window.history.replaceState({}, document.title, newUrl);

            // window.location.replace(newUrl);

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("home", true); // true: replace history, false: create new history entry






        },
        onnewprint: function () {

            // Get the details from screen
            const Site_Name = "892 - Industrial Area, Near 2Nd Signal - Musaffah";
            const TRN = "2024112050160";
            var oGlobalModel = this.getView().getModel("oGlobalModel").getData();
            this.Lineitems = [];
            var to_Items = oGlobalModel.ItemARR;
            var MopItems = oGlobalModel.MOPItems;
            var plant = oGlobalModel.MainPlant;
            var PlateNo = oGlobalModel.PlateNo;
            var PlateCode = oGlobalModel.PlateCode;
            var Kind = oGlobalModel.Kind;
            var Source = oGlobalModel.Source;
            // var Netprice = oGlobalModel.NetPrice;
            // var VatPrice = oGlobalModel.Vat;
            var SOnum = oGlobalModel.SOnumber;
            var invno = oGlobalModel.INVOICENo;
            var currdate = new Date();
            var currtime = new Date();
            var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd/MM/yyyy"
            });
            var TimeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                pattern: "HH:mm:ss"
            });
            currdate = DateFormat.format(currdate);
            currtime = TimeFormat.format(currtime);
            var newarray = [];
            for (var i = 0; i < to_Items.length; i++) {
                var Total = parseFloat(to_Items[i].NETPRICE) + parseFloat(to_Items[i].NETPRICE) *
                    0.05;
                var obj = {
                    Name: to_Items[i].MATERIALDESC,
                    Qty: 1,
                    Price: to_Items[i].NETPRICE,
                    Total: parseFloat(Total).toFixed(2)
                };
                newarray.push(obj);
            }

            // Calculate total
            const total = newarray.reduce((sum, item) => sum + item.Total, 0);
            var TotalAmount = parseFloat(total).toFixed(2);
            var TotVat = parseFloat(TotalAmount) * 0.05;
            TotVat = parseFloat(TotVat).toFixed(2);

            // Create printable content
            const printContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 20px;
            margin: 0;
            padding: 0;
            background: #f4f4f4;
        }

        .invoice-container {
            width: 300px; /* Set width suitable for receipt printers */
            margin: auto;
            background: #fff;
            padding: 10px;
            border: 1px solid #ddd;
        }

        .invoice-header {
            text-align: center;
            border-bottom: 1px dashed #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }

        .invoice-header img {
            max-width: 100px;
            margin-bottom: 5px;
        }

        .invoice-header h2 {
            font-size: 24px;
            margin: 0;
        }

        .invoice-header p {
            margin: 0;
            font-size: 18px;
            color: #555;
        }

        .invoice-details {
            margin-bottom: 10px;
             margin-Top: 10px;
            border-Top: 1px solid #ddd;
            /*border-bottom: 1px solid #ddd;*/
            
        }

        .invoice-details p {
            margin: 5px 0;
            font-size: 18px;
        }

        .invoice-items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .invoice-items th, .invoice-items td {
            text-align: left;
            font-size: 18px;
            padding: 5px;
        }

        .invoice-items th {
            background: #f4f4f4;
            border-bottom: 1px solid #ddd;
        }

        .invoice-items td {
            border-bottom: 1px dashed #ddd;
        }

        .invoice-totals {
            text-align: right;
            font-size: 20px;
            border-bottom: 1px dashed #ddd;
        }

        .invoice-totals p {
            margin: 2px 0;
        }
		.total {
              font-weight: bold;
         }

        .invoice-footer {
            text-align: Center;
            /*border-top: 1px dashed #ddd;*/
            /*padding-top: 1px;*/
            /*margin-top: 10px;*/
            font-size: 18px;
        }
        
        .invoice-Number {
            text-align: center;
            border-top: 1px dashed #ddd;
            border-bottom: 1px dashed #ddd;
            padding-top: 1px;
            margin-top: 1px;
            font-size: 18px;
        }
        .Tax_line {
             border-bottom: 1px dashed #ddd;
        }
        
    </style>
   
</head>
<body>
    <div class="invoice-container">
        <!-- Invoice Header -->
        <div class="invoice-header">
            <img src="https://images.seeklogo.com/logo-png/33/1/adnoc-logo-png_seeklogo-332415.png?v=638623505950000000" alt="ADNOC Distribution" width="70"/>
            <p style="font-size: 15px;" >**** Duplicate Copy ****</p>
             <p>TAX INVOICE</p>
             <p>TRN: 100069993200003</p>
            <P>ADNOC Distribution</p>
            <p>P.O Box 4188, Abu Dhabi UAE</p>
            <p>Site: ${Site_Name}</p>
        </div>

        <table id="data-table" class="invoice-items">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${newarray
                    .map(
                        item => `
                                    <tr>
                                        <td>${item.Name}</td>
                                        <td>${item.Qty}</td>
                                        <td>${item.Price}</td>
                                         <td>${item.Total}</td>
                                    </tr>
                                `
                    )
                    .join("")}
                            <tr class="total">
                                <td colspan="3">Total</td>
                                <td>${TotalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
          
          <div class="invoice-details">
            <P>Payment Mode</P>
           <ul id="item-list">
<!-- List items will be added dynamically -->
			                      ${MopItems
                    .map(
                        item => ` <li>${item.MOP_TYPE}  :  ${item.AMOUNT}</li> `
                    )
                    .join("")}
            </ul>
          </div>
          

            
        
         <div class="invoice-details">
                <p><center>You could have earned Points! </br> Sign up for ADNOC Rewords Now!</center></p>
                <center><img src="data:image/png;base64,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" alt="ADNOC Rewords" width="70"></center>
                
            </div> 
            
            <div class="invoice-details">
                <p style="font-size: 16px"><center>Price Inclusive of VAT </br> VAT Summary</center></p>
              <table style="width:100%" class="invoice-items">
                <tr>
                  <td>VAT-Code</td>
                  <td>Amount</td>
                  <td>VAT-Rate</td>
                  <td>VAT(AED)</td>
                </tr>
                <tr style="text-align: center">
                  <td>C</td>
                  <td>${TotalAmount}</td>
                  <td>5%</td>
                  <td>${TotVat}</td>
                </tr>
              </table>
          </div>
                
        
          <div class="invoice-details">
            <div >
                <p>Date: ${currdate} ${currtime}</p>
                <p>Transcation No: ${SOnum}</p>
                <p>Invoice No: ${invno}</p>
                <p>RRN: 432611326923</p>
                <p>Attender Id: 43261</p>
                <p>Plate No/Code: ${PlateNo}/${PlateCode}</p>
				<p>Emirates: ${Source}</p>
            </div> 
          </div>  
          
            <div class="invoice-details">
              </br>
                <center><img src="data:image/png;base64,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" alt="ADNOC Rewords" width="70">
                  </center>   
                  <center><p>Claim Rewards QR</p></center>
            </div> 
            
        <!-- Invoice Footer -->
                 <center>
                   <p>Thank You </br> Contact Us: 800300 </br> www.adnocdistribution.com</p>
                 </center>
                
            
    </div>
</body>
</html>`;

            // Create a Blob and open it as a new URL
            const blob = new Blob([printContent], { type: "text/html" });
            const printUrl = URL.createObjectURL(blob);

            // Open a new tab for printing
            const printWindow = window.open(printUrl, "_blank");
            if (printWindow) {
                printWindow.onload = function () {
                    printWindow.print();
                    URL.revokeObjectURL(printUrl); // Clean up the object URL
                };
            } else {
                sap.m.MessageToast.show("Unable to open the print window. Please check your browser settings.");
            }



        },
    });

});