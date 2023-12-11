import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [newBookName, setNewBookName] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:5000/books");
        const booksData = response.data;
        // console.log(booksData);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, []);

  async function deleteAll() {
    setLoading(true);

    try {
      await axios.delete("http://localhost:5000/books");
      setBooks([]); // Clear the books array after deletion
    } catch (error) {
      console.error("Error deleting books:", error);
    } finally {
      setLoading(false);
    }
  }
  async function addData(item) {
    setLoading(true);

    if (item !== "") {
      try {
        await axios.post("http://localhost:5000/books", item);
        setBooks((prev) => [...prev, item]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Book Collections</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h3>Add New Book</h3>
            <input onChange={(e) => setNewBookName(e.target.value)} />
            <button
              onClick={addData.bind(this, { book: newBookName })}
              type="submit"
            >
              Add
            </button>
          </form>
          {books.length < 1 ? (
            <p>No Books in the Database</p>
          ) : (
            <ul>
              {books.map((item, index) => {
                return <li key={index}>{item.book}</li>;
              })}
            </ul>
          )}
          <button onClick={deleteAll}>Delete All</button>
        </div>
      )}
    </>
  );
}

export default App;
