'use client'

import { Message, useChat } from 'ai/react'
import ReactMarkdown, { Options } from 'react-markdown'
import {
  User,
  Citrus,
  SendIcon,
  StopCircleIcon,
  LightbulbIcon,
} from 'lucide-react'
import { FC, memo, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Textarea from 'react-textarea-autosize'

export function useAtBottom(offset = 0) {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtBottom(
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - offset,
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

const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className,
)

const EmptyScreen = ({
  defaultValues,
  setInput,
}: {
  defaultValues: { id: number; message: string }[]
  setInput: (input: string) => void
}) => {
  return (
    <>
      <strong className="font-semibold text-[#582D1D]">
        Generate your first meal recipe by entering a prompt
      </strong>
      <p className="my-4 text-[#582D1D]">
        I can help you create you cook your next meal, just say what you want
        and I&apos;ll teach you how to make it!
      </p>
      <p className="text-[#582D1D]">
        Here are a few examples for you to get started:
      </p>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-scroll py-4 lg:overflow-auto">
        {defaultValues.map((val) => (
          <button
            key={val.id}
            className="group"
            onClick={() => setInput(val.message)}
          >
            <div className="min-h-[192px] w-[192px] max-w-[192px] overflow-hidden rounded-lg border border-[#FFC182] bg-[#FFDFB5] px-4 py-2 transition-colors duration-200 ease-out group-hover:bg-[#FFD19A]">
              <div className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#FFC182] bg-[#FFEFD6] shadow">
                <LightbulbIcon />
              </div>
              <p>{val.message}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}

const ChatMessages = ({
  messages,
  setInput,
  defaultValues,
}: {
  messages: Message[]
  setInput: (input: string) => void
  defaultValues: { id: number; message: string }[]
}) => {
  return (
    <>
      {messages.length ? (
        messages.map((m) => (
          <div
            className="my-4 rounded-lg border border-[#FFC182] bg-[#FFDFB5] px-4"
            key={m.id}
          >
            <div className="flex flex-col gap-2 py-4 lg:flex-row">
              <div className="my-2 flex size-12 items-center justify-center rounded-full border border-[#FFC182] bg-[#FFEFD6] p-2.5 lg:mx-2 lg:my-0">
                {m.role === 'user' ? (
                  <User className="size-8 text-orange-900" />
                ) : (
                  <Citrus className="size-8 text-orange-900" />
                )}
              </div>
              <div>
                <MemoizedReactMarkdown>{m.content}</MemoizedReactMarkdown>
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyScreen defaultValues={defaultValues} setInput={setInput} />
      )}
    </>
  )
}

const PromptForm = ({
  handleSubmit,
  input,
  handleInputChange,
  isLoading,
  stop,
}: {
  handleSubmit: React.FormEventHandler
  input: string
  setInput: (input: string) => void
  isLoading: boolean
  handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement>
  stop: () => void
}) => {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <form
        onSubmit={handleSubmit}
        className="mx-4 my-4 flex min-w-[284px] max-w-screen-md items-center justify-between rounded-lg border border-[#FFC182] bg-[#FFDFB5]/50 px-2 backdrop-blur focus:outline lg:mx-auto"
      >
        <Textarea
          className="lg:flex-0 inline-flex flex-1 resize-none rounded-md bg-transparent px-4 py-[0.85rem] align-middle font-medium text-[#CC4E00] outline-none placeholder:text-[#CC4E00]/50"
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
            className="inline-flex size-9 items-center justify-center rounded-md border border-[#FFC182] bg-[#FFDFB5] p-1 font-medium text-orange-900 focus-visible:outline focus-visible:outline-orange-200"
          >
            <StopCircleIcon />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex size-9 items-center justify-center rounded-md border border-[#FFC182] bg-[#FFDFB5] p-1 font-medium text-orange-900 focus-visible:outline focus-visible:outline-orange-200"
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
    {
      id: 0,
      message:
        'Develop a hearty and comforting stew inspired by French cuisine.',
    },
    {
      id: 1,
      message:
        "Create a one-pot Thai dish that's perfect for a weeknight meal.",
    },
    {
      id: 2,
      message: 'Design a vegetarian appetizer platter with global influences.',
    },
  ]

  useEffect(() => {
    if (isAtBottom && isLoading && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      })
    }
  }, [inView, entry, isAtBottom, isLoading])

  return (
    <div className="mx-auto flex flex-col lg:max-w-screen-xl lg:px-8">
      <main className="flex flex-col">
        <div className="relative mx-auto w-full max-w-2xl px-4 pb-[200px] pt-4">
          <ChatMessages
            defaultValues={defaultValues}
            messages={messages}
            setInput={setInput}
          />
        </div>
        <div ref={ref} className="h-px w-full" />
        <PromptForm
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          stop={stop}
        />
      </main>
    </div>
  )
}
