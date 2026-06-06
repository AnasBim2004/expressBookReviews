const express = require('express');
const general = express.Router();

// Local book database (same as in auth_users.js)
let books = {
    "1": {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "reviews": {}},
    "2": {"title": "To Kill a Mockingbird", "author": "Harper Lee", "reviews": {}},
    "3": {"title": "1984", "author": "George Orwell", "reviews": {}}
};

// Helper to simulate async data fetch (using Promise)
const getBooksAsync = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(books), 10);
    });
};

// GET all books
general.get("/books", async (req, res) => {
    const allBooks = await getBooksAsync();
    res.json(allBooks);
});

// GET book by ISBN
general.get("/books/isbn/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    const allBooks = await getBooksAsync();
    if (allBooks[isbn]) {
        res.json(allBooks[isbn]);
    } else {
        res.status(404).json({message: "Book not found"});
    }
});

// GET books by author
general.get("/books/author/:author", async (req, res) => {
    const author = req.params.author;
    const allBooks = await getBooksAsync();
    let result = {};
    for (let id in allBooks) {
        if (allBooks[id].author === author) {
            result[id] = allBooks[id];
        }
    }
    res.json(result);
});

// GET books by title
general.get("/books/title/:title", async (req, res) => {
    const title = req.params.title;
    const allBooks = await getBooksAsync();
    let result = {};
    for (let id in allBooks) {
        if (allBooks[id].title === title) {
            result[id] = allBooks[id];
        }
    }
    res.json(result);
});

// GET reviews for a book by ISBN
general.get("/books/review/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    const allBooks = await getBooksAsync();
    if (allBooks[isbn]) {
        res.json({reviews: allBooks[isbn].reviews});
    } else {
        res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = general;