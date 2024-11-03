"use client";
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Article } from "@/model/Article";
import AddItem from "@/components/AddItem";

interface ArticleType {
  _id: string;
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
}

const Page = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log("article", articles);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://growing-together.vercel.app";

  // console.log(baseUrl);



  useEffect(() => {
      const fetchArticles = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${baseUrl}/api/get-all-article`);
          console.log(response);
          const data = await response.json();
          if (data.success) {
            setArticles(data.articles); // Assuming the response has this structure
            console.log("article", articles);
          } else {
            setError("Failed to fetch videos");
            // console.log("article", articles);
          }
        } catch (err) {
          console.error(err); // Log the error
          toast({
            variant: "destructive",
            description: "Failed to fetch videos",
          });
          setError("An error occurred while fetching videos");
        } finally {
          setLoading(false);
        }
      };
    fetchArticles();
    console.log("article", articles);
  }, [baseUrl, articles]);

  const addArticle = (newArticle: ArticleType) => {
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  if (error) {
    return <div>{error}</div>; // Display any error messages
  }

  return (
    <div className="items mx-4 pt-5">
      <AddItem
        onAddArticle={addArticle}
        onAddVideo={() => {}} // Empty function since this page doesn't handle videos
      />
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-10 mx-auto">
        {articles.map((article) => (
          <Article
            key={article._id}
            videoSrc={article.link} // Use the actual video link
            description={article.description}
            tags={article.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
