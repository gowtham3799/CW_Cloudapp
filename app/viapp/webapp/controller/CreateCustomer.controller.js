sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/BusyIndicator",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	// "Carwash/util/formatter",
], function(Controller, MessageToast, BusyIndicator, Filter, FilterOperator, MessageBox) {
	"use strict";

	return Controller.extend("viapp.controller.CreateCustomer", {
		// formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Z_demo1.view.View2
		 */
		onInit: function() {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Z_demo1.view.View2
		 */
		onAfterRendering: function() {
			this.oBundle = this.getView().getModel("i18n").getResourceBundle();
			this._ModelInitialLoad();
		},

		/**
		 * Function called from onAfterRendering Event to get the initial Model Loading.
		 * @memberof customercomplaint.controller.CustomerComplaint.
		 * @version 1.0.0
		 * @since 20.07.2023
		 * @author MH
		 */
		_ModelInitialLoad: function() {
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

			//this.getView().getModel("oGlobalModel").setProperty("PageFlag",  "CreateCustomer");

		},

		/**
		 * Function for post call.
		 * @memberof customercomplaint.controller.CustomerComplaint.
		 * @version 1.0.0
		 * @since 20.07.2023
		 * @author MH
		 */
		onPressSaveCustomer: function() {

			var oModel = this.getView().getModel("oViewModel").getData();

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

		},

		/**
		 * Event trigger when you enter value in Mobile number Input.
		 * @memberof customercomplaint.controller.CustomerComplaint.
		 * @version 1.0.0
		 * @since 28.07.2022
		 * @author MH
		 * @fires -
		 */
		onMobileNoLiveChange: function(oEvent) {
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
		onFirstNameLiveChange: function(oEvent) {
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
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Z_demo1.view.View2
		 */
		onExit: function() {

		},
		onPressAddVehicle: function() {
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
		onPressDelete: function(oEvent) {
			var Model = this.getView().getModel("oViewModel");
			var Path = oEvent.getSource().getBindingContext("oViewModel").getPath();
			var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1), 10);
			sap.m.MessageBox.confirm(
				"Are you sure want to Delete?", {
					icon: sap.m.MessageBox.Icon.CONFIRM,
					title: "Confirmation",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === "YES") {
							var Data = Model.getProperty("/AddVehicleList");
							Data.splice(vIndex, 1);
							Model.setProperty("/AddVehicleList", Data);
							Model.refresh();
						} else if (oAction === "NO") {}
					}
				});
		},

		/**
		 * Event triggered when user clicked on Add Vehicle customer.  
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 */
		onSwitchAddVehicle: function(oEvent) {

			var State = oEvent.getSource().getState();
			if (State) {
				if (!this.AddVehicleToCustomer) {
					this.AddVehicleToCustomer = sap.ui.xmlfragment("viapp.fragment.TagVehicleToCustomer", this); // Fragments for Process select
					this.getView().addDependent(this.AddVehicleToCustomer);
				}
				this.AddVehicleToCustomer.open();

			} else if (!State) {
				// No Action
			}

		},

		/**
		 * Event triggered when user clicked on cancel on Add Vehicle customer Popup.  
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 */
		onCancelTagVehicleToCustomer: function() {

			this.AddVehicleToCustomer.close();
			this.getView().getModel("oViewModel").setProperty("/CC_AddVehicleSwitch", false);

		},

		/**
		 * Function used to open the Manufacture F4 valuhelp.    
		 * @memberof Lube.controller.EditCustomer
		 * @version 1.0.0
		 * @since 14.07.2023
		 * @author MH
		 * @fires -
		 */
		onOpenManufactureF4: function(oEvent) {
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
		onSearchManufacture: function(oEvent) {
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
		onSearchModel: function(oEvent) {
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
		onSearchF4: function(sValue, aFilters, oBinding) {
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
		onManfacturerConfirm: function(oEvent) {

			var oModel = this.getView().getModel("oViewModel");
			oModel.setProperty("/CC_Model", "");
			oModel.getData().CC_Manfacturer = oEvent.getParameter("selectedItem").getBindingContext("oViewModel").getObject().Manufacture;

			oEvent.getSource().getBinding("items").filter([]);

			var ModelF4Set = oModel.getProperty("/ModelF4Set");
			var aManufactureModel = [];

			aManufactureModel = ModelF4Set.filter(function(e) {
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
		onOpenModelF4: function(oEvent) {
			this.source = oEvent.getSource();

			if (!this.ModelF4) {
				this.ModelF4 = sap.ui.xmlfragment("viapp.fragment.ModelF4", this); // Fragments for Process select
				this.getView().addDependent(this.ModelF4);
			}
			this.ModelF4.open();
		},

		/**
		 * Function used to get the selected Model from Fragment.    
		 * @memberof Autoproviapp.controller.CustomerList.
		 * @version 1.0.0
		 * @since 29.07.2022
		 * @author MH
		 * @fires -
		 */
		onModelConfirm: function(oEvent) {
			var oModel = this.getView().getModel("oViewModel");
			//	oModel.setProperty("/CC_Model", "");
			oModel.getData().CC_Model = oEvent.getParameter("selectedItem").getBindingContext("oViewModel").getObject().Model;

			oModel.refresh();
			oEvent.getSource().getBinding("items").filter([]);
		},

		onRefreshProcess: function() {
			var oModel = this.getView().getModel("oViewModel");
			oModel.getData().CC_Emirates = "";
			oModel.getData().CC_Category = "";
			oModel.getData().CC_PlateCode = "";
			oModel.getData().CC_PlateNo = "";
			oModel.getData().CC_VINNo = "";
			oModel.getData().CC_Manfacturer = "";
			oModel.getData().CC_Model = "";
			oModel.getData().CC_CarType = "";
			oModel.getData().CC_FuelType = "";
			oModel.getData().CC_Year = "";
			oModel.refresh();
		},

		onClearCNCInput: function() {
			var oModel = this.getView().getModel("oViewModel");
			oModel.getData().CC_FirstName = "";
			oModel.getData().CC_LastName = "";
			oModel.getData().CC_Email = "";
			oModel.getData().CC_MobileNo = "";
			oModel.getData().CC_HouseNo = "";
			oModel.getData().CC_Street = "";
			oModel.getData().CC_City = "";
			oModel.getData().CC_PostalCode = "";
			oModel.getData().CC_Country = "";
			oModel.getData().CC_Remark = "";

			oModel.getData().AddVehicleList = [];
			oModel.getData().AddVehicleList = "";
			oModel.getData().CC_FirstName_ValueState = "None";
			oModel.getData().CC_MobileNo_ValueState = "None";
			oModel.getData().CC_AddVehicleSwitch = false;
			oModel.refresh();
		},

		/**
		 * Event trigger when you enter value in Vin Input.
		 * @memberof AutoproCarWash.controller.CustomerList.
		 * @version 1.0.0
		 * @since 28.07.2022
		 * @author MH
		 * @fires -
		 */
		onVINInputLiveChange: function(oEvent) {
			var oValue = oEvent.getSource().getValue();

			var input = oEvent.getSource();
			input.setValue(input.getValue().toUpperCase());

			//var input1 = oEvent.getSource().getValue();
			var oValue = oValue.replace(/[^a-zA-Z0-9 ]/g, "");

			//input = input.replaceAll("[^a-zA-Z0-9]/g", " ");
			oValue = oValue.split(" ").join("");
			oEvent.getSource().setValue(oValue);
			oEvent.getSource().setValue(oValue.toUpperCase());

		},

		onPressAddvehicle: function() {

			var oModel = this.getView().getModel("oViewModel");

			if (oModel.getData().CC_Emirates !== "" && oModel.getData().CC_Category !== "" &&
				oModel.getData().CC_PlateCode !== "" && oModel.getData().CC_PlateNo !== "" && oModel.getData().CC_Manfacturer !== "" && oModel.getData()
				.CC_Model !== "") {

				var obj = {
					"CC_Emirates": oModel.getData().CC_Emirates,
					"CC_Category": oModel.getData().CC_Category,
					"CC_PlateCode": oModel.getData().CC_PlateCode,
					"CC_PlateNo": oModel.getData().CC_PlateNo,
					"CC_VINNo": oModel.getData().CC_VINNo,
					"CC_Manfacturer": oModel.getData().CC_Manfacturer,
					"CC_Model": oModel.getData().CC_Model,
					"CC_CarType": oModel.getData().CC_CarType,
					"CC_FuelType": oModel.getData().CC_FuelType,
					"CC_Year": oModel.getData().CC_Year

				};

				oModel.getData().AddVehicleList.push(obj);
				oModel.getData().CC_AddVehicleSwitch = false;
				oModel.refresh();
				//this.AddVehicleToCustomer.close();
				this.onRefreshProcess();
			} else {
				MessageToast.show("Please fill mandatory details");

			}

		},

		onPlateNoInputLiveChange: function(oEvent) {
			var oValue = oEvent.getSource().getValue();
			var RemoveSpecialChar = oValue.replace(/\D/g, '');
			oEvent.getSource().setValue(RemoveSpecialChar);

		},

		onCloseCreateCustomer: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.navTo("Home", false);
		}

	});

});