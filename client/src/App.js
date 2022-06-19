import './App.css';
import Header from 'components/Header';
import CodeSpace from 'components/CodeSpace'
import languages  from 'assets/data/Languages.js'
import { useState } from 'react';

function App() {
  const [CurrLang, setCurrLang] = useState(languages.cpp);
  // const [CurrLang, setCurrLang] = useState(languages.java);
  // const [CurrLang, setCurrLang] = useState(languages.python);
  // const [CurrLang, setCurrLang] = useState(languages.javascript);
  //If an invalid language is mentioned, then a blank white screen will appear !
  const handleChangeLang = (name) => {
    if(name!==CurrLang.name){
      setCurrLang(languages.filter((lang)=>lang.name === name));
    }
  }

  return (
    <div className="App">
      <Header/>
      <CodeSpace changeLang = {handleChangeLang} currLang={CurrLang}/>
      <Header/>
    </div>
  );
}

export default App;
