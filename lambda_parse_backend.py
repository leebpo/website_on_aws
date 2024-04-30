import json 
import boto3

def lambda_handler(event, context):

    # access backend DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("indstudy-finalproject")
    
    try:
        data = table.scan()
        return {
            'statusCode': 200,
            'body': json.dumps(data)
        }
    except Exception as e:
        print(e.response['Error']['Message'])
        return {
            'statusCode': 404,
            'body': json.dumps('Error!')
        }
