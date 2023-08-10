import { useMutation } from "@apollo/client";
import { useState } from "react";
import { MUTATION_NEW_QUESTION } from "./queries";

const initialOptions = [{ title: "" }, { title: "" }];

const NewQuestion = () => {
  const [addQuestion, { loading }] = useMutation(MUTATION_NEW_QUESTION);

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = (e) => {
    const newArr = options;
    newArr[e.target.id].title = e.target.value;

    setOptions([...newArr]);
  };

  const handleSaveQuestion = () => {
    const filledOptions = options.filter((option) => option.title !== "");

    if (title === "" || filledOptions.length < 2) return;

    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });

    setTitle("");
    setOptions(initialOptions);
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-1">Question</h2>
      <input
        type="text"
        placeholder="Type your question..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full py-1 px-2 text-lg text-black rounded-md bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder:text-gray-500"
        disabled={loading}
      />

      <h2 className="text-xl font-medium mt-5">Options</h2>
      {options.map((option, i) => (
        <div key={i} className="">
          <input
            type="text"
            placeholder="Type your option..."
            value={option.title}
            id={i}
            onChange={handleChangeOption}
            className="w-full my-1 py-1 px-2 text-lg text-black rounded-md bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder:text-gray-500"
            disabled={loading}
          />
        </div>
      ))}

      <div className="inline-flex flex-col gap-3">
        <button
          onClick={() => setOptions([...options, { title: "" }])}
          className="mt-2 font-medium text-sm rounded-md bg-neutral-800 text-white p-2"
          disabled={loading}
        >
          Add Option
        </button>

        <button
          onClick={handleSaveQuestion}
          className="mt-8 px-4 py-2 rounded-md bg-indigo-500 text-white text-lg font-medium"
          disabled={loading}
        >
          Add New Question
        </button>
      </div>
    </div>
  );
};

export default NewQuestion;
