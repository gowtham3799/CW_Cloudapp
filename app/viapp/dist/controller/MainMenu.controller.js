sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/MessageToast","sap/m/MessageBox"],function(e,t,a,o){"use strict";return e.extend("viapp.controller.MainMenu",{onInit:function(){this.onPressBanner();this._oRouter=sap.ui.core.UIComponent.getRouterFor(this);this._oRouter.attachRouteMatched(this.handleRouteMatched,this)},handleRouteMatched:function(e){var t=this.getOwnerComponent().getComponentData().startupParameters;if(t&&t.message){}else{var a=this.getView().getModel("oGlobalModel").getData().MainPlant;if(a===""){this.onPressPlant()}}},onAfterRendering:function(){this.oBundle=this.getView().getModel("i18n").getResourceBundle();this._ModelInitialLoad()},_ModelInitialLoad:function(){var e={SearchList:[]};var t=new sap.ui.model.json.JSONModel(e);this.getView().setModel(t,"SearchViewModel")},onPressmainHome:function(){var e=sap.ushell.Container.getServiceAsync("CrossApplicationNavigation");e.toExternal({target:{shellHash:"#Shell-home"}});var t=sap.ushell.Container.getRenderer("fiori2");t.setHeaderVisibility(true,false)},onPressBanner:function(e){var a=t.getRouterFor(this);a.navTo("Home",false);if(sap.ui.Device.system.phone===true){var o=this.byId("id_CarwashtoolPage");var i=o.getSideExpanded();o.setSideExpanded(!o.getSideExpanded())}},onPressService:function(e){var o=this.getView().getModel("oGlobalModel").getProperty("/MainPlant");if(o){var i=t.getRouterFor(this);i.navTo("Services",false);if(sap.ui.Device.system.phone===true){var r=this.byId("id_CarwashtoolPage");var s=r.getSideExpanded();r.setSideExpanded(!r.getSideExpanded())}}else{a.show("Please Select plant")}},onPressReport:function(e){var o=this.getView().getModel("oGlobalModel").getProperty("/MainPlant");if(o){var i=t.getRouterFor(this);i.navTo("Report",false);if(sap.ui.Device.system.phone===true){var r=this.byId("id_CarwashtoolPage");var s=r.getSideExpanded();r.setSideExpanded(!r.getSideExpanded())}}else{a.show("Please Select plant")}},onSearchPlantF4:function(e){var t=e.getSource()._sSearchFieldValue;var a=new Array;var o=new sap.ui.model.Filter([new sap.ui.model.Filter("Plant",sap.ui.model.FilterOperator.Contains,t),new sap.ui.model.Filter("PlantName",sap.ui.model.FilterOperator.Contains,t)],false);a=o;var i=sap.ui.getCore().byId("id_PlantF4");var r=i.getBinding("items");r.filter(a)},onPressPlant:function(){if(!this.PlantF4){this.PlantF4=sap.ui.xmlfragment("viapp.fragment.PlantF4",this);this.getView().addDependent(this.PlantF4)}this.PlantF4.open();this.getPlantf4()},onPlantConfirm:function(e){var t=e.getParameter("selectedItem").getBindingContext("oGlobalModel").getObject();this.getView().getModel("oGlobalModel").setProperty("/MainPlant",t.WERKS);e.getSource().getBinding("items").filter([]);var a=sap.ui.getCore().byId("id_PlantF4");var o=a.getBinding("items");o.filter([]);this.getView().getModel("oGlobalModel").setProperty("/CW_ProcessVisible",true);this.getView().getModel("oGlobalModel").setProperty("/LPG_ProcessVisible",false);this.onPressSearchCustomer()},onClosePlant:function(){var e=sap.ui.getCore().byId("id_PlantF4");var t=e.getBinding("items");t.filter([])},onSideNavButtonPress:function(){var e=this.byId("id_CarwashtoolPage");var t=e.getSideExpanded();e.setSideExpanded(!e.getSideExpanded())},_setToggleButtonTooltip:function(e){var t=this.byId("sideNavigationToggleButton");if(e){t.setTooltip("Large Size Navigation")}else{t.setTooltip("Small Size Navigation")}},onGopress:function(){var e=this.getView().getModel("oGlobalModel").getProperty("/Chassisno");var t=this.getView().getModel("oGlobalModel").getProperty("/Platecode");if(e&&t){var a=[{BP:"6000000175",BPType:"",Name:"Mohamed Hafiz",Mobile:"+971 508200365",Email:"mohamed123@gmail.com",PlateNo:e,PlateCode:t,PlateCat:"Private",Emirates:"Dubai",Manufacturer:"BMW",Model:"X5",CarType:"SUV",VinNo:"5871427853458734",Highlight:"None",Type:"Active"}];this.getView().getModel("SearchViewModel").getData().SearchList=a;this.getView().getModel("SearchViewModel").refresh()}else{sap.m.MessageToast.show("Please Enter Plate No and Plate Code.")}},onSelectCustomer:function(e){var t=e.getSource().getBindingContext("SearchViewModel").getObject();var o=this.getView().getModel("SearchViewModel").getData().SearchList;var i=this.getView().getModel("oGlobalModel");if(t.Highlight==="None"){setTimeout(function(){a.show("Seleted")},100);e.getSource().getBindingContext("SearchViewModel").getObject().Highlight="Information";i.getData().Profile_BPNo=t.BP;i.getData().Profile_BPType=t.BPType;i.getData().Profile_Name=t.Name;i.getData().Profile_Mobile=t.Mobile;i.getData().Profile_Email=t.Email;i.getData().Profile_PlateNo=t.PlateNo;i.getData().Profile_PlateCode=t.PlateCode;i.getData().Profile_Emirates=t.Emirates;i.getData().Profile_Model=t.Model;i.getData().Profile_CarType=t.CarType;i.getData().Profile_VINNo=t.VinNo;this.getView().getModel("SearchViewModel").refresh();i.refresh();for(var r=0;r<o.length;r++){if(o[r].Highlight==="None"){o[r].Type="Inactive";e.getSource().removeStyleClass("Cl_SearchCustomerBox");e.getSource().addStyleClass("Cl_SearchCustomerBoxNotSeleted")}}this.onPressCloseSearch();this._oRouter=sap.ui.core.UIComponent.getRouterFor(this);this._oRouter.navTo("Services",true);this.onPressCloseSearch()}else{setTimeout(function(){a.show("Un-Seleted")},100);e.getSource().getBindingContext("SearchViewModel").getObject().Highlight="None";for(var r=0;r<o.length;r++){if(o[r].Highlight==="None"){o[r].Type="Active";e.getSource().removeStyleClass("Cl_SearchCustomerBoxNotSeleted");e.getSource().removeStyleClass("Cl_SearchCustomerBox");e.getSource().addStyleClass("Cl_SearchCustomerBoxSeleted")}}}this.getView().getModel("SearchViewModel").refresh()},onPressSearchCustomer:function(e){var t=this.getView().getModel("oGlobalModel");if(!this.SearchVehicleFrag){this.SearchVehicleFrag=sap.ui.xmlfragment("viapp.fragment.SearchVehicle",this);this.getView().addDependent(this.SearchVehicleFrag)}this.SearchVehicleFrag.open()},onPressCreateCustomer:function(){this.SearchVehicleFrag.close();if(!this.Create){this.Create=sap.ui.xmlfragment("viapp.fragment.CreateCustomer",this);this.getView().addDependent(this.Create)}this.Create.open()},onCancelCreateCustomer:function(){this.Create.close()},onPressCloseSearch:function(){this.SearchVehicleFrag.close()},getPlantf4:function(){this.getView().getModel("CarwashService").read("/Plant",{success:function(e,t){this.getView().getModel("oGlobalModel").setProperty("/PlantF4Nav",e.results)}.bind(this),error:function(e){o.error(e.message)}})}})});
//# sourceMappingURL=MainMenu.controller.js.map