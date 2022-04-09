const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		
		title: {
			type: String,
			required: true
		},
		description: String,
		price: {
			type: Number,
			default: 0
		},
		category:String,
		location:String,
		rooms:Number,
		bathrooms:Number,
		capacity:Number,
		commodities:String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Post', PostSchema);
