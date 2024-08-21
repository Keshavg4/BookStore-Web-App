import { useState } from "react";
import axios from "axios";
import SERVER_URL from "../ServerURL";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { enqueueSnackbar } from "notistack";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      const data = { title, author, year };
      setLoading(true);
      const resp = await axios.post(`${SERVER_URL}/book`, data);
      console.log(resp.data);
      setLoading(false);
      enqueueSnackbar("Book added Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        ADD New Book
      </h1>
      <BackButton />
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-200 rounded-sm w-[600px] p-4 mx-auto my-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-400">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-400">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-400">Publish Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <button
          className="text-2xl bg-sky-900 text-white p-2 text-center rounded-sm"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </>
  );
};
export default AddBook;
