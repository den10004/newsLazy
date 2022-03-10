import Card from "./components/card/Card";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const { title, url, urlToImage } = [];
  const cardsSumma = 15; //количество рендеров карточек

  const [card, setCard] = useState(cardsSumma);
  const [news, setCards] = useState([]);
  let renderNews = [
    ...news.slice(0, cardsSumma),
    ...news.slice(cardsSumma, card),
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [card]);

  const handleScroll = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setCard(card + 1);
    }
  };

  useEffect(() => {
    const getCards = async () => {
      const res = await axios.get(
        "https://nomoreparties.co/news/v2/everything?language=ru&sortBy=publishedAt&pageSize=100&qInTitle=Россия&apiKey=10e8db0981ec4941becf1c27cd92454d"
      );
      setCards(res.data.articles);
    };
    getCards();
  }, []);

  return (
    <div className="App">
      <h1>Новости России</h1>
      <h3>Карточки добавляются по скроллу мыши</h3>
      <div className="wrapper">
        {renderNews.map((item, index) => (
          <Card
            key={index}
            item={item}
            title={title}
            urlToImage={urlToImage}
            url={url}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
