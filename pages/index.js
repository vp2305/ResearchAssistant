import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [inputPrompt, setInputPrompt] = useState();
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const promptChangeListener = (event) => {
    setInputPrompt(event.target.value);
  }

  const OnGenerateButton = async () => {
    setIsGenerating(true);

    // console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputPrompt }),
    });

    const data = await response.json();
    const { output } = data; // Object destructuring.
    // console.log("OpenAI replied...", output.text);
    setApiOutput(`${output?.text}`);
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <Head>
        <title>Research Assistant | GPT-3 Writer </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Autonomous Research Assistant</h1>
          </div>
          <div className="header-subtitle">
            <h2>Leverage GPT-3 API to automatically generate research material and insights for a variety of industries, businesses and topics.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea className="prompt-box" placeholder='start typing here...' value={inputPrompt} onChange={promptChangeListener} />
          <div className="prompt-buttons">
            <div className="generate">
              {isGenerating ? <a className='generate-button loading'><span className='loader'></span></a> : <button className='generate-button' onClick={OnGenerateButton}>Generate</button>}
            </div>
          </div>
        </div>

        {apiOutput != "" && (
          <div className='output-content'>
            <div className='output-header-container '>
              <div className='output-header '>
                <h3>Output</h3>
              </div>
            </div>
            <p>{apiOutput}</p>
          </div>
        )}
      </div>

      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}

    </div>
  );
};

export default Home;
