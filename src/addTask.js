const { v4 } = require('uuid');

const AWS = require('aws-sdk');

const addTask = async (event) => {

    const diynamodb = new AWS.DynamoDB.DocumentClient();

    const {title, description} = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    try {

        const newTask = {
            id,
            title,
            description,
            createdAt: JSON.stringify(createdAt),
            done: false,
        };
    
        await diynamodb.put({
            TableName: 'TaskTable',
            Item: newTask
        }).promise();
    
        return {
            status: 200,
            body: JSON.stringify(newTask)
        }
        
    } catch (error) {
        console.log(error);
        return {
            status: 404,
            body: JSON.stringify({message: '404 not found.'})
        }
    }

}

module.exports = {
    addTask,
}
