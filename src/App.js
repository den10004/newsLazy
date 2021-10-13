import Card from './components/card/Card'
import './App.css';
import json from './news.json'
import { useState, useEffect } from 'react';

function App() {
  const news = json.articles
  const title = json.title
  const id = json.id
  const raiting = json.raiting
  const urlToImage = json.urlToImage
  const cardsSumma = 15 //количество рендеров карточек

  const [card, setCard] = useState(cardsSumma);
  let renderNews = [...news.slice(0, cardsSumma), ...news.slice(cardsSumma, card)]



  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [card]);



  const handleScroll = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setCard(card + 1)
    }
  };


  return (
    <div className="App">
      <h1>Новости</h1>
      <h3>Карточки добавляются по скроллу мыши или кнопкой</h3>
      <button onClick={() => setCard(card + 1)}>Добавить карточки</button>
      <div className="wrapper">
        {renderNews.map((item, index) =>
          <Card key={index} item={item} id={id} raiting={raiting} title={title} urlToImage={urlToImage}/>
        )}

      </div>
    </div>
  );
}

export default App;


