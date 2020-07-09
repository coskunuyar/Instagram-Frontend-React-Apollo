import {gql} from 'apollo-boost';

export const getUserQuery = gql`
    query geUser($id: ID){
        user(id: $id) {
            id
            username
            posts {
              id
              img
              numberOfLikes
              likes {
                id
                username
              }
              numberOfComments
              comments {
                id
                text
              }
            }
        }
    }
`;

export const likePostMutation = gql`
    mutation($postId: ID! , $userId: ID!){
        likePost(postId: $postId, userId: $userId) {
            id
        }
    }
`