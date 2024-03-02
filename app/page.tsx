'use client'

import { useCompletion } from 'ai/react'
import ReactMarkdown from 'react-markdown'

export default function Chat() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useCompletion({
    initialInput:
      'Hello! Its currently 5:00PM and I wanted to create a simple meal for my dinner so that I can go ahead and sleep later, make sure it is light and simple enough to make',
  })

  return (
    <div className="mx-auto flex h-full flex-col md:h-fit lg:max-w-screen-xl lg:px-8">
      <div className="h-full gap-x-4 md:h-fit lg:flex-row">
        <div className="z-10 mx-auto flex h-full flex-col justify-between rounded-lg border p-2 px-6 shadow md:mt-4 md:h-fit lg:max-w-screen-sm">
          <div className="flex max-h-[60svh] flex-col">
            <div>
              <h3 className="my-4 text-base/4 font-semibold text-orange-800">
                Generate you next dish using AI
              </h3>
            </div>
            <div className="my-4 min-h-32 overflow-y-auto rounded-lg border border-orange-200 bg-orange-100 p-4 shadow md:max-w-screen-sm">
              {completion === '' ? (
                <div className="text-center">
                  Generate your first recipe by entering a prompt
                </div>
              ) : (
                <ReactMarkdown className="prose prose-orange px-4 lg:prose-xl">
                  {completion}
                </ReactMarkdown>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-y-4">
            <textarea
              className="inline-flex min-h-48 rounded-md border border-orange-200 bg-orange-100 px-3 py-1.5 text-xl font-medium text-orange-800 outline-2 outline-offset-2 placeholder:text-orange-800/50 focus-visible:outline focus-visible:outline-orange-200"
              value={input}
              placeholder="What do you want to cook?"
              required
              disabled={isLoading}
              onChange={handleInputChange}
            />
            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                className="h-9 rounded-md border border-orange-200 bg-orange-100  px-3  py-1.5 font-medium text-orange-900 outline outline-2 focus-visible:outline-orange-200"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                className="h-9 rounded-md border border-orange-200 bg-orange-100 px-3  py-1.5 font-medium text-orange-900 outline outline-2 focus-visible:outline-orange-200"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
