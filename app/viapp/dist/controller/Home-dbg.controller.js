sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"viapp/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (Controller, UIComponent, MessageToast, MessageBox, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("viapp.controller.Home", {

		formatter: formatter,

		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);


			
		},


		

		handleRouteMatched: function (oEvent) {
			// alert("Home")
			if (oEvent.getParameter("name") === "Home") {

				var oStartupParameters = this.getOwnerComponent().getComponentData().startupParameters;
				if (oStartupParameters && oStartupParameters.message) {
					var base64string = oStartupParameters.message[0];
					// MessageToast.show(base64string);
					var decodedstring = atob(base64string);
					var parsedstring = JSON.parse(decodedstring);
					var globalModel = this.getView().getModel("oGlobalModel").getData();
					globalModel.Object = parsedstring;
					globalModel.Saleorder = parsedstring.txnID;
					globalModel.Authcode = parsedstring.responseData.APPROVAL_CODE;
					globalModel.TransactionMessage = parsedstring.responseMsg;
					globalModel.Cardno = parsedstring.responseData.CARD_NUMBER;
					globalModel.Cardname = parsedstring.responseData.CARD_NAME;
					if (globalModel.Saleorder) {
						this.ongetSOdetails(globalModel.Saleorder);
					}
					var currenturl = window.location.href;
					var removeurl = new URL(currenturl);
					var params = new URLSearchParams(removeurl.search);
					var hrefparams = new URLSearchParams(removeurl.href);
					var before = ` ${params}`;
					var before1 = ` ${hrefparams}`;
					// console.log(`Query string (before):\t ${params}`);
					params.delete("message");
					// MessageBox.success("Salesorder: " + parsedstring.txnID + "\n" + "Authcode: " + parsedstring.responseData.APPROVAL_CODE + "\n" + "Status: " + "\n" + parsedstring.responseMsg);

					sap.m.MessageBox.success(
						"Salesorder: " + parsedstring.txnID + "\n" + "Authcode: " + parsedstring.responseData.APPROVAL_CODE + "\n" + "Card No: " + parsedstring.responseData.CARD_NUMBER + "\n" + "Card Name: " + parsedstring.responseData.CARD_NAME + "\n" + "Status: " + parsedstring.responseMsg, {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Success",
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function (oAction) {
							if (oAction === "OK") {
								var oRouter = UIComponent.getRouterFor(this);
								oRouter.navTo("PaymentDetails", false);
							}
						}.bind(this)
					});
					this.getView().getModel("oGlobalModel").refresh();
					// MessageBox.success(parsedstring);

				} else {
					var MainPlant = this.getView().getModel("oGlobalModel").getData().MainPlant;
					if (MainPlant === "") {
						MessageToast.show("Please select Plant");
					}
				}



			}
		},
		ongetSOdetails: function (SO) {
			// var so = this.getView().getModel("oGlobalModel").getProperty("/Saleorder");
			var vAuthcode = this.getView().getModel("oGlobalModel").getProperty("/Authcode");
			this.getView().getModel("CarwashService").read("/OrderRead", {
				filters: [
					new Filter("ORDERNUM", FilterOperator.EQ, SO)
				],
				urlParameters: {
					$expand: "ITEMS"
				},
				success: function (oData, oResponse) {
					// var obj = "";
					if (oData.results.length !== 0) {
						var itemsarr = oData.results[0].ITEMS.results;
						// this.getView().getModel("oGlobalModel").setProperty("/NetPrice", oData.results[0].TOTALPRICE);
						this.getView().getModel("oGlobalModel").setProperty("/ItemARR", itemsarr);
						this.getView().getModel("oGlobalModel").setProperty("/PlateNo", oData.results[0].PLATENUM);
						this.getView().getModel("oGlobalModel").setProperty("/PlateCode", oData.results[0].PLATECODE);
						this.getView().getModel("oGlobalModel").setProperty("/Kind", oData.results[0].KIND);
						this.getView().getModel("oGlobalModel").setProperty("/Source", oData.results[0].SOURCE);
						this.getView().getModel("oGlobalModel").setProperty("/INVOICENo", oData.results[0].INVOICE);

						// var vat = parseFloat(oData.results[0].TOTALPRICE) * 0.05;
						// var Total = parseFloat(vat) + parseFloat(oData.results[0].TOTALPRICE);
						// this.getView().getModel("oGlobalModel").setProperty("/TOTALPRICE", Total);
						// this.getView().getModel("oGlobalModel").setProperty("/Vat", vat);
						this.getView().getModel("oGlobalModel").setProperty("/SOnumber", oData.results[0].ORDERNUM.toString());
						if (itemsarr.length !== 0) {
							var plant = itemsarr[0].PLANT;
							this.getView().getModel("oGlobalModel").setProperty("/MainPlant", plant);
						}
						this.getPaymentDetails();
					}
				}.bind(this),
				error: function (oError) {
					// BusyIndicator.hide();
					MessageBox.error(oError.message);
				}.bind(this)
			});
		},
		getPaymentDetails: function () {
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
					if (oData.results[0].length !== 0) {
						var obj = "";
						var itemsarr = oData.results[0].ITEMS.results;
						this.getView().getModel("oGlobalModel").setProperty("/MOPItems", itemsarr);
						for (var i = 0; i < itemsarr.length; i++) {
							if (itemsarr[i].MOP_TYPE === "CARD") {
								itemsarr[i].AUTH_CODE = vAuthcode;
								obj = itemsarr[i];
							}
						}
						if (obj) {
							this.saveDetails(obj);
						}
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
						// this.onRemoveKeyParameter();
					}
				}.bind(this),
				error: function (oError) {
					// BusyIndicator.hide();
					MessageBox.error(oError.message);
				}.bind(this)
			});


		},
		navtopayment: function () {
			alert("Nav to PaymentDetails")
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("PaymentDetails", false);
		},


		onAfterRendering: function () {
			this._ModelInitialLoad();
		},

		onPressServices: function (oEvent) {
			var MainPlant = this.getView().getModel("oGlobalModel").getProperty("/MainPlant");

			if (MainPlant === "") {
				MessageToast.show("Please select the plant");
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Services", false);
			}

		},

		onPressReport: function () {
			var MainPlant = this.getView().getModel("oGlobalModel").getProperty("/MainPlant");
			if (MainPlant === "") {
				MessageToast.show("Please select the plant");
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Report", false);
			}
		},

		onClosePlant: function () {

			var MainPlant = this.getView().getModel("oGlobalModel").getProperty("/MainPlant");
			if (MainPlant === "") {
				MessageToast.show("Please Select plant");
			}
		},

		onPressCreateCustomer: function () {
			// var oRouter = UIComponent.getRouterFor(this);
			// oRouter.navTo("CreateCustomer", false);
			var MainPlant = this.getView().getModel("oGlobalModel").getProperty("/MainPlant");
			if (MainPlant !== "") {
				if (!this.Create) {
					this.Create = sap.ui.xmlfragment("viapp.fragment.CreateCustomer", this); // Fragments for Process select
					this.getView().addDependent(this.Create);
				}
				this.Create.open();

				var LPGSwitchOn = this.getView().getModel("HomeViewModel").getProperty("/LPG_Switch");
				if (LPGSwitchOn === true) {
					this.getView().getModel("HomeViewModel").setProperty("/CNC_NewCustomer", true);
					this.getView().getModel("HomeViewModel").setProperty("/CNC_VehicleForm", false);
					this.getView().getModel("HomeViewModel").setProperty("/CNC_CustomerForm", true);
				}

			}

			// if (!this.CreateCustomer) {
			// 	this.CreateCustomer = sap.ui.xmlfragment("viapp.fragment.CreateCustomer", this); // Fragments for Process select
			// 	this.getView().addDependent(this.CreateCustomer);
			// }
			// this.CreateCustomer.open();

		},

		onCancelCreateCustomer: function () {
			this.Create.close();
		},

		onCNCSwitchOn: function (oEvent) {
			var oModel = this.getView().getModel("HomeViewModel");
			var State = oEvent.getSource().getState();
			if (State) {
				oModel.setProperty("/CNC_NewCustomer", true);
				this.getView().getModel("HomeViewModel").setProperty("/CNC_VehicleForm", false);
				this.getView().getModel("HomeViewModel").setProperty("/CNC_CustomerForm", true);
			} else if (!State) {
				oModel.setProperty("/CNC_NewCustomer", false);
				this.getView().getModel("HomeViewModel").setProperty("/CNC_VehicleForm", true);
				this.getView().getModel("HomeViewModel").setProperty("/CNC_CustomerForm", true);
			}
		},

		_ModelInitialLoad: function () {

			var oData = {
				"CNC_NewCustomer": false,
				"CNC_CustomerForm": true,
				"CNC_VehicleForm": true,
				"LPG_Switch": false,
				"BannerImg": "{imageModel>/path}/image/Carwashbanner.png"
			};
			var HomeViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(HomeViewModel, "HomeViewModel");

			var oData = {

				"CC_FirstName": "",
				"CC_LastName": "",
				"CC_Email": "",
				"CC_MobileNo": "",
				"CC_HouseNo": "",
				"CC_Street": "",
				"CC_City": "",
				"CC_PostalCode": "",
				"CC_Country": "",
				"CC_Remark": "",
				"CC_FirstName_ValueState": "None",
				"CC_MobileNo_ValueState": "None",
				"AddVehicleData": [],
				"CC_AddVehicleSwitch": false,
				/*Vehicle Fields*/
				"CC_Emirates": "",
				"CC_Category": "",
				"CC_PlateCode": "",
				"CC_PlateNo": "",
				"CC_VINNo": "",
				"CC_Manfacturer": "",
				"CC_Model": "",
				"CC_CarType": "",
				"CC_FuelType": "",
				"CC_Year": "",
				"AddVehicleList": [],

				"EmiratesF4": [{
					"Emirates": "Abu Dhabi"
				}, {
					"Emirates": "Dubai"
				}, {
					"Emirates": "Sharjah"
				}, {
					"Emirates": "Ajman"
				}, {
					"Emirates": "Umm Al Quwain"
				}, {
					"Emirates": "Ras Al Khaimah"
				}, {
					"Emirates": "Fujairah"
				}, {
					"Emirates": "Others"
				}],

				"PlateCategoryF4": [{
					"Category": "Classic"
				}, {
					"Category": "Export"
				}, {
					"Category": "MotorCycle"
				}, {
					"Category": "Other"
				}, {
					"Category": "Private"
				}, {
					"Category": "Taxi"
				}, {
					"Category": "Police"
				}, {
					"Category": "Trade Plate"
				}],

				"PlateCodeF4": [{
					"PlateCode": "A"
				}, {
					"PlateCode": "1"
				}, {
					"PlateCode": "B"
				}, {
					"PlateCode": "2"
				}, {
					"PlateCode": "C"
				}, {
					"PlateCode": "3"
				}, {
					"PlateCode": "D"
				}, {
					"PlateCode": "4"
				}],

				"FuelTypeF4": [{
					"FuelType": "Diesel"
				}, {
					"FuelType": "Petrol"
				}, {
					"FuelType": "Gas"
				}, {
					"FuelType": "Electric"
				}, {
					"FuelType": "Others"
				}],

				"ManufacturerF4": [{
					"Manufacture": "Audi"
				}, {
					"Manufacture": "BMW"
				}, {
					"Manufacture": "Benz"
				}, {
					"Manufacture": "Ford"
				}, {
					"Manufacture": "Ferrari"
				}, {
					"Manufacture": "Hyundai"
				}, {
					"Manufacture": "Honda"
				}, {
					"Manufacture": "Land Rover"
				}, {
					"Manufacture": "Porsche"
				}, {
					"Manufacture": "Rolls-Royce"
				}, {
					"Manufacture": "Toyota"
				}, {
					"Manufacture": "Others"
				}],

				"ModelF4Set": [{
					"Manufacture": "Audi",
					"Model": "A1"
				}, {
					"Manufacture": "Audi",
					"Model": "A2"
				}, {
					"Manufacture": "Audi",
					"Model": "A3"
				}, {
					"Manufacture": "Audi",
					"Model": "Q1"
				}, {
					"Manufacture": "Audi",
					"Model": "Q3"
				}, {
					"Manufacture": "BMW",
					"Model": "X1"
				}, {
					"Manufacture": "BMW",
					"Model": "X3"
				}, {
					"Manufacture": "BMW",
					"Model": "M2"
				}, {
					"Manufacture": "Benz",
					"Model": "EQS"
				}, {
					"Manufacture": "Benz",
					"Model": "GLB"
				}, {
					"Manufacture": "Benz",
					"Model": "GLC"
				}, {
					"Manufacture": "Ford",
					"Model": "Aerostar"
				}, {
					"Manufacture": "Ford",
					"Model": "Mustang"
				}, {
					"Manufacture": "Ford",
					"Model": "EcoSport"
				}, {
					"Manufacture": "Ferrari",
					"Model": "F8 Tributo"
				}, {
					"Manufacture": "Hyundai",
					"Model": "Creta"
				}, {
					"Manufacture": "Honda",
					"Model": "Amaze"
				}, {
					"Manufacture": "Land Rover",
					"Model": "Range Rover"
				}, {
					"Manufacture": "Land Rover",
					"Model": "Defender"
				}, {
					"Manufacture": "Porsche",
					"Model": "GTS"
				}, {
					"Manufacture": "Rolls-Royce",
					"Model": "Ghost"
				}, {
					"Manufacture": "Rolls-Royce",
					"Model": "Cullinan"
				}, {
					"Manufacture": "Toyota",
					"Model": "Glanza"
				}, {
					"Manufacture": "Others"

				}],
				"ModelF4": [],

			};
			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel, "oViewModel");

		},

		onPressAddVehicle: function () {
			var VehicleArr = this.getView().getModel("oViewModel").getProperty("/AddVehicleData");
			VehicleArr.push({
				"Customer": "",
				"PlateNo": "",
				"PlateC": "",
				"PlateCat": "",
				"Vin": "",
				"Emirates": ""
			});
			this.getView().getModel("oViewModel").setProperty("/AddVehicleData", VehicleArr);
		},
		onPressDelete: function (oEvent) {
			var Model = this.getView().getModel("oViewModel");
			var Path = oEvent.getSource().getBindingContext("oViewModel").getPath();
			var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1), 10);
			sap.m.MessageBox.confirm(
				"Are you sure want to Delete?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						var Data = Model.getProperty("/AddVehicleList");
						Data.splice(vIndex, 1);
						Model.setProperty("/AddVehicleList", Data);
						Model.refresh();
					} else if (oAction === "NO") { }
				}
			});
		},

		/**
		 * Function for post call.
		 * @memberof customercomplaint.controller.CustomerComplaint.
		 * @version 1.0.0
		 * @since 20.07.2023
		 * @author MH
		 */
		onPressSaveCustomer: function () {

			var sOnlyCust = this.getView().getModel("HomeViewModel").getData().CNC_NewCustomer;
			var oModel = this.getView().getModel("oViewModel").getData();

			if (sOnlyCust) {

				if (oModel.CC_FirstName !== "" && oModel.CC_MobileNo !== "") {
					// Posting call

					// var oPayload = {
					// 	"partner": "",
					// 	"Bu_Group": "",
					// 	"Title": "",
					// 	"FirstName": oModel.CC_FirstName,
					// 	"LastName": oModel.CC_LastName,
					// 	"City": oModel.CC_City,
					// 	"Pincode": oModel.CC_PostalCode,
					// 	"Region": "",
					// 	"Street": oModel.CC_Street,
					// 	"PhoneNumber": oModel.CC_MobileNo,
					// 	"Email": oModel.CC_Email,

					// 	// "Title": "0002",
					// 	// "FirstName": "Tushar",
					// 	// "LastName": "Handa",
					// 	// "City": "DL",
					// 	// "Pincode": "101010",
					// 	// "Region": "03",
					// 	// "Street": "ABC Street",
					// 	// "Country": "IN",
					// 	// "PhoneNumber": "5367823",
					// 	// "Email": "tush@ey.com",
					// 	// "_Vehicle": {
					// 	// 	"Platecode": "A",
					// 	// 	"Platenum": "20010",
					// 	// 	"Manufacture": "AUDI",
					// 	// 	"Model": "A4"
					// 	// }

					// };
					// this.getView().getModel('mainService').create("/Customer", oPayload, {
					// 	success: function(oData, oResponse) {
					// 		//BusyIndicator.hide();
					// 		sap.ui.core.BusyIndicator.hide();
					// 		if (JSON.parse(oResponse.headers["sap-message"]).severity === "error") {
					// 			MessageBox.error(JSON.parse(oResponse.headers["sap-message"]).message);
					// 		} else {
					// 			// MessageBox.success(JSON.parse(oResponse.headers["sap-message"]).message, {
					// 			// 	actions: [MessageBox.Action.OK],
					// 			// 	emphasizedAction: MessageBox.Action.OK,
					// 			// 	onClose: function (sAction) {
					// 			// 		this.onClearCNCInput();
					// 			// 	}.bind(this)
					// 			// });
					// 			MessageToast.show(JSON.parse(oResponse.headers["sap-message"]).message);

					// 			this.onClearCNCInput();

					// 		}
					// 	}.bind(this),
					// 	error: function(oError) {
					// 		sap.ui.core.BusyIndicator.hide();
					// 		MessageBox.error(JSON.parse(oError.responseText).error.message.value);
					// 		//BusyIndicator.hide();
					// 	}.bind(this)
					// });
					MessageToast.show("Customer created successfully");
					this.onClearCNCInput();

				} else {
					if (oModel.CC_FirstName === "") {
						oModel.CC_FirstName_ValueState = "Error";
						this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState", "Error");
					}
					if (oModel.CC_MobileNo === "") {
						oModel.CC_MobileNo_ValueState = "Error";
						this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState", "Error");
					}
					MessageToast.show("Please fill mandatory details");
					this.getView().getModel("oViewModel").refresh(true);
				}

			} else {

				if (oModel.CC_FirstName !== "" && oModel.CC_MobileNo !== "" && oModel.CC_Emirates !== "" && oModel.CC_Category !== "" &&
					oModel.CC_PlateCode !== "" && oModel.CC_PlateNo !== "" && oModel.CC_Manfacturer !== "" && oModel.CC_Model !== "") {
					// Posting call

					// var oPayload = {
					// 	"partner": "",
					// 	"Bu_Group": "",
					// 	"Title": "",
					// 	"FirstName": oModel.CC_FirstName,
					// 	"LastName": oModel.CC_LastName,
					// 	"City": oModel.CC_City,
					// 	"Pincode": oModel.CC_PostalCode,
					// 	"Region": "",
					// 	"Street": oModel.CC_Street,
					// 	"PhoneNumber": oModel.CC_MobileNo,
					// 	"Email": oModel.CC_Email,

					// 	// "Title": "0002",
					// 	// "FirstName": "Tushar",
					// 	// "LastName": "Handa",
					// 	// "City": "DL",
					// 	// "Pincode": "101010",
					// 	// "Region": "03",
					// 	// "Street": "ABC Street",
					// 	// "Country": "IN",
					// 	// "PhoneNumber": "5367823",
					// 	// "Email": "tush@ey.com",
					// 	// "_Vehicle": {
					// 	// 	"Platecode": "A",
					// 	// 	"Platenum": "20010",
					// 	// 	"Manufacture": "AUDI",
					// 	// 	"Model": "A4"
					// 	// }

					// };
					// this.getView().getModel('mainService').create("/Customer", oPayload, {
					// 	success: function(oData, oResponse) {
					// 		//BusyIndicator.hide();
					// 		sap.ui.core.BusyIndicator.hide();
					// 		if (JSON.parse(oResponse.headers["sap-message"]).severity === "error") {
					// 			MessageBox.error(JSON.parse(oResponse.headers["sap-message"]).message);
					// 		} else {
					// 			// MessageBox.success(JSON.parse(oResponse.headers["sap-message"]).message, {
					// 			// 	actions: [MessageBox.Action.OK],
					// 			// 	emphasizedAction: MessageBox.Action.OK,
					// 			// 	onClose: function (sAction) {
					// 			// 		this.onClearCNCInput();
					// 			// 	}.bind(this)
					// 			// });
					// 			MessageToast.show(JSON.parse(oResponse.headers["sap-message"]).message);

					// 			this.onClearCNCInput();

					// 		}
					// 	}.bind(this),
					// 	error: function(oError) {
					// 		sap.ui.core.BusyIndicator.hide();
					// 		MessageBox.error(JSON.parse(oError.responseText).error.message.value);
					// 		//BusyIndicator.hide();
					// 	}.bind(this)
					// });
					MessageToast.show("Customer created successfully");
					this.onClearCNCInput();

				} else {
					// if (oModel.CC_FirstName === "") {
					// 	oModel.CC_FirstName_ValueState = "Error";
					// 	this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState", "Error");
					// }
					// if (oModel.CC_MobileNo === "") {
					// 	oModel.CC_MobileNo_ValueState = "Error";
					// 	this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState", "Error");
					// }
					MessageToast.show("Please Fill All Mandatory Details");
					this.getView().getModel("oViewModel").refresh(true);
				}

			}

		},

		/**
		 * Event trigger when you enter value in Mobile number Input.
		 * @memberof customercomplaint.controller.CustomerComplaint.
		 * @version 1.0.0
		 * @since 28.07.2022
		 * @author MH
		 * @fires -
		 */
		onMobileNoLiveChange: function (oEvent) {
			var oValue = oEvent.getSource().getValue();
			if (oValue.charAt(0) === '0') {
				MessageToast.show("Mobile number does not start with zero");
				oEvent.getSource().setValue("");
			} else {

				var RemoveSpecialChar = oValue.replace(/\D/g, '');
				oEvent.getSource().setValue(RemoveSpecialChar);
				if (oValue.length > 9) {
					this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState", "None");

				} else {
					this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState", "Error");
				}
			}
		},

		/**
		 * Event trigger when you enter value in First name Input.
		 * @memberof customercomplaint.controller.CustomerComplaint.
		 * @version 1.0.0
		 * @since 28.07.2022
		 * @author MH
		 * @fires -
		 */
		onFirstNameLiveChange: function (oEvent) {
			var oValue = oEvent.getSource().getValue();
			oValue = oValue.replace(/[^a-zA-Z0-9_ ]/g, "");
			oEvent.getSource().setValue(oValue);
			if (oValue.length > 2) {
				this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState", "Information");
			} else {
				this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState", "Error");
			}
		},

		/**
		 * Function used to open the Manufacture F4 valuhelp.    
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 * @fires -
		 */
		onOpenManufactureF4: function (oEvent) {
			this.source = oEvent.getSource();

			if (!this.Manfacturer) {
				this.Manfacturer = sap.ui.xmlfragment("viapp.fragment.ManfacturerF4", this); // Fragments for Process select
				this.getView().addDependent(this.Manfacturer);
			}
			this.Manfacturer.open();
		},

		/**
		 * Event triggered when user types in the search field of Create new Customer City.fragment.xml.    
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 * @fires onSearchF4
		 */
		onSearchManufacture: function (oEvent) {
			var sValue = oEvent.getParameters().value;
			var aFilter = ["Manufacture"];
			var oBinding = oEvent.getSource().getBinding("items");
			this.onSearchF4(sValue, aFilter, oBinding);
		},

		/**
		 * Event triggered when user types in the search field of Create new Customer City.fragment.xml.    
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 * @fires onSearchF4
		 */
		onSearchModel: function (oEvent) {
			var sValue = oEvent.getParameters().value;
			var aFilter = ["Model"];
			var oBinding = oEvent.getSource().getBinding("items");
			this.onSearchF4(sValue, aFilter, oBinding);
		},

		/**
		 * Event triggered when user types in the onSearchF4.    
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 30.04.2024
		 * @author MH
		 */
		onSearchF4: function (sValue, aFilters, oBinding) {
			var aFilterArray = [];
			for (var i = 0; i < aFilters.length; i++) {
				aFilterArray.push(new Filter(aFilters[i], FilterOperator.Contains, sValue));
			}
			var oFilter = new Filter(aFilterArray);
			oBinding.filter([oFilter]);
		},

		/**
		 * Function used to get the selected manufature from Fragment.    
		 * @memberof AutoproCarWash.controller.CustomerList.
		 * @version 1.0.0
		 * @since 29.07.2022
		 * @author MH
		 * @fires -
		 */
		onManfacturerConfirm: function (oEvent) {

			var oModel = this.getView().getModel("oViewModel");
			oModel.setProperty("/CC_Model", "");
			oModel.getData().CC_Manfacturer = oEvent.getParameter("selectedItem").getBindingContext("oViewModel").getObject().Manufacture;

			oEvent.getSource().getBinding("items").filter([]);

			var ModelF4Set = oModel.getProperty("/ModelF4Set");
			var aManufactureModel = [];

			aManufactureModel = ModelF4Set.filter(function (e) {
				return e.Manufacture === oModel.getData().CC_Manfacturer;
			});
			//oModel.ModelF4 = aManufactureModel;
			oModel.setProperty("/ModelF4", aManufactureModel);
			oModel.refresh();
		},

		/**
		 * Function used to open the vehicle Model F4 valuhelp.    
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 * @fires -
		 */
		onOpenModelF4: function (oEvent) {
			this.source = oEvent.getSource();

			if (!this.ModelF4) {
				this.ModelF4 = sap.ui.xmlfragment("viapp.fragment.ModelF4", this); // Fragments for Process select
				this.getView().addDependent(this.ModelF4);
			}
			this.ModelF4.open();
		},

		/**
		 * Function used to get the selected Model from Fragment.    
		 * @memberof AutoproCarWash.controller.CustomerList.
		 * @version 1.0.0
		 * @since 29.07.2022
		 * @author MH
		 * @fires -
		 */
		onModelConfirm: function (oEvent) {
			var oModel = this.getView().getModel("oViewModel");
			//	oModel.setProperty("/CC_Model", "");
			oModel.getData().CC_Model = oEvent.getParameter("selectedItem").getBindingContext("oViewModel").getObject().Model;

			oModel.refresh();
			oEvent.getSource().getBinding("items").filter([]);
		},

		onResetForm: function () {
			var oModel = this.getView().getModel("oViewModel");
			oModel.getData().CC_FirstName = "";
			oModel.getData().CC_FirstName_ValueState = "None";
			// oModel.getData().CC_LastName = "";
			oModel.getData().CC_MobileNo = "";
			oModel.getData().CC_Email = "";

			oModel.getData().CC_Emirates = "";
			oModel.getData().CC_Category = "";
			oModel.getData().CC_PlateCode = "";
			oModel.getData().CC_PlateNo = "";
			oModel.getData().CC_VINNo = "";
			oModel.getData().CC_Manfacturer = "";
			oModel.getData().CC_Model = "";
			oModel.getData().CC_CarType = "";
			oModel.refresh();

		},

		/*TagunTag code start*/
		onPressTagunTag: function () {

			if (!this.TagVehicleToCustomer) {
				this.TagVehicleToCustomer = sap.ui.xmlfragment("viapp.fragment.TagVehicleToCustomer", this); // Fragments for Process select
				this.getView().addDependent(this.TagVehicleToCustomer);
			}
			this.TagVehicleToCustomer.open();

		},

		onCancelTagVehicleToCustomer: function () {
			this.TagVehicleToCustomer.close();

		},

		onPressNav1: function () {
			// var url = "intent://open?Intent;scheme=https;package=com.marsdata.fabpos.Mars.Splash_Screen;end;";
			// window.location.href = url;

			// Example JSON object
			var data = {
				trxnType: "SALE",
				amount: "10.00",
				mode: "card",
				trxnID: "897090"
			};

			// Serialize to a string
			var jsonString = JSON.stringify(data);

			// Encode the JSON string to be safely used in a URL
			var encodedJsonString = encodeURIComponent(jsonString);

			// Construct the deep link URL
			var deepLinkUrl = "intent://open?data=${encodedJsonString}#Intent;scheme=myapp;package=pay.com;end;";

			// Trigger the deep link
			window.location.href = deepLinkUrl;

		},

		onPressNav2: function () {
			var url = "intent://Mars.Splash_Screen?AMOUNT=10#Intent;scheme=https;package=Mars.Splash_Screen;end;";
			window.location.href = url;
		},

		onPressNav3: function () {
			var deepLinkUrl = "intent://open?#Intent;scheme=https;package=com.marsdata.fabpos.Mars.Splash_Screen;end;";

			// Trigger the deep link
			window.location.href = deepLinkUrl;

		},

		onLPGSwitchOn: function (oEvent) {
			var oModel = this.getView().getModel("HomeViewModel");
			// var MainPlant = this.getView().getModel("oGlobalModel").getData().MainPlant;
			// if (MainPlant === "") {
			// 	MessageToast.show("Please select Plant");
			// } else {
			var State = oEvent.getSource().getState();
			if (State) {
				oModel.setProperty("/LPG_Switch", true);
				this.getView().getModel("oGlobalModel").setProperty("/LPG_ProcessVisible", true);
				this.getView().getModel("oGlobalModel").setProperty("/CW_ProcessVisible", false);

			} else if (!State) {
				oModel.setProperty("/LPG_Switch", false);
				this.getView().getModel("oGlobalModel").setProperty("/LPG_ProcessVisible", false);
				this.getView().getModel("oGlobalModel").setProperty("/CW_ProcessVisible", true);
			}
			// }
		},

		onPressSearchCustomer: function (oEvent) {

			var oGlobalModel = this.getView().getModel("oGlobalModel");

			// if (oEvent.getParameter("name") === "Services") {

			// if (oGlobalModel.getData().MainPlant !== "" && (oGlobalModel.getData().Profile_PlateNo === "" && oGlobalModel.getData().Profile_PlateCode ===
			// 		"")) {

			/*Enable Vehicle Details Input*/
			if (!this.SearchVehicle) {
				this.SearchVehicle = sap.ui.xmlfragment("viapp.fragment.SearchVehicle", this); // Fragments for Process select
				this.getView().addDependent(this.SearchVehicle);
			}
			this.SearchVehicle.open();

			// }

			// }

		},

		// onPressCreateCustomer: function() {

		// 	this.SearchVehicle.close();

		// 	// this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	// this._oRouter.navTo("Home", true);

		// 	if (!this.Create) {
		// 		this.Create = sap.ui.xmlfragment("Carwash.fragment.CreateCustomer", this); // Fragments for Process select
		// 		this.getView().addDependent(this.Create);
		// 	}
		// 	this.Create.open();
		// },

		onCancelCreateCustomer: function () {
			this.Create.close();
		},

		onPressCloseSearch: function () {
			this.SearchVehicle.close();
		},

		getDynamicImagePath: function () {
			// Example: Return a dynamic path based on conditions
			return "NewLogo.png";
		},

		onnewprint: function () {

			// Dynamically resolve the path to the image
            const ImagePath1 = sap.ui.require.toUrl("viapp/image/cart.png");

			

            // Create a JSON model with the image path
            const oModel = new sap.ui.model.json.JSONModel({
                ImagePath: ImagePath1
            });
            this.getView().setModel(oModel, "imageModel");

			
			
			
			
		// Create printable content
			const printContent = `
        <!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Invoice</title>
			<style>
		@page {
			size: 58mm auto; 
			margin: 0;
		}
        body {
            font-family: Arial, sans-serif;
            font-size: 20px;
            margin: 0;
            padding: 0;
            background: #f4f4f4;
        }
		.custom-img {
			// content: url('Carwash/app/viapp/webapp/image/NewLogo.png');
			background-image: url('image/ticket.png'); 
		}
    </style>
   
</head>

<body>
     <div>
          <img src="{imageModel>/base64Image}" alt="Logo" style="width: 150px;" />
          <p>This is dynamic content with an image.</p>
    </div>

			<div class="custom-img">
          
    </div>

    <div class="invoice-container">
	
        <!-- Invoice Header -->
        <div class="invoice-header">
		<center>
		<img id="imgTag" alt="Logo" />
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzs3XmcU+W9P/DPOdlmMsmsmcwks8+wI6usLjDKoiK0SgV3RaBQEWzVttfb2tv0R++93ta2t7e2lrov1Yr7rtQFxBVFEAUBGYGB2feZzJ7k/P4IQ1FhJmcmyXNO8nm/Xt+XRnNyvrOd53ue8ywAERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERGFnyQ6ASKimJc3fxZ625ajxzsFgd4kBPwWyIYumG1lMCbuhJzyvzj6YoXoNImIiGiohl2QjOwZG5Hg6Aag9BuySUHqyMNwl94gLmEiIiIaGtes9bCk92Cghv9bISlIHXUQOQsmikmciIiI1MufNwfJxbVQ3fB/I4zWAPLO/UH0vwAiIiIKnXuRA5mTN0M2Da3h/9pjAaMC96w7ov2lEBERUShcs9bDktaLcDX8J4ZkUJB77vej+vUQERFRP/Lnz0NycR0i0fCfGJbUXuRdUBK9L4yIiIi+rWCxCxkTt0EyRLbhPzFSRx2K0ldHRERE3+KatR6W1Mh09w8UOaW3ROVrJCIiomNy5y2AvbAeIhr+vkh0dsG9yBqFr5aIiCjOFS0ogGPcTkiyuIb/xHBOfy7iXzMREVH88shwnbEBJpsfohv9E8NgCcA9d1KEv3giIqI4lHfu5bDltkJ0Y3+qSB31VSS/fCIiovhSML9IU939pwxJQe6cGyP4nSAiIooHpcZgd3+Strr7+4vErE4UliZE6jtCREQU23LnXAVbThtEN+iDCef0JyLyPSEiIopZeReUwDFuJyCJb8gHG4aEAHcNJCIiCsmx7n5jUgCiG/BwRPqY/WH/FhEREcUU97nrkJjdCdGNdlhD4mZBREREJ5WzYCLSRpXpuru/v7C6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" alt="ADNOC Distribution 2"  />
		<img src="{imageModel>/path}/image/MenuIcon.png" alt="ADNOC Distribution 2"  />

		<script>
    // Dynamically set the image source
    document.getElementById("imgTag").src = "/image/MenuIcon.png";
  </script>
			
             <p>SALES RECEPIT</p> 
             <p>TRN: 100069993200003</p>
			 <br>
            <P>ADNOC Distribution</p>
            <p>P.O Box 4188, Abu Dhabi UAE</p>
            <p>Site: A001</p>
			 </center>
        </div>
			
			<div class="invoice-details">
			</br>
                <center>
				    <img src="data:image/png;base64,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" alt="ADNOC Rewords" width="70">
                </center>
            </div> 
        	<!-- Invoice Footer -->
                 <center>
                   <p style="font-size: 14px;">Thank You </br> Contact Us: 800300 </br> www.adnocdistribution.com </br> V:No: 1</p>
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

		// Checking Rest_API posting
		onPostRestAPI:function(){
				var payload = {
					"input": {
						  "postingDate": "2024-09-24"
						}
				}
				this.getView().getModel("CarwashService").create("/p24_er6_getPeriodStatus", payload, {
					success: function (oData, oResponse) {
						// debugger;
						// BusyIndicator.hide();
						consol.log(oData)
						consol.log(oResponse)
					}.bind(this),
					error: function (oError) {
						// BusyIndicator.hide();
						MessageBox.error(oError.message);
					}.bind(this)
				});
	

		}







	});
});