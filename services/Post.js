const PostModel = require('../models/Post');

const service = {};
const multer = require('multer');

//verifications

service.verifyCreateFields = ({title ,description,price,category,location,rooms,bathrooms,capacity,commodities,user}) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'post created '
		}
	};
//todo verificar lo demas ---
	if (!title) {
		serviceResponse = {
			success: false,
			content: {
				error: 'Title is required'
			}
		};

		return serviceResponse;
	}
	return serviceResponse;
};

service.verifyUpdateFields = ({title , description,image,price,category,location,rooms,bathrooms,capacity,commodities}) => {
	let serviceResponse = {
		success: true,
		content: {}
	};
//verificar lo demas 
	if (!title && !description && !image && !price && !category && !location && !rooms && !bathrooms && !capacity && !commodities) {
		serviceResponse = {
			success: false,
			content: {
				error: 'All fields are empty'
			}
		};

		return serviceResponse;
	} 

	if (title) serviceResponse.content.title = title;
	if (description) serviceResponse.content.description = description;
	if (image) serviceResponse.content.image = image;
	if (price) serviceResponse.content.price = price;
	if (category) serviceResponse.content.category = category;
	if (location) serviceResponse.content.location = location;
	if (rooms) serviceResponse.content.rooms = rooms;
	if (bathrooms) serviceResponse.content.bathrooms = bathrooms;
	if (capacity) serviceResponse.content.capacity = capacity;
	if (commodities) serviceResponse.content.commodities = commodities;


	return serviceResponse;
};

service.verifyUserAuthority = (post, user) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Verified owner'
		}
	};

	if (!post.user._id.equals(user._id)) {
		serviceResponse = {
			success: false,
			content: {
				error: 'This post is not yours'
			}
		};
	}

	return serviceResponse;
};


//cruds services
service.create = async ({ title , description  ,price,category,location,rooms,bathrooms,capacity,commodities
}, userID) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Post created succesfully'
		}
	};

	try {
		const post = new PostModel({
			title , 
			description,
			price,
			category,
			location,
			rooms,
			bathrooms,
			capacity,
			commodities,
			//user
			
			user: userID
		});

		const postSaved = await post.save();

		if (!postSaved) {
			serviceResponse = {
				success: false,
				content: {
					error: 'Post not created'
				}
			};
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

//encontrar post por id 
service.findOneByID = async (_id) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Post Found'
		}
	};

	try {
		const post = await PostModel.findById(_id).populate('user', 'username _id').exec();

		if (!post) {
			serviceResponse = {
				success: false,
				content: {
					error: 'Post not found'
				}
			};
		} else {
			serviceResponse.content = post;
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

//encontrar posts de 1 user 
service.findAllByUserID = async (userID) => {
	let serviceResponse = {
		success: true,
		content: {}
	};

	try {
		const posts = await PostModel.find({ user: userID }).populate('user', 'username _id').exec();

		serviceResponse.content = posts;

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

service.addLike = async (post) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Post Liked!'
		}
	};

	try {
		post.likes += 1;
		const postUpdated = await post.save();

		if (!postUpdated) {
			serviceResponse = {
				success: false,
				content: {
					message: 'Post not Liked!'
				}
			};
		}

		return serviceResponse;
	} catch (error) {
		throw new Error('');
	}
};

//listar con paginacion
service.findAll = async (page, limit) => {
	let serviceResponse = {
		success: true,
		content: {}
	};

	try {
		const posts = await PostModel.find({}, undefined, {
			skip: page * limit,
			limit: limit,
			sort: [
				{
					createdAt: -1
				}
			]
		})
			.populate('user', 'username _id')
			.exec();

		serviceResponse.content = {
			posts,
			count: posts.length,
			page,
			limit
		};

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

service.updateOneByID = async (post, contentToUpdate) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Post Updated!'
		}
	};

	try {
		
		Object.keys(contentToUpdate).forEach((key) => {
			post[key] = contentToUpdate[key];
		});

		const updatedPost = await post.save();

		if (!updatedPost) {
			serviceResponse = {
				success: false,
				content: {
					error: 'error, couldnt update'
				}
			};
		}

		return serviceResponse;
	} catch (error) {
		throw error;
	}
};

service.deleteOneByID = async (_id) => {
	let serviceResponse = {
		success: true,
		content: {
			message: 'Post Deleted succesfully'
		}
	};

	try {
		const postDeleted = await PostModel.findByIdAndDelete(_id).exec();

		if (!postDeleted) {
			serviceResponse = {
				success: false,
				content: {
					error: 'Post not deleted'
				}
			};
		}

		return serviceResponse;
	} catch (error) {
		throw new Error('Internal Server Error');
	}
};

module.exports = service;
