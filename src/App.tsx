import Content from "./components/Content";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
