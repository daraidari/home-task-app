import {useState, useEffect} from 'react'
import Box from '@mui/joy/Box'
import Textarea from '@mui/joy/Textarea'
import IconButton from '@mui/joy/IconButton'
import LinearProgress from '@mui/joy/LinearProgress'
import ManageSearch from '@mui/icons-material/RocketLaunchRounded'
import Message from './components/Message'
import {getResponse} from './api'
import {SenderType, Article} from './interfaces'

const App = () => {
    const [text, setText] = useState('')
    const [fetching, setFetching] = useState(false)
    const [messages, setMessages] = useState<{text: string, type: SenderType, data: Article[]}[]>([])

    useEffect(() => {
        if (messages.length) {
            const id = messages.length - 1
            const item = document.querySelector(`[data-id="${id}"]`)

            if (item) {
                item.scrollIntoView({behavior: 'smooth'})
            }
        }
    }, [messages])

    const sendRequest = async () => {
        try {
            const result = await getResponse(text)

            if (result) {
                setMessages(messages => [...messages, {text: result.message, type: SenderType.Bot, data: result.data}])
                setFetching(false)
            }
        } catch (e) {
            if (e instanceof Error) {
                alert(e.message)
            }

            setFetching(false)
        }
    }

    const onSubmit = () => {
        if (text.trim().length) {
            setMessages(messages => [...messages, {text: text, type: SenderType.User, data: []}])
            setText('')
            setFetching(true)

            void sendRequest()
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSubmit()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    return (
        <Box sx={{mx: 2}}>
            {fetching &&
                <LinearProgress variant='solid' color='neutral' sx={{position: 'fixed', width: '100%', left: 0, top: 0, zIndex: 100}} />
            }
            <Box sx={{pt: 4, mb: 2, position: 'sticky', top: 0, background: 'white', zIndex: 10}}>
                <Textarea
                    value={text}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    placeholder='Enter your query ...'
                    variant='outlined'
                    minRows={3}
                    slotProps={{root: {sx: {flexDirection: 'row'}}, endDecorator: {sx: {alignSelf: 'flex-end', marginTop: 0}}}}
                    endDecorator={
                        <IconButton onClick={onSubmit} variant='plain' size='lg' disabled={!text.trim().length}>
                            <ManageSearch />
                        </IconButton>
                    }
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                {messages.map((message, index) => {
                    return <Message key={index} id={index} type={message.type} text={message.text} articles={message.data} />
                })}
            </Box>
        </Box>
    )
}

export default App
