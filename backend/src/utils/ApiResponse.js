class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success"
    ) {
        this.statCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}
export {ApiResponse}