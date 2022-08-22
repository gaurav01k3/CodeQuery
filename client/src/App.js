import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import './styles/common.css'
import AskQuestion from './components/Question/AskQuestion';
import Cookies from 'js-cookie'
import RequireLogin from './requireLogin';
import Home from './Pages/Home';
import Question from './Pages/Question';
import { ReactQueryDevtools } from 'react-query/devtools'
import Footer from './components/Footer/Footer';
import Profile from './Pages/Profile';
import ArticleContainer from './Pages/ArticleContainer';
import Write from './Pages/Write';
import WriteArticle from './components/Article/WriteArticle';
import Article from './Pages/Article';
import FOF from './Pages/FOF';

const Routing = () => {

  const [token, setToken] = useState(Cookies.get('CQ-token'));

  const location = useLocation();

  useEffect(() => {
    setToken(Cookies.get('CQ-token'));
  }, [location])


  return (
    <Routes>
      <Route exact path='/'
        element={
          <Fragment>
            <Home />
            <Footer />
          </Fragment>
        } />
      <Route exact path='/login'
        element={
          <Fragment>
            <Login />
          </Fragment>
        } />
      <Route exact path='/signup'
        element={
          <Fragment>
            <Signup />
          </Fragment>
        } />
      <Route exact path='/question/ask'
        element={
          <Fragment>
            <RequireLogin auth={token}>
              <AskQuestion />
              <Footer />
            </RequireLogin>
          </Fragment>
        } />
      <Route exact path='/write'
        element={
          <Fragment>
            <RequireLogin auth={token}>
              <Write />
              {/* <Footer /> */}
            </RequireLogin>
          </Fragment>
        } />
      <Route exact path='/write/question/ask'
        element={
          <Fragment>
            <RequireLogin auth={token}>
              <AskQuestion />
              {/* <Footer /> */}
            </RequireLogin>
          </Fragment>
        } />
      <Route exact path='/write/article'
        element={
          <Fragment>
            <RequireLogin auth={token}>
              <WriteArticle />
              {/* <Footer /> */}
            </RequireLogin>
          </Fragment>
        } />
      <Route exact path='/question/:id'
        element={
          <Fragment>
            <Question />
            <Footer />
          </Fragment>
        } />
      <Route exact path='/users/:user_id'
        element={
          <Fragment>
            {/* <RequireLogin auth={token}> */}
            <Profile />
            {/* </RequireLogin> */}
          </Fragment>
        } />
      <Route exact path='/articles'
        element={
          <Fragment>
            <ArticleContainer />
          </Fragment>
        } />
      <Route exact path='/article/:id'
        element={
          <Fragment>
            <Article />
          </Fragment>
        } />
      <Route exact path='*'
        element={
          <Fragment>
            <FOF />
          </Fragment>
        } />
    </Routes>
  )
}

const App = () => {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routing />
          <ReactQueryDevtools />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App