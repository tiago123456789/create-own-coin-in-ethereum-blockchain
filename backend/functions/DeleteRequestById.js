import * as yup from "yup"
import { getValidationErrors } from '../utils/validator';
import clientDB from "../configs/Database";

const deleteById = (id) => {
    return clientDB("requests").where("id", id).del();
}

export default async (request, response) => {
    let schema = yup.object({
        id: yup.string().required(),
    });

    const data = request.query;
    const validationErrors = await getValidationErrors(schema, data)
    if (validationErrors.length > 0) {
        return response.status(400).json({
            message: validationErrors
        })
    }

    await deleteById(request.query.id)
    return response.status(200).json({});
}