export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/i





export const routePermissionsList = new Map([
  ['roles', 'ROL'],
  ['customer', 'CUST'],
  ['vendors', 'VEND'],
  ['departments', 'DEP'],
  ['employees', 'EMPL'],
  ['purchase', 'PURCH'],
  ['sales', 'SALE'],
  ['products', 'PROD'],
  ['units', 'UNIT'],
  ['category', 'CATE'],
  ['sub-category', 'SBCATE'],
  ['stocks', 'STK'],
  ['brands', 'BRND'],
  ['raks', 'RAK'],
  ['variant-attributes', 'VATT'],
  ['media', 'MEDIA'],
])

export const storepaths = new Map([
  ['products', 'uploads/products'],
  ['brands', 'uploads/brands'],

]);