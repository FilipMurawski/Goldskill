import { Dispatch, SetStateAction } from "react"

const resetForm = async ({fields}: {fields: Dispatch<SetStateAction<string>>[]}) => {
    fields.forEach((field) => {
        field("")
    })
}

export default resetForm
