import { gql } from "@apollo/client";

export const MUTATION_NEW_QUESTION = gql`
  mutation newQuestion($input: questions_insert_input!) {
    insert_questions_one(object: $input) {
      id
      title
    }
  }
`;
