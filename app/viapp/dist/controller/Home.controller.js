sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/MessageToast","sap/m/MessageBox","viapp/model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a,o,r,i,s){"use strict";return e.extend("viapp.controller.Home",{formatter:r,onInit:function(){this._oRouter=sap.ui.core.UIComponent.getRouterFor(this);this._oRouter.attachRouteMatched(this.handleRouteMatched,this)},handleRouteMatched:function(e){if(e.getParameter("name")==="Home"){var o=this.getOwnerComponent().getComponentData().startupParameters;if(o&&o.message){var r=o.message;var i=atob(r);var s=JSON.parse(i);var n=this.getView().getModel("oGlobalModel").getData();n.Object=s;n.Saleorder=s.txnID;n.Authcode=s.responseData.APPROVAL_CODE;n.TransactionMessage=s.responseMsg;if(n.Saleorder){this.ongetSOdetails(n.Saleorder)}var l=window.location.href;var u=new URL(l);var C=new URLSearchParams(u.search);var d=new URLSearchParams(u.href);var c=` ${C}`;var M=` ${d}`;C.delete("message");sap.m.MessageBox.success("Salesorder: "+s.txnID+"\n"+"Authcode: "+s.responseData.APPROVAL_CODE+"\n"+"Card No: "+s.responseData.CARD_NUMBER+"\n"+"Card Name: "+s.responseData.CARD_NAME+"\n"+"Status: "+s.responseMsg,{icon:sap.m.MessageBox.Icon.SUCCESS,title:"Success",actions:[sap.m.MessageBox.Action.OK],onClose:function(e){if(e==="OK"){var a=t.getRouterFor(this);a.navTo("PaymentDetails",false)}}.bind(this)});this.getView().getModel("oGlobalModel").refresh()}else{var g=this.getView().getModel("oGlobalModel").getData().MainPlant;if(g===""){a.show("Please select Plant")}}}},ongetSOdetails:function(e){this.getView().getModel("CarwashService").read("/Order",{filters:[new i("ORDERNUM",s.EQ,e)],urlParameters:{$expand:"ITEMS"},success:function(e,t){var a=e.results[0].ITEMS.results;if(a.length!==0){var o=a[0].PLANT;this.getView().getModel("oGlobalModel").setProperty("/MainPlant",o)}}.bind(this),error:function(e){o.error(e.message)}.bind(this)})},navtopayment:function(){alert("Nav to PaymentDetails");var e=t.getRouterFor(this);e.navTo("PaymentDetails",false)},onAfterRendering:function(){this._ModelInitialLoad()},onPressServices:function(e){var o=this.getView().getModel("oGlobalModel").getProperty("/MainPlant");if(o===""){a.show("Please select the plant")}else{var r=t.getRouterFor(this);r.navTo("Services",false)}},onPressReport:function(){var e=this.getView().getModel("oGlobalModel").getProperty("/MainPlant");if(e===""){a.show("Please select the plant")}else{var o=t.getRouterFor(this);o.navTo("Report",false)}},onClosePlant:function(){var e=this.getView().getModel("oGlobalModel").getProperty("/MainPlant");if(e===""){a.show("Please Select plant")}},onPressCreateCustomer:function(){var e=this.getView().getModel("oGlobalModel").getProperty("/MainPlant");if(e!==""){if(!this.Create){this.Create=sap.ui.xmlfragment("viapp.fragment.CreateCustomer",this);this.getView().addDependent(this.Create)}this.Create.open();var t=this.getView().getModel("HomeViewModel").getProperty("/LPG_Switch");if(t===true){this.getView().getModel("HomeViewModel").setProperty("/CNC_NewCustomer",true);this.getView().getModel("HomeViewModel").setProperty("/CNC_VehicleForm",false);this.getView().getModel("HomeViewModel").setProperty("/CNC_CustomerForm",true)}}},onCancelCreateCustomer:function(){this.Create.close()},onCNCSwitchOn:function(e){var t=this.getView().getModel("HomeViewModel");var a=e.getSource().getState();if(a){t.setProperty("/CNC_NewCustomer",true);this.getView().getModel("HomeViewModel").setProperty("/CNC_VehicleForm",false);this.getView().getModel("HomeViewModel").setProperty("/CNC_CustomerForm",true)}else if(!a){t.setProperty("/CNC_NewCustomer",false);this.getView().getModel("HomeViewModel").setProperty("/CNC_VehicleForm",true);this.getView().getModel("HomeViewModel").setProperty("/CNC_CustomerForm",true)}},_ModelInitialLoad:function(){var e={CNC_NewCustomer:false,CNC_CustomerForm:true,CNC_VehicleForm:true,LPG_Switch:false,BannerImg:"{imageModel>/path}/image/Carwashbanner.png"};var t=new sap.ui.model.json.JSONModel(e);this.getView().setModel(t,"HomeViewModel");var e={CC_FirstName:"",CC_LastName:"",CC_Email:"",CC_MobileNo:"",CC_HouseNo:"",CC_Street:"",CC_City:"",CC_PostalCode:"",CC_Country:"",CC_Remark:"",CC_FirstName_ValueState:"None",CC_MobileNo_ValueState:"None",AddVehicleData:[],CC_AddVehicleSwitch:false,CC_Emirates:"",CC_Category:"",CC_PlateCode:"",CC_PlateNo:"",CC_VINNo:"",CC_Manfacturer:"",CC_Model:"",CC_CarType:"",CC_FuelType:"",CC_Year:"",AddVehicleList:[],EmiratesF4:[{Emirates:"Abu Dhabi"},{Emirates:"Dubai"},{Emirates:"Sharjah"},{Emirates:"Ajman"},{Emirates:"Umm Al Quwain"},{Emirates:"Ras Al Khaimah"},{Emirates:"Fujairah"},{Emirates:"Others"}],PlateCategoryF4:[{Category:"Classic"},{Category:"Export"},{Category:"MotorCycle"},{Category:"Other"},{Category:"Private"},{Category:"Taxi"},{Category:"Police"},{Category:"Trade Plate"}],PlateCodeF4:[{PlateCode:"A"},{PlateCode:"1"},{PlateCode:"B"},{PlateCode:"2"},{PlateCode:"C"},{PlateCode:"3"},{PlateCode:"D"},{PlateCode:"4"}],FuelTypeF4:[{FuelType:"Diesel"},{FuelType:"Petrol"},{FuelType:"Gas"},{FuelType:"Electric"},{FuelType:"Others"}],ManufacturerF4:[{Manufacture:"Audi"},{Manufacture:"BMW"},{Manufacture:"Benz"},{Manufacture:"Ford"},{Manufacture:"Ferrari"},{Manufacture:"Hyundai"},{Manufacture:"Honda"},{Manufacture:"Land Rover"},{Manufacture:"Porsche"},{Manufacture:"Rolls-Royce"},{Manufacture:"Toyota"},{Manufacture:"Others"}],ModelF4Set:[{Manufacture:"Audi",Model:"A1"},{Manufacture:"Audi",Model:"A2"},{Manufacture:"Audi",Model:"A3"},{Manufacture:"Audi",Model:"Q1"},{Manufacture:"Audi",Model:"Q3"},{Manufacture:"BMW",Model:"X1"},{Manufacture:"BMW",Model:"X3"},{Manufacture:"BMW",Model:"M2"},{Manufacture:"Benz",Model:"EQS"},{Manufacture:"Benz",Model:"GLB"},{Manufacture:"Benz",Model:"GLC"},{Manufacture:"Ford",Model:"Aerostar"},{Manufacture:"Ford",Model:"Mustang"},{Manufacture:"Ford",Model:"EcoSport"},{Manufacture:"Ferrari",Model:"F8 Tributo"},{Manufacture:"Hyundai",Model:"Creta"},{Manufacture:"Honda",Model:"Amaze"},{Manufacture:"Land Rover",Model:"Range Rover"},{Manufacture:"Land Rover",Model:"Defender"},{Manufacture:"Porsche",Model:"GTS"},{Manufacture:"Rolls-Royce",Model:"Ghost"},{Manufacture:"Rolls-Royce",Model:"Cullinan"},{Manufacture:"Toyota",Model:"Glanza"},{Manufacture:"Others"}],ModelF4:[]};var a=new sap.ui.model.json.JSONModel(e);this.getView().setModel(a,"oViewModel")},onPressAddVehicle:function(){var e=this.getView().getModel("oViewModel").getProperty("/AddVehicleData");e.push({Customer:"",PlateNo:"",PlateC:"",PlateCat:"",Vin:"",Emirates:""});this.getView().getModel("oViewModel").setProperty("/AddVehicleData",e)},onPressDelete:function(e){var t=this.getView().getModel("oViewModel");var a=e.getSource().getBindingContext("oViewModel").getPath();var o=parseInt(a.substring(a.lastIndexOf("/")+1),10);sap.m.MessageBox.confirm("Are you sure want to Delete?",{icon:sap.m.MessageBox.Icon.CONFIRM,title:"Confirmation",actions:[sap.m.MessageBox.Action.YES,sap.m.MessageBox.Action.NO],onClose:function(e){if(e==="YES"){var a=t.getProperty("/AddVehicleList");a.splice(o,1);t.setProperty("/AddVehicleList",a);t.refresh()}else if(e==="NO"){}}})},onPressSaveCustomer:function(){var e=this.getView().getModel("HomeViewModel").getData().CNC_NewCustomer;var t=this.getView().getModel("oViewModel").getData();if(e){if(t.CC_FirstName!==""&&t.CC_MobileNo!==""){a.show("Customer created successfully");this.onClearCNCInput()}else{if(t.CC_FirstName===""){t.CC_FirstName_ValueState="Error";this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState","Error")}if(t.CC_MobileNo===""){t.CC_MobileNo_ValueState="Error";this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState","Error")}a.show("Please fill mandatory details");this.getView().getModel("oViewModel").refresh(true)}}else{if(t.CC_FirstName!==""&&t.CC_MobileNo!==""&&t.CC_Emirates!==""&&t.CC_Category!==""&&t.CC_PlateCode!==""&&t.CC_PlateNo!==""&&t.CC_Manfacturer!==""&&t.CC_Model!==""){a.show("Customer created successfully");this.onClearCNCInput()}else{a.show("Please Fill All Mandatory Details");this.getView().getModel("oViewModel").refresh(true)}}},onMobileNoLiveChange:function(e){var t=e.getSource().getValue();if(t.charAt(0)==="0"){a.show("Mobile number does not start with zero");e.getSource().setValue("")}else{var o=t.replace(/\D/g,"");e.getSource().setValue(o);if(t.length>9){this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState","None")}else{this.getView().getModel("oViewModel").setProperty("/CC_MobileNo_ValueState","Error")}}},onFirstNameLiveChange:function(e){var t=e.getSource().getValue();t=t.replace(/[^a-zA-Z0-9_ ]/g,"");e.getSource().setValue(t);if(t.length>2){this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState","Information")}else{this.getView().getModel("oViewModel").setProperty("/CC_FirstName_ValueState","Error")}},onOpenManufactureF4:function(e){this.source=e.getSource();if(!this.Manfacturer){this.Manfacturer=sap.ui.xmlfragment("viapp.fragment.ManfacturerF4",this);this.getView().addDependent(this.Manfacturer)}this.Manfacturer.open()},onSearchManufacture:function(e){var t=e.getParameters().value;var a=["Manufacture"];var o=e.getSource().getBinding("items");this.onSearchF4(t,a,o)},onSearchModel:function(e){var t=e.getParameters().value;var a=["Model"];var o=e.getSource().getBinding("items");this.onSearchF4(t,a,o)},onSearchF4:function(e,t,a){var o=[];for(var r=0;r<t.length;r++){o.push(new i(t[r],s.Contains,e))}var n=new i(o);a.filter([n])},onManfacturerConfirm:function(e){var t=this.getView().getModel("oViewModel");t.setProperty("/CC_Model","");t.getData().CC_Manfacturer=e.getParameter("selectedItem").getBindingContext("oViewModel").getObject().Manufacture;e.getSource().getBinding("items").filter([]);var a=t.getProperty("/ModelF4Set");var o=[];o=a.filter(function(e){return e.Manufacture===t.getData().CC_Manfacturer});t.setProperty("/ModelF4",o);t.refresh()},onOpenModelF4:function(e){this.source=e.getSource();if(!this.ModelF4){this.ModelF4=sap.ui.xmlfragment("viapp.fragment.ModelF4",this);this.getView().addDependent(this.ModelF4)}this.ModelF4.open()},onModelConfirm:function(e){var t=this.getView().getModel("oViewModel");t.getData().CC_Model=e.getParameter("selectedItem").getBindingContext("oViewModel").getObject().Model;t.refresh();e.getSource().getBinding("items").filter([])},onResetForm:function(){var e=this.getView().getModel("oViewModel");e.getData().CC_FirstName="";e.getData().CC_FirstName_ValueState="None";e.getData().CC_MobileNo="";e.getData().CC_Email="";e.getData().CC_Emirates="";e.getData().CC_Category="";e.getData().CC_PlateCode="";e.getData().CC_PlateNo="";e.getData().CC_VINNo="";e.getData().CC_Manfacturer="";e.getData().CC_Model="";e.getData().CC_CarType="";e.refresh()},onPressTagunTag:function(){if(!this.TagVehicleToCustomer){this.TagVehicleToCustomer=sap.ui.xmlfragment("viapp.fragment.TagVehicleToCustomer",this);this.getView().addDependent(this.TagVehicleToCustomer)}this.TagVehicleToCustomer.open()},onCancelTagVehicleToCustomer:function(){this.TagVehicleToCustomer.close()},onPressNav1:function(){var e={trxnType:"SALE",amount:"10.00",mode:"card",trxnID:"897090"};var t=JSON.stringify(e);var a=encodeURIComponent(t);var o="intent://open?data=${encodedJsonString}#Intent;scheme=myapp;package=pay.com;end;";window.location.href=o},onPressNav2:function(){var e="intent://Mars.Splash_Screen?AMOUNT=10#Intent;scheme=https;package=Mars.Splash_Screen;end;";window.location.href=e},onPressNav3:function(){var e="intent://open?#Intent;scheme=https;package=com.marsdata.fabpos.Mars.Splash_Screen;end;";window.location.href=e},onLPGSwitchOn:function(e){var t=this.getView().getModel("HomeViewModel");var a=e.getSource().getState();if(a){t.setProperty("/LPG_Switch",true);this.getView().getModel("oGlobalModel").setProperty("/LPG_ProcessVisible",true);this.getView().getModel("oGlobalModel").setProperty("/CW_ProcessVisible",false)}else if(!a){t.setProperty("/LPG_Switch",false);this.getView().getModel("oGlobalModel").setProperty("/LPG_ProcessVisible",false);this.getView().getModel("oGlobalModel").setProperty("/CW_ProcessVisible",true)}},onPressSearchCustomer:function(e){var t=this.getView().getModel("oGlobalModel");if(!this.SearchVehicle){this.SearchVehicle=sap.ui.xmlfragment("viapp.fragment.SearchVehicle",this);this.getView().addDependent(this.SearchVehicle)}this.SearchVehicle.open()},onCancelCreateCustomer:function(){this.Create.close()},onPressCloseSearch:function(){this.SearchVehicle.close()}})});
//# sourceMappingURL=Home.controller.js.map