import "./App.css";
import HeroContent from "./components/HeroContent";
import SearchbarHome from "./components/SearchbarHome";

function App() {
  return (
    <div className="App">
      <div class="bg-home bg-no-repeat bg-cover bg-center shadow-lg pb-16 bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased">
        <div class="flex  w-full">
          <h1 class="text-left font-bold text-white text-4xl mt-5">
            Stay Connected
          </h1>
        </div>
        <div>
          <p class="mx-auto font-normal text-sm my-6 max-w-lg">
            Free mobile roaming in 121 countries
          </p>
        </div>
        <div class="flex justify-center w-full ">
          <SearchbarHome />
        </div>
      </div>
      <div className="lg:mx-48 lg:mt-10 mt-5 pl-5">
        <div className="font-bold  flex justify-start text-left text-xl lg:text-3xl ">
          Book a room and get 1GB FREE data for roaming. DAILY.
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
}

export default App;
