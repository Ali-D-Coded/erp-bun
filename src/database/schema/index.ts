

import {users} from "./users/users"
import {custmers} from "./users/customer"
import {vendors} from "./users/vendors"
import {permissions} from "./users/permissions"
import {attendance} from "./employees/attendance"
import {departments} from "./employees/departments"
import {employees} from "./employees/employees"
import {leaves} from "./employees/leaves"
import {payroll} from "./employees/payroll"
import {unitsToProductVariants} from "./pivotTables/unitsToProductVariants"
import {userPermissions} from "./pivotTables/userPermissions"
import {categories} from "./product/category"
import {productsVariant} from "./product/product-variant"
import {products} from "./product/products"
import {raks} from "./product/rak"
import {subCategories} from "./product/sub-category"
import {purchase} from "./purchase/purchase"
import {purchaseItems} from "./purchase/purchase-items"
import {purchaseReturn} from "./purchase/purchase-return"
import {expenses} from "./salesAndExpenses/expense"
import {expenseTypes} from "./salesAndExpenses/expense-type"
import {sales} from "./salesAndExpenses/sales"
import {salesProducts} from "./salesAndExpenses/sales-product"
import {salesReturn} from "./salesAndExpenses/sales-return"
import {units} from "./units/units"


 const schema = {
	users,custmers,vendors,permissions,attendance,departments,employees,leaves,payroll,unitsToProductVariants,userPermissions,categories,products,productsVariant,raks,subCategories,purchase,purchaseItems,purchaseReturn,sales,salesProducts,salesReturn,expenses,expenseTypes,units
 }

 export default schema