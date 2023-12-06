# Serverless ShortLinker

This is a cloud-based link shortening tool on AWS. It offers link creation and management, along with analytics and link expiration settings.

<br>

## Installation/deployment instructions

1. Install Node.js and npm from [Node.js official website](https://nodejs.org/).
2. Install Serverless Framework: `npm install -g serverless`.
3. Create an AWS account: [AWS signup](https://portal.aws.amazon.com/billing/signup).

<br>

**AWS Configuration:**

1. Create an IAM Role with for creating schedules. Trusted entities should contain service scheduler.amazonaws.com and action sts:AssumeRole.
2. Verify email in Amazon SES. Guide: [SES Guide](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html).

<br>

**Project Setup:**

1. Clone the repository: `git clone <repo-url>` and navigate: `cd <repo-name>`.
2. Create a `.env` file from `env.example` and set `JWT_SECRET` and `SES_EMAIL` to your verified SES email.
3. Configure AWS credentials: `aws configure` using your AWS credentials.

<br>

**Deployment:**

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS


<br>


## Project structure

- **`serverless.ts`**: This file contains the Serverless Framework configuration needed to deploy AWS resources such as functions, APIs, and databases.

- **`package.json`**: Defines project metadata, dependencies, and scripts for building and deploying the project.

- **`tsconfig.json`**: The TypeScript compiler configuration file that specifies the root files and the compiler options required to compile the project.

- **`/src`**: The main project directory where the source code resides.
  - **`/lambdas`**: Contains API endpoints, categorized by their domain-specific role such as `auth` for authentication and `links` for link management.
  - **`/common`**: Shared utilities and common modules like `types`, `utils`, and service integrations like `Dynamo.ts` for database operations.
  - **`/listeners`**: Event listener functions that react to various event triggers.
  - **`/scheduledTasks`**: Functions that are executed on a schedule to perform routine tasks.

- **`/libs`**: Library code that defines the foundational building blocks for the application like `api-gateway.ts` for API Gateway setup and `lambda.ts` for common Lambda configurations.

- **`/docs`**: Documentation files including explanations and configurations for the project, such as `serverless.docs.yml`.


## Documentation

Paste **`docs/serverless.docs.yml`** code to services like [SwaggerEditor](https://editor.swagger.io/).