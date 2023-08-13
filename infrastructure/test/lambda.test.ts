import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as LambdaInfrastructure from '../lib/lambda-stack';

describe('IAM Role for granting Lambda full control access to Balance Status S3 Bucket', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LambdaInfrastructure.LambdaStack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);

    test('It was created and has the expected properties', () => {

        template.hasResourceProperties('AWS::IAM::Role', {
            RoleName: "bankingLambdaRole",
            Description: "Role for lambda to access Balance Status S3 bucket"
        });

    });
});

describe('Balance Status Lambda', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LambdaInfrastructure.LambdaStack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);

    test('It was created and has the expected properties', () => {

        template.hasResourceProperties('AWS::Lambda::Function', {
            FunctionName: "balanceStatusFunction"
        });

    });
});

describe('Balance Status API Gateway', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LambdaInfrastructure.LambdaStack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);

    test('It was created and has the expected properties', () => {

        template.hasResourceProperties('AWS::ApiGateway::RestApi', {
            Name: "balanceStatusApi"
        });

    });
});