'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { Remark } from 'react-remark'
import { User, Citrus } from 'lucide-react'

export function Chat() {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop,
    } = useChat({
        initialInput:
            'Hello! Its currently 5:00PM and I wanted to create a simple meal for my dinner so that I can go ahead and sleep later, make sure it is light and simple enough to make',
    })
    const chatParent = useRef(null)

    useEffect(() => {
        chatParent.current && autoAnimate(chatParent.current)
    }, [chatParent])

    const Result = () => {
        if (messages.length === 0) {
            return (
                <p className="text-center font-semibold text-orange-800/80">
                    Generate your first meal recipe by entering a prompt
                </p>
            )
        }

        return messages.map(m => (
            <div className='my-4' key={m.id}>
                <div className='flex flex-col lg:flex-row'>
                    <div className='mx-2 p-2.5 rounded-full bg-orange-100 size-12 flex items-center justify-center'>
                        {m.role === 'user' ? <User className='text-orange-900 size-8' /> : <Citrus className='text-orange-900 size-8' />}
                    </div>
                    <div className='basis-full bg-orange-50 rounded-lg px-4 '>
                        <Remark>
                            {m.content}
                        </Remark>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className="mx-auto flex h-full flex-col md:h-fit lg:max-w-screen-xl lg:px-8">
            <div className="h-full gap-x-4 md:h-fit lg:flex-row">
                <div className="z-10 mx-auto flex h-full flex-col justify-between rounded-lg border p-2 px-6 shadow md:mt-4 md:h-fit lg:max-w-screen-sm">
                    <div className="flex max-h-[60svh] flex-col">
                        <div className="my-4 min-h-32 overflow-y-auto rounded-lg p-4  md:max-w-screen-sm">
                            <div className='prose prose-orange lg:prose-xl'>
                                <Result />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-y-4">
                        <textarea
                            className="inline-flex min-h-48 rounded-md border border-orange-800 px-3 py-1.5 text-xl font-medium text-orange-800 outline-2 outline-offset-2 placeholder:text-orange-800/50 focus-visible:outline-2 focus-visible:outline-orange-500"
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
                                className="h-9 rounded-md border border-orange-800 px-3  py-1.5 font-medium text-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                            >
                                Stop
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="h-9 rounded-md border border-orange-800 px-3  py-1.5 font-medium text-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
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
