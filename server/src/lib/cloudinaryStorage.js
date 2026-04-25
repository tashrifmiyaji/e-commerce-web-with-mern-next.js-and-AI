const cloudinary = require("./cloudinary");
const { Readable } = require("stream");

const uploadToCloudinary = (buffer, folder = "general") => {
	try {
		return new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{ folder },
				(error, result) => {
					if (result) resolve(result);
					else reject(error);
				},
			);
			Readable.from(buffer).pipe(stream);
		});
	} catch (error) {
		console.error("Cloudinary img upload failed!:", error);
	}
};

const deleteFromCloudinary = async (publicId) => {
	
	try {
		if(!publicId) return;
	
		return await cloudinary.uploader.destroy(publicId);
	} catch (error) {
		console.error("Cloudinary delete failed!:", error);
	}
}

module.exports = { uploadToCloudinary, deleteFromCloudinary};
