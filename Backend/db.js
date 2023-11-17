const mongoose = require('mongoose');


const connection = mongoose.connect('mongodb+srv://shubhambhargav10:Shubham10091995@cluster0.tcuh0z6.mongodb.net/vivadb?retryWrites=true&w=majority')


module.exports = {connection}