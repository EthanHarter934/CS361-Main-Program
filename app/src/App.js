import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="App">
      <NavBar />
      <div class="title-button">
        <h1>Website Title</h1>
        <button></button>
      </div>
    </div>
  );
}

export default App;

function NavBar() {
  return (
      <ul>
        <li><a href="default.asp">Home</a></li>
        <li><a href="recipes.asp">Saved Recipes</a></li>
      </ul>
  );
}