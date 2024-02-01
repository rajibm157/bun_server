import { Hono } from "hono";
import { bookService } from "~services";

const book = new Hono();

book.get("/", async (c) => {
  const data = await bookService.getAllBooks();
  return c.json(data);
});

book.get("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await bookService.getBookDetails(id);
  return c.json(data);
});

book.post("/", async (c) => {
  const body = await c.req.json();
  const data = await bookService.createBook(body);
  return c.json(data);
});

book.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const data = await bookService.updateBook(id, body);
  return c.json(data);
});

book.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await bookService.deleteBook(id);
  return c.json(data);
});

export default book;
