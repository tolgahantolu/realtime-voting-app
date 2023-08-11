import { gql } from "@apollo/client";

export const SUBSCRIPTION_QUESTIONS_DETAILS = gql`
  subscription getQuestionDetail($id: Int!) {
    questions_by_pk(id: $id) {
      id
      title
      options {
        id
        title
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const MUTATION_NEW_VOTE = gql`
  mutation newVote($input: votes_insert_input!) {
    insert_votes_one(object: $input) {
      id
      option_id
      option {
        title
      }
    }
  }
`;
