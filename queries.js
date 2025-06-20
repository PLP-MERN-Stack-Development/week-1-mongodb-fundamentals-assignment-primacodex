// Task 2: Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1949 } });

// Find books by a specific author
db.books.find({ author: "F. Scott Fitzgeral" });

// Update the price of a specific book
db.books.updateOne({ title: "The Great Gatsby" }, { $set: { price: 19.99 } });

// Delete a book by its title
db.books.deleteOne({ title: "Pride and Prejudice" });

// Task 3: Advanced Queries

// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 1937 } });

// Projection: return only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 });

// Sort books by price ascending
db.books.find().sort({ price: 1 });

// Sort books by price descending
db.books.find().sort({ price: -1 });

// Pagination - page 1 (first 5 books)
db.books.find().skip(0).limit(5);

// Pagination - page 2 (next 5 books)
db.books.find().skip(5).limit(5);

// Task 4: Aggregation Pipeline

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 },
]);

// Group books by decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          {
            $toString: {
              $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10],
            },
          },
          "s",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
    },
  },
]);

// Task 5: Indexing

// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Use explain to analyze query performance
db.books.find({ title: "The Great Gatsby" }).explain("executionStats");
