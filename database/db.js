const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the messages collection
const messageSchema = new mongoose.Schema({
  roomid: String,
  username: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// log on connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});


// Create a model for the messages collection
const Message = mongoose.model('Message', messageSchema);

module.exports = {
  saveMessage: function (roomid, username, message) {
    // Create a new message document
    const newMessage = new Message({ roomid, username, message });
    // Save the message document to the messages collection
    return newMessage.save();
  },
  getMessages: function (roomid) {
    // Find all message documents that match the roomid
    return Message.find({ roomid }).sort({ createdAt: 'asc' }).exec();
  },
};
