import React from 'react';
import {graphql} from 'react-apollo';
import {getUserQuery , likePostMutation} from '../queries/queries';
import {flowRight as compose} from 'lodash';

class Profile extends React.Component{
    getUserProfile(){
        if(this.props.getUserQuery.loading || this.props.getUserQuery.error){
            debugger;
            return <h1>Loading...</h1>;
        }else{
            debugger;
            return <div>
                <h2>{this.props.getUserQuery.user.username}</h2>
                    {this.props.getUserQuery.user.posts.map(post => {
                        return <div id={post.id}>
                                <img src={post.img} />
                                <p>Likes: {post.numberOfLikes}</p>
                                <p>Comments: {post.numberOfComments}</p>
                                <button onClick={() => { this.props.likePostMutation({
                                    variables: {
                                        postId: post.id,
                                        userId: this.props.userId,
                                    },
                                });
                                this.props.getUserQuery.refetch();
                                }}>Like Post</button>
                            </div>
                    })}
            </div>
        }
    }
    render(){
        return(this.getUserProfile());
    }
}

export default compose(
    graphql(getUserQuery, {name: "getUserQuery" , options: (props) => {
        return {
            variables: {
                id: props.userId
            }
        }
    }}),
    graphql(likePostMutation, {name: "likePostMutation"})
)(Profile);