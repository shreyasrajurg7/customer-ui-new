import './App.css';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './ThemeContext';

import { auth, passwordResetEmail } from "./firebase";
function App() {
  
  return (
    <div className="App">
      <ThemeProvider>
      <Layout />
      </ThemeProvider>
    </div>
  );
}

export default App;
