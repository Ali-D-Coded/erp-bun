export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/i

export const permissionsList = [
  {
    permissionName: "manage_users",
    endpoint: "/users"

  },
  {
    permissionName: "manage_roles",
    endpoint: "/roles"
  },
  {
    permissionName: "assign_permissions",
    endpoint: "/permissions"

  },
  {
    "permissionName": "edit_all_data"
  },
  {
    "permissionName": "delete_all_data"
  },
  {
    "permissionName": "manage_settings"
  },
  {
    "permissionName": "view_logs"
  },
  {
    "permissionName": "view_sales_data"
  },
  {
    "permissionName": "view_purchase_data"
  },
  {
    "permissionName": "view_payroll_data"
  },
  {
    "permissionName": "create_invoices"
  },
  {
    "permissionName": "process_payments"
  },
  {
    "permissionName": "manage_vendors"
  },
  {
    "permissionName": "view_departments"
  },
  {
    "permissionName": "manage_accounting_settings"
  },
  {
    "permissionName": "view_sales_data"
  },
  {
    "permissionName": "create_sales_orders"
  },
  {
    "permissionName": "manage_customers"
  },
  {
    "permissionName": "view_products"
  },
  {
    "permissionName": "view_departments"
  },
  {
    "permissionName": "apply_discounts"
  },
  {
    "permissionName": "manage_sales_commissions"
  },
  {
    "permissionName": "view_orders"
  },
  {
    "permissionName": "view_products"
  },
  {
    "permissionName": "place_orders"
  },
  {
    "permissionName": "update_profile"
  },
  {
    "permissionName": "track_order_status"
  },
  {
    "permissionName": "return_products"
  },
  {
    "permissionName": "initiate_chat_with_support"
  },
  {
    "permissionName": "view_purchase_orders"
  },
  {
    "permissionName": "manage_products"
  },
  {
    "permissionName": "view_departments"
  },
  {
    "permissionName": "update_profile"
  },
  {
    "permissionName": "submit_invoices"
  },
  {
    "permissionName": "track_payment_status"
  },
  {
    "permissionName": "view_sales_data"
  },
  {
    "permissionName": "create_sales_orders"
  },
  {
    "permissionName": "manage_sales_returns"
  },
  {
    "permissionName": "apply_discounts"
  },
  {
    "permissionName": "manage_promotions"
  },
  {
    "permissionName": "generate_sales_reports"
  },
  {
    "permissionName": "view_purchase_orders"
  },
  {
    "permissionName": "create_purchase_orders"
  },
  {
    "permissionName": "manage_vendors"
  },
  {
    "permissionName": "manage_inventory"
  },
  {
    "permissionName": "approve_purchase_orders"
  },
  {
    "permissionName": "generate_purchase_reports"
  },
  {
    "permissionName": "view_payroll_data"
  },
  {
    "permissionName": "manage_employee_salaries"
  },
  {
    "permissionName": "process_payroll"
  },
  {
    "permissionName": "generate_payslips"
  },
  {
    "permissionName": "manage_tax_withholdings"
  },
  {
    "permissionName": "manage_payroll_settings"
  },
  {
    "permissionName": "view_leave_requests"
  },
  {
    "permissionName": "approve_leave_requests"
  },
  {
    "permissionName": "manage_leave_policies"
  },
  {
    "permissionName": "track_employee_leave_balances"
  },
  {
    "permissionName": "generate_leave_reports"
  },
  {
    "permissionName": "view_department_data"
  },
  {
    "permissionName": "manage_employees"
  },
  {
    "permissionName": "manage_department_budgets"
  },
  {
    "permissionName": "assign_department_roles"
  },
  {
    "permissionName": "generate_department_reports"
  },
  {
    "permissionName": "view_product_data"
  },
  {
    "permissionName": "manage_product_inventory"
  },
  {
    "permissionName": "update_product_information"
  },
  {
    "permissionName": "add_new_products"
  },
  {
    "permissionName": "manage_product_categories"
  },
  {
    "permissionName": "generate_product_reports"
  }
]


export const storepaths = new Map([
  ['products', 'uploads/products'],
  ['brands', 'uploads/brands'],

]);