import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as S3Infrastructure from '../lib/s3-stack';

describe('Balance Status S3 Bucket', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new S3Infrastructure.S3Stack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);

    test('It was created and has the expected properties', () => {

        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketName: "balancestatusdavemeech"
        });

    });
});