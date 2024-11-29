sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	'sap/ui/core/Fragment',
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/Element",
	// "viapp/Js/qrcode",
	// "viapp/Js/findpat",
	// "viapp/Js/crypto",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",

], function (Controller, MessageToast, MessageBox, Fragment, BusyIndicator, Element, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("viapp.controller.Services", {
		// qrcode: qrcode,
		onInit: function () {
			// this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// this._oRouter.attachRouteMatched(this.handleRouteMatched, this);

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);

			// this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},

		handleRouteMatched: function (oEvent) {

			var oGlobalModel = this.getView().getModel("oGlobalModel");

			if (oEvent.getParameter("name") === "Services") {

				var MainPlant = this.getView().getModel("oGlobalModel").getData().MainPlant;
				// if (MainPlant !== "") {
				// 	this.onPressSearchCustomer();
				// }

				this._ModelInitialLoad();
				this.getMaterialF4();

				var CW_ServicesMaterialF4 = this.getView().getModel("ServicesViewModel").getData().CWMaterial;
				for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {

					CW_ServicesMaterialF4[i].Highlight === "None"
					CW_ServicesMaterialF4[i].Type = "Active";
					// CW_ServicesMaterialF4[i].removeStyleClass = "cl_wgridlistSeleted";
					// CW_ServicesMaterialF4[i].addStyleClass = "cl_wgridlist";
					this.getView().addStyleClass('cl_wgridlist');
					this.getView().removeStyleClass('cl_wgridlistSeleted');

				}

				// if (oGlobalModel.getData().MainPlant !== "" && (oGlobalModel.getData().Profile_PlateNo === "" && oGlobalModel.getData().Profile_PlateCode ===
				// 		"")) {

				// 	/*Enable Vehicle Details Input*/
				// 	if (!this.SearchVehicle) {
				// 		this.SearchVehicle = sap.ui.xmlfragment("Carwash.fragment.SearchVehicle", this); // Fragments for Process select
				// 		this.getView().addDependent(this.SearchVehicle);
				// 	}
				// 	this.SearchVehicle.open();

				// }

			}
		},

		onExit: function () {
			alert("Exit")

		},

		onPressCloseSearch: function () {
			this.SearchVehicle.close();
		},

		onPressmainHome: function () {
			// var sPreviousHash = History.getInstance().getPreviousHash();
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			oCrossAppNavigator.toExternal({
				target: {
					shellHash: "#Shell-home"
				}
			});
			var oRenderer = sap.ushell.Container.getRenderer("fiori2");
			oRenderer.setHeaderVisibility(true, false);
		},

		onSearchNewMaterialF4: function (oEvent) {
			var SamTbl = oEvent.getParameter("newValue");
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, SamTbl),
				new sap.ui.model.Filter("MaterialName", sap.ui.model.FilterOperator.Contains, SamTbl)

			], false);
			filters = (oFilter);
			var listItem = this.getView().byId("idgridlist");
			var binding = listItem.getBinding("items");
			binding.filter(filters);

		},

		onSearchLPGMaterialSearch: function () {
			var SamTbl = oEvent.getParameter("newValue");
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, SamTbl),
				new sap.ui.model.Filter("MaterialName", sap.ui.model.FilterOperator.Contains, SamTbl)

			], false);
			filters = (oFilter);
			var listItem = this.getView().byId("idgridlist");
			var binding = listItem.getBinding("items");
			binding.filter(filters);
		},

		onAfterRendering: function () {

			this._ModelInitialLoad();
			// this.onPressPlant();

		},

		_ModelInitialLoad: function () {
			var oData = {

				"GassItemBG": "{imageModel>/path}/image/DesignCar.png",
				"CWMaterial": [{
					"Material": "2822957303",
					"MaterialName": "Rainbow Foam Full Wash",
					"Quantity": "1",
					"Price": "150.00",
					"Tax": "2.5",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2861928504",
					"MaterialName": "Interior Cleaning",
					"Price": "40.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2911859358",
					"MaterialName": "Underbody Flush",
					"Price": "60.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2709919403",
					"MaterialName": "Wheel Washing",
					"Price": "140.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2756492720",
					"MaterialName": "Waxing",
					"Price": "170.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2822957303",
					"MaterialName": "Car sanitization",
					"Price": "50.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2700494918",
					"MaterialName": "Automatic Car wash",
					"Price": "40.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2811746280",
					"MaterialName": "Manual Car wash",
					"Price": "100.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2600954298",
					"MaterialName": "Full Service Car Wash",
					"Price": "140.00",
					"Quantity": "1",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2790947298",
					"MaterialName": "Bike Wash",
					"Price": "20.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}],

				"LPGMaterial": [{
					"Material": "2800000090",
					"MaterialName": "Gas Cylinder 5.5Kg",
					"Price": "8.00",
					"Tax": "2.5",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2800000010",
					"MaterialName": "Gas Cylinder 11Kg",
					"Price": "14.00",
					"Tax": "2.5",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2800000011",
					"MaterialName": "Gas Cylinder 22Kg",
					"Price": "25.00",
					"Tax": "2.5",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2800000011",
					"MaterialName": "Gas Cylinder 44Kg",
					"Price": "25.00",
					"Tax": "2.5",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2800000030",
					"MaterialName": "Small LPG 25lbs",
					"Price": "35.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2800000031",
					"MaterialName": "Large LPG 50lbs",
					"Price": "70.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2800000032",
					"MaterialName": "LPG regulator 25mbar",
					"Price": "14.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2756492720",
					"MaterialName": "LPG regulator 30mbar",
					"Price": "70.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2822957303",
					"MaterialName": "LPG regulator 10mbar",
					"Price": "50.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2822957305",
					"MaterialName": "1.5M LPG Rubber Hose Pipe ",
					"Price": "10.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2754362613",
					"MaterialName": "2.5M LPG Rubber Hose Pipe",
					"Price": "20.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}, {
					"Material": "2754362614",
					"MaterialName": "5M LPG Rubber Hose Pipe",
					"Price": "34.00",
					"Tax": "1",
					"Highlight": "None",
					"Type": "Active"
				}],

				"ProceedSOButtomVisible": true,
				// "IdenifymButtomVisible": false,
				"PaymentButtomVisible": false,
				"Printvisible": false,
				"IdentifyVisible": false,
				"MOPVisible": false,
				"CashMOPPanelExpand": false,
				"CardMOPPanelExpand": false,
				"Cash_CheckBoxSeleted": false,
				"Card_CheckBoxSeleted": false,
				"LoyaltyMOPPanelExpand": false,
				"Loyalty_CheckBoxSeleted": false,
				"Coupon_CheckBoxSeleted": false,
				"Loyalty_ScanedID": "",
				"Loyalty_ScanedPoint": "",
				"Loyalty_ScanedAmount": "",

				"Cart_Material": "",
				"Cart_MaterialDesc": "",
				"Cart_TotalAmount": "",
				"Cart_NetAmount": "",
				"Cart_TaxAmount": "",

				"MaterialList": [

					{
						"Material": "1500083163",
						"MaterialName": "Air Purifier",
						"MaterialType": "SER",
						"UOM": "L",
						"NetPrice": "29.00",
						"TaxPrice": "1.50",
						"Total": "30.50",
						"Stock": "25.00",
						"ConsignmentStock": "125.00",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083168",
						"MaterialName": "Air Freshener – Assorted Pack (22.5g) ",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "29.00",
						"TaxPrice": "1.50",
						"Total": "30.50",
						"Stock": "200",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083170",
						"MaterialName": "Scratch Remover Spray",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "19.00",
						"TaxPrice": "1.00",
						"Total": "20.00",
						"Stock": "70",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083171",
						"MaterialName": "Microfiber Car Duster Kit ",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "14.00",
						"TaxPrice": "1.00",
						"Total": "15.00",
						"Stock": "100",
						"ConsignmentStock": "10",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083172",
						"MaterialName": "Multi Color Interior Atmosphere Light for Dashboard",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "200.00",
						"TaxPrice": "1.50",
						"Total": "201.50",
						"Stock": "100",
						"ConsignmentStock": "25",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083174",
						"MaterialName": "Seat Cushion",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "100.00",
						"TaxPrice": "1.50",
						"Total": "101.50",
						"Stock": "100",
						"ConsignmentStock": "55",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083175",
						"MaterialName": "Sun Shade for Side Windows (BLACK 2)",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Total": "26.50",
						"Stock": "100",
						"ConsignmentStock": "75",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083176",
						"MaterialName": "Flat Wiper Blade MULTI-FIT 14 inch",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "55.00",
						"TaxPrice": "1.50",
						"Total": "56.50",
						"Stock": "120",
						"ConsignmentStock": "50",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083178",
						"MaterialName": "3M Specialty Cream Wax",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Total": "26.50",
						"Stock": "120",
						"ConsignmentStock": "30",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083179",
						"MaterialName": "Polish liquid",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Total": "26.50",
						"Stock": "120",
						"ConsignmentStock": "30",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083180",
						"MaterialName": "Frameless wiper blades Size 24 ' x 16'	Inches ",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Total": "26.50",
						"Stock": "120",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083181",
						"MaterialName": "Universal Charger",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "55.00",
						"TaxPrice": "1.50",
						"Total": "56.50",
						"Stock": "120",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083182",
						"MaterialName": "Phone Mount ",
						"MaterialType": "SER",
						"UOM": "L",
						"NetPrice": "35.00",
						"TaxPrice": "1.50",
						"Total": "36.50",
						"Stock": "120",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083183",
						"MaterialName": "Floor Mats",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "35.00",
						"TaxPrice": "1.50",
						"Total": "36.50",
						"Stock": "120",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083185",
						"MaterialName": "Tire Puncture Kit",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "35.00",
						"TaxPrice": "1.50",
						"Total": "36.50",
						"Stock": "120",
						"ConsignmentStock": "30",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083187",
						"MaterialName": "Fog Lights ",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "55.00",
						"TaxPrice": "1.50",
						"Total": "56.50",
						"Stock": "120",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083188",
						"MaterialName": "Emergency Hammer ",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "55.00",
						"TaxPrice": "1.50",
						"Total": "56.50",
						"Stock": "10",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}, {
						"Material": "1500083189",
						"MaterialName": "Mini Car Trash Bin Can Holder Dustbin - Black (L 17 x W 6.5 cms)",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "55.00",
						"TaxPrice": "1.50",
						"Total": "56.50",
						"Stock": "120",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}

				],

				"SO_Number": "Not Started",

				"MyCartItems": [],
				"MyCartItemCount": '0',
				"MyCartTotal": '0',
				"MyCartCount": '0',
				"Loyaltyamount": "0",
				"Cashamount": "0",
				"CouponAmount": "0",
				"CardAmount": "0",
				"CouponNumber": "",
				"LoyaltyRef": "",
				"Authcode": ""

			};
			var ServicesViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(ServicesViewModel, "ServicesViewModel");

			var oData = {
				"CNC_NewCustomer": false,
				"CNC_CustomerForm": true,
				"CNC_VehicleForm": true,
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

		onPressCart: function () {
			// var Cart_Material = this.getView().getModel("ServicesViewModel").getProperty("/Cart_Material");
			// if (Cart_Material) {
			// if (!this.AddToCart) {
			this.AddToCart = sap.ui.xmlfragment("viapp.fragment.AddToCart", this);
			this.getView().addDependent(this.AddToCart);
			// }
			this.AddToCart.open();
			var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
			this.getView().getModel("ServicesViewModel").setProperty("/MyCartItemCount", MyCartItems.length);

			// var Total = MyCartItems.reduce((acc, obj) => parseFloat(acc) + parseFloat(obj.Total), 0);
			var Total = MyCartItems.map(o => o.Total).reduce((a, c) => {
				return parseFloat(a) + parseFloat(c)
			});
			this.getView().getModel("ServicesViewModel").setProperty("/MyCartTotal", parseFloat(Total).toFixed(2));

			this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", true);
			// this.getView().getModel("ServicesViewModel").setProperty("/IdenifymButtomVisible", false);
			this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", false);
			this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", false);
			this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", false);
			this.getView().getModel("ServicesViewModel").refresh();
			// } else {
			// 	sap.m.MessageToast.show("Please Select Material");
			// }
		},

		onCloseCart: function () {

			sap.m.MessageBox.confirm(
				"Are you sure want to close?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						this.AddToCart.close();
						this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", true);
						// this.getView().getModel("ServicesViewModel").setProperty("/IdenifymButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", false);
						this.getView().getModel("ServicesViewModel").refresh();
					} else if (oAction === "NO") { }
				}.bind(this)
			});
		},

		onPressProceedSale: function () {



			var cartitemsarr = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
			var plateno = this.getView().getModel("oGlobalModel").getProperty("/Profile_PlateNo");
			var platecode = this.getView().getModel("oGlobalModel").getProperty("/Profile_PlateCode");
			var emirates = this.getView().getModel("oGlobalModel").getProperty("/Profile_Emirates");
			var plant = this.getView().getModel("oGlobalModel").getProperty("/MainPlant");
			var itemsarr = [];
			var item = 10;
			for (var i = 0; i < cartitemsarr.length; i++) {
				var itemstring = item.toString();
				var obj = {
					"ITEMNUM": itemstring,
					"MATERIAL": cartitemsarr[i].Material,
					"PLANT": plant,
					"MATERIALDESC": cartitemsarr[i].MaterialName,
					"QUANTITY": "1.00",
					"UOM": "EA",
					"NETPRICE": parseFloat(cartitemsarr[i].Price),
					"CURRENCY": "AED"
				};

				item = item + 10;
				itemsarr.push(obj);
			}
			var payload = {
				"PLATECODE": platecode,
				"PLATENUM": plateno,
				"SOURCE": emirates,
				"KIND": "PRIVATE",
				"ITEMS": itemsarr
			};
			BusyIndicator.show();
			this.getView().getModel("CarwashService").create("/Order", payload, {
				success: function (oData, oResponse) {
					// debugger;
					BusyIndicator.hide();
					if (oData.ORDERNUM !== "") {
						var ordernum = oData.ORDERNUM;
						this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", true);
						MessageToast.show("#" + ordernum + " Saleorder created successfully");
						// this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", true);
						this.getView().getModel("ServicesViewModel").setProperty("/SO_Number", ordernum);
						this.getView().getModel("ServicesViewModel").setProperty("/SO_id", oData.ID);
						this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", true);
					}
				}.bind(this),
				error: function (oError) {
					BusyIndicator.hide();
					MessageBox.error(oError.message);
				}.bind(this)
			});


		},

		// onPressIdentify: function() {
		// 	this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", false);
		// 	this.getView().getModel("ServicesViewModel").setProperty("/IdenifymButtomVisible", false);
		// 	this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", true);
		// },

		onPressContinueguest: function () {
			this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", true);
			this.getView().getModel("ServicesViewModel").setProperty("/MOP", true);
			this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", true);

		},

		onPressCashSelect: function (oEvent) {
			var Seleted = oEvent.getSource().getSelected();
			if (Seleted) {
				this.getView().getModel("ServicesViewModel").setProperty("/CashMOPPanelExpand", true);
				// Set amount in card as default
				var Total = this.getView().getModel("ServicesViewModel").getProperty("/MyCartTotal");
				this.getView().getModel("ServicesViewModel").setProperty("/Cashamount", Total);
			} else {
				this.getView().getModel("ServicesViewModel").setProperty("/CashMOPPanelExpand", false);
				// reset amount 
				this.getView().getModel("ServicesViewModel").setProperty("/Cashamount", "0");
			}
			this.getView().getModel("ServicesViewModel").refresh();
		},

		onPressCardSelect: function (oEvent) {
			var Seleted = oEvent.getSource().getSelected();
			if (Seleted) {
				this.getView().getModel("ServicesViewModel").setProperty("/CardMOPPanelExpand", true);
				// Set amount in card as default
				var Total = this.getView().getModel("ServicesViewModel").getProperty("/MyCartTotal");
				this.getView().getModel("ServicesViewModel").setProperty("/CardAmount", Total);

			} else {
				this.getView().getModel("ServicesViewModel").setProperty("/CardMOPPanelExpand", false);
				// reset amount 
				this.getView().getModel("ServicesViewModel").setProperty("/CardAmount", "0");
			}
			this.getView().getModel("ServicesViewModel").refresh();




		},

		onPressLoyaltySelect: function (oEvent) {
			var Seleted = oEvent.getSource().getSelected();
			if (Seleted) {
				this.getView().getModel("ServicesViewModel").setProperty("/LoyaltyMOPPanelExpand", true);
			} else {
				this.getView().getModel("ServicesViewModel").setProperty("/LoyaltyMOPPanelExpand", false);
			}
			this.getView().getModel("ServicesViewModel").refresh();
		},

		onExpandCash: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				this.getView().getModel("ServicesViewModel").setProperty("/Cash_CheckBoxSeleted", true);
				// Set amount in card as default
				var Total = this.getView().getModel("ServicesViewModel").getProperty("/MyCartTotal");
				this.getView().getModel("ServicesViewModel").setProperty("/CashAmount", Total);
			} else {
				
				this.getView().getModel("ServicesViewModel").setProperty("/Cash_CheckBoxSeleted", false);
				// reset amount 
				this.getView().getModel("ServicesViewModel").setProperty("/CardAmount", "0");
			}
		},

		onExpandCard: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				this.getView().getModel("ServicesViewModel").setProperty("/Card_CheckBoxSeleted", true);
			} else {
				this.getView().getModel("ServicesViewModel").setProperty("/Card_CheckBoxSeleted", false);
			}
		},

		onExpandLoyalty: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				this.getView().getModel("ServicesViewModel").setProperty("/Loyalty_CheckBoxSeleted", true);
			} else {
				this.getView().getModel("ServicesViewModel").setProperty("/Loyalty_CheckBoxSeleted", false);
			}
		}, onExpandCoupon: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				this.getView().getModel("ServicesViewModel").setProperty("/Coupon_CheckBoxSeleted", true);
			} else {
				this.getView().getModel("ServicesViewModel").setProperty("/Coupon_CheckBoxSeleted", false);
			}
		},

		onPress1: function (oEvent) {
			var Profile_PlateNo = this.getView().getModel("oGlobalModel").getProperty("/Profile_PlateNo");
			var Profile_PlateCode = this.getView().getModel("oGlobalModel").getProperty("/Profile_PlateCode");
			if (Profile_PlateCode !== "" && Profile_PlateCode !== "") {
				var ListObject = oEvent.getSource().getBindingContext("ServicesViewModel").getObject();
				var CW_ServicesMaterialF4 = this.getView().getModel("ServicesViewModel").getData().CWMaterial;
				if (ListObject.Highlight === "None") {
					oEvent.getSource().getBindingContext("ServicesViewModel").getObject().Highlight = "Information";
					this.getView().getModel("ServicesViewModel").setProperty("/Price", ListObject.Price);

					oEvent.getSource().removeStyleClass("cl_wgridlist");
					oEvent.getSource().addStyleClass("cl_wgridlistSeleted");

					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_Material", ListObject.Material);
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_MaterialDesc", ListObject.MaterialName);
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_NetAmount", ListObject.Price);
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TaxAmount", ListObject.Tax);
					var vat = parseFloat(ListObject.Price) * 0.05;
					var Total = parseFloat(ListObject.Price) + parseFloat(vat);
					
					this.getView().getModel("ServicesViewModel").setProperty("/Cart_TotalAmount", parseFloat(Total).toFixed(2));

					var object = {
						"Material": ListObject.Material,
						"MaterialName": ListObject.MaterialName,
						"Quantity": ListObject.Quantity,
						"Price": ListObject.Price,
						"Tax": parseFloat(vat).toFixed(2),
						"Total": parseFloat(Total).toFixed(2)
					}
					var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
					MyCartItems.push(object)

					this.getView().getModel("ServicesViewModel").refresh();

					// for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {
					// 	if (CW_ServicesMaterialF4[i].Highlight === "None") {
					// 		CW_ServicesMaterialF4[i].Type = "Inactive";

					// 		// oEvent.getSource().removeStyleClass("Cl_CWMaterialNotSeleted");
					// 		// oEvent.getSource().addStyleClass("Cl_CWMaterialSeleted");
					// 	}
					// }

					var oCount = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
					this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", oCount.length);

				} else {
					oEvent.getSource().getBindingContext("ServicesViewModel").getObject().Highlight = "None";

					oEvent.getSource().removeStyleClass("cl_wgridlistSeleted");
					oEvent.getSource().addStyleClass("cl_wgridlist");

					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_Material", "");
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_MaterialDesc", "");
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TotalAmount", "");
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_NetAmount", "");
					// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TaxAmount", "");

					var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");

					MyCartItems = MyCartItems.filter(function (obj) {
						return obj.Material !== ListObject.Material;
					});

					this.getView().getModel("ServicesViewModel").setProperty("/MyCartItems", MyCartItems);

					this.getView().getModel("ServicesViewModel").refresh();

					// for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {
					// 	if (CW_ServicesMaterialF4[i].Highlight === "None") {
					// 		CW_ServicesMaterialF4[i].Type = "Active";
					// 	}
					// }
				}
				this.getView().getModel("ServicesViewModel").refresh();

				var oCount = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
				this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", oCount.length);

			} else {

				this.onPressSearchCustomer();
				MessageToast.show("Please select the vehicle")

			}
		},

		onDeleteCartItem: function (oEvent) {
			var path = oEvent.getParameter('listItem').getBindingContext("ServicesViewModel").getPath();
			var data = oEvent.getSource().getModel("ServicesViewModel");
			var index = parseInt(path.substring(path.lastIndexOf('/') + 1), 10);

			var sDeletedMaterial = oEvent.getParameter('listItem').getBindingContext("ServicesViewModel").getObject().Material
			sap.m.MessageBox.confirm("Do you want to delete?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						var d = data.getProperty("/MyCartItems");

						d.splice(index, 1);
						data.setProperty("/MyCartItems", d);

						this.getView().getModel("ServicesViewModel").setProperty("/MyCartItemCount", d.length);
						/*After delter form cart unselect the item from material*/
						/*Removing the seleted items*/
						var CWaterialList = this.getView().getModel("ServicesViewModel").getProperty("/CWMaterial");
						for (var a = 0; a < CWaterialList.length; a++) {
							if (sDeletedMaterial === CWaterialList[a].Material) {
								CWaterialList[a].Highlight = "None";
								CWaterialList[a].Type = "Active";
							}
						}
						/*Removing the seleted items from Accessories*/
						var aMaterialList = this.getView().getModel("ServicesViewModel").getProperty("/MaterialList");
						for (var a = 0; a < aMaterialList.length; a++) {
							if (sDeletedMaterial === aMaterialList[a].Material) {
								aMaterialList[a].Highlight = "None";
								aMaterialList[a].Type = "Active";
							}
						}

						/*Re-Totaling Cart Items*/
						var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
						var Total = MyCartItems.reduce((acc, obj) => parseFloat(acc) + parseFloat(obj.Total), 0);
						this.getView().getModel("ServicesViewModel").setProperty("/MyCartTotal", Total.toFixed(2));

						this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", MyCartItems.length);
						this.getView().getModel("ServicesViewModel").refresh();

					} else if (oAction === "NO") { }
				}.bind(this)
			});
		},

		onResetCarwash: function () {

			// this._ModelInitialLoad();

			/*Removing the seleted items*/
			var CWaterialList = this.getView().getModel("ServicesViewModel").getProperty("/CWMaterial");
			for (var a = 0; a < CWaterialList.length; a++) {
				CWaterialList[a].Highlight = "None";
				CWaterialList[a].Type = "Active";
			}
			this.getView().getModel("ServicesViewModel").setProperty("/CWMaterial", "");
			this.getView().getModel("ServicesViewModel").setProperty("/CWMaterial", CWaterialList);
			this.getView().getModel("ServicesViewModel").refresh();

			this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", '0');

		},

		onResetProduct: function () {
			// this._ModelInitialLoad();
			/*Removing the seleted items*/
			var MaterialList = this.getView().getModel("ServicesViewModel").getProperty("/MaterialList");
			for (var a = 0; a < MaterialList.length; a++) {
				MaterialList[a].Highlight = "None";
				MaterialList[a].Type = "Active";
			}
			this.getView().getModel("ServicesViewModel").setProperty("/MaterialList", "");
			this.getView().getModel("ServicesViewModel").setProperty("/MaterialList", MaterialList);
			this.getView().getModel("ServicesViewModel").refresh();
			this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", '0');

		},

		onPress2: function (oEvent) {
			var ListObject = oEvent.getSource().getBindingContext("ServicesViewModel").getObject();
			var CW_ServicesMaterialF4 = this.getView().getModel("ServicesViewModel").getData().LPGMaterial;
			if (ListObject.Highlight === "None") {
				oEvent.getSource().getBindingContext("ServicesViewModel").getObject().Highlight = "Information";
				this.getView().getModel("ServicesViewModel").setProperty("/Price", ListObject.Price);

				oEvent.getSource().removeStyleClass("cl_wgridlist");
				oEvent.getSource().addStyleClass("cl_wgridlistSeleted");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[0].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[0].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[1].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[1].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[1].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[1].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[2].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[2].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[1].getItems()[0].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[1].getItems()[0].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[1].getItems()[1].getItems()[0].removeStyleClass("cl_blueTXT");
				// oEvent.getSource().getContent()[1].getItems()[1].getItems()[0].addStyleClass("cl_whiteTXT");

				// oEvent.getSource().getContent()[0].getItems()[2].addStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[2].removeStyleClass("cl_blueTXT");

				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_Material", ListObject.Material);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_MaterialDesc", ListObject.MaterialName);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_NetAmount", ListObject.Price);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TaxAmount", ListObject.Tax);
				// var Total = parseFloat(ListObject.Price) + parseFloat(ListObject.Tax);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TotalAmount", parseFloat(Total).toFixed(2));

				var Total = parseFloat(ListObject.Price) + parseFloat(ListObject.Tax);
				this.getView().getModel("ServicesViewModel").setProperty("/Cart_TotalAmount", parseFloat(Total).toFixed(2));

				var object = {
					"Material": ListObject.Material,
					"MaterialName": ListObject.MaterialName,
					"Price": ListObject.Price,
					"Tax": ListObject.Tax,
					"Total": parseFloat(Total).toFixed(2)
				}
				var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
				MyCartItems.push(object)

				this.getView().getModel("ServicesViewModel").refresh();

				for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {
					if (CW_ServicesMaterialF4[i].Highlight === "None") {
						CW_ServicesMaterialF4[i].Type = "Inactive";
					}
				}
			} else {
				oEvent.getSource().getBindingContext("ServicesViewModel").getObject().Highlight = "None";

				oEvent.getSource().removeStyleClass("cl_wgridlistSeleted");
				oEvent.getSource().addStyleClass("cl_wgridlist");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[0].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[0].addStyleClass("cl_blueTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[1].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[0].getItems()[1].addStyleClass("cl_blueTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[1].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].getItems()[1].addStyleClass("cl_blueTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[1].addStyleClass("cl_blueTXT");

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[2].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[2].addStyleClass("cl_blueTXT");

				// oEvent.getSource().getContent()[1].getItems()[0].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[1].getItems()[0].addStyleClass("cl_blueTXT");

				// oEvent.getSource().getContent()[1].getItems()[1].getItems()[0].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[1].getItems()[1].getItems()[0].addStyleClass("cl_blueTXT");

				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_Material", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_MaterialDesc", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TotalAmount", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_NetAmount", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TaxAmount", "");

				var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
				MyCartItems = MyCartItems.filter(function (obj) {
					return obj.Material !== ListObject.Material;
				});

				this.getView().getModel("ServicesViewModel").setProperty("/MyCartItems", MyCartItems);
				this.getView().getModel("ServicesViewModel").refresh();

				for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {
					if (CW_ServicesMaterialF4[i].Highlight === "None") {
						CW_ServicesMaterialF4[i].Type = "Active";
					}
				}
			}
			this.getView().getModel("ServicesViewModel").refresh();
		},

		onPressCancelCW: function () {
			// this._ModelInitialLoad();

			/*Removing the seleted items*/
			var CWaterialList = this.getView().getModel("ServicesViewModel").getProperty("/CWMaterial");
			for (var a = 0; a < CWaterialList.length; a++) {
				CWaterialList[a].Highlight = "None";
				CWaterialList[a].Type = "Active";
			}
			this.getView().getModel("ServicesViewModel").setProperty("/CWMaterial", "");
			this.getView().getModel("ServicesViewModel").setProperty("/CWMaterial", CWaterialList);
			this.getView().getModel("ServicesViewModel").refresh();
		},

		onPressCancelGas: function () {
			// this._ModelInitialLoad();

			/*Removing the seleted items*/
			var aLPGMaterialList = this.getView().getModel("ServicesViewModel").getProperty("/LPGMaterial");
			for (var a = 0; a < aLPGMaterialList.length; a++) {
				aLPGMaterialList[a].Highlight = "None";
				aLPGMaterialList[a].Type = "Active";
			}
			this.getView().getModel("ServicesViewModel").setProperty("/LPGMaterial", "");
			this.getView().getModel("ServicesViewModel").setProperty("/LPGMaterial", aLPGMaterialList);
			this.getView().getModel("ServicesViewModel").refresh();
		},

		onPressCheckCard: function () {
			if (!this.RewardCheck) {
				this.RewardCheck = sap.ui.xmlfragment("viapp.fragment.RewardCheck", this); // Fragments for Process select
				this.getView().addDependent(this.RewardCheck);
			}
			this.RewardCheck.open();
		},
		onPressCloseCheckCard: function () {

			this.RewardCheck.close();
		},

		onCloseCart: function () {

			sap.m.MessageBox.confirm(
				"Are you sure want to close?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						this.AddToCart.close();
						this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", true);
						// this.getView().getModel("ServicesViewModel").setProperty("/IdenifymButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", false);
						this.getView().getModel("ServicesViewModel").refresh();
					} else if (oAction === "NO") { }
				}.bind(this)
			});
		},

		onScanSuccess: function (oEvent) {
			if (oEvent.getParameter("cancelled")) {
				MessageToast.show("Scan cancelled", {
					duration: 1000
				});
			} else {
				if (oEvent.getParameter("text")) {
					// sap.m.MessageToast.show(oEvent.getParameter("text"));
					this.getView().getModel("ServicesViewModel").setProperty("/Loyalty_ScanedID", oEvent.getParameter("text"));
				}
			}
		},

		onScanError: function (oEvent) {
			MessageToast.show("Scan failed: " + oEvent, {
				duration: 1000
			});
		},

		onScanLiveupdate: function (oEvent) {
			// User can implement the validation about inputting value
		},

		/*LPG*/
		onPressLPGCart: function () {

			var Cart_Material = this.getView().getModel("ServicesViewModel").getProperty("/Cart_Material");
			if (Cart_Material) {
				if (!this.AddToCartLPG) {
					this.AddToCartLPG = sap.ui.xmlfragment("viapp.fragment.AddToCartLPG", this);
					this.getView().addDependent(this.AddToCartLPG);
				}
				this.AddToCartLPG.open();
				this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", true);
				// this.getView().getModel("ServicesViewModel").setProperty("/IdenifymButtomVisible", false);
				this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", false);
				this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", false);
				this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", false);
				this.getView().getModel("ServicesViewModel").refresh();
			} else {
				sap.m.MessageToast.show("Please Select Material");
			}

		},

		onCloseLPGCart: function () {

			sap.m.MessageBox.confirm(
				"Are you sure want to close?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						this.AddToCartLPG.close();
						this.getView().getModel("ServicesViewModel").setProperty("/ProceedSOButtomVisible", true);
						// this.getView().getModel("ServicesViewModel").setProperty("/IdenifymButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/IdentifyVisible", false);
						this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", false);
						this.getView().getModel("ServicesViewModel").refresh();
					} else if (oAction === "NO") { }
				}.bind(this)
			});
		},



		onPressNav1: function () {

			// JSONObject TxnData = new JSONObject();
			// TxnData.put("TXN_TYPE", "01");
			// TxnData.put("AMOUNT", "5");
			// TxnData.put("ADNOC_INVOICE", "123456");

			// Intent INPUT_DATA = new intent("com.marsdata.fabpos.Mars.Splash_Screen");
			// INPUT_DATA.putExtra("AdnocReqData", "5");
			// clientListactivity.startActivityFor(INPUT_DATA 1);

			var url = "intent://open?Intent;scheme=https;package=com.marsdata.fabpos.Mars.Splash_Screen;end;";
			window.location.href(url);

		},

		onPressNav2: function () {
			window.location.href = "intent://your_path_pattern?param_key=value#Intent;scheme=your_scheme;package=com.your.package.name;end;";

			// var url = "intent://open?AMOUNT=5#Intent;scheme=com.marsdata.fabpos;package=com.marsdata.fabpos.Mars.Splash_Screen;end;";
			// window.location.href(url);

			var url = "intent://Mars.Splash_Screen?AMOUNT=10#Intent;scheme=https;package=Mars.Splash_Screen;end;";
			window.location.href(url);
		},

		onGopress: function () {
			var SearchList = [{
				"BP": "6000000175",
				"BPType": "",
				"Name": "Mohamed Hafiz",
				"Mobile": "+919843647118",
				"Email": "mohamed123@gmail.com",
				"PlateNo": "20621",
				"PlateCode": "A",
				"PlateCat": "Private",
				"Emirates": "Dubai",
				"Manufacturer": "BMW",
				"Model": "BMW",
				"CarType": "SEDAN",
				"VinNo": "5871427853458734",
				"Highlight": "None",
				"Type": "Active"
			}];
			this.getView().getModel("SearchViewModel").getData().SearchList = SearchList;
			this.getView().getModel("SearchViewModel").refresh();
		},

		onSelectCustomer: function (oEvent) {
			var oSeletedValue = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			var aSearchList = this.getView().getModel("SearchViewModel").getData().SearchList;
			var oGlobalModel = this.getView().getModel("oGlobalModel");

			if (oSeletedValue.Highlight === "None") {
				setTimeout(function () {
					MessageToast.show("Seleted");
				}, 100);

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "Information";
				oGlobalModel.getData().Profile_BPNo = oSeletedValue.BP;
				oGlobalModel.getData().Profile_BPType = oSeletedValue.BPType;
				oGlobalModel.getData().Profile_Name = oSeletedValue.Name;
				oGlobalModel.getData().Profile_Mobile = oSeletedValue.Mobile;
				oGlobalModel.getData().Profile_Email = oSeletedValue.Email;
				oGlobalModel.getData().Profile_PlateNo = oSeletedValue.PlateNo;
				oGlobalModel.getData().Profile_PlateCode = oSeletedValue.PlateCode;
				oGlobalModel.getData().Profile_Emirates = oSeletedValue.Emirates;
				oGlobalModel.getData().Profile_Model = oSeletedValue.Model;
				oGlobalModel.getData().Profile_CarType = oSeletedValue.CarType;
				oGlobalModel.getData().Profile_VINNo = oSeletedValue.VinNo;
				this.getView().getModel("SearchViewModel").refresh();
				oGlobalModel.refresh();

				for (var i = 0; i < aSearchList.length; i++) {
					if (aSearchList[i].Highlight === "None") {
						aSearchList[i].Type = "Inactive";
						oEvent.getSource().removeStyleClass("Cl_SearchCustomerBox");
						oEvent.getSource().addStyleClass("Cl_SearchCustomerBoxNotSeleted");
					}
				}

				this.SearchVehicle.close();
			} else {
				setTimeout(function () {
					MessageToast.show("Un-Seleted");
				}, 100);
				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "None";

				for (var i = 0; i < aSearchList.length; i++) {
					if (aSearchList[i].Highlight === "None") {
						aSearchList[i].Type = "Active";
						oEvent.getSource().removeStyleClass("Cl_SearchCustomerBoxNotSeleted");
						oEvent.getSource().removeStyleClass("Cl_SearchCustomerBox");
						oEvent.getSource().addStyleClass("Cl_SearchCustomerBoxSeleted");
					}
				}

			}
			this.getView().getModel("SearchViewModel").refresh();
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

		onPressCreateCustomer: function () {

			this.SearchVehicle.close();

			// this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// this._oRouter.navTo("Home", true);

			if (!this.Create) {
				this.Create = sap.ui.xmlfragment("viapp.fragment.CreateCustomer", this); // Fragments for Process select
				this.getView().addDependent(this.Create);
			}
			this.Create.open();
		},

		onCancelCreateCustomer: function () {
			this.Create.close();
		},

		/*Create Customer Code Start*/
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
					if (oModel.CC_FirstName === "") {
						oModel.CC_FirstName_ValueState = "Error";
						this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState", "Error");
					}
					if (oModel.CC_MobileNo === "") {
						oModel.CC_MobileNo_ValueState = "Error";
						this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState", "Error");
					}
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

		/*Add on Materials code start*/
		onPressAddonMaterial: function () {

			if (!this.MaterialF4) {
				this.MaterialF4 = sap.ui.xmlfragment("viapp.fragment.MaterialF4", this); // Fragments for Process select
				this.getView().addDependent(this.MaterialF4);
			}
			this.MaterialF4.open();
		},

		onSelectMaterial: function (oEvent) {

			var ListObject = oEvent.getSource().getBindingContext("ServicesViewModel").getObject();
			var CW_ServicesMaterialF4 = this.getView().getModel("ServicesViewModel").getData().MaterialList;
			if (ListObject.Highlight === "None") {
				oEvent.getSource().getBindingContext("ServicesViewModel").getObject().Highlight = "Information";


				oEvent.getSource().removeStyleClass("cl_wgridlist");
				oEvent.getSource().addStyleClass("cl_wgridlistSeleted");

				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_Material", ListObject.Material);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_MaterialDesc", ListObject.MaterialName);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_NetAmount", ListObject.NetPrice);
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TaxAmount", ListObject.TaxPrice);

				// var Total = parseFloat(ListObject.NETPRICE) + parseFloat(ListObject.TaxPrice);
				var object = {
					"Material": ListObject.MATERIAL,
					"MaterialName": ListObject.MATDESC,
					"Price": ListObject.NETPRICE,
					"Tax": ListObject.TaxPrice,
					"Total": ListObject.Total,
					"Quantity": ListObject.Quantity
				}
				var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
				MyCartItems.push(object);

				this.getView().getModel("ServicesViewModel").refresh();

				var oCount = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
				this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", oCount.length);

				// for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {
				// 	if (CW_ServicesMaterialF4[i].Highlight === "None") {
				// 		CW_ServicesMaterialF4[i].Type = "Inactive";

				// 		// oEvent.getSource().removeStyleClass("Cl_CWMaterialNotSeleted");
				// 		// oEvent.getSource().addStyleClass("Cl_CWMaterialSeleted");
				// 	}
				// }

			} else {
				oEvent.getSource().getBindingContext("ServicesViewModel").getObject().Highlight = "None";

				oEvent.getSource().removeStyleClass("cl_wgridlistSeleted");
				oEvent.getSource().addStyleClass("cl_wgridlist");

				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_Material", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_MaterialDesc", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TotalAmount", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_NetAmount", "");
				// this.getView().getModel("ServicesViewModel").setProperty("/Cart_TaxAmount", "");

				var MyCartItems = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");

				MyCartItems = MyCartItems.filter(function (obj) {
					return obj.Material !== ListObject.MATERIAL;
				});

				this.getView().getModel("ServicesViewModel").setProperty("/MyCartItems", MyCartItems);

				this.getView().getModel("ServicesViewModel").refresh();

				var oCount = this.getView().getModel("ServicesViewModel").getProperty("/MyCartItems");
				this.getView().getModel("ServicesViewModel").setProperty("/MyCartCount", oCount.length);

				// for (var i = 0; i < CW_ServicesMaterialF4.length; i++) {
				// 	if (CW_ServicesMaterialF4[i].Highlight === "None") {
				// 		CW_ServicesMaterialF4[i].Type = "Active";
				// 	}
				// }
			}
			this.getView().getModel("ServicesViewModel").refresh();

		},

		onCloseMaterialF4: function () {
			this.MaterialF4.close();
		},
		getMaterialF4: function () {
			this.getView().getModel("CarwashService").read("/Material_V", {
				success: function (oData, oResp) {
					// BusyIndicator.hide();
					var materialarr = [];
					for (var i = 0; i < oData.results.length; i++) {
						var matnr = oData.results[i].MATERIAL;
						matnr = matnr.replaceAll("0", "");
						var vat = parseFloat(oData.results[i].NETPRICE) * 0.05;
						var total = vat + parseFloat(oData.results[i].NETPRICE);
						var obj = {
							"MATERIAL": matnr,
							"MATTYPE": oData.results[i].MATTYPE,
							"UOM": oData.results[i].UOM,
							"PLANT": oData.results[i].PLANT,
							"MATDESC": oData.results[i].MATDESC,
							"CONDREC": oData.results[i].CONDREC,
							"NETPRICE": oData.results[i].NETPRICE,
							"CURRENCY": oData.results[i].CURRENCY,
							"Highlight": "None",
							"TaxPrice": parseFloat(vat).toFixed(2),
							"Quantity": "1",
							"Total": parseFloat(total).toFixed(2),
						};

						materialarr.push(obj);
					}
					this.getView().getModel("ServicesViewModel").setProperty("/MaterialList", materialarr);

				}.bind(this),
				error: function (oError) {
					// BusyIndicator.hide();
					MessageBox.error(oError.message);
				}
			});
		},
		onPresspayment: function () {
			var sono = this.getView().getModel("ServicesViewModel").getProperty("/SO_Number");
			var soid = this.getView().getModel("ServicesViewModel").getProperty("/SO_id");
			var soamount = this.getView().getModel("ServicesViewModel").getProperty("/MyCartTotal");
			var cashselected = this.getView().getModel("ServicesViewModel").getProperty("/Cash_CheckBoxSeleted");
			var cardselected = this.getView().getModel("ServicesViewModel").getProperty("/Card_CheckBoxSeleted");
			var couponselected = this.getView().getModel("ServicesViewModel").getProperty("/Coupon_CheckBoxSeleted");
			var loyaltyselected = this.getView().getModel("ServicesViewModel").getProperty("/Loyalty_CheckBoxSeleted");
			var cashamount = this.getView().getModel("ServicesViewModel").getProperty("/Cashamount");
			var cardamount = this.getView().getModel("ServicesViewModel").getProperty("/CardAmount");
			var couponamount = this.getView().getModel("ServicesViewModel").getProperty("/CouponAmount");
			var loyaltyamount = this.getView().getModel("ServicesViewModel").getProperty("/Loyaltyamount");
			var Couponref = this.getView().getModel("ServicesViewModel").getProperty("/CouponNumber");
			var loyaltyref = this.getView().getModel("ServicesViewModel").getProperty("/LoyaltyRef");
			var cardAuthcode = this.getView().getModel("ServicesViewModel").getProperty("/Authcode");
			var moparr = [];
			var count = 0;
			var cardflag = "";
			var currdate = new Date();
			var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyyMMdd"
			});
			currdate = DateFormat.format(currdate);
			var plant = this.getView().getModel("oGlobalModel").getProperty("/MainPlant");
			var cc = "9300";
			var SO = sono.toString();
			var invoice = currdate + plant + cc + SO.slice(6);
			if (cashselected === true && parseFloat(cashamount) > 0) {
				count = count + 1;
				var obj = {
					"MOP_COUNTER": count.toString(),
					"MOP_TYPE": "CASH",
					"AMOUNT": cashamount,
					"CURRENCY": "AED"
				};
				moparr.push(obj);
			}
			if (cardselected === true && parseFloat(cardamount) > 0) {
				cardflag = "X";
				count = count + 1;
				var obj = {
					"MOP_COUNTER": count.toString(),
					"MOP_TYPE": "CARD",
					"AMOUNT": cardamount,
					"CURRENCY": "AED",
					"AUTH_CODE": cardAuthcode
				};
				moparr.push(obj);
			}

			// else if (cashselected === true && loyaltyselected === true) {
			// 	var count = 2;
			// 	var obj = [{
			// 		"MOP_COUNTER": "1",
			// 		"MOP_TYPE": "CASH",
			// 		"AMOUNT": cashamount,
			// 		"CURRENCY": "AED"
			// 	}, {
			// 		"MOP_COUNTER": "2",
			// 		"MOP_TYPE": "LOYALTY",
			// 		"AMOUNT": loyaltyamount,
			// 		"CURRENCY": "AED",
			// 		"AUTH_CODE": loyaltyref

			// 	}];
			// 	moparr = obj;

			// }
			if (loyaltyselected === true && parseFloat(loyaltyamount) > 0) {
				count = count + 1;
				var obj = {
					"MOP_COUNTER": count.toString(),
					"MOP_TYPE": "LOYALTY",
					"AMOUNT": loyaltyamount,
					"CURRENCY": "AED",
					"AUTH_CODE": loyaltyref

				};
				moparr.push(obj);
			}

			if (couponselected === true && parseFloat(couponamount) > 0) {
				count = count + 1;
				var obj = {
					"MOP_COUNTER": count.toString(),
					"MOP_TYPE": "COUPON",
					"AMOUNT": couponamount,
					"CURRENCY": "AED",
					"AUTH_CODE": Couponref

				};
				moparr.push(obj);
			}

			var Total = parseFloat(cashamount) + parseFloat(cardamount) + parseFloat(loyaltyamount) + parseFloat(couponamount);
			var Balance = parseFloat(soamount) - parseFloat(Total);
			if (parseFloat(soamount) === parseFloat(Total)) {

				var payload = {
					"ORDER_KEY_ID": soid,
					"ORDERNUM": sono.toString(),
					"AMOUNT": soamount,
					"CURRENCY": "AED",
					"INVOICE": invoice,
					"ITEMS": moparr
				};

				BusyIndicator.show();
				this.getView().getModel("CarwashService").create("/Payment", payload, {
					success: function (oData, oResponse) {
						BusyIndicator.hide();
						if (oData.ID) {

							if (cardflag) {
								sap.m.MessageBox.confirm(
									oData.ORDERNUM + " data Saved Successfully" + "\n" + "Card Amount " + cardamount + " AED detected" + "\n" + "Are you sure want to pay by card?", {
									icon: sap.m.MessageBox.Icon.CONFIRM,
									title: "Confirmation",
									actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
									onClose: function (oAction) {
										if (oAction === "YES") {
											this.onPressNavtoPaymentapp();
										} else if (oAction === "NO") { }
									}.bind(this)
								});
							} else {
								sap.m.MessageToast.show(oData.ORDERNUM + " data Saved Successfully");
								this.getView().getModel("ServicesViewModel").setProperty("/MOPVisible", false);
								this.ongetSOdetails();
								// Added by MH 26-11-24
									if(cardselected === false){
										MessageBox.success(oData.ORDERNUM + " Data Saved Successfully", {
											icon: sap.m.MessageBox.Icon.SUCCESS,
											title: "Success",
											actions: ["Print", sap.m.MessageBox.Action.CANCEL],
											onClose: function (oAction) {
												if (oAction === "Print") {
													this.onnewprint();
												} else if (oAction === "CANCEL") { 
													this._ModelInitialLoad();
													this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
													this._oRouter.navTo("Home", true);

												}
											}.bind(this)
										});
									}
							}
						}
					}.bind(this),
					error: function (oError) {
						BusyIndicator.hide();
						MessageBox.error(oError.message);
					}.bind(this)
				});
			} else {
				sap.m.MessageToast.show("Total amount does not match with Sales order amount.");
			}
			//  else {

			// 	count = count + 1;
			// 	moparr.push({
			// 		"MOP_COUNTER": count.toString(),
			// 		"MOP_TYPE": "CARD",
			// 		"AMOUNT": Balance.toString(),
			// 		"CURRENCY": "AED",
			// 		"AUTH_CODE": ""

			// 	});
			// 	var payload = {
			// 		"ORDER_KEY_ID": soid,
			// 		"ORDERNUM": sono.toString(),
			// 		"AMOUNT": soamount,
			// 		"CURRENCY": "AED",
			// 		"ITEMS": moparr
			// 	};

			// 	BusyIndicator.show();
			// 	this.getView().getModel("CarwashService").create("/Payment", payload, {
			// 		success: function (oData, oResponse) {
			// 			BusyIndicator.hide();
			// 			if (oData.ID) {
			// 				sap.m.MessageBox.confirm(
			// 					oData.ORDERNUM + " data Saved Successfully" + "\n" + "Balance Amount " + Balance + " AED detected" + "\n" + "Are you sure want to pay by card?", {
			// 					icon: sap.m.MessageBox.Icon.CONFIRM,
			// 					title: "Confirmation",
			// 					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			// 					onClose: function (oAction) {
			// 						if (oAction === "YES") {
			// 							this.onPressNavtoPaymentapp();
			// 						} else if (oAction === "NO") { }
			// 					}.bind(this)
			// 				});
			// 			}
			// 		}.bind(this),
			// 		error: function (oError) {
			// 			BusyIndicator.hide();
			// 			MessageBox.error(oError.message);
			// 		}.bind(this)
			// 	});

			// }
		},

		onPressNavtoPaymentapp: function () {

			sap.m.MessageToast.show("Navigating to payment app");
			var sono = this.getView().getModel("ServicesViewModel").getProperty("/SO_Number");
			var soamount = this.getView().getModel("ServicesViewModel").getProperty("/MyCartTotal");

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
			sono = sono.toString();
			// JSON object with data
			var jsonData = {
				txnType: "SALE",
				txnAmount: soamount,
				txnMode: "card",
				txnID: sono,
				txnInvoice: sono.slice(4)
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
			var so = this.getView().getModel("ServicesViewModel").getProperty("/SO_Number");
			var vAuthcode = "";
			this.getView().getModel("CarwashService").read("/OrderRead", {
				filters: [
					new Filter("ORDERNUM", FilterOperator.EQ, so)
				],
				urlParameters: {
					$expand: "ITEMS"
				},
				success: function (oData, oResponse) {
					var obj = "";
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
					// this.getView().getModel("oGlobalModel").setProperty("/TOTALPRICE", parseFloat(Total).toFixed(2));
					// this.getView().getModel("oGlobalModel").setProperty("/Vat", vat);
					this.getView().getModel("oGlobalModel").setProperty("/SOnumber", oData.results[0].ORDERNUM.toString());
					if (itemsarr.length !== 0) {
						var plant = itemsarr[0].PLANT;
						this.getView().getModel("oGlobalModel").setProperty("/MainPlant", plant);
					}

					this.ongetMOPDetails();

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
					}
				}.bind(this),
				error: function (oError) {
					// BusyIndicator.hide();
					MessageBox.error(oError.message);
				}.bind(this)
			});


		},

		ongetMOPDetails: function () {
			var so = this.getView().getModel("oGlobalModel").getProperty("/SOnumber");
			// var vAuthcode = this.getView().getModel("oGlobalModel").getProperty("/Authcode");
			this.getView().getModel("CarwashService").read("/Payment", {
				filters: [
					new Filter("ORDERNUM", FilterOperator.EQ, so)
				],
				urlParameters: {
					$expand: "ITEMS"
				},
				success: function (oData, oResponse) {
					if (oData.results[0].length !== 0) {
						var MopARR = oData.results[0].ITEMS.results;
						this.getView().getModel("oGlobalModel").setProperty("/MOPItems", MopARR);
						this.getView().getModel("ServicesViewModel").setProperty("/Printvisible", true);
						this.getView().getModel("ServicesViewModel").setProperty("/PaymentButtomVisible", false);
					}

				}.bind(this),
				error: function (oError) {
					// BusyIndicator.hide();
					MessageBox.error(oError.message);
				}.bind(this)
			});
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
			// const total = newarray.reduce((sum, item) => sum + item.Total, 0);
			var sum = newarray.map(o => o.Total).reduce((a, c) => {
				return parseFloat(a) + parseFloat(c)
			});
			var TotalAmount = parseFloat(sum).toFixed(2);
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

        .invoice-container {
		    size: 58mm auto; 
            width: 310px;  /* Set width suitable for receipt printers */
            margin: auto;
            background: #fff;
            padding: 10px;
            // border: 1px solid #ddd;
        }

        .invoice-header {
            text-align: center;
            border-bottom: 1px dashed #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }

        .invoice-header img {
            max-width: auto;
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
            margin: 2px 0;
            font-size: 18px;
        }

        .invoice-items {
            width: 100%;
            // border-collapse: collapse;
            margin-bottom: 10px;
        }

        .invoice-items th, .invoice-items td {
            text-align: left;
            font-size: 16px;
            padding: 0;
        }

        .invoice-items th {
            background: #f4f4f4;
            border-bottom: 2px solid #ddd;
        }

        .invoice-items td {
            border-bottom: 2px dashed #ddd;
        }

        .invoice-totals {
            text-align: right;
            font-size: 20px;
            border-bottom: 2px dashed #ddd;
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
		
		.invoice-items tr {
             border-bottom: 1.5px dashed #ddd;
        }
		
		.MOP-items tr {
            width: 100%;
            // border-collapse: collapse;
            margin-bottom: 5px;
			font-size: 16px;
        }
		
		.List {
			font-size: 16px;
		}
			table {
            width: 100%;
           
        }
       
        .left {
            text-align: left;
			style="font-size: 16px"
        }
        .right {
            text-align: right;
			style="font-size: 16px"
        }
		.custom-img {
			content: url('Carwash/app/viapp/webapp/image/NewLogo.png');
		}

    </style>
   
</head>
<body>
    <div class="invoice-container">
        <!-- Invoice Header -->
        <div class="invoice-header">
		
            <img id="myImage" src="../image/CarwashIcon.PNG" alt="ADNOC Distribution" width="70" class="custom-img" />
             <p>SALES RECEPIT</p>
             <p>TRN: 100069993200003</p>
			 <br>
            <P>ADNOC Distribution</p>
            <p>P.O Box 4188, Abu Dhabi UAE</p>
            <p>Site: ${plant}</p>
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
                                    <tr style="border-bottom: 1.5px dashed #ddd;">
                                        <td>${item.Name}</td>
                                        <td>${item.Qty}</td>
                                        <td>${item.Price}</td>
                                         <td>${item.Total}</td>
                                    </tr>
                                `
					)
					.join("")}
                            <tr>
                                <td colspan="3"><b>Total Amount</b></td>
                                <td><b>${TotalAmount}</b></td>
                            </tr>
							
                        </tbody>
                    </table>
					<div class="invoice-details">
					 <table>
						<tr>
							<td class="left" style="font-size: 14px">Payment Mode</td>
							<td class="right"></td>
						</tr>
						${MopItems
							.map(item => `<tr>
									<td class="left" style="font-size: 14px">${item.MOP_TYPE}</td>
									 <td class="right" style="font-size: 14px">${item.AMOUNT}</td>
								</tr>
							`
							)
							.join("")}
					</table>
			
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
			<div class="invoice-details" >
                <p>Date: ${currdate} ${currtime}</p>
                <p>Transcation No: ${SOnum}</p>
                <p>Invoice No: ${invno}</p>
                <p>RRN: 432611326923</p>
				<p>Plate No/Code: ${PlateNo}/${PlateCode}</p>
				<p>Emirates: ${Source}</p>
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

			this._ModelInitialLoad();
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.navTo("Home", true);



		},

		onnewprintOldBackup: function () {

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
			// const total = newarray.reduce((sum, item) => sum + item.Total, 0);
			var sum = newarray.map(o => o.Total).reduce((a, c) => {
				return parseFloat(a) + parseFloat(c)
			});
			var TotalAmount = parseFloat(sum).toFixed(2);
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

        .invoice-container {
		    size: 58mm auto; 
            width: 310px;  /* Set width suitable for receipt printers */
            margin: auto;
            background: #fff;
            padding: 10px;
            // border: 1px solid #ddd;
        }

        .invoice-header {
            text-align: center;
            border-bottom: 1px dashed #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }

        .invoice-header img {
            max-width: auto;
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
            margin: 2px 0;
            font-size: 16px;
        }

        .invoice-items {
            width: 100%;
            // border-collapse: collapse;
            margin-bottom: 10px;
        }

        .invoice-items th, .invoice-items td {
            text-align: left;
            font-size: 16px;
            padding: 0;
        }

        .invoice-items th {
            background: #f4f4f4;
            border-bottom: 2px solid #ddd;
        }

        .invoice-items td {
            border-bottom: 2px dashed #ddd;
        }

        .invoice-totals {
            text-align: right;
            font-size: 20px;
            border-bottom: 2px dashed #ddd;
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
            font-size: 16px;
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
            <img src="{imageModel>/path}/image/NewLogo.png" alt="ADNOC Distribution" width="70"/>
            <!--<h4>ADNOC Distribution</h4>-->
            <!--<P><b>ADNOC Distribution</b></p>-->
            // <p style="font-size: 15px;" >**** Duplicate Copy ****</p>
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
            <!--<li id="subjectList"></li>-->
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
                // <p>Attender Id: 43261</p>
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

			this._ModelInitialLoad();
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.navTo("Home", true);



		},
	});

});