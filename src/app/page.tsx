'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Markdown from 'react-markdown';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [chatHeight, setChatHeight] = useState('100%');
  const [loading, setLoading] = useState(false);
  const questionRef = useRef(question);
  const loadingRef = useRef(loading);
  const router = useRouter();

  const submitQuestion = () => {
    if (loading || loadingRef.current) return;
    if (!questionRef.current) return;
    setLoading(true);

    fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: questionRef.current }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.answer);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const loadAdobeDCView = () => {
      if ((window as any).AdobeDC) {
        const adobeDCView = new ((window as any).AdobeDC).View({ clientId: process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID });
        const previewFile = adobeDCView.previewFile({
          content: { location: { url: '/game-manual.pdf' } },
          metaData: { fileName: 'FTC Game Manual.pdf' }
        }, { embedMode: 'FULL_WINDOW' });

        window.onhashchange = () => {
          const hash = window.location.hash;
          if (hash) {
            const page = hash.split('#')[1];
            previewFile.then((adobeViewer: any) => {
              adobeViewer.getAPIs().then((apis: any) => {
                apis.gotoLocation(parseInt(page));
              });
            });
            window.location.hash = '';
          }
        }
      } else {
        setTimeout(loadAdobeDCView, 100);
      }
    }

    loadAdobeDCView();
  }, []);

  useEffect(() => {
    document.onkeypress = (e) => {
      if (document.activeElement === document.getElementById('question')) {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitQuestion();
        }
      }
    }

    document.onresize = () => {
      setChatHeight(`${window.innerHeight - document.getElementById('navbar')!.clientHeight - document.getElementById('footer')!.clientHeight}px`);
    }

    setChatHeight(`${window.innerHeight - document.getElementById('navbar')!.clientHeight - document.getElementById('footer')!.clientHeight}px`);
  }, []);

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  return (
    <>
      <div className="h-screen flex flex-col justify-between overflow-hidden">
        <div id="navbar" className="bg-white p-4 grid grid-cols-3 border-b-2">
          <img src="/first.png" className="h-10 w-auto" />
          <h1 className="my-auto font-display text-xl text-center font-medium justify-center">Chat with the FTC Game Manual</h1>
          <div className="flex justify-between">
            <div />
            <a
              href="https://github.com/ts7n/ftc-manual"
              className="transition duration-200 flex gap-2 rounded-md bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-200"
            >
              <svg className="w-5 h-5 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
              <span className="my-auto">GitHub</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-10 flex-grow">
          <div id="adobe-dc-view" className="col-span-7 border-r" />
          <div className="flex flex-col col-span-3 border-l" style={{ height: chatHeight }}>
            <div className="p-4 gap-2 border-b">
              <p className="text-black/80 text-center text-md font-semibold">Intelligently search with AI</p>
              <textarea
                id="question"
                name="question"
                placeholder="e.g. what is the maximum robot size?"
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
                maxLength={100}
                className="transition duration-200 block my-3 w-full text-center rounded-md resize-none border-0 py-1.5 text-black/65 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={submitQuestion}
                className={
                  classNames(
                    loading
                      ? 'bg-gray-500/50 hover:bg-gray-500/50'
                      : 'bg-gray-600 hover:bg-gray-500',
                    'transition duration-200 rounded-md px-3 py-2 text-sm w-full text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
                  )
                }
                disabled={loading}
              >
                {!loading ? 'Ask GPT w/ embeddings' : 'Generating...'}
              </button>
            </div>
            <div className="flex-0 prose p-4 gap-2 border-t overflow-scroll text-sm text-black/65">
              <Markdown>{response}</Markdown>
            </div>
          </div>
        </div>

        <div id="footer" className="p-4 border-t-2 h-[3.85rem]">
          <p className="text-sm text-black/65 text-center">Not affiliated with FIRST. Created by <a className="transition-all duration-300 hover:underline hover:font-bold hover:bg-green-500 hover:text-white hover:decoration-green-700" href="https://teddylampert.com" target="_blank">Teddy Lampert</a>.</p>
        </div>
      </div>
    </>
  )
}
