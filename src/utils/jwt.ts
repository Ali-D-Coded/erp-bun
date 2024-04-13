import jwt from 'jsonwebtoken';


// function generateToken(payload: any) {
// 	const secret = process.env.JWT_SECRET || "khfshdfgdshfgdsfhsdgfh"
// 	console.log({secret});

//   return jwt.sign(payload,secret, { expiresIn: '1h' }); // 1 hour expiration
// }

// function verifyToken(token: string) {
// 	const secret = process.env.JWT_SECRET || "khfshdfgdshfgdsfhsdgfh"
//   try {
//     return jwt.verify(token, secret);
//   } catch (error) {
//     return null;
//   }
// }

export class JwtHandler {
	constructor(private secret_access = process.env.JWT_AT_SECRET || "khfshdfgdshfgdsfhsdgfh", private secret_refresh = process.env.JWT_RT_SECRET || "rlgdkflfgjkrldgjkjdfgj") { }

	generateToken(payload: any) {
		console.log({ secret: this.secret_access });
		const access = jwt.sign(payload, this.secret_access, { expiresIn: '1h' }); // 1 hour expiration
		const refresh = jwt.sign(payload, this.secret_refresh, { expiresIn: '3d' }); // 3 day expiration
		const accessExpires = this.verifyToken(access).exp * 1000


		return { access, refresh, accessExpires }
	}

	verifyToken(token: string) {
		try {
			return jwt.verify(token, this.secret_access);
		} catch (error) {
			return error;
		}
	}

}



