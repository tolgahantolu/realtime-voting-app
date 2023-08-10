import { useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";

import Loading from "../../components/Loading";
import { SUBSCRIPTION_QUESTIONS } from "./queries";

const Questions = () => {
  const { loading, error, data } = useSubscription(SUBSCRIPTION_QUESTIONS);

  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-2xl font-semibold">
        Something went wrong: {error.message}
      </p>
    );

  const { questions } = data;

  return (
    <div>
      {questions.map(({ id, title }) => (
        <div key={id} className="">
          <Link to={`/q/${id}`}>{title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Questions;
