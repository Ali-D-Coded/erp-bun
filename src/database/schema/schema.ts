import { relations, sql } from "drizzle-orm";
import { date, decimal, int, json, mysqlEnum, mysqlTable, primaryKey, time, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

// Users
export const users = mysqlTable('users', {
  id: int("id").primaryKey().autoincrement(),
  fullName: varchar('full_name',{length:256}),
  userName: varchar('user_name',{length: 256}).unique(),
  email: varchar('email',{length:256}).unique(),
  password: varchar('password',{length: 256}),
  phone: varchar('phone', { length: 256 }).unique(),
  role: mysqlEnum("role", ["ADMIN", "MANAGER", "SALESMAN", "ACCOUNTANT"]).default("SALESMAN"),
  employeeId: int("employee_id").references(() => employees.id)
},(users) => ({
	idIndex: uniqueIndex('id_idx').on(users.id),
	usernameIndex: uniqueIndex('username_idx').on(users.userName),
	emailIndex: uniqueIndex('email_idx').on(users.email),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export const usersRelations = relations(users, ({ one,many }) => ({
  employee: one(employees, {
    fields: [users.employeeId],
    references:[employees.id]
  }),
  userPermissions: many(userPermissions)
}));


// Permissions
export const permissions = mysqlTable('permissions', {
    id: int("id").primaryKey().autoincrement(),
    type: mysqlEnum("type", ["ADMIN", "MANAGER", "SALESMAN", "ACCOUNTANT"]).unique(),
    canDo: json("can_do"),
  });

  
export type Permission = typeof permissions.$inferSelect; // return type when queried
export type NewPermission = typeof permissions.$inferInsert; // insert type

export const permissionRelations = relations(permissions, ({ many }) => ({
  userPermissions:many(userPermissions)
}))



// UserPermissions
export const userPermissions = mysqlTable('user_permissions', {
    permissionId: int('permission_id').notNull().references(() => permissions.id),
    userId: int('user_id').notNull().references(() => users.id),
   
  },(userPermissions) => ({
      pk: primaryKey({columns:[userPermissions.permissionId, userPermissions.userId]})
  }));

  
export type UserPermission = typeof userPermissions.$inferSelect; // return type when queried
export type NewUserPermission = typeof userPermissions.$inferInsert; // insert type


export const userPermissionsRelations = relations(userPermissions, ({ one }) => ({
    user: one(users, {
      fields: [userPermissions.userId],
      references: [users.id],
    }),
    permission: one(permissions, {
      fields: [userPermissions.permissionId],
      references: [permissions.id],
    }),
   
}));
  

// Customers
export const custmers = mysqlTable('customers', {
  id: int("id").primaryKey().autoincrement(),
  fullName: varchar('full_name',{length:256}),
  email: varchar('email',{length:256}).unique(),
  phone: varchar('phone', { length: 256 }).unique(),
  address: varchar('address', { length: 256 }),
},(customers) => ({
	idIndex: uniqueIndex('id_idx').on(customers.id),
	emailIndex: uniqueIndex('email_idx').on(customers.email),
}));

export type Customer = typeof custmers.$inferSelect; // return type when queried
export type NewCustomer = typeof custmers.$inferInsert; // insert type


// Vendors
export const vendors = mysqlTable('vendors', {
  id: int("id").primaryKey().autoincrement(),
  name: varchar('name',{length:256}),
  email: varchar('email',{length:256}).unique(),
  contactPerson: varchar('contact_person',{length: 256}),
	phone: varchar('phone', { length: 256 }).unique(),
    address: varchar('address', { length: 256 }),
},(vendors) => ({
	idIndex: uniqueIndex('id_idx').on(vendors.id),
	emailIndex: uniqueIndex('email_idx').on(vendors.email),
}));

export type Vendor = typeof vendors.$inferSelect; // return type when queried
export type NewVendor = typeof vendors.$inferInsert; // insert type

export const vendorRelations = relations(vendors, ({many}) => ({
  productVariants : many(productsVariant)
}))

// Products
export const products = mysqlTable('products', {
  id: int("id").primaryKey().autoincrement(),
  name: varchar('name',{length:256}),
},(products) => ({
	idIndex: uniqueIndex('id_idx').on(products.id),
	nameIndex: uniqueIndex('name_idx').on(products.name),
}));

export type Product = typeof products.$inferSelect; // return type when queried
export type NewProduct = typeof products.$inferInsert; // insert type


export const productRelations = relations(products, ({many}) => ({
  productVariant : many(productsVariant)
}))


// Product variants
export const productsVariant = mysqlTable('products_variant', {
  id: int("id").primaryKey().autoincrement(),
  name: varchar('name',{length:256}),
  description: varchar('description',{length:256}).unique(),
  price: decimal('price'),
  quantityInStock: int('quantity_in_stock'),
	minimumQuantity: int('minimum_quantity'),
	images: int("images"),
	
	barCode: varchar("bar_code", { length: 256 }),
	vendorId: int("vendor_id"),
	  productId: int("product_id"),
},(products_variant) => ({
	idIndex: uniqueIndex('id_idx').on(products_variant.id),
	nameIndex: uniqueIndex('name_idx').on(products_variant.name),
}));

export type ProductVariant = typeof productsVariant.$inferSelect; // return type when queried
export type NewProductVariant = typeof productsVariant.$inferInsert; // insert type

export const productsVariantRelations = relations(productsVariant, ({ one, many }) => ({
  product: one(products, {
    fields: [productsVariant.productId],
    references: [products.id],
  }),
	vendor: one(vendors, {
		fields: [productsVariant.vendorId],
		references: [vendors.id]
	}),
	unitsToProductVariants: many(unitsToProductVariants)
}));



// Raks
export const raks = mysqlTable('raks', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar('name',{length:256}),
  });

  
export type Raks = typeof raks.$inferSelect; // return type when queried
export type NewRaks = typeof raks.$inferInsert; // insert type


// Category
export const categories = mysqlTable('categories', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar('name',{length:256}),
  },(categories) => ({
      idIndex: uniqueIndex('id_idx').on(categories.id),
      nameIndex: uniqueIndex('name_idx').on(categories.name),
  }));

  
export type Category = typeof categories.$inferSelect; // return type when queried
export type NewCategory = typeof categories.$inferInsert; // insert type


export const categoriesRelations = relations(categories,({many}) => ({
    subCategories: many(subCategories)
}))


// Sub categories
export const subCategories = mysqlTable('subCategories', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar('name',{length:256}),
    categoryId: int("catrgory_id").references(() => categories.id)
  },(subCategories) => ({
      idIndex: uniqueIndex('id_idx').on(subCategories.id),
      nameIndex: uniqueIndex('name_idx').on(subCategories.name),
  }));

  
export type SubCategory = typeof subCategories.$inferSelect; // return type when queried
export type NewSubCategory = typeof subCategories.$inferInsert; // insert type

export const subcategoriesRelations = relations(subCategories,({one}) => ({
  category: one(categories, {
    fields: [subCategories.categoryId],
    references: [categories.id]
    })
}))

// Units
export const units = mysqlTable('unit', {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", {length:256})
});

export type Unit = typeof units.$inferSelect; // return type when queried
export type NewUnit = typeof units.$inferInsert; // insert type

export const unitsRelations = relations(units, ({many}) => ({
	unitsToProduct: many(unitsToProductVariants),
}))


// units Pivots
export const unitsToProductVariants = mysqlTable('users_to_groups', {
    unitId: int('unit_id').notNull().references(() => units.id),
    productVariantId: int('product_variant_id').notNull().references(() => productsVariant.id),
    purchaseItemId: int('purchase_item_id').notNull().references(() => purchaseItems.id),
  }, (t) => ({
    pk: primaryKey({columns:[t.unitId, t.productVariantId]}),
  }),
);

export const unitsToProductVariantsRelations = relations(unitsToProductVariants, ({ one }) => ({
  productVariant: one(productsVariant, {
    fields: [unitsToProductVariants.productVariantId],
    references: [productsVariant.id],
  }),
  unit: one(units, {
    fields: [unitsToProductVariants.unitId],
    references: [units.id],
  }),
  purchaseItem: one(purchaseItems, {
    fields: [unitsToProductVariants.productVariantId],
    references:[purchaseItems.id]
  })
}));

// //Departments 
export const departments = mysqlTable('departments', {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", {length:256}),
});

export type Department = typeof departments.$inferSelect; // return type when queried
export type NewDepartment = typeof departments.$inferInsert; // insert type

export const departmentsRelations = relations(departments, ({ many }) => ({
	employees: many(employees)
}));

// Employees
export const employees = mysqlTable('employees', {
  id: int("id").primaryKey().autoincrement(),
  jobTitle: varchar("job_title", { length: 256 }),
  departmentId: int("department_id").references(() => departments.id)
});

export type Employee = typeof employees.$inferSelect; // return type when queried
export type NewEmployee = typeof employees.$inferInsert; // insert type


export const employeesRelations = relations(employees, ({ many,one }) => ({
  attendances: many(attendance),
  user:one(users),
	leaves: many(leaves),
	payrolls: many(leaves),
  department: one(departments, {
    fields: [employees.departmentId],
    references:[departments.id]
  })
	
}));



// Attendance
export const attendance = mysqlTable('attendance', {
  id: int("id").primaryKey().autoincrement(),
	employeeId: int('employee_id').references(() => employees.id),
	date: date("date"),
	check_in_time: time("check_in_time"),
	check_out_time: time("check_out_time"),
	
});

export type Attendance = typeof attendance.$inferSelect; // return type when queried
export type NewAttendance = typeof attendance.$inferInsert; // insert type

export const attendanceRelations = relations(attendance, ({ one }) => ({
  employee: one(employees, {
    fields:[attendance.employeeId], 
    references: [employees.id]
  })
}))



// Leaves
export const leaves = mysqlTable('leaves', {
id: int("id").primaryKey().autoincrement(),
	employeeId: int('employee_id').references(() => employees.id),
	leaveType: varchar("leave_type", { length: 256 }),
	startDate: date("start_date"),
	endDate: date("end_date"),
	status: mysqlEnum("status",["APPROVED","PENDING"])
});

export type Leaves = typeof leaves.$inferSelect; // return type when queried
export type NewLeaves = typeof leaves.$inferInsert; // insert type

export const leaveRelations = relations(leaves, ({ one }) => ({
  employee: one(employees, {
    fields:[leaves.employeeId], 
    references: [employees.id]
  })
}))


// Payroll
export const payroll = mysqlTable('payroll', {
  id: int("id").primaryKey().autoincrement(),
	employeeId: int('employee_id').references(() => employees.id),
	paymentDate: date("payment_date"),
	gross_pay: decimal("gross_pay"),
	deductions: decimal("deductions"),
	netPay: decimal("net_pay"),
	
	
});

export type Payroll = typeof payroll.$inferSelect; // return type when queried
export type NewPayroll = typeof payroll.$inferInsert; // insert type

export const payrollRelations = relations(payroll, ({ one }) => ({
  employee: one(employees, {
    fields:[payroll.employeeId], 
    references: [employees.id]
  })
}))


//Purchase items
export const purchaseItems = mysqlTable('purchaseItems', {
id: int("id").primaryKey().autoincrement(),
	purchaseId: int('purchase_id').references(() => purchase.id),
	batchNumber: varchar("batch_number", { length: 256 }),
	purchasePrice: decimal("purchase_price"),
	minimumSellingPrice: decimal("minimum_selling_price"),
	maximumRetailPrice: decimal("maximum_retail_price"),
	commissionPercentage: decimal("commission_percentage"),
	quantity: int("quantity"),
	productVariantId: int("product_variant_id").references(() => productsVariant.id), 
	// unitId: int("unit_id").references(() => uni.id)

});

export type PurchaseItems = typeof purchaseItems.$inferSelect; // return type when queried
export type NewPurchaseItems = typeof purchaseItems.$inferInsert; // insert type

export const purchaseItemsRleations = relations(purchaseItems, ({ one, many}) => ({
  purchase: one(purchase, {
    fields: [purchaseItems.purchaseId], 
    references:[purchase.id]
  }),
  product: one(productsVariant, {
    fields: [purchaseItems.productVariantId], 
    references:[productsVariant.id]
  }),
	unitsToPurchaseItems: many(unitsToProductVariants)
}))



// purchase return
export const purchaseReturn = mysqlTable('purchaseReturn', {
    id: int("id").primaryKey().autoincrement(),
    purchseItemId:int("ourchase_item_id").references(() => purchaseItems.id),
	vendorId: int("vendor_id").references(() => vendors.id),
	reason: varchar("reason", { length: 256 }), 
	returnType: mysqlEnum("return_type", ["REPLACE", "REFUND"]).default(sql`NULL`),
	status: mysqlEnum("status", ["PENDING", "ACCEPTED", "REJECTED","RETURNED"]).default("PENDING"),
	 
  });

  
export type PurchseReturn = typeof purchaseReturn.$inferSelect; // return type when queried
export type NewPurchseReturn = typeof purchaseReturn.$inferInsert; // insert type




// purchase
export const purchase = mysqlTable('purchase', {
id: int("id").primaryKey().autoincrement(),
	vendorId: int('vendor_id').references(() => vendors.id),
	purchaseBillNo: varchar("purchase_bill_no", { length: 256 }),
	date: date("date"),
	totalAmount: decimal("total_amount")
});

export type Purchase = typeof purchase.$inferSelect; // return type when queried
export type NewPurchase = typeof purchase.$inferInsert; // insert type

export const purchaseRelations = relations(purchase, ({many, one}) => ({
	purchaseItems: many(purchaseItems),
  vendor: one(vendors, {
    fields: [purchase.vendorId], 
    references:[vendors.id]
  })
}))


// sales
export const sales = mysqlTable('sales', {
    id: int("id").primaryKey().autoincrement(),
    date: date('date'),
    accountantId:int("accountantId").references(() => employees.id ),
    customerId: int("customer_id").references(() => custmers.id),
    totalAmount: decimal("total_amount"),
    discountAmount: decimal("discount_amount"),
    grandTotal: decimal("grandTotal"),
  });

  
export type Sale = typeof sales.$inferSelect; // return type when queried
export type NewSale = typeof sales.$inferInsert; // insert type

export const salesRelations = relations(sales,({many}) => ({
    salesProducts: many(salesProducts),
}))


// sales products
export const salesProducts = mysqlTable('salesProducts', {
    id: int("id").primaryKey().autoincrement(),
    saleId:int("sale_id").references(() => sales.id),
    productId: int("product_id").references(() => products.id)
  });

  
export type SalesProduct = typeof salesProducts.$inferSelect; // return type when queried
export type NewSalesProduct = typeof salesProducts.$inferInsert; // insert type

export const salesProductsRelations = relations(salesProducts,({one}) => ({
  sale: one(sales, {
    fields: [salesProducts.saleId],
    references:[sales.id]
    })
}))



// sales return
export const salesReturn = mysqlTable('salesReturn', {
    id: int("id").primaryKey().autoincrement(),
    salesProductId:int("sale_product_id").references(() => salesProducts.id),
	productId: int("product_id").references(() => products.id),
	customerId: int("customer_id").references(() => custmers.id),
	reason: varchar("reason", { length: 256 }), 
	returnType: mysqlEnum("return_type", ["REPLACE", "REFUND"]).default(sql`NULL`),
	status: mysqlEnum("status", ["PENDING", "ACCEPTED", "REJECTED","RETURNED"]).default("PENDING"),
	 
  });

  
export type SalesReturn = typeof salesReturn.$inferSelect; // return type when queried
export type NewSalesReturn = typeof salesReturn.$inferInsert; // insert type

export const salesReturnRelations = relations(salesReturn,({one}) => ({
  sale: one(salesProducts, {
    fields: [salesReturn.salesProductId], 
    references:[salesProducts.id]
    })
}))


// Expense
export const expenses = mysqlTable('expenses', {
    id: int("id").primaryKey().autoincrement(),
    date: date('date'),
    employeeId: int("employee_id").references(() => employees.id),
    amount: decimal("amount"),
    expenseTypeId: int("expense_type_id").references(() => expenseTypes.id)
  });

  
export type Expense = typeof expenses.$inferSelect; // return type when queried
export type NewExpense = typeof expenses.$inferInsert; // insert type

export const expenseRelations = relations(expenses, ({ one }) => ({
  expenseType: one(expenseTypes, {
    fields: [expenses.expenseTypeId],
    references:[expenseTypes.id]
  })
}))


// Expense type
export const expenseTypes = mysqlTable("expenseTypes",{
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name",{length:256}),
})

export type ExpenseType = typeof expenseTypes.$inferSelect; // return type when queried
export type NewExpenseType = typeof expenseTypes.$inferInsert; // insert type

export const epenseTypeRelations = relations(expenseTypes,({many}) => ({
    expenses: many(expenses)
}))