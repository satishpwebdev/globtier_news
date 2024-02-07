import { useState, useEffect } from "react";
import axios from "axios";
import weathericon from "../assets/weather.png";
import sunnyIcon from "../assets/sunny.png";
import { newsApi, weatherApi } from "../constant/url.ts";

interface NewsItem {
  title: string;
  urlToImage: string;
}

interface WeatherItem {
  title: string;
  weather: string;
  currentConditions: any | null;
  days: any | null;
  resolvedAddress: any | null;
}

const Hero: React.FC = () => {
  const [images, setImages] = useState<NewsItem[] | null>(null);
  const [weather, setWeather] = useState<WeatherItem | null>(null);
  const [active, setActive] = useState<number>(9);

  // calling the news api
  const getNewsData = async () => {
    try {
      const res = await axios.get(`${newsApi}`);
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
      const date = new Date();
      const startDate = date.toISOString().slice(0, 10);
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + 5);

      const EndDate = endDate.toISOString().slice(0, 10);

      const res = await axios.get(
        `${weatherApi}/India,Delhi/${startDate}/${EndDate}?key=4SZ6L9EPQV8GKM5LSSVGNJYYW&contentType=json`
      );
      const data = res.data;
      setWeather(data);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    getNewsData();
    getWeatherData();
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

  useEffect(() => {
    let timer = setTimeout(() => {
      handleNext();
    }, 4000);
    return () => clearTimeout(timer);
  }, [active]);

  console.log("Weather", weather);

  //Converting Epoch Time to Actual Day and Date

  const [formatData, setFormatDate] = useState("");

  function convertEpochTime(epochTime: any) {
    const sampleEpochTimestamp = epochTime;
    const date = new Date(sampleEpochTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    const formattedDateString = date.toLocaleDateString(undefined, options);
    setFormatDate(formattedDateString);
  }
  useEffect(() => {
    convertEpochTime(weather?.currentConditions?.datetimeEpoch);
  }, [weather]);

  // fahrenheit to celcius
  function fahrenheit(fah: any) {
    const celsius = Math.round(((fah - 32) * 5) / 9);
    return celsius;
  }

  //epoch day convert

  function epochDyConvert(epochTime: any) {
    const sampleEpochTimestamp = epochTime;
    const date = new Date(sampleEpochTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long"
    };
    const formattedDateString = date.toLocaleDateString(undefined, options);
    return formattedDateString;
  }

  return (
    <>
      <section className="flex items-center justify-between w-full mt-16">
        <div className="flex items-start justify-between w-full gap-6">
          <div className="hot news flex flex-col flex-1 lg:h-[465px] ">
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
                      <h2
                        className="absolute blur-5 bottom-10 left-6 text-[36px] font-bold font-robo w-2/3 text-white"
                        style={{ display: active === index ? "block" : "none" }}
                      >
                        {item?.title}
                      </h2>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="weather flex flex-col lg:w-[330px] lg:h-[400px] ">
            <div className="text-3xl text-start font-robo font-bold text-[#2F80ED]">{formatData}</div>

            <div className="flex items-center justify-between w-full rounded-md shadow-custom px-10 mt-12 py-5">
              <div className="flex-col my-2 gap-2">
                <h2 className="font-robo text-3xl font-bold">
                  {fahrenheit(weather?.currentConditions?.temp)}&deg;
                </h2>
                <h2 className="font-robo text-lg font-bold">{weather?.resolvedAddress}</h2>
              </div>
              <div>
                <img src={weathericon}></img>
              </div>
            </div>
            {weather?.days?.slice(1,6).map((det: any) => (
              <div className="flex items-center justify-between w-full mt-5">
                <div className="flex items-center justify-between w-1/2 px-2 my-2">
                  <h2 className="text-xl font-robo font-bold text-[#7F7F7F]">
                    {epochDyConvert(det.datetimeEpoch)}
                  </h2>
                  <h3>
                    <img src={sunnyIcon} alt="" />
                  </h3>
                </div>
                <div className="flex items-center justify-between w-1/4 ">
                  <h2 className="text-xl font-robo font-bold">{fahrenheit(det?.tempmax)}&deg;</h2>
                  <h3 className="text-xl font-robo text-[#7F7F7F] font-bold">
                    {fahrenheit(det?.tempmin)}&deg;
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
