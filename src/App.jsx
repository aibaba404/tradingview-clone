import Sidebar from './components/Sidebar';
import ChartView from './components/ChartView';
import SearchBox from './components/SearchBox';
import Header from './components/Header';
import ChartComponent from './components/ChartComponent';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <SearchBox />
          <ChartView />
          <ChartComponent />

        </main>
      </div>
    </div>
  );
}

export default App;
