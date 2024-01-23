import jwt from 'jsonwebtoken';


function generateToken(payload: any) {
	const secret = process.env.JWT_SECRET || "khfshdfgdshfgdsfhsdgfh"
	console.log({secret});
	
  return jwt.sign(payload,secret, { expiresIn: '1h' }); // 1 hour expiration
}

function verifyToken(token: string) {
	const secret = process.env.JWT_SECRET || "khfshdfgdshfgdsfhsdgfh"
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export class JwtHandler {
	constructor(private secret = process.env.JWT_SECRET || "khfshdfgdshfgdsfhsdgfh") {
	 
 }
	
	 	generateToken(payload: any) {
		console.log({secret: this.secret});
  		return jwt.sign(payload,this.secret, { expiresIn: '1h' }); // 1 hour expiration
		  }
	
		verifyToken(token: string) {
		try {
			return jwt.verify(token, this.secret);
			} catch (error) {
			return error;
			}
		}
	
}



