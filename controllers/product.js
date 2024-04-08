const Product = require("../models/Product");

module.exports.addProduct =  (req, res) => {

	let newProduct = new Product ({

		img: req.body.img,
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	});

	return newProduct.save().then((product, err) => {
		
		if(err){
			return res.send(false);
		} else {
			return res.send(true);
		}
	})
	.catch(err => res.send(err));
};

module.exports.getAllProduct = (req, res) => {
  return Product.find({})
    .then(result => {
      return res.send(result); // Send the result as JSON
    })
    .catch(err => res.send(err));
};


module.exports.getActiveProduct = async(req, res) => {

	try{

		let allActiveProducts = await Product.find({ isActive: true });

		return res.send(allActiveProducts);
	} catch (error) {
		res.status(500).json({ message: "An error has occured while retrieving all active Products." });
	}
};

module.exports.getSingleProduct = (req, res) => {
	return Product.findById(req.params.id).then(result => {
		return res.send(result);
	})
	.catch(err => res.send(err))
};


module.exports.updateProduct = async(req, res) => {

	let updatedProduct = {
		img: req.body.img,
		name : req.body.name,
		description	: req.body.description,
		price : req.body.price
	};

	return Product.findByIdAndUpdate(req.params.id, updatedProduct).then((product, error) => {

		if (error) {
			return res.send(false);

		} else {				
			return res.send(true);
		}
	})
	.catch(err => res.send(err))

};

module.exports.archiveProduct = async(req, res) => {

	try{

		await Product.findByIdAndUpdate(req.params.id, { isActive: false });

		return res.send(true);
	} catch(error){
		res.status(500).json({ message: "An error occured while trying to archive Product." });
	}
};

module.exports.activateProduct = async(req, res) => {

	try{

		await Product.findByIdAndUpdate(req.params.id, { isActive: true });

		return res.send(true);
	} catch(error){
		res.status(500).json({ message: "An error occured while trying to archive Product." });
	}
};