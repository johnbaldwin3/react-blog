import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderTitleField(field) {
    return(
      <div>
        <input
          type="text"
          {...field.input}
        />
      </div>
    )
  }
  render() {
    return (
      <form>
        <Field
          name="title"
          component={this.renderTitleField}
        />
      </form>
    )
  }
}

//renderTitleField receives the `field` object which will come with some built in goodies (event handlers) to help with the jsx.

//field.input object contains eventhandlers and props
// spread operator allows all properties of object communicated to input tag.

//saves us from using onChange, onFocus, onBlur, etc.

export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
