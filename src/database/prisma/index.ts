import { Prisma, PrismaClient } from '@prisma/client'


const prisma = new PrismaClient().$extends({
	model: {
		$allModels: {
			async softDelete(id: number) {
				// Get the current model at runtime
				const context = Prisma.getExtensionContext(this)
				const result = await (context as any).update({
					where: {
						id: +id
					},
					data: {
						deleted: true
					}
				})
				return result
			},
			async restore(id: number) {
				const context = Prisma.getExtensionContext(this)
				const result = await (context as any).update({
					where: {
						id: +id
					},
					data: {
						deleted: false
					}
				})
				return result
			}


			// async findMany
		},
		admins: {
			async seedSuperAdmin() {
				const hash = await Bun.password.hash("12356")
				await prisma.admins.create({
					data: {
						email: "admin@gmail.com",
						userName: "admin",
						fullName: "admin",
						phone: "896578465",
						password: hash,
						rolesId: 1
					}
				})
			}
		}
	},
	query: {
		$allModels: {
			async findMany({ model, operation, args, query }) {
				// If includeDeleted is not true, add `deleted: false` filter to exclude deleted records
				if (!args.includeDeleted) {
					args.where = { ...args.where, deleted: false }
				}
				// Remove the includeDeleted from args as it's not a valid field in the model
				delete args.includeDeleted;
				return query(args)
			},
		}
	},

})

export default prisma