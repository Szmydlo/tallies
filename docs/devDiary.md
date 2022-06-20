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

### 03.06.2022

Validation done both for signing in and logging in. Let's test it

### 05.06.2022

Remember to remove `type="email"` from input before. It blocks value from passing onto next functions

### 06.06.2022

New topic: localStorage. First needed to implement some RLS in Supabase for testing (now user sees theirs email while logged on). I'm trying to create a custom hook for handling operations on localStorage.  
OMG Supabase has everything already implemented... I realized after finishing useSession hook :/

### 09.06.2022

RouteGuard created to use current session and login automatically! Need to work a little on catching errors from backend and also on blocking user calls to backend (RLS Supabase). Question for later: is there a way not to check on every page whether the user is authorized?

### 10.06.2022

Catching errors implemented! I also managed to make 404 "intelligent", it can distinguish between logged and not logged user

### 12.06.2022

I believe I found the way to finally be able to test redux (it has taken so much time because I was looking for particularly testing dispatch instead of whole redux): `redux-mock-store`. Gonna focus on testing today.  
It is easier to change the approach to buttons: now just primary and secondary (finally testable!)

### 14.06.2022

I managed to obtain merged coverage report from Jest and Playwright! Of course locally. Tomorrow I will try to implement it in CircleCI and maybe try to return it from build

### 20.06.2022

I haven't noticed that Jest and Playwright interpret lines differently, which breaks reports totally. I spent additional 5 hours on fixing this, but now it works (almost perfectly: it sometimes includes "import" statement, sometimes not), at least with line coverage. Gonna use it in CircleCI. I'm also thinking about creating Medium article as this is not really described and requires combining multiple things together.
