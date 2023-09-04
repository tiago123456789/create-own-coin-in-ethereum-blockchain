import createCoin from "../../../functions/CreateCoin";
import getCoins from "../../../functions/GetCoins";
import setCors from "../../../utils/SetCors";

export default setCors(async (request, response) => {
    if (request.method === "GET") {
        return getCoins(request, response)
    }

    if (request.method === "POST") {
        return createCoin(request, response)
    }
    
    return response.status(502).json({ 
        message: "Method no implemented"
    })
})