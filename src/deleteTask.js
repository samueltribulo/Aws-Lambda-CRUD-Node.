const AWS = require('aws-sdk');



const deleteTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;


    try {
        await dynamodb.delete({
            TableName: 'TaskTable',
            Key: {
                id
            }
        }).promise();

        return{
            status: 200,
            message: 'Task deleted'
        }
    } catch (error) {
        console.log(error);
        return {
            status: 404,
            message: '404 not found',
        }
    }
}

module.exports = {
    deleteTask
}