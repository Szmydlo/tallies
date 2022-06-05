# Hi there, I will be putting some thoughts here.

## Setting up everything to push first commit with something that looks like an app, not only config files

### Somewhere in May

Apparently you cannot reach 100% coverage on branches in Istanbul, because of some strange classification of branches :(
<br>

### 26.05.2022

Big break (back in Poland), coming back at full force. Apparently you cannot really test Redux using unit/integration tests, gonna use Playwright for that, but to do so I will need to deploy first...  
Gotta use less mouse and finally learn keyboard shortcuts in VSCode  
Apparently it is not so easy to store password in .env and then use it in playwright tests. There has to be special config file (globalSetup.ts), which runs

```
const projectDir = process.cwd();
	loadEnvConfig(projectDir);
```

to make `process.env` accessible for tests. To make it available in CircleCI it has to be deployed again, but it is quite fast thanks to caching `node_modules`

### 27.05.2022

Yesterday evening I managed to deploy and integrate unit/integration tests and also e2e tests into pipeline. Yay!  
Now I was searching for a solution to test email signup confirmation, but all the solutions I found are not free, so I'd rather skip this testcase

### 29.05.2022

Having problems writing testable code in React... I'm gonna practice TS a little bit more with custom hook for form validation and submission. It should be also more testable. Playwright makes writing E2E tests super easy, but before that let's focus on extending integration/unit tests.

### 03.06.22

Validation done both for signing in and logging in. Let's test it
