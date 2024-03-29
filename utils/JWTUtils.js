const jwt = require('jsonwebtoken');
const secret = process.env.JWTSECRET || 'Secreto';

const tools = {};

tools.createToken = (_id) => {
	const payload = {
		_id
	};

	return jwt.sign(payload, secret, {
		expiresIn: process.env.JWTEXPTIME || '15D'
	});
};

tools.verifyToken = (token) => {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return false;
	}
};

module.exports = tools;
