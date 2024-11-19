sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("viapp.controller.Report", {

		onAfterRendering: function() {
			this._ModelInitialLoad();
		},
		_ModelInitialLoad: function() {
			var oData = {

				"ReportRecord": [{
					"SaleOrder": "7000018242",
					"Invoice": "5600018260",
					"Date": "29-04-2024",
					"Amount": "47.00",
					"Status": "Closed",
				}, {
					"SaleOrder": "7000018244",
					"Invoice": "5600018262",
					"Date": "02-05-2024",
					"Amount": "72.00",
					"Status": "Closed",
				}, {
					"SaleOrder": "7000018241",
					"Invoice": "5600018268",
					"Date": "02-05-2024",
					"Amount": "50.00",
					"Status": "Closed",
				}, {
					"SaleOrder": "7000018240",
					"Invoice": "5600018272",
					"Date": "02-05-2024",
					"Amount": "100.00",
					"Status": "Closed",
				}, {
					"SaleOrder": "7000018244",
					"Invoice": "5600018276",
					"Date": "02-05-2024",
					"Amount": "140.00",
					"Status": "Closed",
				}]

			};
			var ReportModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(ReportModel, "ReportModel");
		},
		onPressGoPriceDetails: function() {
			var vHeaderMaterial = this.getView().getModel("PriceModel").getProperty("/HeaderMaterial");
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.EQ, vHeaderMaterial)
			], false);
			filters = (oFilter);
			var listItem = this.getView().byId("id_PriceTable");
			var binding = listItem.getBinding("items");
			binding.filter(filters);
		},
		onPressResetPriceDetails: function() {
			var listItem = this.getView().byId("id_PriceTable");
			var binding = listItem.getBinding("items");
			binding.filter([]);
			this.getView().getModel("PriceModel").setProperty("/HeaderMaterial", "");
		},
		/*Formatter Function*/
		BoldCss: function(value) {
			if (parseFloat(value) > 0) {
				return "bold";
			} else {
				return "normal";
			}
		},

		onSearchF4: function(sValue, aFilters, oBinding) {
			var aFilterArray = [];
			for (var i = 0; i < aFilters.length; i++) {
				aFilterArray.push(new Filter(aFilters[i], FilterOperator.Contains, sValue));
			}
			var oFilter = new Filter(aFilterArray);
			oBinding.filter([oFilter]);
		},

		onSearchMaterial: function(oEvent) {
			// var sValue = oEvent.getSource().getValue();
			// var aFilter = ["Material", "MaterialName"];
			// var Binding = oEvent.getSource().getBinding("items");
			// this.onSearchF4(sValue, aFilter, Binding);

			var SamTbl = oEvent.getParameter("newValue");
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, SamTbl),
				new sap.ui.model.Filter("MaterialName", sap.ui.model.FilterOperator.Contains, SamTbl)
			], false);
			filters = (oFilter);
			var listItem = this.getView().byId("id_PriceTable");
			var binding = listItem.getBinding("items");
			binding.filter(filters);

		},

		onIconSearchMaterial: function(oEvent) {
			var SamTbl = oEvent.getParameter("newValue");
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter([
				new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, SamTbl),
				new sap.ui.model.Filter("MaterialName", sap.ui.model.FilterOperator.Contains, SamTbl)
			], false);
			filters = (oFilter);
			var listItem = this.getView().byId("id_MaterialList");
			var binding = listItem.getBinding("items");
			binding.filter(filters);
		}

	});

});