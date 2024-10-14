import { useState, type ChangeEvent } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Loader, MessageCircle, Send, Sparkles, X } from 'lucide-react';

import emailjs from '@emailjs/browser'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export function FeedbackButton() {
  const [isLoading, setIsLoading] = useState(false)

   async function handleSendEmail(event: ChangeEvent<HTMLFormElement>) {
    try {
      setIsLoading(true)
      event.preventDefault();

      console.log(event.target)

      await emailjs.sendForm('service_hgn8lgc', 'template_9tua4kk', event.target, 'PY3uh29f8mAij1mod');

      event.target.reset()
    } catch (error) {
      console.error('Sua mensagem não foi enviada.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSendEmail(event),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">
          <MessageCircle className="w-4 h-4 mr-1" fontWeight="bold"/>
          <span className="sr-only lg:not-sr-only text-foreground">Deixar feedback</span>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
      <Dialog.Overlay className="bg-zinc-950/70  fixed inset-0" />
        <Dialog.Content className="top-[50%] px-4 left-[50%] h-80 w-72 lg:w-96 translate-x-[-50%] translate-y-[-50%] rounded shadow-lg shadow-zinc-950 bg-background/80 fixed inset-0 flex space-y-5 py-5 flex-col" >
          <Dialog.Title className="font-medium text-foreground flex">
           <span className='flex gap-3'>Deixe seu feedback abaixo <Sparkles className='h-5 w-5 self-center text-foreground'/> </span>

           <Dialog.Close className='ml-auto outline-none border border-zinc-800 focus-within:border rounded focus-within:border-zinc-400 fixed right-3 top-3'>
              <X className='h-5 w-5 hover:text-zinc-400'/>
            </Dialog.Close>
          </Dialog.Title>

          {!isLoading ? 
          (<form action="" onSubmit={handleSendEmail} className='flex-col flex'>
            <Input type="text" name="name" required placeholder="Digite aqui seu nome" />

            <Textarea 
              placeholder='Digite aqui sua opnião...' name="description"
              required 
              className='bg-background resize-none h-32 w-full scrollbar-thumb-zinc-300 scrollbar-thin scrollbar-track-zinc-950 mt-2' 
            />

            <Button 
              type='submit'
              className='ml-auto mt-3 items-center'
            >
              Enviar feedback 
              <Send className='w-4 h-4 self-center ml-1.5'  /> 
            </Button>
          </form>
          ) : (
            <div className='flex items-center h-full justify-center'>
              <Loader className='animate-spin' />
            </div>
          )}
        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  )
}