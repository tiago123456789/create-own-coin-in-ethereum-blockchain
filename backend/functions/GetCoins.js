import clientDB from "../configs/Database"

const getCoinsPaginate = (offset, limit) => {
    return clientDB("coins").offset(offset).limit(limit)
}

export default async (request, response) => {
    let page = parseInt(request.query.page) || 1;
    let itemsPerPage = parseInt(request.query.itemsPerPage) || 10;
    const offset = (page - 1) * itemsPerPage;
    const coins = await getCoinsPaginate(offset, itemsPerPage)

    return response.json({ 
        page, 
        itemsPerPage,
        data: coins 
    })
}