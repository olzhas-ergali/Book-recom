const Book = require('../models/Book');

// @desc Get all books
// @route GET /api/books
// @access Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get book by ID
// @route GET /api/books/:id
// @access Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a book
// @route POST /api/books
// @access Private
const createBook = async (req, res) => {
  const { title, author, description } = req.body;

  try {
    const book = await Book.create({
      title,
      author,
      description
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update a book
// @route PUT /api/books/:id
// @access Private
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Delete a book
// @route DELETE /api/books/:id
// @access Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
