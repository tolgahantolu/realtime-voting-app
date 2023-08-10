import { gql } from "@apollo/client";

export const SUBSCRIPTION_QUESTIONS = gql`
  subscription getAllQuestions {
    questions(order_by: { id: desc }) {
      id
      title
    }
  }
`;
