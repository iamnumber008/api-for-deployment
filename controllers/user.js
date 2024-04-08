const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.registerUser = (req, res) => {

	let newUser = new User({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10)
	});

	return newUser.save().then((user, err) => {
		if(err){
			return res.send(false);
		} else {
			return res.send(true);
		}
	})
	.catch(err => err);
};

// module.exports.getAllUsers = (req, res) => {

// 	return User.find({}).then(result => {
// 		res.send(result);
// 	});
// }

module.exports.loginUser = (req, res) => {

	return User.findOne({ email: req.body.email }).then(result => {
		if(result === null){
			return res.send(false)
		} else {

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			if(isPasswordCorrect){

				return res.send({ access: auth.createAccessToken(result)})

			} else {
				return res.send(false);
			}
		}
	}).catch(err => res.send(err));
};

module.exports.retrieveUserDetails = async (req, res) => {

	return User.findById(req.user.id)
	.then(result => {
		result.password = "";
		return res.send(result);
	})
	.catch(err => res.send(err))
};

module.exports.setAdmin = async(req, res) => {
	try{

		await User.findByIdAndUpdate(req.params.id, { isAdmin: true });

		return res.send(true);
	}catch(error){
		res.send(500).json({ message: "An error has occured while trying to set User as admin." });
	}
};