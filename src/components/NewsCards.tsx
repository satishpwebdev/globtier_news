
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { newsApi } from "../constant/url.ts";

interface NewsItem {
  title: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
}

const NewsCards: React.FC = () => {
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);
  const newsContainerRef = useRef<HTMLDivElement | null>(null);

  const redirectToExternalLink = (externalLink: string) => {
    window.location.href = externalLink;
  };

  const getNewsData = async () => {
    try {
      const res = await axios.get(
        `${newsApi}/everything?domains=wsj.com,thenextweb.com&apiKey=cdc4fe1a4c32457d9317be6efee235b6`
      );
      const data = res.data.articles;
      const newData = data.filter(
        (item: NewsItem) => item.urlToImage !== null && item.urlToImage !== undefined
      ) as NewsItem[];
      setNews((prevNews) => (prevNews ? [...prevNews, ...newData] : newData));
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && news && visibleNews.length < news.length) {
      setVisibleNews((prevVisibleNews) => news.slice(0, prevVisibleNews.length + 4));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (newsContainerRef.current) {
      observer.observe(newsContainerRef.current);
    }

    return () => {
      if (newsContainerRef.current) {
        observer.unobserve(newsContainerRef.current);
      }
    };
  }, [newsContainerRef, news, visibleNews]);

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    setVisibleNews(news || []);
  }, [news]);

  console.log("NewsCard", visibleNews);

  // Rest of your component code remains unchanged
  function publishDuration(apires: any) {
    const publishDate = new Date(apires);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - publishDate.getTime();

    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);

    let timeAgo: string;

    if (minutesDifference < 60) {
      timeAgo = `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      timeAgo = `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(hoursDifference / 24);
      timeAgo = `${daysDifference} days Ago`;
    }

    return timeAgo;
  }

  return (
    <section className="md:py-8">
      <div className="lns md:py-5">
        <h2 className="md:text-4xl text-2xl font-robo font-bold pb-4 md:pb-0">Latest News</h2>
      </div>
      <div
        ref={newsContainerRef}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2"
      >
        {visibleNews?.map((item, index) => (
          <div
            key={index}
            onClick={() => redirectToExternalLink(item?.url)}
            className="bg-white p-1 cursor-pointer md:p-2"
          >
            <div className="flex flex-col items-center justify-center h-[100px] w-full md:h-[169px] rounded-md shadow-md card">
              <img
                src={item?.urlToImage}
                className="w-full h-full object-fill aspect-[4/4] rounded-md shadow-md"
                alt={`News Image ${index + 1}`}
              />
            </div>
            <h2 className="md:text-xl text-lg font-robo font-semibold py-4">
              {item.title.substring(0, 35) + "..."}{" "}
            </h2>
            <h2 className="font-robo text-[#7F7F7F] text-xs">{publishDuration(item.publishedAt)}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};







export default NewsCards;

