import { DISCTYPE, GENDER } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"


export const privilegeData = [
	{
		source: "roles",
		code: "ROLE"
	},
	{
		source: "customer",
		code: "CUST"
	},
	{
		source: "vendors",
		code: "VEND"
	},
	{
		source: "departments",
		code: "DEP"
	},
	{
		source: "employees",
		code: "EMPL"
	},
	{
		source: "purchase",
		code: "PURCH"
	},
	{
		source: "sales",
		code: "SALE"
	},
	{
		source: "products",
		code: "PROD"
	},
	{
		source: "units",
		code: "UNIT"
	},
	{
		source: "category",
		code: "CATE"
	},
	{
		source: "sub-category",
		code: "SBCATE"
	},
	{
		source: "stocks",
		code: "STK"
	},
	{
		source: "brands",
		code: "BRND"
	},
	{
		source: "raks",
		code: "RAK"
	},
	{
		source: "variant-attributes",
		code: "VATT"
	},
	{
		source: "media",
		code: "MEDIA"
	},
]



export const rolesData = [
	{
		roleName: "ADMIN",
		description: "",
		privileges: {
			create: {
				crud: true
			}
		}
	},
	{
		roleName: "SALESMAN",
		description: "",
		privileges: {
			create: {
				create: [],
				read: [],
				update: [],
				delete: []
			}
		}
	},
	{
		roleName: "ACCOUNTANT",
		description: "",
		privileges: {
			create: {
				create: ["SALE", "PURCH", "PROD", "UNIT", "CATE", "SBCATE", "BRND", "RAK", "VATT", "MEDIA"],
				read: ["RAK", "SALE", "PROD", "UNIT", "CATE", "SBCATE", "BRND", "VATT", "MEDIA", "DEP", "VEND", "CUST", "ROL"],
				update: ["SALE", "PURCH", "PROD", "UNIT", "CATE", "SBCATE", "BRND", "RAK", "VATT", "MEDIA"],
				delete: []
			}
		}
	}
]


export const departmentsData = [
	{
		name: 'Sales',
	},
	{
		name: 'Accounts',
	},
	{
		name: 'Management',
	}
]


export const employeesData = [
	{
		fullName: 'Hunais',
		userName: 'mongan',
		email: 'mongan@gmail.com',
		password: '$argon2id$v=19$m=65536,t=2,p=1$aUFybAfCq1dQNSbxM0xCeZnBTpz72ee1Nbl4GAxx0AM$7fpfdbXF65Upk0J7MomRiRUTQQ6cJ8MadVPFEsH+bQM',
		phone: '9685451256',
		dob: "21/02/2000",
		rolesId: 2,
		jobTitle: 'salesman',
		departmentsId: 1,
		joiningDate: new Date("2024-01-01T00:00:00.000Z"),

		gender: GENDER.MALE,
		bloodGroup: "A+",
		nationality: "India",
		empCode: 'HUN1ROL2',
		basicSalary: new Decimal(20000.00),
		shift: "Morning",
		address: {
			create: {
				address: "fjudlajilgf,fhiufewfwe f,fkjbfnewsf 656445",
				country: "India",
				state: "Kerala",
				city: "Malappuram",
				zipcode: "676965"

			}
		}
	},
	{
		fullName: 'Manish',
		userName: 'oral',
		email: 'manish@gmail.com',
		dob: "21/02/2000",
		password: '$argon2id$v=19$m=65536,t=2,p=1$aUFybAfCq1dQNSbxM0xCeZnBTpz72ee1Nbl4GAxx0AM$7fpfdbXF65Upk0J7MomRiRUTQQ6cJ8MadVPFEsH+bQM',
		phone: '6352458956',
		rolesId: 2,
		jobTitle: 'salesman',
		departmentsId: 1,
		joiningDate: new Date("2024-01-01T00:00:00.000Z"),

		gender: GENDER.MALE,
		bloodGroup: "A+",
		nationality: "India",
		empCode: 'MAN22',
		basicSalary: new Decimal(20000.00),
		shift: "Morning",
		address: {
			create: {
				address: "fjudlajilgf,fhiufewfwe f,fkjbfnewsf 656445",
				country: "India",
				state: "Kerala",
				city: "Malappuram",
				zipcode: "676965"

			}
		}
	},
	{
		fullName: 'Sreya',
		userName: 'sreay110',
		email: 'sreya@gmail.com',
		dob: "21/02/2000",
		password: '$argon2id$v=19$m=65536,t=2,p=1$aUFybAfCq1dQNSbxM0xCeZnBTpz72ee1Nbl4GAxx0AM$7fpfdbXF65Upk0J7MomRiRUTQQ6cJ8MadVPFEsH+bQM',
		phone: '9685122365',
		rolesId: 3,
		jobTitle: 'accountant',
		departmentsId: 2,
		joiningDate: new Date("2024-01-01T00:00:00.000Z"),

		gender: GENDER.FEMALE,
		bloodGroup: "A+",
		nationality: "India",
		empCode: 'SRE1ROL3',
		basicSalary: new Decimal(20000.00),
		shift: "Morning",
		address: {
			create: {
				address: "fjudlajilgf,fhiufewfwe f,fkjbfnewsf 656445",
				country: "India",
				state: "Kerala",
				city: "Malappuram",
				zipcode: "676965"

			}
		}
	},
]

export const vendorsData = [
	{
		name: 'ABC Electronics',
		email: 'abc@electr.com',
		contactPerson: 'Manager',
		phone: '8956235689',
		address: 'gsdufsjdkhdjhdskgdsgfdsfgds',
		vatNo: "48768468748948"
	},
	{
		name: 'Spark Tech',
		email: 'spark@tech.com',
		contactPerson: 'Manager',
		phone: '9674562356',
		address: 'gsdufsjdkhdjhdskgdsgfdsfgds',
		vatNo: "48768468748948"
	},
]

export const customersData = [
	{
		fullName: 'Walk In Customer',
		email: 'walkin@gmail.com',
		phone: '0000000000',
		address: 'walk in',
	},
	{
		fullName: 'Norman',
		email: 'norman@gmail.com',
		phone: '1245125678',
		address: 'Lodbb hdt,45f , dhud.',
	},
	{
		fullName: 'Rod',
		email: 'rod@gmail.com',
		phone: '9647895623',
		address: 'Rgs hdt,dbhd5 , dsfg.',
	},
]

export const unitsData = [
	{
		name: 'pc',
		value: 1,
	},
	{
		name: 'box',
		value: 10,
	}
]

export const categoryData = [
	{
		name: 'Mobile Devices',
	},
	{
		name: "Computing"
	},
	{
		name: "Home Entertainment"
	},
	{
		name: "Home Appliances"
	},
	{
		name: "Gaming"
	},
	{
		name: "Cameras & Photography"
	},
	{
		name: "Smart Home"
	},
]

export const subCategoriesData = [
	{
		name: "Smartphones",
		categoriesId: 1,
	},
	{
		name: "Tablets",
		categoriesId: 1
	},
	{
		name: "Wearables",
		categoriesId: 1
	},
	{
		name: "Mobile accessories",
		categoriesId: 1
	},
	{
		name: "Laptops",
		categoriesId: 2
	},
	{
		name: "Desktops",
		categoriesId: 2
	},
	{
		name: "Monitors",
		categoriesId: 2
	},
	{
		name: "Computer components",
		categoriesId: 2
	},
	{
		name: "Printers",
		categoriesId: 2
	},
	{
		name: "Televisions",
		categoriesId: 3
	},
	{
		name: "Streaming devices",
		categoriesId: 3
	},
	{
		name: "Gaming consoles",
		categoriesId: 3
	},
]

export const brandsData = [
	{
		name: "realme",
		logo: "realme.png"
	},
	{
		name: "Asus",
		logo: "asus.png"
	},
	{
		name: "Nike",
		logo: "nike.png"
	},
	{
		name: "Apple",
		logo: "apple.png"
	},
	{
		name: "Boat",
		logo: "boat.png"
	},
	{
		name: "Lenovo",
		logo: "lenovo.png"
	},
]

export const raks = [
	{
		name: "Smartphones rak",
		salesmanId: 1
	},
	{
		name: "Laptops rak",
		salesmanId: 2
	}
]

export const productsData = [
	{
		name: "realme 12 Pro+ 5G",
		description: "In a world where innovation reigns supreme, the realme 12 Pro+ 5G stands tall as a beacon of superior technology and design. Elevate your mobile experience, capture moments with unprecedented clarity, and stay connected with seamless performance. Behold this realme smartphone – where every feature is a testament to a commitment to pushing the boundaries of what's possible in a smartphone.",
		slug: "realme-slug-12-pro-5G",
		brandId: 1,
		unitsId: 1,
		raksId: 1,
		subCategoriesId: 1,
		sku: '',
		productCode: 45474655,
		barCode: "44544sd444ds54d",
		quantityAlert: 10,
		VAT: 15.00,
		customFields: "",
		// variantCombinations: []
	},
	{
		name: "ASUS ROG Zephyrus G14 (2023) with 76WHr Battery, AI Powered AMD Ryzen 9 Octa Core 7940HS - (16 GB/1 TB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeForce RTX 4050/165 Hz/120 TGP) GA402XU-N2044WS Gaming Laptop  (14 Inch, Moonlight White AniMe Matrix Version, 1.72 Kg, With MS Office)",
		description: "With the Zephyrus G14 gaming laptop, you can explore several alternatives and travel a gaming route that enables you to demonstrate your dominance. For gamers who demand incredible motion and image clarity, this gaming laptop has a magnificent Nebula Display with a 165 Hz refresh rate, 100% DCI-P3 coverage, and 2K QHD+ with 500 nits peak brightness. This laptop also uses excellent AMD and NVIDIA graphics cards to provide superb Windows 11 Home gaming performance. The powerful AMD Ryzen 7000 HS-Series CPU and NVIDIA GeForce RTX 40-Series Laptop GPU are installed in this 35.56 cm (14) machine, which aids in providing a fluid gaming experience. An FHD webcam and Windows Hello compatibility also make it possible for you to swiftly and securely unlock your PC. You can quickly charge your laptop up to 50% power in only 30 minutes thanks to Wi-Fi 6E's full compatibility, allowing you to stay engaged while on the move.",
		slug: "asus-rog-zyphyrus-g14-2023",
		brandId: 2,
		unitsId: 1,
		raksId: 2,
		subCategoriesId: 5,
		sku: '',
		productCode: 546842874,
		barCode: "IYUK46878454YU74K",
		quantityAlert: 10,
		VAT: 15.00,
		customFields: "",
		// variantCombinations: []

	},
]



export const varinatComboData = [
	{
		variantType: "RAM",
		variantValue: "64",
		productsId: 1

	},
	{
		variantType: "Color",
		variantValue: "red",
		productsId: 1

	},
]


export const mediaData = [
	{
		name: "-original-imagxhd5gqhzszeb.jpeg",
		url: "-original-imagxhd5gqhzszeb.jpeg",
		path: "",

	}
]


