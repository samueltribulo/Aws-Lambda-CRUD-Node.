const AWS = require('aws-sdk');

const getTaskById = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const result = await dynamodb.get({
        TableName: 'TaskTable',
        Key: {
            id,
        }
    }).promise();

    const task = result.Item;
    if(task){
        return{
            status: 200,
            task,
        }
    }else{
        return{
            status: 404,
            message: '404 not found',
        }
    }
}

module.exports = {
    getTaskById,
}