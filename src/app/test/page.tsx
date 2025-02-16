"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const popularnews: any[] = [];
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
        );
        const data = await res.json();

        for (let i = 0; i < data.length; i++) {
          const currFetch = data[i];
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${currFetch}.json?print=pretty`
          );
          const news = await res.json();
          setNewsData((prev) => [...prev, news]);
        }
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="mb-6">{loading && "Loading..."}</div>
      <div className="flex flex-col gap-4">
        {newsData.map((news) => (
          <div key={news.id}>
            <h1 className="font-semibold">{news.title}</h1>
            <p className="text-blue-500">{news.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
