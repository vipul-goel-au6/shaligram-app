import React from 'react';

const ShowCommentsButton = ({post}) => {
    return (
        post ?
        <button style={{border:"none",background:"none",color:"#405de6",marginLeft:"15px"}}>
            View all {post.comments.length} comments

        </button> : <></>
    );
};

export default ShowCommentsButton;