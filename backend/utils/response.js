export function standardResponseTemplate(status, {
    result = null,
    message = null,
    count = null,
    currentPage = null,
    totalPages = null,    
}) {
    const response = {};
    response.status = status;
    if(result !== null) response.result = result;
    if (count !== null) response.count = count;
    if (message !== null) response.message = message;
    if (currentPage !== null) response.currentPage = currentPage;
    if (totalPages !== null) response.totalPages = totalPages;

    return response;
}