import json, boto3 
from datetime import date

def lambda_handler(event, context):

    # find logs for today
    today = date.today()
    logs_bucket = "indstudy-finalproject-logs"
    curr_date = f"{today.year}/{today.month}/{today.day}/"
    folder_name = f"890790031013/us-east-1/indstudy-finalproject/{curr_date}"

    s3_client = boto3.client('s3')
    response = s3_client.list_objects_v2(Bucket=logs_bucket, Prefix=folder_name)

    num_visits = 0
    msg = ''
    # search through logs for GET calls to website
    if 'Contents' in response:
        for obj in response['Contents']:
            fileObj = s3_client.get_object(Bucket = logs_bucket, Key=obj['Key'])
            file_content = fileObj["Body"].read().decode('utf-8')
            file_words = file_content.split(" ")
            print("")
            if "REST.GET.WEBSITE" in file_content and fileObj["ResponseMetadata"]["HTTPStatusCode"] == 200:
                num_visits += 1
                
        # send SNS message
        sns_client = boto3.client('sns')
        msg = f"\n\n\n{num_visits} clicks on webpage page http://indstudy-finalproject.s3-website-us-east-1.amazonaws.com on date {curr_date}\n\n\n"
        response = sns_client.publish(TopicArn='arn:aws:sns:us-east-1:890790031013:indstudy-finalproject-stats',Message=msg)
    else:
        print("Folder is empty.")
        

    return {
        'statusCode': 200,
        'body': json.dumps("indstudy-finalproject-stats ran successfully"),
    }
