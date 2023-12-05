import './App.css';
import { MyRoutes } from './Routes';
import { UserProvider } from './UserContext';

function App() {
  return (   
    <UserProvider>
        <MyRoutes/>
    </UserProvider>
  );
}

export default App;