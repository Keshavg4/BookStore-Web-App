import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddBook from "./Pages/AddBook";
import EditBook from "./Pages/EditBook";
import DeleteBook from "./Pages/DeleteBook";
import ShowBook from "./Pages/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/books/Create" element={<AddBook />}></Route>
      <Route path="/books/edit/:id" element={<EditBook />}></Route>
      <Route path="/books/Delete/:id" element={<DeleteBook />}></Route>
      <Route path="/books/:id" element={<ShowBook />}></Route>
    </Routes>
  );
};
export default App;
