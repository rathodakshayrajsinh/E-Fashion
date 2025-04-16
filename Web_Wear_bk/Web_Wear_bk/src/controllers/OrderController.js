const orderModel = require('../models/OrderModel');

const addOrder = async (req, res) => {
    try{
        const savedOrder = await orderModel.create(req.body);
        res.status(201).json({
            message: "Order created",
            data: savedOrder
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message
        });
    }
}

const getOrders = async (req, res) => {
    const allOrders = await orderModel.find().populate("userId");
    res.status(200).send({
        message: "All Orders",
        data: allOrders
    })
}

const getAllOrdersByUserId = async (req, res) => {
   try{
        const getOrders = await orderModel.find({userId: req.params.userId});
        res.status(200).send({
            message: "All Orders",
            data: getOrders 
        })
    }catch{
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Ensure the status is valid
        const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'delivered', 'cancel'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            data: updatedOrder,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error updating order status",
            data: err.message
        });
    }
};


module.exports = {
    addOrder,
    getOrders,
    getAllOrdersByUserId,
    updateOrderStatus
}