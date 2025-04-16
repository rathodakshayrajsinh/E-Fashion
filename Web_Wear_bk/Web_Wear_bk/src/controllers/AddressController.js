const addressModel = require('../models/AddressModel')

const addAddress = async (req, res) => {
    try {
        const savedAddress = await addressModel.create(req.body);
        res.status(201).json({
            message: "Address created successfully",
            data: savedAddress,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllAddress = async (req, res) => {
    const allAddress = await addressModel.find().populate("userId").populate("areaId").populate("cityId").populate("stateId");
    res.status(200).send({
        message: "all Address",
        data: allAddress
    })
}

const getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await addressModel.find({ userId });

        res.status(200).json({ data: addresses });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const addOrUpdateAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const addressData = { ...req.body, userId };

        let address = await addressModel.findOneAndUpdate({ userId, title: addressData.title }, addressData, { 
            new: true, upsert: true 
        });

        res.status(200).json({ message: "Address updated successfully", data: address });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    addAddress,
    getAllAddress,
    getUserAddresses,
    addOrUpdateAddress
}