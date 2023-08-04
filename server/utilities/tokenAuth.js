var jwt = require("jsonwebtoken");
let privateKey = "ironmaiden";

module.exports =  (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
            console.log("here it is");
			const decoded = jwt.verify(token, privateKey);
			req.userId = decoded._id;
			next();
		} catch (err) {
			return res.status(403).json({
				message: 'No access',
			});
		}
	} else {
		return res.status(403).json({
			message: 'No access',
		});
	}
};