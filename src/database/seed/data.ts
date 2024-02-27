import { NewCategory, NewCustomer, NewDepartment, NewEmployee, NewMedia, NewProduct, NewProductVariant, NewRole, NewSubCategory, NewUnit, NewVendor } from "../schema/schema"

export const rolesData : NewRole[] = [
    {
        roleName:"ADMIN",
        description:""
    },
    {
        roleName:"SALESMAN",
        description:""
    },
    {
        roleName:"ACCOUNTANT",
        description:""
    }
]


export const departmentsData : NewDepartment[] = [
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


export const employeesData: NewEmployee[] = [
	{
		fullName: 'Hunais',
		userName: 'mongan',
		email: 'mongan@gmail.com',
		password: '$argon2id$v=19$m=65536,t=2,p=1$aUFybAfCq1dQNSbxM0xCeZnBTpz72ee1Nbl4GAxx0AM$7fpfdbXF65Upk0J7MomRiRUTQQ6cJ8MadVPFEsH+bQM',
		phone: '9685451256',
		roleId: 2,
		jobTitle: 'salesman',
		departmentId: 1,
		joiningDate: new Date("2024-01-01T00:00:00.000Z"),
		salary:"20000.00"
	},
	{
		fullName: 'Sreya',
		userName: 'sreay110',
		email: 'sreya@gmail.com',
		password: '$argon2id$v=19$m=65536,t=2,p=1$aUFybAfCq1dQNSbxM0xCeZnBTpz72ee1Nbl4GAxx0AM$7fpfdbXF65Upk0J7MomRiRUTQQ6cJ8MadVPFEsH+bQM',
		phone: '9685122365',
		roleId: 3,
		jobTitle: 'accountant',
		departmentId: 2,
		joiningDate: new Date("2024-01-01T00:00:00.000Z"),
		salary:"20000.00"
	},
]

export const vendorsData: NewVendor[] = [
		{
		name: 'ABC Electronics',
		email: 'abc@electr.com',
		contactPerson: 'Manager',
		phone: '8956235689',
		address: 'gsdufsjdkhdjhdskgdsgfdsfgds',
		},
		{
		name: 'Spark Tech',
		email: 'spark@tech.com',
		contactPerson: 'Manager',
		phone: '9674562356',
		address: 'gsdufsjdkhdjhdskgdsgfdsfgds',
		},
]

export const customersData: NewCustomer[] = [
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

export const unitsData : NewUnit[] = [
		{
		name: 'pc',
		value: 1,
		},
			{
		name: 'box',
		value: 10,
		}
]

export const categoryData : NewCategory[] = [
	{
  	name: 'Mobile Devices',
	},
	{
		name:"Computing"
	},
	{
		name:"Home Entertainment"
	},
	{
		name:"Home Appliances"
	},
	{
		name:"Gaming"
	},
	{
		name:"Cameras & Photography"
	},
	{
		name:"Smart Home"
	},
]

export const subCategoriesData : NewSubCategory[] = [
	{
		name: "Smartphones",
		categoryId:1,
	},
	{
		name: "Tablets",
		categoryId:1
	},
	{
		name: "Wearables",
		categoryId:1
	},
	{
		name: "Mobile accessories",
		categoryId:1
	},
	{
		name: "Laptops",
		categoryId:2
	},
	{
		name: "Desktops",
		categoryId:2
	},
	{
		name: "Monitors",
		categoryId:2
	},
	{
		name: "Computer components",
		categoryId:2
	},
	{
		name: "Printers",
		categoryId:2
	},
	{
		name: "Televisions",
		categoryId:3
	},
	{
		name: "Streaming devices",
		categoryId:3
	},
	{
		name: "Gaming consoles",
		categoryId:3
	},
]

export const productsData : NewProduct[] = [
	{
		name: "realme 12 Pro+ 5G (Submarine Blue, 256 GB)  (12 GB RAM)",
		subCategoryId: 1
	},
	{
		name: "ASUS ROG Zephyrus G14 (2023) with 76WHr Battery, AI Powered AMD Ryzen 9 Octa Core 7940HS - (16 GB/1 TB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeForce RTX 4050/165 Hz/120 TGP) GA402XU-N2044WS Gaming Laptop  (14 Inch, Moonlight White AniMe Matrix Version, 1.72 Kg, With MS Office)",
		subCategoryId: 5
	},
]

export const productVariantsData : NewProductVariant[] = [
	{
		name: "realme 12 Pro+ 5G (Submarine Blue, 256 GB)  (12 GB RAM)",
		description: "In a world where innovation reigns supreme, the realme 12 Pro+ 5G stands tall as a beacon of superior technology and design. Elevate your mobile experience, capture moments with unprecedented clarity, and stay connected with seamless performance. Behold this realme smartphone – where every feature is a testament to a commitment to pushing the boundaries of what's possible in a smartphone.",
		productCode: 55455,
		barCode: "545455",
		productId: 1,
		
	},
	{
		name: "realme 12 Pro+ 5G (Navigator Beige, 128 GB)  (8 GB RAM)",
		description: "In a world where innovation reigns supreme, the realme 12 Pro+ 5G stands tall as a beacon of superior technology and design. Elevate your mobile experience, capture moments with unprecedented clarity, and stay connected with seamless performance. Behold this realme smartphone – where every feature is a testament to a commitment to pushing the boundaries of what's possible in a smartphone.",
		productCode: 54454515,	
		barCode: "54545",
		productId: 1,
		
	},
	{
		name: "rASUS ROG Zephyrus G14 (2023) with 76WHr Battery, AI Powered AMD Ryzen 9 Octa Core 7940HS - (16 GB/1 TB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeForce RTX 4050/165 Hz/120 TGP) GA402XU-N2044WS Gaming Laptop  (14 Inch, Moonlight White AniMe Matrix Version, 1.72 Kg, With MS Office)",
		description: "With the Zephyrus G14 gaming laptop, you can explore several alternatives and travel a gaming route that enables you to demonstrate your dominance. For gamers who demand incredible motion and image clarity, this gaming laptop has a magnificent Nebula Display with a 165 Hz refresh rate, 100% DCI-P3 coverage, and 2K QHD+ with 500 nits peak brightness. This laptop also uses excellent AMD and NVIDIA graphics cards to provide superb Windows 11 Home gaming performance. The powerful AMD Ryzen 7000 HS-Series CPU and NVIDIA GeForce RTX 40-Series Laptop GPU are installed in this 35.56 cm (14) machine, which aids in providing a fluid gaming experience. An FHD webcam and Windows Hello compatibility also make it possible for you to swiftly and securely unlock your PC. You can quickly charge your laptop up to 50% power in only 30 minutes thanks to Wi-Fi 6E's full compatibility, allowing you to stay engaged while on the move.",
		productCode: 4534645,
		barCode: "54555",
		productId: 2,
		
	},

]


export const mediaData : NewMedia[] = [
	{
		name: "-original-imagxhd5gqhzszeb.jpeg",
		url: "-original-imagxhd5gqhzszeb.jpeg",
		productId:1
	},
	{
		name: "-original-imagxhd5mux3vmra.jpeg",
		url: "-original-imagxhd5mux3vmra.jpeg",
		productId:1
	},
	{
		name: "12-pro-5g-rmx3840-realme-original-imagxgnk9zzrs9y6.jpeg",
		url: "12-pro-5g-rmx3840-realme-original-imagxgnk9zzrs9y6.jpeg",
		productId:1
	},
	{
		name: "-original-imagxhd5gqhzszeb.jpeg",
		url: "-original-imagxhd5gqhzszeb.jpeg",
		productId:2
	},
	{
		name: "-original-imagxhd5mux3vmra.jpeg",
		url: "-original-imagxhd5mux3vmra.jpeg",
		productId:2
	},
	{
		name: "12-pro-5g-rmx3840-realme-original-imagxgnk9zzrs9y6.jpeg",
		url: "12-pro-5g-rmx3840-realme-original-imagxgnk9zzrs9y6.jpeg",
		productId:2
	},
	{
		name: "-original-imagqkqnfzpvkdvf.jpeg",
		url: "-original-imagqkqnfzpvkdvf.jpeg",
		productId:3
	},
	{
		name: "-original-imagqkqnvnzb7gwa.jpeg",
		url: "-original-imagqkqnvnzb7gwa.jpeg",
		productId:3
	},
]


