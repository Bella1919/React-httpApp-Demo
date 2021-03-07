import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
class App extends Component {
  state = {
    posts: []
  };
  //componentDidMount is a good palce to call the server and get data.
  //Cause here use the await key word, so have to use the async to decorate infront of that function. And cause the componentDidMount()just a method of this class, so we can put the async infront.
  async componentDidMount() {
    //The promise is a object that holds result of  asynchronize operation.
    //Asynchronize operation is a operation that going to complete in the future.
    //When create promise it will in pending.Pending will be change to either resolved(success) or rejected(failure) case.
    //In axios geting data use 'get'.
    const promise = axios.get(apiEndpoint);
    //prmise.then()is a old way to get the result. 
    //Await is new way to do that.After get the promise result, we store it as response.
    //We use data which from response to rename as posts.
    const {data:posts} = await promise;
    //Use the console.log(response) to see the data.
    // console.log(response)
    //Finally to use setSate to update the posts
    this.setState({posts});

  };
  //Cause the handleAdd is a basicly property that we settinga as function. So we need put async in middle.
   handleAdd = async() => {
    //follow the data property to create the object
    const ojc = {title:'a',bady:'b'}
    //In axios create data use 'post'.
    const {data:post} = await axios.post(apiEndpoint,ojc)
    // console.log(post);
    const posts = [post,...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    //In axios updating data use 'put' and 'patch'. The 'put' update the hole property. The 'patch' update a single or several property.
    await axios.put(apiEndpoint + '/' + post.id, post);
    // axios.patch(apiEndpoint+'/'+post.id,{title:post.title});
    const posts = [...this.state.posts];
    //We use the index to find location of which one is the update one.
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({post})
  };

  handleDelete = async post => {
    //First step is delete the post from.
    await axios.delete(apiEndpoint + '/' + post.id);
    //Second step is delete from  the local form.
    //We want to get all post exact the one which going to delete. And then update the posts.
    const posts = this.state.posts.filter(p=>p.id !== post.id);
    this.setState({posts});
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
