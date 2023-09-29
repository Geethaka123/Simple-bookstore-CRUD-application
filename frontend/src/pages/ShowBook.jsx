import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <BackButton />
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-3xl my-4 text-center">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-[#0e7490] rounded-xl w-fit p-4 bg-transparent">
            <div className="my-4">
              <span className="text-xl mr-4 text-[#0e7490]">Id :</span>
              <span>{books._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-[#0e7490]">Title :</span>
              <span>{books.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-[#0e7490]">author :</span>
              <span>{books.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-[#0e7490]">Publish Year :</span>
              <span>{books.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-[#0e7490]">Create Time :</span>
              <span>{new Date(books.createdAt).toString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-[#0e7490]">
                Last Update Time:
              </span>
              <span>{new Date(books.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
