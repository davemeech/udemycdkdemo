import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Bucket IAM Role
    const bucketRole = new iam.Role(this, "balanceStatusBucketRole", {
      roleName: "bankingLambdaRole",
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      description: "Role for lambda to access Balance Status S3 bucket",
    });
    
    bucketRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"));

    // Lambda
    const balanceLambda = new lambda.Function(this, "balanceStatusLambdaFunction", {
      code: lambda.Code.fromAsset(path.join('../services/')),
      handler: 'lambda_function.lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_11,
      functionName: 'balanceStatusFunction',
      role: bucketRole
    });

    // API Gateway

    const balanceStatusApi = new apiGateway.LambdaRestApi(this, "balanceStatusLambdaRestAPI", {
      handler: balanceLambda,
      restApiName: 'balanceStatusApi',
      deploy: true,
      proxy: false
    });

   const balanceStatus = balanceStatusApi.root.addResource('balanceStatus');
   balanceStatus.addMethod('GET');

  }
}
