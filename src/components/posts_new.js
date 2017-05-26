import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    //destructured field.meta.touched, etc.
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={ className }>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  onSubmit = (values) => {
    //action creator should first come to mind
    //console.log("values", values);
    //call action creator below

    this.props.createPost(values, () => {
      //should redirect after post success
      this.props.history.push('/');
    });

  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          component={this.renderField}
          label="Title For Post"
        />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Post Content"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

//renderTitleField receives the `field` object which will come with some built in goodies (event handlers) to help with the jsx.

//field.input object contains eventhandlers and props
// spread operator allows all properties of object communicated to input tag.

//saves us from using onChange, onFocus, onBlur, etc.
function validate(values) {
  //console.log(values) --> {title: "stuff", cats, content}
  //must return object we create from validate function
  const errors = {};

  //validate inputs from 'values'
  if (!values.title) {
    errors.title = "Please Enter a Title"
  }
  if (!values.categories) {
    errors.categories = "Please Enter at Least One Category"
  }
  if (!values.content) {
    errors.content = "Please Enter Some Content to Your Blog"
  }

  //return errors object
  //if errors is an empty object, form WILL submit
  //if errors has properties, fails validation
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
