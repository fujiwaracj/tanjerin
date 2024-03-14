'use client'

import { Message, useChat } from 'ai/react'
import ReactMarkdown, { Options } from 'react-markdown'
import { User, Citrus, SendIcon, StopCircleIcon, LightbulbIcon } from 'lucide-react'
import { FC, memo, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Textarea from 'react-textarea-autosize'

export function useAtBottom(offset = 0) {
    const [isAtBottom, setIsAtBottom] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsAtBottom(
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - offset
            )
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [offset])

    return isAtBottom
}

const MemoizedReactMarkdown: FC<Options> = memo(ReactMarkdown, (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.className === nextProps.className)

const EmptyScreen = ({ defaultValues, setInput, }: { defaultValues: string[], setInput: (input: string) => void }) => {
    return (
        <>
            <strong className="font-semibold text-[#582D1D]">
                Generate your first meal recipe by entering a prompt
            </strong>
            <p className='text-[#582D1D] my-4'>
                I can help you create you cook your next meal,
                just say what you want and I&apos;ll teach you how to make it!
            </p>
            <p className='text-[#582D1D]'>
                Here are a few examples for you to get started:
            </p>
            <div className='flex gap-4 py-4 px-2 overflow-x-scroll'>
                <button onClick={() => setInput(defaultValues[0])}>

                    <div className='min-w-[192px] min-h-[192px] bg-[#FFDFB5] border-[#FFC182] border rounded-lg px-4 py-2'>
                        <div className="w-[40px] h-[40px] rounded-full inline-flex justify-center items-center border-[#FFC182] bg-[#FFEFD6] border shadow">
                            <LightbulbIcon />
                        </div>
                        <p>
                            {defaultValues[0]}
                        </p>
                    </div>
                </button>
                <button onClick={() => setInput(defaultValues[1])}>
                    <div className='min-w-[192px] min-h-[192px] bg-[#FFDFB5] border-[#FFC182] border rounded-lg px-4 py-2'>
                        <div className="w-[40px] h-[40px] rounded-full inline-flex justify-center items-center border-[#FFC182] bg-[#FFEFD6] border shadow">
                            <LightbulbIcon />
                        </div>
                        <p>
                            {defaultValues[1]}

                        </p>
                    </div>
                </button>
                <button onClick={() => setInput(defaultValues[2])}>
                    <div className='min-w-[192px] min-h-[192px] bg-[#FFDFB5] border-[#FFC182] border rounded-lg px-4 py-2'>
                        <div className="w-[40px] h-[40px] rounded-full inline-flex justify-center items-center border-[#FFC182] bg-[#FFEFD6] border shadow">
                            <LightbulbIcon />
                        </div>
                        <p>
                            {defaultValues[2]}
                        </p>
                    </div>
                </button>

            </div>
        </>
    )
}

const ChatMessages = ({ messages, setInput, defaultValues }: { messages: Message[], setInput: (input: string) => void, defaultValues: string[] }) => {
    return (
        <>
            {
                messages.length ? messages.map(m => (
                    <div className='my-4 bg-[#FFDFB5] border border-[#FFC182] rounded-lg px-4 ' key={m.id}>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='lg:mx-2 my-2 lg:my-0 p-2.5 rounded-full bg-[#FFEFD6] border border-[#FFC182] size-12 flex items-center justify-center'>
                                {m.role === 'user' ? <User className='text-orange-900 size-8' /> : <Citrus className='text-orange-900 size-8' />}
                            </div>
                            <div>
                                <MemoizedReactMarkdown>
                                    {m.content}
                                </MemoizedReactMarkdown>
                            </div>
                        </div>
                    </div>
                )) : (<EmptyScreen defaultValues={defaultValues} setInput={setInput} />)
            }

        </>
    )
}

const PromptForm = ({ handleSubmit, input, handleInputChange, isLoading, stop }: { handleSubmit: React.FormEventHandler, input: string, setInput: (input: string) => void, isLoading: boolean, handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement>, stop: () => void }) => {
    return (
        <div className="fixed bottom-0 inset-x-0">
            <form onSubmit={handleSubmit} className='backdrop-blur flex items-center justify-between border min-w-[284px] border-[#FFC182] bg-[#FFDFB5]/50 rounded-lg px-2 mx-4 my-4 focus:outline'>
                <Textarea
                    className="inline-flex flex-1 py-[0.85rem] px-4 rounded-md align-middle font-medium bg-transparent text-[#CC4E00] placeholder:text-[#CC4E00]/50 outline-none"
                    placeholder="Send a message."
                    required
                    onChange={handleInputChange}
                    value={input}
                    disabled={isLoading}
                />
                {isLoading ? (
                    <button
                        type="button"
                        onClick={stop}
                        className="inline-flex justify-center items-center p-1 size-9 rounded-md bg-[#FFDFB5] font-medium text-orange-900 border border-[#FFC182] focus-visible:outline focus-visible:outline-orange-200"
                    >
                        <StopCircleIcon />
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="inline-flex justify-center items-center p-1 size-9 rounded-md bg-[#FFDFB5] font-medium text-orange-900 border border-[#FFC182] focus-visible:outline focus-visible:outline-orange-200"
                        disabled={input.length === 0}
                    >
                        <SendIcon />
                    </button>
                )}
            </form>
        </div>
    )
}

export function Chat() {
    const {
        input,
        messages,
        handleSubmit,
        handleInputChange,
        isLoading,
        stop,
        setInput,
    } = useChat()
    const { ref, entry, inView } = useInView({
        trackVisibility: isLoading,
        delay: 100,
    })
    const isAtBottom = useAtBottom()
    const defaultValues = [
        'Develop a hearty and comforting stew inspired by French cuisine.',
        "Create a one-pot Thai dish that's perfect for a weeknight meal.",
        'Design a vegetarian appetizer platter with global influences.'
    ]

    useEffect(() => {
        if (isAtBottom && isLoading && !inView) {
            entry?.target.scrollIntoView({
                block: 'start'
            })
        }
    }, [inView, entry, isAtBottom, isLoading])

    return (
        <div className="mx-auto flex h-full flex-col md:h-fit lg:max-w-screen-xl lg:px-8">
            <div className="h-full gap-x-4 md:h-fit lg:flex-row">
                <div className="z-10 mx-auto flex h-full flex-col justify-between lg:rounded-lg  lg:py-2 lg:shadow md:mt-4 md:h-fit lg:max-w-screen-sm">
                    <main className="flex max-h-full flex-col">
                        <div className="min-h-32 overflow-y-auto rounded-lg p-4  md:max-w-screen-sm">
                            <div className='relative mx-auto max-w-2xl px-4 pb-[200px]'>
                                <ChatMessages defaultValues={defaultValues} messages={messages} setInput={setInput} />
                                <div ref={ref} className='h-px w-full' />
                            </div>
                        </div>
                        <PromptForm handleSubmit={handleSubmit} input={input} setInput={setInput} isLoading={isLoading} handleInputChange={handleInputChange} stop={stop} />
                    </main>
                </div>
            </div>
        </div>
    )
}
