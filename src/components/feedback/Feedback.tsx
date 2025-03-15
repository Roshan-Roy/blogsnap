"use client"

import { useSession } from "next-auth/react"
import { Form, Input, Button, Textarea, Spinner } from "@nextui-org/react"
import { useState } from "react"
import ModalErrorCardFour from "../modalerrorcards/ModalErrorCardFour"
import toast from "react-hot-toast"

const Feedback = () => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        title: "",
        message: ""
    })
    const styles = {
        label: "after:content-none",
    }
    const handleCancelError = () => setError(false)
    return (
        <div className="flex justify-center items-center bg-gray-200 py-20">
            <div className="w-6/12 rounded-3xl p-12 bg-white">
                <h1 className="text-center font-bold text-2xl mb-5">Send Feedback</h1>
                <Form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!loading) {
                        setLoading(true)
                        setError(false)
                        try {
                            const res = await fetch(`/api/feedback/${session?.user.id}`, {
                                method: "POST",
                                body: JSON.stringify({
                                    title: values.title.trim(),
                                    message: values.message.trim()
                                })
                            })
                            if (!res.ok) throw new Error()
                            setValues({ title: "", message: "" })
                            toast("Feedback sent successfully")
                        } catch {
                            setError(true)
                        } finally {
                            setLoading(false)
                        }
                    }
                }} validationBehavior="native" className="flex flex-col gap-4">
                    <Input
                        isRequired
                        label="Title"
                        labelPlacement="outside"
                        name="title"
                        placeholder="Enter the title"
                        type="text"
                        classNames={styles}
                        maxLength={100}
                        value={values.title}
                        onValueChange={value => setValues(e => ({ ...e, title: value }))}
                    />
                    <Textarea isRequired name="message" label="Message" placeholder="Enter the message" minRows={7} labelPlacement="outside" classNames={styles} maxLength={10000} value={values.message}
                        onValueChange={value => setValues(e => ({ ...e, message: value }))} />
                    {error && <ModalErrorCardFour closeFn={handleCancelError} />}
                    <Button color="primary" className="bg-gray-800 font-semibold text-xs mt-1" size="lg" type="submit" fullWidth disableRipple>
                        {loading ? <Spinner size="sm" color="default" /> : "Submit"}
                    </Button>
                </Form>
            </div>
        </div>

    );
}

export default Feedback
