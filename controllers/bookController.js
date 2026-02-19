const Book = require('../models/Book');

// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error('Get books error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error('Get book error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    if (!title || !author || !genre || price === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const book = await Book.create({ title, author, genre, price, inStock });
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    console.error('Create book error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error('Update book error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    await book.deleteOne();
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };