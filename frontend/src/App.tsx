import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/auth/auth.page';
import { useAuth } from './store/action-creators/auth.action.creator';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Boards } from './pages/boards/boards.page';
import { CurrentBoard } from './pages/current-board/current-board.page';

function App() {
  const { isAuth } = useTypedSelector(state => state.authReducer);

  const { auth, isReady } = useAuth();
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch, auth]);

  useEffect(()=>{
  }, [isAuth, isReady]);
  
  return (
    <>
      {!isAuth && isReady ?
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes> :
        <Routes>
          <Route path="/" element={<Boards />}/>
          <Route path="board/:boardId" element={<CurrentBoard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
    </>
  )
}

export default App
