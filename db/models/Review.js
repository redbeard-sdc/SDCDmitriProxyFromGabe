var AWS = require("aws-sdk");


async function makeReviewtable(){ 
    AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
    });

    var dynamodb = new AWS.DynamoDB();

    var params = {
        TableName : "Users",
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH"},  //Partition key
            { AttributeName: "name", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "N" },
            { AttributeName: "name", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    await dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

module.exports = {makeReviewtable};