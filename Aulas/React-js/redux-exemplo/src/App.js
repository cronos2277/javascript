import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Intervalo from './components/intervalo';
import Sorteio from './components/sorteio';
import Media from './components/media';
import Soma from './components/soma';

function App() {
  return (
    <div className="App">
      <h1>Exercício React-Redux</h1>
        <div className='linha'>            
              <Intervalo></Intervalo>            
        </div>
        <div className='linha'>          
          <Sorteio></Sorteio>
          <Media></Media>
          <Soma></Soma>
        </div>
        
    </div>
  );
}

export default App;
