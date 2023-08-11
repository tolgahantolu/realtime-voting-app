import { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { MUTATION_NEW_VOTE, SUBSCRIPTION_QUESTIONS_DETAILS } from "./queries";
import Loading from "../../components/Loading";

const QuestionDetail = () => {
  const { id } = useParams();
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [isVoted, setIsVoted] = useState(false);

  const { loading, error, data } = useSubscription(
    SUBSCRIPTION_QUESTIONS_DETAILS,
    {
      variables: {
        id,
      },
    }
  );

  const [addVote, { loading: loadingVote }] = useMutation(MUTATION_NEW_VOTE, {
    onCompleted: () => {
      setIsVoted(true);
    },
  });

  const handleClickVote = () => {
    addVote({
      variables: {
        input: {
          option_id: selectedOptionId,
        },
      },
    });
  };

  const totalVote = data?.questions_by_pk?.options.reduce(
    (acc, value) => acc + value.votes_aggregate.aggregate.count,
    0
  );

  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-2xl font-semibold">
        Something went wrong: {error.message}
      </p>
    );

  const {
    questions_by_pk: { options, title },
  } = data;

  return (
    <div>
      <h2 className="text-xl font-bold underline mb-5">{title}</h2>
      <div className="flex flex-col justify-center items-start gap-4">
        {options.map((option, i) => (
          <div key={i}>
            <label htmlFor={i}>
              <input
                type="radio"
                name="selected"
                value={option.id}
                id={i}
                onChange={(e) => setSelectedOptionId(e.target.value)}
                disabled={loadingVote}
              />
              <span>{option.title}</span>
            </label>

            {isVoted && (
              <div className="flex items-center gap-1">
                <progress
                  value={option.votes_aggregate.aggregate.count}
                  max={totalVote}
                />
                <span className="font-medium">
                  %
                  {(
                    (option.votes_aggregate.aggregate.count * 100) /
                    (totalVote === 0 ? 1 : totalVote)
                  ).toFixed(2)}{" "}
                  vote
                </span>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleClickVote}
          disabled={loadingVote || isVoted}
          className={`mt-2 px-4 py-2 rounded-md bg-indigo-500 ${
            isVoted && "bg-gray-500 opacity-50"
          } text-white`}
        >
          {isVoted ? "You've already voted" : "Add New Vote"}
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;
