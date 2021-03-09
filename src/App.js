import React, { Component } from "react";
//The alert of  react-toastify just can working with edition in 4.1 not for newest version.
import { ToastContainer } from 'react-toastify';
import config from './config.json';
import http from './services/httpService';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

// We remove this part to httpService component.
//This is a global erro interceptor, this part will be call first when error happen. But the control will path back to handleDelete. Cause of it did the catch(ex) to catch the error.
// axios.interceptors.response.use( null,error=>{
//   const expectedError = error.response && error.response.status >=400  && error.response.status <500;
//   //!expectedError = unexpectedError.
//   if(!expectedError){
//     console.log("Logging the error",error);
//     alert("An unexpected error occurred");
//   };
//   return Promise.reject(error);
// })
//We remove this part to config component.
// const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

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
    const promise = http.get(config.apiEndpoint);
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
    const {data:post} = await http.post(config.apiEndpoint,ojc)
    // console.log(post);
    const posts = [post,...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    //In axios updating data use 'put' and 'patch'. The 'put' update the hole property. The 'patch' update a single or several property.
    await http.put(config.apiEndpoint + '/' + post.id, post);
    // axios.patch(apiEndpoint+'/'+post.id,{title:post.title});
    const posts = [...this.state.posts];
    //We use the index to find location of which one is the update one.
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({post})
  };

  handleDelete = async post => {
    //(2)Optmistic update delete more fast than (1).
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p=>p.id !== post.id);
    this.setState({posts});
    //cause we need test if we got error what kind of that error and undo the changes we did, so here we need to use try-catch block to catch the error.
    try{
      await http.delete(config.apiEndpoint + '/' +post.id);
    }
    catch(ex){
      // console.log("HANDLE DELETE CATCH BLOCK");
      if(ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      // ex.request 
      // ex.response
      //Expected(404:not found,400:bad request)-client error
      //-Display a specific error message
      //Unexpected(network down, server down, db down, bug)-unormal error
      //-Log them
      //-Display a generic and friendly error message
      // alert('Something failed while deleting a post');
      this.setState({ posts:originalPosts });
    }
    //(1)pessimistic update
    // //First step is delete the post from.
    // await axios.delete(apiEndpoint + '/' + post.id);
    // //Second step is delete from  the local form.
    // //We want to get all post exact the one which going to delete. And then update the posts.
    // const posts = this.state.posts.filter(p=>p.id !== post.id);
    // this.setState({posts});
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
