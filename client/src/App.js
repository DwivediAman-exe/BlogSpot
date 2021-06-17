import { useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Nav from './components/Nav';
import Home from './pages/Home';
import Users from './pages/Users';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForget from './pages/auth/PasswordForget';
import Post from './pages/Post/Post';
import Profile from './pages/auth/Profile';
import SingleUser from './pages/SingleUser';
import PostUpdate from './pages/Post/PostUpdate';
import SinglePost from './pages/Post/SinglePost';
import SearchResults from './components/SearchResults';
import Lost from './pages/Lost';
import Footer from './components/Footer';

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : '',
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <Route exact path="/password/forgot" component={PasswordForget} />
        <PrivateRoute
          exact
          path="/password/update"
          component={PasswordUpdate}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
        <PrivateRoute
          exact
          path="/post/update/:postid"
          component={PostUpdate}
        />
        <Route exact path="/user/:username" component={SingleUser} />
        <Route exact path="/post/:postid" component={SinglePost} />
        <Route exact path="/search/:query" component={SearchResults} />
        <Route exact path="*" component={Lost} />
      </Switch>
      <Footer />
    </ApolloProvider>
  );
};

export default App;
