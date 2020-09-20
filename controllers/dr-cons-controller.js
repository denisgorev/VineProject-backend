const DrinkConsump = require("../models/drink_consumption");

const createDC = async (req, res, next) => {
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
		photo: "https://www.meme-arsenal.com/memes/540a89cc082cfe1168fc3030f7bcc43d.jpg",
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
        DC = await DrinkConsump.find({_id: DCId})
        console.log("get request getDCbyId");
    } catch (err) {
        console.log(err);
        return next(err);
    }
    res.json({ drink: DC});

}

exports.getDCbyId = getDCbyId;
exports.createDC = createDC;
exports.getDCbyUserId = getDCbyUserId;
