const UserService = require('./../../services/User');
const { createToken } = require('../../utils/JWTUtils');

const controller = {};

controller.register = async (req, res) => {
	//pasa los regex y valida los datos
	const fieldValidation = UserService.verifyRegisterFields(req.body);
	if (!fieldValidation.success) {
		return res.status(400).json(fieldValidation.content);
	}
	try {
		const { username, email } = req.body;
		//const photo = req.file.path;

		//verifica si existe 
		const userExists = await UserService.findOneByUsernameEmail(username, email);		
		if (userExists.success) {
			return res.status(409).json({
				error: 'Usuario ya existe '
			});
		}
		//registra
		const userRegistered = await UserService.register(req.body);

		if (!userRegistered.success) {
			return res.status(409).json(userRegistered.content);
		}
		return res.status(201).json(userRegistered.content);
	} catch (e) {
		return res.status(500).json({
			error: 'Internal Server Error'
		});
	}
};

controller.login = async (req, res) => {
	const fieldValidation = UserService.verifyLoginFields(req.body);
	if (!fieldValidation.success) {
		return res.status(400).json(fieldValidation.content);
	}

	try {
		const { identifier, password } = req.body;
		//buscar por email o usernme
		const userExists = await UserService.findOneByUsernameEmail(identifier, identifier);
		if (!userExists.success) {
			return res.status(404).json(userExists.content);
		}

		const user = userExists.content;

		if (!user.comparePassword(password)) {
			return res.status(401).json({
				error: 'Contraseña incorrecta'
			});
		}

		const token = createToken(user._id);

		const tokenRegistered = await UserService.registerToken(user, token);
		if (!tokenRegistered.success) {
			return res.status(409).json(tokenRegistered.content);
		}
		//retorna el token 
		return res.status(200).json({
			token: token
		});
	} catch (error) {
		return res.status(500).json({
			error: 'Internal server error'
		});
	}
};

module.exports = controller;
