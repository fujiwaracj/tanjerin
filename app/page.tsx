'use client';

import { useCompletion } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, stop } = useCompletion();

  return (
    <div className='flex flex-col mx-auto px-8 max-w-screen-xl'>
      <div className='flex gap-x-4'>

        <div className='rounded-lg z-10 backdrop-blur border p-2 mt-4 max-w-96 h-fit'>
          <div>
            <h3 className='text-base/4 font-semibold my-4 text-orange-800'>
              Generate you next dish using AI
            </h3>
          </div>
          <form onSubmit={handleSubmit} className='grid gap-y-4'>
            <textarea
              className='inline-flex rounded-md font-medium min-h-9 text-sm px-3 py-1.5 border placeholder:text-orange-800/50 bg-orange-100 border-orange-200 focus-visible:outline-orange-200 text-orange-800 focus-visible:outline outline-offset-2 outline-2'
              value={input}
              placeholder="What do you want to cook?"
              required
              disabled={isLoading}
              onChange={handleInputChange}
            />
            {isLoading ? <button type="button" onClick={stop} className='border rounded-md h-9 px-3 py-1.5  bg-orange-100  border-orange-200 text-orange-900 font-medium outline outline-2 focus-visible:outline-orange-200'>
              Stop
            </button>
              : <button type="submit" className='border rounded-md h-9 px-3 py-1.5 bg-orange-100  border-orange-200 text-orange-900 font-medium outline outline-2 focus-visible:outline-orange-200'>Submit</button>}
          </form>
        </div>
        <div className='my-4 overflow-y-auto max-h-[75svh] h-1/4 min-w-96 pt-4 pb-48 border rounded-lg shadow max-w-screen-sm'>
          <ReactMarkdown className="prose lg:prose-xl prose-orange px-4">
            {completion}
          </ReactMarkdown>
        </div>
      </div>
      <div className='max-w-prose'>
        <h3 className='text-base/4 font-semibold my-4 text-orange-800'>
          About
        </h3>
        <p>Tanjerin is a tool for generating artificially generated recipes using generative AI, go ahead and type out a simple prompt like <strong><em>"Hello! Its currently 5:00PM and I wanted to create a simple meal for my dinner so that I can go ahead and sleep later, make sure it is light and simple enough to make"</em></strong></p>
      </div>
    </div>
  );
}
