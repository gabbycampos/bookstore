process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

beforeEach(async function () {
    let u1 = await Book.create({
      isbn: "069116151",
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





  afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
  });
  
  afterAll(async function () {
    await db.end();
  });