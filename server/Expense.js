const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    filename: {type: String, required: true},
    fileType: {type: String, enum:['image','pdf'], required: true},
    extractedText: {type: String, default: ''},
    category:{type: String, default: ''},
    amount: {type: Number, default: null},
    date: {type: Date, default: Date.now},
    isCustomCategory: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Expense', expenseSchema);