import React from 'react'
import { Helmet } from 'react-helmet-async';



type TitleProps = {
    title?: string;
    description?: string;
}


const Title:React.FC<TitleProps> = ({
    title="ZokChat",
    description="This is the chat app called ZokChat"
}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title