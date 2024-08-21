import axios from "axios"; // to hit api of backend
import { useEffect, useState } from "react"; //to render the component/page/data
import SERVER_URL from "../ServerURL";
import { TbInfoSquareFilled } from "react-icons/tb";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

//Home is a component
const Home = () => {
  const [books, setBooks] = useState([]); //can store array objects
  const [loading, setLoading] = useState(false); //to show loading of page
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${SERVER_URL}/book`);
      console.log(resp.data);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        Book Store
      </h1>
      <div className="p-4">
        <Link to="/books/create">
          <MdLibraryAdd className="text-2xl" />
        </Link>

        <div className="flex justify-between items-center">
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-500 rounded-md">Author</th>
                  <th className="border border-slate-500 rounded-md">Title</th>
                  <th className="border border-slate-500 rounded-md">Sno.</th>
                  <th className="border border-slate-500 rounded-md">Year</th>
                  <th className="border border-slate-500 rounded-md">option</th>
                </tr>
              </thead>
              <tbody>
                {books.map((books, index) => {
                  return (
                    <tr key={books._id}>
                      <td className="border border-slate-500 rounded-md text-center">
                        {index + 1}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {books.author}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {books.title}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {books.year}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center flex p-3">
                        <Link to={`/books/${books._id}`}>
                          <TbInfoSquareFilled className="text-2xl text-red-600" />
                        </Link>

                        <Link to={`/books/edit/${books._id}`}>
                          <MdEditSquare className="text-2xl text-blue-600" />
                        </Link>

                        <Link to={`/books/Delete/${books._id}`}>
                          <RiDeleteBin6Fill className="text-2xl text-green-500" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
