
import {memo} from 'react'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Chip from '@mui/joy/Chip'
import {SenderType, Article} from '../interfaces'

type Component = {
    id: number
    type: SenderType
    text: string
    articles: Article[]
}

const Message = ({id, type, text, articles}: Component) => {
    return (
        <Card data-id={id} color={type === SenderType.User ? 'neutral' : 'primary'} variant='soft' sx={{my: 2, width: '70%', alignSelf: type === SenderType.User ? 'flex-start' : 'flex-end', scrollMargin: '148px'}}>
            {text}
            {!!articles.length && articles.map(item => <Card key={item.id} orientation='horizontal' component='a' href={item.link} target='_blank' rel='noopener'>
                <Box>
                    <Typography level='title-sm' sx={{mb: 1}}>{item.title}</Typography>
                    <CardContent orientation='horizontal'>
                        <Typography level='body-sm'>Published in {item.year}</Typography>
                        <Typography level='body-sm'>{item.citations} сitations</Typography>
                        {item.access && <Chip color='success' variant='outlined' size='sm'>Open access</Chip>}
                    </CardContent>
                </Box>
            </Card>)}
        </Card>
    )
}

export default memo(Message)