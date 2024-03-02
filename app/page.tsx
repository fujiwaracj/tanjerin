'use client';

import { useCompletion } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, stop } = useCompletion({
    initialInput: 'Hello! Its currently 5:00PM and I wanted to create a simple meal for my dinner so that I can go ahead and sleep later, make sure it is light and simple enough to make'
  });

  return (
    <div className='flex flex-col mx-auto lg:px-8 lg:max-w-screen-xl md:h-fit h-full'>
      <div className='md:h-fit h-full lg:flex-row gap-x-4'>

        <div className='flex flex-col mx-auto justify-between rounded-lg z-10 border p-2 px-6 md:mt-4 h-full lg:max-w-screen-sm md:h-fit shadow'>
          <div className='flex flex-col max-h-[60svh]'>
            <div>
              <h3 className='text-base/4 font-semibold my-4 text-orange-800'>
                Generate you next dish using AI
              </h3>
            </div>
            <div className='my-4 overflow-y-auto bg-orange-100 border-orange-200 min-h-32 p-4 border rounded-lg shadow md:max-w-screen-sm'>
              {completion === '' ? <div className="text-center">Generate your first recipe by entering a prompt</div> : <ReactMarkdown className="prose lg:prose-xl prose-orange px-4">
                {completion}
              </ReactMarkdown>}
            </div>
          </div>
          <form onSubmit={handleSubmit} className='grid gap-y-4'>
            <textarea
              className='inline-flex rounded-md font-medium min-h-48 text-xl px-3 py-1.5 border placeholder:text-orange-800/50 bg-orange-100 border-orange-200 focus-visible:outline-orange-200 text-orange-800 focus-visible:outline outline-offset-2 outline-2'
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
      </div>
    </div>
  );
}
