using {dbapp.db} from '../db/datamodel';
using {dbapp.cds} from '../db/cdsviews';


// service CarwashService @(path:'CarwashService', requires: 'authenticated-user') {
service CarwashService @(path:'CarwashService') {

    //entity Plant as projection on db.master.VM_T001W;
    entity Material_V as projection on db.master.MATERIAL_V;
    //entity Plant as projection on cds.cdsviews.Plant;
    entity Plant 
    // @(restrict: [
    //     { grant : ['READ'], to: 'Viewer', where: 'WERKS = $user.Plant' },
    //     { grant : ['WRITE'], to: 'Admin'} ]) 
        as projection on db.master.PLANT_DB;
    //entity ZANPR as projection on db.master.ZANPR;
    // entity MaterialPlant as projection on cds.cdsviews.MaterialPlant;

    entity OrderItem as projection on db.OrderItem;
    entity Order as projection on db.Order{
        *,
        ITEMS: redirected to OrderItem
    };

    entity PaymentItem as projection on db.PaymentItem;
    entity Payment as projection on db.Payment{
        *,
        ITEMS: redirected to PaymentItem
    };
    function userInfo() returns String;
    function userInfoUAA() returns String;
    
}