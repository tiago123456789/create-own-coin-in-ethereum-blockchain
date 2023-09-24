import * as yup from "yup"
import { getValidationErrors } from '../utils/validator';
import clientDB from "../configs/Database"

const createRequest = async (data) => {
    return clientDB("requests").insert({
        owner_wallet_address: data.ownerWalletAddress,
        requester_wallet_address: data.requesterWalletAddress,
        amount: data.amount,
        coin_contract_address: data.coinContractAddress,
        coin_name: data.coinName,
        updated_at: new Date(),
        created_at: new Date()
    })
}

export default async (request, response) => {
    let schema = yup.object({
        ownerWalletAddress: yup.string().required(),
        requesterWalletAddress: yup.string().required(),
        amount: yup.number().required(),
        coinContractAddress: yup.string().required(),
        coinName: yup.string().required(),
    });

    const data = request.body;
    const validationErrors = await getValidationErrors(schema, data)
    if (validationErrors.length > 0) {
        return response.status(400).json({
            message: validationErrors
        })
    }

    await createRequest(data)
    response.status(201).json()
}