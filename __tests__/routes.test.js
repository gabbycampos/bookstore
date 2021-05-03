process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

beforeEach(async function () {
    let u1 = await Book.create({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking Hidden Math in Video Games",
      year: 2017
    });
  });

  // GET
  describe("GET books/", function() {
      test("get all books", async function() {
          let resp = await request(app).get("/books");

          expect(resp.statusCode).toBe(200);
          expect(resp.body.books).toHaveLength(1);
          expect(resp.body.books[0]).toHaveProperty("title");
      });
  });
  // GET single book
describe("GET books/:isbn", function() {
    test("return one book", async function() {
        let resp = await request(app).get("/books/0691161518");
        expect(resp.statusCode).toBe(200);
        expect(resp.body.book).toHaveProperty("isbn");
        expect(resp.bocy.book.isbn).toBe("0691161518");
    });
    test("Invalid isbn", async function() {
        let resp = await request(app).get("/books/0691161518");

        expect(resp.statusCode).toBe(404);
    });
});

// POST create a book





  afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });
  
  afterAll(async function () {
    await db.end();
  });