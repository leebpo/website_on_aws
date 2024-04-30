# website_on_aws
Spring 2024 independent study about cloud. Code used for hosting simple website hosted on AWS.

The `s3_frontend` folder contains HTML, Javascript, and CSS files for website. <br>
On AWS these are stored in an S3 bucket.

The `lambda_parse_backend` is code that calls and parses through data from backend. <br>
On AWS this is a Lambda function invoked by API Gateway, which is itself invoked by the Javascript file.

The `lambda_send_notification` is code that parses through S3 bucket logs and sends an SNS notification about the number of GET requests every day. <br>
On AWS this is a Lambda function invoked daily by a cron rule.

The `dynamodb_backend` is a CSV of all the data used by the website. <br>
On AWS this is a DynamoDB table.

http://indstudy-finalproject.s3-website-us-east-1.amazonaws.com
