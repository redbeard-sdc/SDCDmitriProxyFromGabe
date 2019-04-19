var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
});

var dynamodb = new AWS.DynamoDB();

const paramsHotel = {
    TableName: 'Hotels',
    KeySchema: [       
        { AttributeName: "name", KeyType: "HASH"},  
        { AttributeName: "address", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "name", AttributeType: "S"},  
        { AttributeName: "address", AttributeType: "S" },
        // { AttributeName: "description", AttributeType: "S" },
        // { AttributeName: "walkable_score", AttributeType: "N" },
        // { AttributeName: "phone", AttributeType: "S" },
        // { AttributeName: "nearest_airport", AttributeType: "S" },
        // { AttributeName: "url", AttributeType: "S" },
        // { AttributeName: "ranking", AttributeType: "N" },
        // { AttributeName: "stars", AttributeType: "N" }
    ],
    ProvisionedThroughput : {
        ReadCapacityUnits : 10,
        WriteCapacityUnits : 10
    }

}

// dynamodb.createTable(paramsHotel, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "Hotels",
            Item: {
                "name": "nothing to see here",
                "address": "random street",
                "description": "random description",
                "walkable score": "10",
                "phone": "720-444-4444",
                "nearest airport": "Denver Intl Airport",
                "url":"www.random.com",
                "ranking": "great",
                "stars":"4",
            }
        }
        docClient.put(params,function(err,data){
            if(err){
                console.log("unable to add hotel");
            } else {
                console.log("added hotel");
                var params = {
                    TableName: "Hotels",
                    Key:{
                        "name": "nothing to see here",
                        "address": "random street"
                    }
                };
                
                docClient.get(params, function(err, data) {
                    if (err) {
                        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                    }
                });
            }
        })
    //};
//}); 