import createRequest from "../../../functions/CreateRequest";
import getRequestsByOwner from "../../../functions/GetRequestsByOwner";
import setCors from "../../../utils/SetCors";

export default setCors(async (request, response) => {
    if (request.method === "GET") {
        return await getRequestsByOwner(request, response)
    }

    return await createRequest(request, response)
})