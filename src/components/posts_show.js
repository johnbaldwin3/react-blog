import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';


class PostsShow extends Component {
  componentDidMount() {
    //provided from React Router (match params)
    //contains the wildcard route pieces (multiple if available)
    //can use if statment if you dont want to request x2
    //if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
  //  }
  }
  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });

  }
  render() {
    //could be done this way...
    //this.props.posts[this.props.match.params.id];
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/" className="btn btn-warning">Back To Main Page</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >Delete Post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}


//posts off of state, destructured
//first argument usually app state
//ownProps = props headed to component (PostsShow)
function mapStateToProps({ posts }, ownProps) {
  //return { posts }
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
