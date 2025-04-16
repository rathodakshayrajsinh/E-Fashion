const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        enum : ['pending', 'processing', 'shipped', 'completed', 'delievered', 'cancel'],
        type: String,
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('orders', OrderSchema);
