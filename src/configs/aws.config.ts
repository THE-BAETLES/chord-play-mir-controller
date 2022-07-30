export type AwsConfigType = {
  aws: {
    region: string;
    accessKeyId: string;
    secretKey: string;
  };
  sqs: {
    url: string;
    apiVersion: string;
  };
};

export const AwsConfig: AwsConfigType = {
  aws: {
    region: process.env.AWS_REGION || 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_KEY,
  },
  sqs: {
    url: process.env.SQS_URL,
    apiVersion: process.env.SQS_API_VERSION || '2012-11-05',
  },
};
