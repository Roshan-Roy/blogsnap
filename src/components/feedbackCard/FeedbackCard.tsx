import { User } from '@nextui-org/react';
import React from 'react'

const FeedbackCard = ({
    title,
    message,
    email
}: {
    title: string;
    message: string;
    email: string;
}) => {
    return (
        <div className="shadow-[0px_0px_7px_0px_#ddd] rounded-xl p-8 flex flex-col gap-2 break-words">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm">{email}</p>
            <p>{message}</p>
        </div>
    )
}

export default FeedbackCard