const AWS = require('aws-sdk');

const updateTask = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters;

    const {title, description, done} = JSON.parse(event.body); 

    if(title){
        try {
            await dynamodb.update({
                TableName: 'TaskTable',
                Key: {id},
                UpdateExpression: 'set title = :title',
                ExpressionAttributeValues: {
                    ':title': title,
                },
                ReturnValues: 'ALL_NEW'
            }).promise();
        } catch (error) {
            console.log(error);
            return{
                status: 404,
                message: '404 not found',
            }
        }
    }

    if(description){
        try {
            await dynamodb.update({
                TableName: 'TaskTable',
                Key: {id},
                UpdateExpression: 'set description = :description',
                ExpressionAttributeValues: {
                    ':description': description,
                },
                ReturnValues: 'ALL_NEW'
            }).promise();
        } catch (error) {
            console.log(error);
            return{
                status: 404,
                message: '404 not found',
            }
        }
    }

    if(done){
        try {
            await dynamodb.update({
                TableName: 'TaskTable',
                Key: {id},
                UpdateExpression: 'set done = :done',
                ExpressionAttributeValues: {
                    ':done': done,
                },
                ReturnValues: 'ALL_NEW'
            }).promise();
        } catch (error) {
            console.log(error);
            return{
                status: 404,
                message: '404 not found',
            }
        }
    }

    return {
        status: 200,
        message: 'Task updated succesfully.'
    }
}

module.exports = {
    updateTask,
}