import React, {useState,useEffect} from 'react';
import './App.css';
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';


  const ALAN_STUDIO_API_KEY = 'aa856e46325a9d45155b32be4db5371d2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1);
  const classes = useStyles();
  

  useEffect(() => {
    alanBtn({
      key: ALAN_STUDIO_API_KEY,
      onCommand: ({command, articles}) => {
        if(command === 'newHeadlines'){
          setnewsArticles(articles);
          setactiveArticle(-1);
        }else if(command === 'highlight'){
          setactiveArticle((prevActiveArticle) => prevActiveArticle +1 );
        }
      },
      rootEl: document.getElementById("alan-btn")
    });
  }, [])

  return (
    <div className="App">
        <div className={classes.logoContainer}>
          <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
        </div>
        <NewsCards activeArticle={activeArticle} articles={newsArticles}/>
    </div>
  );
}

export default App;
