
const paginate = async(model, query={}, reqQuery={}, extra={}) => {
    const { page = 1, limit = 2, sort={createdAt: -1}} = reqQuery;
    const paginateOptions = {
        page: parseInt(page),
        limit: limit,
        sort,
        ...extra
    }
    
    try{
        const result = await model.paginate(query, paginateOptions);
        return {
            docs:result.docs,
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,
            pagingCounter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        }
    }catch(err){
        console.log('Pagination error: ', err.message);
    }
}

module.exports = paginate