"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [ids, setIds] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const res1 = await fetch(
          `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
        );

        const data = await res1.json();
        setIds(data);
      } catch (error) {
        console.error("ERROR fetching IDs", error);
      }
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (!ids) return;

    const fetchData = async () => {
      let allData: any[] = [];

      for (let i = 0; i < ids.length; i += 50) {
        const batch = ids.slice(i, i + 50);

        try {
          const response = await Promise.all(
            batch.map(async (id) => {
              const res2 = await fetch(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`
              );

              return res2.json();
            })
          );

          allData = [...allData, ...response];
          setData((prev) => [...prev, ...response]);
        } catch (error) {
          console.error("ERROR fetching batch", error);
        }
      }
    };

    fetchData();
  }, [ids]);

  return (
    <div className="flex flex-col max-w-xl mx-auto py-12">
      <h1 className="text-xl font-bold text-blue-500">TITLES</h1>
      <div className="mt-6">
        {data.map((story) => (
          <h3 key={story.id} className="p-2 border rounded-xl mb-4">{story.title || ""}</h3>
        ))}
      </div>
    </div>
  );
};

export default Page;
