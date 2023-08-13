#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/s3-stack';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
new S3Stack(app, 's3Stack', {

});

new LambdaStack(app, 'lambdaStack', {

});