const Feedback = require('../models/Feedback');

// Tạo mới phản hồi
exports.createFeedback = async (req, res) => {
  try {
    const { userId, userName, content } = req.body;
    if (!userId || !userName || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const feedback = new Feedback({ userId, userName, content });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lấy danh sách feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 