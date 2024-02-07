import { useState, useEffect } from "react";
import axios from "axios";
import weathericon from '../assets/weather.png'
import sunnyIcon from '../assets/sunny.png'
import {newsApi, weatherApi} from '../constant/url.ts'



interface NewsItem {
    title: string;
    urlToImage: string;
}


interface WeatherItem {
  title: string;
  weather: string;
  currentConditions: any | null;
}

const Hero: React.FC = () => {
  const [images, setImages] = useState<NewsItem[] | null>(null);
  const [weather, setWeather] = useState<WeatherItem | null>(null);
  const [active, setActive] = useState<number>(9);

  // calling the news api
  const getNewsData = async () => {
    try {
      const res = await axios.get(
        `${newsApi}`
      );
      const data = res.data.articles;
      const newData = data.filter(
        (item: NewsItem) => item.urlToImage !== null && item.urlToImage !== undefined
      ) as NewsItem[];
      setImages(newData);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  //calling the weather api 
  const getWeatherData = async () => {
    try {
      const res = await axios.get(
        `${weatherApi}`
      );
      const data = res.data;
      setWeather(data);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };


  useEffect(() => {
    getNewsData();
    getWeatherData()
  }, []);

  const handleNext = () => {
    let actIndex;
    if (active === ((images && images.length) || 0) - 1) {
      actIndex = 0;
    } else {
      actIndex = active + 1;
    }
    setActive(actIndex);
  };

//   useEffect(() => {
//     let timer = setTimeout(() => {
//       handleNext();
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, [active]);

console.log("Weather", weather)

//Converting Epoch Time to Actual Day and Date

const [formatData, setFormatDate] = useState("")
useEffect(() => {
  const sampleEpochTimestamp = weather?.currentConditions?.datetimeEpoch;
  const date = new Date(sampleEpochTimestamp * 1000); 
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDateString = date.toLocaleDateString(undefined, options);
  setFormatDate(formattedDateString);
}, [weather]);


  return (
    <>
      <section className="flex items-center justify-between w-full mt-16">
        <div className="flex items-start justify-between w-full gap-6">
          <div className="hot news flex flex-col flex-1 lg:h-[500px] ">
            <h2 className="text-5xl font-robo font-bold">Hot Topics</h2>
            <div className=" relative images min-w-full min-h-full  rounded-md my-4 shadow-2xl">
              {images?.length
                ? images.map((item, index) => (
                    <>
                    <img
                      key={index}
                      style={{ display: active === index ? "block" : "none" }}
                      src={item?.urlToImage}
                      className=" w-full h-full object-fill aspect-[4/4] rounded-md shadow-md"
                      alt={`News Image ${index + 1}`}
                    />
                    <h2 className="absolute blur-5 bottom-10 left-6 text-[36px] font-bold font-robo w-2/3 text-white" style={{ display: active === index ? "block" : "none" }} >{item?.title}</h2>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="weather flex flex-col lg:w-[330px] lg:h-[400px] ">
            <div className="text-3xl text-start font-robo font-bold text-[#2F80ED]">{formatData}</div>

            <div className="flex items-center justify-between w-full rounded-md shadow-custom px-10 mt-12 py-5">
                <div className="flex-col my-2">
                    <h2 className="font-robo text-3xl font-bold">17 C</h2>
                    <h2 className="font-robo text-lg font-bold">London, Uk</h2>
                </div>
                <div>
                    <img src={weathericon}></img>
                </div>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between w-1/2 px-2 my-3">
                    <h2 className="text-xl font-robo font-bold text-[#7F7F7F]">Thursday</h2>
                    <h3>
                        <img src={sunnyIcon} alt="" />
                    </h3>
                </div>
                <div className="flex items-center justify-between w-1/4 ">
                    <h2 className="text-xl font-robo font-bold">13</h2>
                    <h3 className="text-xl font-robo text-[#7F7F7F] font-bold">11</h3>
                </div>
                
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between w-1/2 px-2 my-3">
                    <h2 className="text-xl font-robo font-bold text-[#7F7F7F]">Thursday</h2>
                    <h3>
                        <img src={sunnyIcon} alt="" />
                    </h3>
                </div>
                <div className="flex items-center justify-between w-1/4 ">
                    <h2 className="text-xl font-robo font-bold">13</h2>
                    <h3 className="text-xl font-robo text-[#7F7F7F] font-bold">11</h3>
                </div>
                
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
