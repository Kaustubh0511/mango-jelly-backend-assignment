const Comic = require('../models/comic');

// Create a new comic
const createComic = async (req, res) => {
  try {
    const newComic = new Comic(req.body);
    const savedComic = await newComic.save();
    res.status(201).json(savedComic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comics with pagination and filtering
const getComics = async (req, res) => {
  try {
    const { authorName, yearOfPublication, price, condition } = req.query;
    const filter = {};
    if (authorName) filter.authorName = authorName;
    if (yearOfPublication) filter.yearOfPublication = yearOfPublication;
    if (price) filter.price = { $lte: price };
    if (condition) filter.condition = condition;

    const comics = await Comic.find(filter).limit(10); // Add pagination logic here
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a comic by ID
const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json(comic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a comic
const updateComic = async (req, res) => {
  try {
    const updatedComic = await Comic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedComic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comic
const deleteComic = async (req, res) => {
  try {
    await Comic.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Comic deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComic, getComics, getComicById, updateComic, deleteComic };
