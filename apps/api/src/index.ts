import { app } from './app'

app.listen(6767)

console.log(
  `API running at http://${app.server?.hostname}:${app.server?.port}`
)
