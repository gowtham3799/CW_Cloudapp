namespace dbapp.cds;

using {dbapp.db.master} from './datamodel';
using { dbapp.db } from './datamodel';


context cdsviews {
    define view ![Plant] as
        select from master.PLANT_DB {
            WERKS as ![PLANT],
            NAME1 as ![DESCRIPTION]
        }
}

define view ![Order]as
    select from db.Order as Order{
        *,
        ITEMS
    }
define view ![OrderRead]as
    select from db.Order as Order
    inner join db.Payment as Payment on Payment.ORDERNUM = Order.ORDERNUM {
        key Order.ID,
        Order.ORDERNUM,
        Order.PLATECODE,
        Order.PLATENUM,
        Order.SOURCE,
        Order.KIND,
        Order.TOTALPRICE,
        Order.CURRENCY,
        Payment.INVOICE,
        Order.ITEMS
    }

//     define view ![OrderItem]as
//     select from db.OrderItem{
//         ID,
//         PARENT_KEY,
//         OrderNum,
//         ItemNum,
//         Material,
//         Plant,
//         MaterialDesc,
//         Quantity,
//         UoM,
//         NetPrice,
//         Currency

//     }