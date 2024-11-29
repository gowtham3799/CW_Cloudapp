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

	});
});