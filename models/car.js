const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
});


const CarModel = mongoose.model('car', CarSchema);

module.exports = CarModel;
