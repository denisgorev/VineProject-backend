const DrinkConsump = require("../models/drink_consumption");

const dateGetter = () => {
	let d = new Date();
	let day = d.getDate();
	let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return date = day + "." + month + "." + year;
    
};
const createDC = async (req, res, next) => {
    console.log(req.file.path)
	const {
		// user,
		name,
		alcoKind,
		alcoType,
		country,
		placeOfConsumption,
		rate,
		appetizer,
		comment,
		// photo,
	} = req.body;

	const createdDC = new DrinkConsump({
		user: "u1",
		name,
		alcoKind,
		alcoType,
		country,
		placeOfConsumption,
		rate,
		appetizer,
		comment,
		date: dateGetter(),
		photo: 'http://192.168.0.16:5000/' + req.file.path,
	});

	try {
		console.log("creation of DC");
		await createdDC.save();
	} catch (err) {
		console.log(err);
		return next(err);
	}

	res.status(201).json({ drinkConsumption: createdDC });
};

const getDCbyUserId = async (req, res, next) => {
	const userId = req.params.uid;
	let DCs;
	try {
		DCs = await DrinkConsump.find({ user: userId });
		console.log("get request getDCbyUserId");
	} catch (err) {
		console.log(err);
		return next(err);
	}
	res.json({ drinkCons: DCs.map((DC) => DC.toObject({ getters: true })) });
};

const getDCbyId = async (req, res, next) => {
	const DCId = req.params.did;
	let DC;
	try {
		DC = await DrinkConsump.find({ _id: DCId });
		console.log("get request getDCbyId");
	} catch (err) {
		console.log(err);
		return next(err);
	}
	res.json({ drink: DC });
};

const deleteById = async (req, res, next) => {
	const CDId = req.params.did;

	try {
		await DrinkConsump.findByIdAndDelete(CDId);
	} catch (err) {
		console.log(err);
		return next(err);
	}
	res.json({ message: "successfully deleted" });
};


exports.getDCbyId = getDCbyId;
exports.deleteById = deleteById;
exports.createDC = createDC;
exports.getDCbyUserId = getDCbyUserId;
