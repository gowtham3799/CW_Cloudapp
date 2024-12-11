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


			this.convertImageToBase64("./image/ADNOC_Logo.png")
			.then(function (base64Image) {
			  console.log("Base64 String:", base64Image);
			  const dynamicBase64 = base64Image; // Example string
				// Bind the image dynamically
				document.getElementById("dynamicImage").src = dynamicBase64;
			}.bind(this))
			.catch(function (error) {
			  console.error("Error converting image:", error);
			});
			


			

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
		    const sImagePath = "image/NewLogo.png";
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
			// content: url('Carwash/app/viapp/webapp/image/NewLogo.png');
			background-image: url('/image/NewLogo.png'); 
		}

		

    </style>
   
</head>
<body>
    <div class="invoice-container">
        <!-- Invoice Header -->
        <div class="invoice-header">
		
		    <center>
			
				<img src="data:image/png;base64,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" alt="ADNOC Distribution" width="80">
            </center>
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
                   <p style="font-size: 14px;">Thank You </br> Contact Us: 800300 </br> www.adnocdistribution.com </br> v:1.0</p>
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

		convertImageToBase64: function (imagePath) {
			return new Promise(function (resolve, reject) {
			  fetch(imagePath)
				.then(function (response) {
				  if (!response.ok) {
					throw new Error("Network response was not ok");
				  }
				  return response.blob();
				})
				.then(function (blob) {
				  var reader = new FileReader();
				  reader.onloadend = function () {
					resolve(reader.result);
				  };
				  reader.onerror = function (err) {
					reject(err);
				  };
				  reader.readAsDataURL(blob);
				})
				.catch(function (err) {
				  reject(err);
				});
			});
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
                <center><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAADe3t7T09N2dnaPj4+bm5uGhoY7Oztvb2+9vb3AwMDPz8+urq7u7u7m5uYICAj4+PilpaUhISEmJiZbW1tra2uMjIyZmZmhoaFfX18+Pj5+fn5QUFBXV1fy8vK0tLQSEhIzMzMZGRk9PT1HR0c1NTWmaidBAAAGE0lEQVR4nO2d3VbqOhSFlT/5KxVEKG4U9Hh4/0c8FzZr6ulkjYSWIpv5XSZpko+9x+gyWUnv7oQQQghxS8w7DTC37kjljIyaW+25JgI69w0wte5I5ZaM+mS1VjRtYiIdMlYjhl3P8IGMOrRaK+o2MREZnowMZSjDaGR4Mldi+NpP5M0zfCpCsyIrWeRxhm+pE3mNNOyTWpeNZzi0oomVjeMMN6kT6Z/LcBBnOE41HKRORIYyPIoMS2RYIkOHyxgurQiGEyu7tOFi1DvKCO9jZjgxrCgfh6J+6GT7T5zhxpvIoobh6N5h5Rq6PJDuXMOVN5FRDcNeXMfnN3R/6p4MZShDGcpQhr/V8Mnhcb+bVbg6Q+/Jb3Ep4a8wHN85yFCGMpShDKMM/463xWMVaza+m5dcsSFhQjrJq82u2HBMOpGhDGUoQxlev2Gzq/rsfUhyTltd1d+sRkdZYXzXcD4t6Q7uq4y7odo1HHgTwRZRq7trRu79/N9wDSORoQyPIkMZyjAaGZ5syLIvjdnphmfLvnzbDJLYvBDDoihri0VJtrVm2yyULT3Dl9SJIJW3zSzoDytCXBqZMVSDNg1rZH3VQIYnI8MSGdZHhifz9xuSU7LMEO/DTyuzorOdkp1Pu7WZYi+JGM6s3frt+YuX96phwxM5G8QQuBlD14IMZfj7kaEMfz83ZLgkleuLGCJqW1sZ2z+0Sj+62lVTZtj+IekXcWlBpmmVT1bEdu38uLQRQxI2JRuy1USrxP+NdEN3D/jxwoaWWCVDGcpQhldsGLueQkZgM3H7Ze/DOobL4Rcf61n+xQxpLIeycvgnVOb4J1l+hsp3DJFX2H8M/88fZNXC0CaCA7426AyGNsusOpElMwR4ApAFGJBZ5QupNdj9NGQliuH2C/ZuJ76h5S7NSSV+6+dUQ7KayHCTs0DmdiJDGcpQhjI8t+HOal3D5PfhR5yhm0EL9jUMs8m4xIqG64eSTaic/AudAHJMYNgNnU2sGdPvWLMitMIKz3sYfg39rc1yR7rzDQlIr2bJv1aJjCFIwJrdvGuwTKQacWmyIctkBxbmIesLhlhNJJnsYGHNsC8pQxnKUIYyvC5DdioIWCV7H+K9Hfk+dA3ZClesYd9iBEJm4Ygb0zxY5cICEzTbRsU0Y/wQxDC30AfRTaxh5KlyNy5lGbQMd0qAGAI/CzrZEOul7t8WLCdKhjKUoQxleDOGke/DNg0RK8XuPW0Pld0i49CzZkXYVPq293S6oe09gaW/ioHNKtuj8r8VVOM8PiHdkFRGRt7+aqIMZShDGcqwSUM/N/HChlbUgiHWaQrfMOSZ1jIMnVgRyy+N3V1rBDJNthJFDBmruGat4hom53ljh7SFA02RyFCGP5HhJZChDH8yimvmc65zwO8v5ZnfN1zGAsPX5wCZkh0c7mCFy52lu5N1trPcn2QsGEburkWy8Hpr4Tw+M4zcIY0kNvKWoQxlKEMZXoNhZLbJ2Qwbua/NipbhbjaQ4V61olK5wOU1MNzaWI0YNvvF42ReiSHZe2rVMPnrDy6IUN2sLxnKUIYylOFNG+J96GbQNmNY4159u03f33ECdsE+UmHyUDTFIZ+GDZv4NkLyPcI+DRs28X2L5LugZShDGcpQhjdo2PD70O2jVcPw/cP7T7u4jcDvEQ6Psht4SB+Imto1DBzcUd2bkiO//tBqXlvkaqIMZShDGcpQhj8ND/PZceYHZvj0xXuxs3ZWW+1jt38sH7jfX8QwFjIlttbmTsTnSgxJ5N0jj8pQhjKUoQzbM6yxqt+sodtvnffhYtQ7yggJsczQ2vmXya2s3aQKLj0bWBmZCLJKO+OyFb2v7VzfsPRXopAx5DYD7kSQa/V7vtJpWV/sPkaGm8n+G79DKkMZylCGMiyp8cXjy7wPX/uJICEWhlaJUZ/32Rd7HPJ5CM3Y0eCVPYAL3taV0dd7G3Rats8WfkxTAzd+xBlxpkNAXOgGyOlxaQ1cQ//sGgGria5h+t8WNZChDH8iwxIZyjAJd39ha5VbUkvAt4Lc+/pXd3HMOw2AqJFUIkKbxfWGB3KvmXs6TAghhBA3wX8YDt0U5PM9ZwAAAABJRU5ErkJggg==" alt="ADNOC Rewords" width="70">
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