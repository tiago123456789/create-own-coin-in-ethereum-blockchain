import DeleteRequestById from "../../../../functions/DeleteRequestById";
import setCors from "../../../../utils/SetCors";

export default setCors(async (request, response) => {
    if (request.method === "DELETE") {
        return await DeleteRequestById(request, response);
    }

    return response.status(501).json({
        message: "Method no implemented"
    });
})