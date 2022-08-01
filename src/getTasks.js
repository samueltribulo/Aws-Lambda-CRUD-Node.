const AWS = require('aws-sdk');

const getTasks = async () => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
        TableName: 'TaskTable'
    }).promise();

    const tasks = result.Items;

    if(tasks){
        return {
            status: 200,
            tasks
        }
    }else{
        return{
            status: 404,
            message: 'No tasks yet.',
        }
    }
}

module.exports = {
    getTasks,
    
}
