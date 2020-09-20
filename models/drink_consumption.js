const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const drinkConsSchema = new Schema({
	user: {
		type: String,
		require: true,
    },
    name: {
        type: String,
        require: true
    },
	alcoKind: {
		type: String,
		require: true,
	},
	alcoType: {
		type: String,
		require: true,
	},
	country: {
		type: String,
		require: true,
	},
	placeOfConsumption: {
		type: String,
		require: false,
	},
	rate: {
		type: Number,
		require: true,
	},
	appetizer: {
		type: String,
		require: false,
	},
	comment: {
		type: String,
		require: false,
	},
	photo: {
		type: String,
		require: false,
    },
    date: {
        type: String, //подумать над типом
        require: false
    }
});

module.exports = mongoose.model('DrinkConsump', drinkConsSchema)
