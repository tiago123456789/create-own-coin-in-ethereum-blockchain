import * as yup from "yup"
import { getValidationErrors } from '../utils/validator';
import clientDB from "../configs/Database"

const getRequests = async (ownerWalletAddress) => {
    return clientDB("requests").where("owner_wallet_address", ownerWalletAddress)
}

export default async (request, response) => {
    let schema = yup.object({
        ownerWalletAddress: yup.string().required(),
    });

    const data = request.query;
    const validationErrors = await getValidationErrors(schema, data)
    if (validationErrors.length > 0) {
        return response.status(400).json({
            message: validationErrors
        })
    }

    const ownerWalletAddress = request.query.ownerWalletAddress;
    return response.json(await getRequests(ownerWalletAddress))
}