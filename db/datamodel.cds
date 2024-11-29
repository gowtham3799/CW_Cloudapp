namespace dbapp.db;

using {
    cuid,
    temporal,
    managed
} from '@sap/cds/common';

context master {

    entity PLANT_DB {
        key WERKS : String(4);
            NAME1 : String(30);
    }


    entity MATERIAL_V {
        key MATERIAL : String(40);
            MATTYPE  : String(4);
            UOM      : String(3);
            PLANT    : String(4);
            MATDESC  : String(40);
            CONDREC  : String(10);
            NETPRICE : Decimal(11, 2);
            CURRENCY : String(5);
    }


}

entity Order : cuid {
    key ID        : UUID;
        ORDERNUM  : Integer;
        PLATECODE : String(2);
        PLATENUM  : String(5);
        SOURCE    : String(20);
        KIND      : String(20);
        TOTALPRICE: Decimal(11, 2);
        CURRENCY  : String(5);
        ITEMS     : Composition of many OrderItem
                        on ITEMS.PARENT_KEY = $self;

}


entity OrderItem : cuid {
    key ID           : UUID;
        PARENT_KEY   : Association to Order;
        ORDERNUM     : Association to Order;
        ITEMNUM      : String(6);
        MATERIAL     : String(40);
        PLANT        : String(4);
        MATERIALDESC : String(40);
        CONDREC      : String(10);
        NETPRICE     : Decimal(11, 2);
        CURRENCY     : String(5);
        QUANTITY     : Decimal(6, 2);
        UOM          : String(3);
}

entity Payment : cuid {
    key ID          : UUID;
        ORDER_KEY   : Association to Order;
        ORDERNUM    : Integer;
        AMOUNT      : Decimal(11, 2);
        CURRENCY    : String(5);
        INVOICE     : String(21);
        ITEMS       : Composition of many PaymentItem
                          on ITEMS.PARENT_KEY = $self;

}

entity PaymentItem : cuid {
    key ID          : UUID;
        PARENT_KEY  : Association to Payment;
        MOP_COUNTER : String(6);
        AMOUNT      : Decimal(11, 2);
        CURRENCY    : String(5);
        MOP_TYPE    : String(20);
        AUTH_CODE   : String(20);
}