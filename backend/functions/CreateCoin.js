import * as yup from "yup"
import { getValidationErrors } from "../utils/validator";
import clientDB from "../configs/Database";

const createCoin = (data) => {
    return clientDB("coins").insert(data)
}

export default async (request, response) => {
    let schema = yup.object({
        name: yup.string().max(10).required(),
        symbol: yup.string().max(10).required(),
        owner: yup.string().max(100).required(),
        address: yup.string().max(100).required(),
    });

    const data = request.body;
    const validationErrors = await getValidationErrors(schema, data)
    if (validationErrors.length > 0) {
        return response.status(400).json({
            message: validationErrors
        })
    }

    await createCoin(request.body)
    return response.status(201).json({})
}