import {useState, useEffect} from 'react'
import axios from 'axios';
import { newsApi} from "../constant/url.ts";

interface NewsItem {
    title: string;
    urlToImage: string;
  }
  

const NewsCards: React.FC = () => {
  const [news, setNews] = useState<NewsItem[] | null>(null);

  const getNewsData = async () => {
    try {
      const res = await axios.get(`${newsApi}/everything?domains=wsj.com,thenextweb.com&apiKey=6f4bc9b064a24c8093dd1bedbe9743d1`);
      const data = res.data.articles;
      const newData = data.filter(
        (item: NewsItem) => item.urlToImage !== null && item.urlToImage !== undefined
      ) as NewsItem[];
      setNews(newData);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(()=>{
    getNewsData()
},[])

console.log("NewsCard", news)

  return (
    <section className="py-8">
      <div className="lns py-5">
        <h2 className="text-4xl font-robo font-bold">Latest News</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {news?.length ? news.map((item, index)=>(
      <div className="bg-white p-2">
      <div className="flex flex-col items-center justify-center w-full h-[169px] rounded-md shadow-md card">
        <img
          src={item?.urlToImage}
          className=" w-full h-full object-fill aspect-[4/4] rounded-md shadow-md"
          alt={`News Image ${index + 1}`}
        />
      </div>
      <h2 className='text-xl font-robo font-semibold py-4'>{item.title.substring(0,35) + "..."} </h2>
      <h2>Hello </h2>
    </div>
      )):""}
        
      </div>
    </section>
  );
};

export default NewsCards;
