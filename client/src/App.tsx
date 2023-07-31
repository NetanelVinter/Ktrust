import { Container, Spinner } from "react-bootstrap";
import styles from "./styles/notePage.module.css";
import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { User } from "./models/user";
import SignUpModal from "./components/signupModalComp";
import * as UserApi from "./api/userApi";
import LoginModal from "./components/LoginModelComp";
import NotePageLoggedInView from "./components/NotePageLoggedInView";
import NotePageLogoutView from "./components/NotePageLogoutView";
import stylesApp from "./styles/App.module.css";

function App() {

  const [LoggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [ShowSignUpModal, setShowSignUpModal] = useState(false);
  const [ShowLoginModal, setShowLoginModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        setIsLoading(true);
        const user = await UserApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
        alert(error);
      }
      finally
      {
        setIsLoading(false);
      }
    }

    fetchLoggedInUser();
  }, []);


  return (
    <div>
      <NavBar
        loggedInUser={LoggedInUser}
        onLoginClick={() => { setShowLoginModal(true) }}
        onLogoutClick={() => { setLoggedInUser(null) }}
        onSignUpClick={() => { setShowSignUpModal(true) }} />
      <Container className={`${styles.notePage} ${stylesApp.pageContainer}`}>
        <>
        {
          IsLoading && <Spinner animation='border' variant='primary' />
        }
        {
          !IsLoading && <> { LoggedInUser ? <NotePageLoggedInView/> : <NotePageLogoutView/> }</>
        }
        </>
      </Container>
      {
        ShowSignUpModal &&
        <SignUpModal onDismiss={() => setShowSignUpModal(false)} onSignUpSuccessful={(SignUpUser) => {
          setLoggedInUser(SignUpUser);
          setShowSignUpModal(false);
        }} />
      }
      {
        ShowLoginModal &&
        <LoginModal onDismiss={() => setShowLoginModal(false)} onLoginSuccessful={(LoggedInUser) => {
          setLoggedInUser(LoggedInUser);
          setShowLoginModal(false);
        }} />
      }
    </div>
  );
}

export default App;
